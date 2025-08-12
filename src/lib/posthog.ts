import posthog from 'posthog-js';

type PHProps = Record<string, string | number | boolean | null | undefined>;

let loaded = false;

export function initPosthog() {
  if (typeof window === 'undefined' || loaded) return;
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://us.i.posthog.com';
  if (!key) return; // no-op if not configured
  posthog.init(key, { api_host: host, capture_pageview: false }); // we’ll capture manually
  loaded = true;
}

export function captureEvent(name: string, properties?: PHProps) {
  if (typeof window === 'undefined') return;
  posthog.capture(name, properties);
}

export default posthog;
