"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import posthog from "posthog-js";

export default function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Init once on first render
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const host =
      process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com"; // use EU host if your project is in EU

    if (!key) return;
    if (!(posthog as any).__loaded) {
      posthog.init(key, {
        api_host: host,
        capture_pageview: false, // we’ll capture manually on route change
      });
    }
  }, []);

  // Fire a pageview on route changes
  useEffect(() => {
    if ((posthog as any).__loaded) {
      posthog.capture("$pageview");
    }
  }, [pathname, searchParams]);

  return null;
}
