import type { Metadata } from "next";
import { ResetPasswordForm } from "@/components/reset-password/reset-password-form";

export const metadata: Metadata = {
  title: "Reset your password — SubnGo",
  description: "Set a new password for your SubnGo account.",
};

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function ResetPasswordPage({
  searchParams,
}: PageProps<"/reset-password">) {
  const params = await searchParams;

  return (
    <main className="flex flex-1 items-center justify-center bg-surface px-6 py-24 sm:px-10">
      <ResetPasswordForm
        token={firstParam(params.token)}
        email={firstParam(params.email)}
      />
    </main>
  );
}
