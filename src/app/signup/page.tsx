'use client';

import { useRef } from 'react';
import { captureEvent } from '@/lib/posthog';

export default function SignupPage({ searchParams }: { searchParams: { plan?: string } }) {
  const plan = searchParams?.plan ?? 'starter';
  const began = useRef(false);

  function onFirstInteract() {
    if (!began.current) {
      began.current = true;
      captureEvent('signup_started', {
        entry_path: typeof window !== 'undefined' ? window.location.pathname : '/signup',
        device: typeof window !== 'undefined' && window.innerWidth < 768 ? 'mobile' : 'desktop',
        plan,
      });
    }
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    captureEvent('signup_completed', { method: 'email', plan });
    window.location.href = '/profile';
  }

  return (
    <main className="font-sans p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Sign up</h1>
      <form className="grid gap-3 max-w-md" onSubmit={onSubmit} onPointerDown={onFirstInteract}>
        <input className="border p-2" type="email" placeholder="you@example.com" required />
        <input className="border p-2" type="text" placeholder="Your name" />
        <div className="text-sm">Selected plan: <strong>{plan}</strong></div>
        <button className="border px-4 py-2" type="submit">Create account</button>
      </form>
    </main>
  );
}
