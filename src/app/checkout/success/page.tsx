"use client";

import { useEffect, useState } from "react";

export default function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: { [k: string]: string | string[] | undefined };
}) {
  const [state, setState] = useState<"activating" | "ok" | "error">("activating");
  const [msg, setMsg] = useState<string>("");

  useEffect(() => {
    const id = (Array.isArray(searchParams.session_id)
      ? searchParams.session_id[0]
      : searchParams.session_id) as string | undefined;

    if (!id) {
      setState("error");
      setMsg("Missing session id.");
      return;
    }

    (async () => {
      try {
        const res = await fetch("/api/checkout/activate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ session_id: id }),
        });
        if (!res.ok) throw new Error("activate_failed");
        setState("ok");
      } catch (e: any) {
        setState("error");
        setMsg(e?.message ?? "Unknown error");
      }
    })();
  }, [searchParams]);

  return (
    <main className="px-6 py-16">
      <h1 className="text-2xl font-bold">Checkout Success</h1>
      {state === "activating" && <p className="mt-2">Activating your account…</p>}
      {state === "ok" && (
        <>
          <p className="mt-2">You’re all set. 🎉</p>
          <a href="/app" className="mt-6 inline-block rounded-lg border px-4 py-2">
            Go to the app
          </a>
        </>
      )}
      {state === "error" && (
        <>
          <p className="mt-2 text-red-600">We couldn’t confirm your purchase.</p>
          <p className="text-sm text-slate-600">Details: {msg}</p>
          <a href="/pricing" className="mt-6 inline-block rounded-lg border px-4 py-2">
            Back to pricing
          </a>
        </>
      )}
    </main>
  );
}
