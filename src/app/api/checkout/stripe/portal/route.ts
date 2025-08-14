import Stripe from "stripe";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs"; // optional, but keeps Stripe happy

export async function POST() {
  try {
    const secret = process.env.STRIPE_SECRET_KEY;
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
    if (!secret || !baseUrl) {
      return NextResponse.json({ error: "misconfig" }, { status: 500 });
    }

    // 👇 await cookies()
    const jar = await cookies();
    const cid = jar.get("df_cid")?.value;
    if (!cid) return NextResponse.json({ error: "no_customer" }, { status: 400 });

    const stripe = new Stripe(secret);
    const session = await stripe.billingPortal.sessions.create({
      customer: cid,
      return_url: `${baseUrl}/profile`,
    });

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (err) {
    console.error("portal_error", err);
    return NextResponse.json({ error: "portal_failed" }, { status: 400 });
  }
}
