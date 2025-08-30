import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  if (!req.nextUrl.pathname.startsWith("/app")) return NextResponse.next();

  // Lightweight check: Supabase auth sets sb- cookies
  const hasSbCookie = req.cookies.getAll().some(c =>
    c.name.startsWith("sb-") || c.name.startsWith("sb:")
  );

  if (!hasSbCookie) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/app/:path*"],
};
