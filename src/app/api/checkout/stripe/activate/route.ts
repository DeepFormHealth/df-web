// src/app/api/stripe/activate/route.ts
import Stripe from "stripe";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Plan = "starter" | "pro";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const sessionId = url.searchParams.get("session_id");
  const secret = process.env.STRIPE_SECRET_KEY;

  // If anything is missing, punt to pricing
  if (!secret || !sessionId) {
    return NextResponse.redirect(new URL("/pricing", req.url));
  }

  const stripe = new Stripe(secret);

  // Verify the session is actually complete/paid
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  const paid =
    session.payment_status === "paid" || session.status === "complete";

  const plan: Plan =
    (typeof session.metadata?.plan === "string" &&
      (session.metadata.plan === "pro" ? "pro" : "starter")) || "starter";

  const res = NextResponse.redirect(new URL("/app", req.url));

  if (paid) {
    // Set httpOnly cookie for gating (1 year)
    res.cookies.set("df_active", "1", {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });
    // Optional plan cookie (also httpOnly)
    res.cookies.set("df_plan", plan, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });
  } else {
    // Ensure access stays closed
    res.cookies.delete("df_active");
    res.cookies.delete("df_plan");
  }

  return res;
}
