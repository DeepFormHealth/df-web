import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import Analytics from "@/components/Analytics";

const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: {
    default: "DeepForm Health — Tailored training plans that adapt to you",
    template: "%s — DeepForm Health",
  },
  description:
    "Personalized AI coaching that adjusts weekly to your goals, equipment, schedule, and recovery.",
  openGraph: {
    type: "website",
    url: appUrl,
    siteName: "DeepForm Health",
    title: "DeepForm Health",
    description: "Tailored training plans that adapt to you.",
  },
  twitter: {
    card: "summary_large_image",
    title: "DeepForm Health",
    description: "Tailored training plans that adapt to you.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-slate-900 antialiased">
        {children}
        {/* Analytics uses useSearchParams/usePathname → must be inside Suspense */}
        <Suspense fallback={null}>
          <Analytics />
        </Suspense>
      </body>
    </html>
  );
}
