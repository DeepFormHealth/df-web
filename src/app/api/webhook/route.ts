// src/app/api/webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { supabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";

// Omit apiVersion; use package default
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature");
  if (!sig) return new NextResponse("Missing signature", { status: 400 });

  const rawBody = Buffer.from(await req.arrayBuffer());

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return new NextResponse(`Webhook Error: ${(err as Error).message}`, {
      status: 400,
    });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const s = event.data.object as Stripe.Checkout.Session;
        const userId = (s.client_reference_id as string | null) ?? null;
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
        const userId = (sub.metadata?.user_id as string | undefined) ?? null;
        if (userId) await upsertSubscription(userId, sub);
        break;
      }

      default:
        // ignore others
        break;
    }

    return NextResponse.json({ received: true });
  } catch (e) {
    return new NextResponse(`Handler error: ${(e as Error).message}`, {
      status: 500,
    });
  }
}

async function upsertSubscription(userId: string, sub: Stripe.Subscription) {
  // handle api-version/type differences safely
  const cpe =
    typeof (sub as any).current_period_end === "number"
      ? new Date(((sub as any).current_period_end as number) * 1000).toISOString()
      : null;

  await supabaseAdmin.from("subscriptions").upsert({
    id: sub.id,
    user_id: userId,
    status: sub.status,
    tier:
      sub.items.data[0]?.price.nickname ??
      sub.items.data[0]?.price.id ??
      "unknown",
    current_period_end: cpe,
  });
}
