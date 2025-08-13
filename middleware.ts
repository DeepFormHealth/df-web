// middleware.ts (project root)
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Paths to protect
const PROTECTED = ["/app"]; // add "/dashboard" etc. as you grow

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isProtected = PROTECTED.some(
    (p) => pathname === p || pathname.startsWith(p + "/"),
  );
  if (!isProtected) return NextResponse.next();

  const active = req.cookies.get("df_active")?.value === "1";
  if (active) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = "/pricing";
  url.searchParams.set("reason", "upgrade");
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/app/:path*"], // keep in sync with PROTECTED
};
