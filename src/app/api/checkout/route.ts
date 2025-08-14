import Stripe from "stripe";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PRICES: Record<"starter" | "pro", string> = {
  starter: process.env.STRIPE_PRICE_STARTER || "",
  pro: process.env.STRIPE_PRICE_PRO || "",
};

export async function POST(req: Request) {
  try {
    const secret = process.env.STRIPE_SECRET_KEY;
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    if (!secret) {
      return NextResponse.json(
        { error: "missing_stripe_key" },
        { status: 500 }
      );
    }

    const { plan } = (await req.json()) as { plan?: "starter" | "pro" };
    const chosen = plan === "pro" ? "pro" : "starter";
    const price = PRICES[chosen];

    if (!price) {
      return NextResponse.json(
        { error: "missing_price_env" },
        { status: 500 }
      );
    }

    const stripe = new Stripe(secret);

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price, quantity: 1 }],
      // You can wire success_url to a real success page later
      success_url: `${appUrl}/?checkout=success`,
      cancel_url: `${appUrl}/checkout?plan=${chosen}`,
      allow_promotion_codes: true,
    });

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (err) {
    console.error("checkout create error", err);
    return NextResponse.json({ error: "create_session_failed" }, { status: 500 });
  }
}
