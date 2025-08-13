// src/app/api/stripe/deactivate/route.ts
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete("df_active");
  res.cookies.delete("df_plan");
  return res;
}
