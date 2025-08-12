'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { initPosthog, captureEvent } from '@/lib/posthog';

export default function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Init once on mount
  useEffect(() => {
    initPosthog();
    captureEvent('$pageview', { path: window.location.pathname });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Capture client-side route changes
  useEffect(() => {
    if (!pathname) return;
    const path = pathname + (searchParams?.toString() ? `?${searchParams}` : '');
    captureEvent('$pageview', { path });
  }, [pathname, searchParams]);

  return null;
}
