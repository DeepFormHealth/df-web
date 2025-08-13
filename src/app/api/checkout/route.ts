// src/app/api/checkout/route.ts
import Stripe from "stripe";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Plan = "starter" | "pro";

// TODO: replace with your real Stripe Price IDs
const PRICE: Record<Plan, string> = {
  starter: "price_xxx_starter",
  pro: "price_xxx_pro",
};

export async function POST(req: Request) {
  try {
    const { plan = "starter" } = await req.json().catch(() => ({}));
    const key: Plan = plan === "pro" ? "pro" : "starter";

    const secret = process.env.STRIPE_SECRET_KEY;
    if (!secret) {
      return NextResponse.json({ error: "missing_stripe_key" }, { status: 500 });
    }

    // Create Stripe client at request time (avoids build-time execution)
    const stripe = new Stripe(secret);

    const session = await stripe.checkout.sessions.create({
      mode: "subscription", // or "payment"
      line_items: [{ price: PRICE[key], quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout?plan=${key}`,
    });

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (err) {
    console.error("checkout error:", err);
    return NextResponse.json({ error: "create_session_failed" }, { status: 500 });
  }
}
