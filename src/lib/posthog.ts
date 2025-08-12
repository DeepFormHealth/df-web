import posthog from 'posthog-js';

export function initPosthog() {
  if (typeof window === 'undefined') return; // don't run on server
  if ((posthog as any).__loaded) return; // avoid double init during HMR

  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY || '', {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    capture_pageview: true,
    capture_pageleave: true,
  });
}

export default posthog;
