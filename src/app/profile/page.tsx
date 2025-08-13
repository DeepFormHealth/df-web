'use client';

import { useEffect, useRef, useState } from 'react';
import { captureEvent } from '@/lib/posthog';

export default function ProfileIntakePage() {
  const [goals, setGoals] = useState<string[]>([]);
  const [injuriesCount, setInjuriesCount] = useState(0);
  const startedAt = useRef<number | null>(null);

  useEffect(() => {
    if (startedAt.current == null) startedAt.current = Date.now();
  }, []);

  function toggleGoal(g: string) {
    setGoals(prev => prev.includes(g) ? prev.filter(x => x !== g) : [...prev, g]);
  }

function onSubmit(e: React.FormEvent) {
  e.preventDefault();
  const time_seconds = startedAt.current
    ? Math.round((Date.now() - startedAt.current) / 1000)
    : 0;

  captureEvent('profile_completed', { 
    time_seconds, 
    goals: goals.join(','), 
    injuries_count: injuriesCount 
  });

  const plan = 'starter'; // or carry through via searchParams/state if you prefer
  window.location.href = `/checkout?plan=${plan}`;
}


  return (
    <main className="font-sans p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Profile / Intake</h1>
      <p className="mb-4">Fill this out to generate your plan.</p>

      <form className="grid gap-3 max-w-md" onSubmit={onSubmit}>
        <fieldset className="border p-3">
          <legend>Goals</legend>
          {['hypertrophy','fat_loss','power'].map(g => (
            <label key={g} className="mr-3">
              <input type="checkbox" checked={goals.includes(g)} onChange={() => toggleGoal(g)} /> {g}
            </label>
          ))}
        </fieldset>

        <label className="grid gap-1">
          <span>Injuries count</span>
          <input
            className="border p-2 w-32"
            type="number"
            min={0}
            value={injuriesCount}
            onChange={e => setInjuriesCount(parseInt(e.target.value || '0', 10))}
          />
        </label>

        <button className="border px-4 py-2" type="submit">Continue</button>
      </form>
    </main>
  );
}
