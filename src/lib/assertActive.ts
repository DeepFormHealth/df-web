// src/lib/assertActive.ts
import { cookies } from "next/headers";

/** Throws if the subscription cookie is missing. */
export async function assertActive() {
  const jar = await cookies(); // ← await required in Next 15
  if (jar.get("df_active")?.value !== "1") {
    throw new Error("payment_required");
  }
}

/** Optional: boolean helper if you prefer branching instead of throw. */
export async function isActive() {
  const jar = await cookies();
  return jar.get("df_active")?.value === "1";
}
