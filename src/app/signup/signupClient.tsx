// src/app/signup/page.tsx
import { Suspense } from "react";
import SignupClient from "./signupClient";

export default function SignupPage() {
  return (
    <Suspense fallback={null}>
      <SignupClient />
    </Suspense>
  );
}
