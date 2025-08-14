import Stripe from "stripe";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs"; // optional

export async function POST(req: Request) {
  try {
    const secret = process.env.STRIPE_SECRET_KEY;
    if (!secret) return NextResponse.json({ error: "misconfig" }, { status: 500 });

    const url = new URL(req.url);
    const session_id = url.searchParams.get("session_id");
    if (!session_id) {
      return NextResponse.json({ error: "missing_session_id" }, { status: 400 });
    }

    const stripe = new Stripe(secret);
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["customer"],
    });

    if (session.payment_status !== "paid" || session.status !== "complete") {
      return NextResponse.json({ error: "unpaid" }, { status: 400 });
    }

    // 👇 await cookies()
    const jar = await cookies();

    // Mark user active (for your feature gate)
    jar.set("df_active", "1", {
      httpOnly: false, // set true if you only read on server
      sameSite: "lax",
      secure: true,
      maxAge: 60 * 60 * 24 * 365,
      path: "/",
    });

    // Save Stripe customer id (used by Billing Portal)
    const cid =
      typeof session.customer === "string"
        ? session.customer
        : session.customer?.id;

    if (cid) {
      jar.set("df_cid", cid, {
        httpOnly: true,
        sameSite: "lax",
        secure: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 365,
      });
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("activate_error", err);
    return NextResponse.json({ error: "activate_failed" }, { status: 400 });
  }
}
