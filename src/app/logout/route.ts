import { NextResponse } from "next/server";

export async function GET() {
  // Client will also clear session, but this gives a quick redirect target
  const res = NextResponse.redirect(new URL("/login", process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"));
  // Best-effort cookie clear for sb cookies; client logout is the primary way.
  res.cookies.set("sb-access-token", "", { maxAge: 0 });
  res.cookies.set("sb-refresh-token", "", { maxAge: 0 });
  return res;
}
