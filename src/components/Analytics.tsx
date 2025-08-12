'use client';

import { useEffect } from 'react';
import { initPosthog, captureEvent } from '@/lib/posthog';

export default function Analytics() {
  useEffect(() => {
    initPosthog();
    // one-time pageview on initial load; no Next.js routing hooks used
    const path = window.location.pathname + window.location.search;
    captureEvent('$pageview', { path });
  }, []);

  return null;
}
