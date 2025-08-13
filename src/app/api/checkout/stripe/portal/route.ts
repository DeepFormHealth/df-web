// src/app/api/stripe/portal/route.ts
import Stripe from "stripe";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const secret = process.env.STRIPE_SECRET_KEY!;
    const base = process.env.NEXT_PUBLIC_APP_URL || new URL(req.url).origin;
    const stripe = new Stripe(secret);

    // If you don’t know the customer yet, you can create a portal session
    // only after you persist customer id via a proper DB+webhook flow.
    // For MVP, return 400 or hide the button until you store customer ids.
    return NextResponse.json({ error: "no_customer_id" }, { status: 400 });

    // Example when you DO have a customer:
    // const portal = await stripe.billingPortal.sessions.create({
    //   customer: "cus_XXXXXXXX",
    //   return_url: `${base}/app`,
    // });
    // return NextResponse.json({ url: portal.url });
  } catch (e) {
    return NextResponse.json({ error: "portal_failed" }, { status: 500 });
  }
}
