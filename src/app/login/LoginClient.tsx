'use client';

import { useState } from 'react';
import { supabaseBrowser } from '@/lib/supabase-browser';
import { useRouter, useSearchParams } from 'next/navigation';

export default function LoginClient() {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const router = useRouter();
  const qp = useSearchParams();
  const next = qp.get('next') ?? '/app';

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      if (mode === 'signup') {
        const { error } = await supabaseBrowser.auth.signUp({
          email,
          password: pw,
          options: { emailRedirectTo: window.location.origin + next },
        });
        if (error) throw error;
      } else {
        const { error } = await supabaseBrowser.auth.signInWithPassword({
          email,
          password: pw,
        });
        if (error) throw error;
      }
      router.push(next);
      router.refresh();
    } catch (e: any) {
      setErr(e.message || 'Auth error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <form
        onSubmit={submit}
        className="w-full max-w-sm space-y-4 rounded-2xl border p-6 shadow"
      >
        <h1 className="text-xl font-semibold">
          {mode === 'signin' ? 'Sign in' : 'Create account'}
        </h1>

        <label className="block">
          <span className="text-sm">Email</span>
          <input
            className="mt-1 w-full rounded-lg border px-3 py-2"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </label>

        <label className="block">
          <span className="text-sm">Password</span>
          <input
            className="mt-1 w-full rounded-lg border px-3 py-2"
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            required
            autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
          />
        </label>

        {err && <p className="text-sm text-red-600">{err}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-slate-900 px-4 py-2 text-white hover:opacity-90 disabled:opacity-60"
        >
          {loading ? 'Please wait…' : mode === 'signin' ? 'Sign in' : 'Sign up'}
        </button>

        <button
          type="button"
          onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
          className="w-full text-sm underline"
        >
          {mode === 'signin'
            ? 'Need an account? Sign up'
            : 'Already have an account? Sign in'}
        </button>
      </form>
    </main>
  );
}
