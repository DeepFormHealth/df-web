import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const home = `${process.env.NEXT_PUBLIC_APP_URL || url.origin}/`;

  const res = NextResponse.redirect(home, { status: 303 });
  // Gate cookie for simple access control (1 year)
  res.cookies.set("df_active", "1", {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
  return res;
}
