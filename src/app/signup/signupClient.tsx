"use client";
import { useSearchParams } from "next/navigation";

export default function SignupClient() {
  const sp = useSearchParams();
  const plan = sp.get("plan") ?? "starter";
  // replace markup with your UI
  return <main>Signup for {plan}</main>;
}
