import Stripe from "stripe";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // avoid caching

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

// Replace with your real Price IDs from Stripe
const PRICE: Record<"starter" | "pro", string> = {
  starter: "price_xxx_starter",
  pro: "price_xxx_pro",
};

export async function POST(req: Request) {
  try {
    const { plan = "starter" } = await req.json().catch(() => ({}));
    const key = (plan === "pro" ? "pro" : "starter") as keyof typeof PRICE;

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",                  // or "payment"
      line_items: [{ price: PRICE[key], quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout?plan=${key}`,
      // customer_email: "...",               // optional
      // client_reference_id: "...",          // optional
    });

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (err) {
    console.error("checkout error:", err);
    return NextResponse.json({ error: "create_session_failed" }, { status: 500 });
  }
}
