"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import posthog from "posthog-js";

const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const host = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";

export default function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!key) return;
    if (!posthog.__loaded) {
      posthog.init(key, {
        api_host: host,
        capture_pageview: false,
        autocapture: true,
      });
    }
  }, []);

  // page views
  useEffect(() => {
    if (!key) return;
    posthog.capture("$pageview");
  }, [pathname, searchParams]);

  return null;
}
