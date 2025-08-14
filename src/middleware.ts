import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  // Protect /portal/* (example)
  if (req.nextUrl.pathname.startsWith("/portal")) {
    const active = req.cookies.get("df_active")?.value === "1";
    if (!active) {
      const url = new URL("/pricing", req.url);
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/portal/:path*"],
};
