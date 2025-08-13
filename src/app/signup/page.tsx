type SearchParams = Record<string, string | string[] | undefined>;

export default async function SignupPage({
  searchParams,
}: {
  searchParams?: Promise<SearchParams>;
}) {
  const sp = searchParams ? await searchParams : undefined;

  const plan = (Array.isArray(sp?.plan) ? sp!.plan[0] : sp?.plan) ?? "starter";
  // render using `plan` (replace the markup below with yours)
  return <main>Signup for {plan}</main>;
}
