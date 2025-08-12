'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { initPosthog, captureEvent } from '@/lib/posthog';

export default function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const inited = useRef(false);

  // Init once on first client render + initial pageview
  useEffect(() => {
    if (inited.current) return;
    inited.current = true;
    initPosthog();
    const firstPath = window.location.pathname + window.location.search;
    captureEvent('$pageview', { path: firstPath });
  }, []);

  // Track client-side route changes
  useEffect(() => {
    if (!inited.current || !pathname) return;
    const q = searchParams?.toString();
    const path = q ? `${pathname}?${q}` : pathname;
    captureEvent('$pageview', { path, routeChange: true });
  }, [pathname, searchParams]);

  return null;
}
