// src/app/api/checkout/route.ts
import Stripe from "stripe";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type Plan = "starter" | "pro";

export async function POST(req: Request) {
  try {
    const secret = process.env.STRIPE_SECRET_KEY!;
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL!;
    const priceStarter = process.env.STRIPE_PRICE_STARTER!;
    const pricePro = process.env.STRIPE_PRICE_PRO!;

    if (!secret || !baseUrl || !priceStarter || !pricePro) {
      return NextResponse.json({ error: "missing_env" }, { status: 500 });
    }

    const body = (await req.json()) as { plan?: Plan; userId?: string };
    const plan = (body.plan as Plan) ?? "starter";
    const userId = body.userId; // Supabase auth user id from client
    const price = plan === "pro" ? pricePro : priceStarter;

    const stripe = new Stripe(secret); // omit apiVersion; use package default

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price, quantity: 1 }],
      success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/checkout/cancel`,
      allow_promotion_codes: true,
      // important: allow webhook to map back to the app user
      client_reference_id: userId,
      subscription_data: { metadata: { user_id: userId ?? "" } },
    });

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (err) {
    console.error("checkout_error", err);
    return NextResponse.json({ error: "create_session_failed" }, { status: 400 });
  }
}
