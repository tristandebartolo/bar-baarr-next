// components/auth/AuthForm.tsx
"use client";

import { useActionState } from "react";
import { authenticate } from "@/lib/action";
import { useSearchParams } from "next/navigation";

export default function AuthForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/fr";

  // useActionState retourne exactement le bon type pour <form action>
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  return (
    <form action={formAction} className="w-full max-w-md space-y-6">
      {/* Champ honeypot caché */}
      <input name="nom" type="text" tabIndex={-1} autoComplete="off" className="hidden" />

      <div className="rounded-lg bg-white px-6 pt-8 pb-4 shadow-lg">
        <h1 className="font-cinderela text-one mb-6 text-7xl">Club</h1>

        <div className="space-y-6">
          <div className="relative">
            <span className="i-gntl--person absolute top-4 left-3 text-2xl" />
            <input
              name="username"
              type="text"
              placeholder="Nom utilisateur"
              required
              autoComplete="username"
              className="w-full border-b-4 border-one py-3 pl-12 outline-none"
            />
          </div>

          <div className="relative">
            <span className="i-gntl--vpn_key absolute top-4 left-3 text-2xl" />
            <input
              name="password"
              type="password"
              placeholder="Mot de passe"
              required
              minLength={6}
              autoComplete="current-password"
              className="w-full border-b-4 border-one py-3 pl-12 outline-none"
            />
          </div>
        </div>

        <input type="hidden" name="redirectTo" value={callbackUrl} />

        <button
          type="submit"
          disabled={isPending}
          className="mt-8 w-full rounded bg-one px-6 py-4 text-white font-medium transition hover:bg-one/90 disabled:opacity-50"
        >
          {isPending ? "Connexion…" : "Se connecter"}
        </button>

        {errorMessage && (
          <p className="mt-4 text-center text-sm text-red-600">{errorMessage}</p>
        )}
      </div>
    </form>
  );
}