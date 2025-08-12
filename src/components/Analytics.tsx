'use client';

import { useEffect } from 'react';
import { initPosthog } from '@/lib/posthog';
import posthog from 'posthog-js';

export default function Analytics() {
  useEffect(() => {
    initPosthog();
    posthog.capture('$pageview');               // first page view
    posthog.capture('test_event', { ok: true }); // test event
  }, []);

  return null;
}
