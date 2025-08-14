// src/app/api/checkout/route.ts
import Stripe from "stripe";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Plan = "starter" | "pro";

function getPriceId(plan: Plan) {
  const id =
    plan === "pro"
      ? process.env.STRIPE_PRICE_PRO
      : process.env.STRIPE_PRICE_STARTER;
  if (!id) throw new Error(`missing price id for plan=${plan}`);
  return id;
}

export async function POST(req: Request) {
  try {
    const { plan = "starter" } = (await req.json().catch(() => ({}))) as {
      plan?: Plan;
    };
    const key: Plan = plan === "pro" ? "pro" : "starter";

    const secret = process.env.STRIPE_SECRET_KEY;
    if (!secret) {
      return NextResponse.json({ error: "missing_stripe_key" }, { status: 500 });
    }

    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL || new URL(req.url).origin;

    const stripe = new Stripe(secret);

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: getPriceId(key), quantity: 1 }],
      success_url: `${baseUrl}/api/stripe/activate?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/checkout?plan=${key}&status=cancelled`,
      metadata: { plan: key },
    });

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (err) {
    console.error("checkout error:", err);
    return NextResponse.json({ error: "create_session_failed" }, { status: 500 });
  }
}
