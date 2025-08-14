import Stripe from "stripe";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Optional: use this to *verify* the event and flip DB state.
// In this cookie-based MVP we just log the event for now.
export async function POST(req: Request) {
  try {
    const secret = process.env.STRIPE_SECRET_KEY;
    const whSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!secret || !whSecret)
      return NextResponse.json({ error: "misconfig" }, { status: 500 });

    const stripe = new Stripe(secret);
    const sig = req.headers.get("stripe-signature") ?? "";
    const raw = await req.text();

    const evt = stripe.webhooks.constructEvent(raw, sig, whSecret);

    if (evt.type === "checkout.session.completed") {
      const session = evt.data.object as Stripe.Checkout.Session;
      console.log("checkout.session.completed", {
        id: session.id,
        customer: session.customer,
        email: session.customer_details?.email,
        mode: session.mode,
      });
      // TODO: mark user active in your DB if you prefer DB-based gating.
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err: any) {
    console.error("webhook_error", err);
    return NextResponse.json({ error: "bad_signature", detail: err?.message }, { status: 400 });
  }
}
