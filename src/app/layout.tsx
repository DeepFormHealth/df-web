// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

const baseUrl =
  process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: "DeepForm Health — Tailored training plans that adapt to you",
  description:
    "Personalized AI coaching that adjusts weekly to your goals, equipment, schedule, and recovery.",
  metadataBase: new URL(baseUrl),
  openGraph: {
    title: "DeepForm Health",
    description:
      "Tailored training plans that adapt to you.",
    type: "website",
    url: baseUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "DeepForm Health",
    description:
      "Tailored training plans that adapt to you.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}
