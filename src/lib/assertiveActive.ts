// src/lib/assertActive.ts
import { cookies } from "next/headers";
export function assertActive() {
  if (cookies().get("df_active")?.value !== "1") {
    throw new Error("payment_required");
  }
}
