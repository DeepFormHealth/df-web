import Stripe from "stripe";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const secret = process.env.STRIPE_SECRET_KEY;
    const whSecret = process.env.STRIPE_WEBHOOK_SECRET; // set in Vercel
    if (!secret || !whSecret) return NextResponse.json({ error: "misconfig" }, { status: 500 });

    const stripe = new Stripe(secret);
    const sig = (req.headers.get("stripe-signature") ?? "") as string;
    const body = await req.text();

    const evt = stripe.webhooks.constructEvent(body, sig, whSecret);

    if (evt.type === "checkout.session.completed") {
      const session = evt.data.object as Stripe.Checkout.Session;
      // TODO: map session.customer_email or client_reference_id to your user
      // and mark them active in your DB (e.g., Supabase)
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("webhook error", err);
    return NextResponse.json({ error: "bad_signature" }, { status: 400 });
  }
}
