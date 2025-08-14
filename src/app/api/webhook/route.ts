// src/app/api/webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { supabaseAdmin } from "@/lib/supabase";

// Use Node runtime (Stripe needs raw body + Buffer)
export const runtime = "nodejs";

// Omit apiVersion or use the literal your stripe package expects.
// If you want to set it, use what VS Code suggests for your install.
// Example (optional): { apiVersion: "2025-07-30.basil" }
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature");
  if (!sig) return new NextResponse("Missing signature", { status: 400 });

  // Get raw body exactly as received
  const rawBody = Buffer.from(await req.arrayBuffer());

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return new NextResponse(
      `Webhook Error: ${(err as Error).message}`,
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const s = event.data.object as Stripe.Checkout.Session;

        // Your app must set client_reference_id when creating the session
        const userId = (s.client_reference_id as string | null) ?? null;

        // Subscription id can be inside session
        const subId =
          typeof s.subscription === "string"
            ? s.subscription
            : s.subscription?.id;

        if (userId && subId) {
          const sub = await stripe.subscriptions.retrieve(subId);
          await upsertSubscription(userId, sub);
        }
        break;
      }

      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;

        // Prefer metadata if you set it during subscription creation
        const userId =
          (sub.metadata?.user_id as string | undefined) ?? null;

        // If you didn’t set metadata, map Stripe customer -> user in your DB
        if (userId) {
          await upsertSubscription(userId, sub);
        }
        break;
      }

      default:
        // ignore other events
        break;
    }

    return NextResponse.json({ received: true });
  } catch (e) {
    return new NextResponse(
      `Handler error: ${(e as Error).message}`,
      { status: 500 }
    );
  }
}

async function upsertSubscription(
  userId: string,
  sub: Stripe.Subscription
) {
  // Write/overwrite the subscription row
  await supabaseAdmin.from("subscriptions").upsert({
    id: sub.id,
    user_id: userId,
    status: sub.status,
    tier:
      sub.items.data[0]?.price.nickname ??
      sub.items.data[0]?.price.id ??
      "unknown",
    current_period_end: new Date(
      sub.current_period_end * 1000
    ).toISOString(),
  });

  // Keep profiles.is_pro in sync (your DB tri_
