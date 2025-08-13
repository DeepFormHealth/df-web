// src/app/page.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="bg-gradient-to-b from-white to-slate-50">
      {/* HERO */}
      <section className="px-6 pt-16 pb-12 lg:pt-24">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
              Tailored training plans that adapt to you
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Personalized AI coaching that adjusts weekly to your goals,
              equipment, schedule, and recovery.
            </p>

            <div className="mt-8 flex items-center gap-3">
              <Link
                href="/signup?plan=starter"
                className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-white font-medium hover:opacity-90"
              >
                Start free
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-5 py-3 font-medium text-slate-900 hover:bg-white"
              >
                View pricing
              </Link>
            </div>

            {/* Bullets */}
            <ul className="mt-8 grid gap-2 text-slate-700">
              <li className="flex items-start gap-2">
                <Check /> Adaptive plans for your goals
              </li>
              <li className="flex items-start gap-2">
                <Check /> Form cues and exercise demos
              </li>
              <li className="flex items-start gap-2">
                <Check /> Progress tracking & recovery guidance
              </li>
            </ul>
          </div>

          {/* Visual placeholder (swap with dashboard screenshot later) */}
          <div className="relative">
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-4">
              <div className="h-64 sm:h-80 rounded-xl bg-[linear-gradient(120deg,#e2e8f0,40%,#cbd5e1)]" />
              <p className="mt-3 text-sm text-slate-500">
                (Add a dashboard or workout preview image here)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="px-6 py-6">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs uppercase tracking-wider text-slate-500">
            Trusted by busy professionals
          </p>
          <div className="mt-3 h-10 bg-slate-100/60 rounded-lg" />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-bold text-slate-900">How it works</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            <Step n={1} title="Tell us your goals">
              Equipment, schedule, injuries, preferred training style.
            </Step>
            <Step n={2} title="Get a weekly plan">
              Auto-adjusted based on performance, soreness, and recovery.
            </Step>
            <Step n={3} title="Track & improve">
              See progress, get form cues, and level up your plan.
            </Step>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-bold text-slate-900">What you get</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card title="Adaptive programming">
              Your exercises, sets, and reps evolve with your results.
            </Card>
            <Card title="Form guidance">
              Short cues and demo videos for every movement.
            </Card>
            <Card title="Recovery-aware">
              Auto-deloads and volume tweaks to prevent stalls.
            </Card>
            <Card title="Goal-based templates">
              Hypertrophy, strength, recomposition, or fat loss.
            </Card>
            <Card title="Equipment aware">
              Home, apartment gym, full gym, or mixed setups.
            </Card>
            <Card title="Progress tracking">
              PRs, volume, and trends—without spreadsheet chaos.
            </Card>
          </div>

          <div className="mt-10">
            <Link
              href="/signup?plan=starter"
              className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-white font-medium hover:opacity-90"
            >
              Start free
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8 text-sm text-slate-600">
          <div className="flex flex-wrap gap-4 justify-between">
            <p>© {new Date().getFullYear()} DeepForm Health</p>
            <nav className="flex gap-4">
              <Link href="/pricing" className="hover:underline">
                Pricing
              </Link>
              <Link href="/signup" className="hover:underline">
                Sign up
              </Link>
              <Link href="/contact" className="hover:underline">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </main>
  );
}

/* --- Small inline components --- */

function Check() {
  return (
    <svg
      className="mt-1 h-5 w-5 text-slate-900" // fixed: use explicit h/w instead of size-*
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M20 6 9 17l-5-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Step({
  n,
  title,
  children,
}: {
  n: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-white font-semibold">
          {n}
        </span>
        <h3 className="text-base font-semibold text-slate-900">{title}</h3>
      </div>
      <p className="mt-3 text-slate-600 text-sm">{children}</p>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-base font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-slate-600 text-sm">{children}</p>
    </div>
  );
}
