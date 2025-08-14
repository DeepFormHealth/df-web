import Stripe from "stripe";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function priceForPlan(plan: string | null) {
  switch (plan) {
    case "starter":
      return process.env.STRIPE_PRICE_STARTER;
    case "pro":
      return process.env.STRIPE_PRICE_PRO;
    default:
      return null;
  }
}

export async function POST(req: Request) {
  try {
    const secret = process.env.STRIPE_SECRET_KEY;
    if (!secret) {
      return NextResponse.json({ error: "missing_stripe_key" }, { status: 500 });
    }
    const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const stripe = new Stripe(secret);

    const body = await req.json().catch(() => ({} as any));
    const plan: string | null = typeof body?.plan === "string" ? body.plan : null;
    const price = priceForPlan(plan);
    if (!price) return NextResponse.json({ error: "invalid_plan", detail: plan }, { status: 400 });

    const session = await stripe.checkout.sessions.create({
      mode: "subscription", // requires recurring prices
      line_items: [{ price, quantity: 1 }],
      success_url: `${APP_URL}/api/stripe/activate`,
      cancel_url: `${APP_URL}/checkout?plan=${plan}&status=cancelled`,
      allow_promotion_codes: true,
    });

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (err: any) {
    console.error("checkout_session_error", err);
    return NextResponse.json(
      { error: "create_session_failed", detail: err?.message ?? String(err) },
      { status: 400 },
    );
  }
}
