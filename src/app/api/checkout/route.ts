import Stripe from "stripe";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type Plan = "starter" | "pro";

export async function POST(req: Request) {
  try {
    const secret = process.env.STRIPE_SECRET_KEY;
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
    const priceStarter = process.env.STRIPE_PRICE_STARTER;
    const pricePro = process.env.STRIPE_PRICE_PRO;

    if (!secret || !baseUrl || !priceStarter || !pricePro) {
      return NextResponse.json({ error: "missing_env" }, { status: 500 });
    }

    const { plan }: { plan: Plan } = await req.json();
    const price = plan === "pro" ? pricePro : priceStarter;

    const stripe = new Stripe(secret);

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price, quantity: 1 }],
      success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/checkout/cancel`,
      // optional: collect email
      allow_promotion_codes: true,
    });

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (err) {
    console.error("checkout_error", err);
    return NextResponse.json({ error: "create_session_failed" }, { status: 400 });
  }
}
