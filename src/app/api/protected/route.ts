// src/app/api/protected/route.ts
import { NextResponse } from "next/server";
import { assertActive } from "@/lib/assertActive";

export async function GET() {
  await assertActive(); // gate
  return NextResponse.json({ ok: true, msg: "You are active." });
}
