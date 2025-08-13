"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
// import { captureEvent } from "@/lib/posthog"; // if you use it

export default function Analytics() {
  const sp = useSearchParams();

  useEffect(() => {
    // example: read params and send event
    const plan = sp.get("plan") ?? null;
    // captureEvent("page_view", { plan });
  }, [sp]);

  return null; // analytics components usually render nothing
}
