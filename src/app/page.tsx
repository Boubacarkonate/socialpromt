"use client";

import { useState } from "react";
import type { ResidentProfile, GeneratedPrompt } from "@/types";
import { generatePrompt } from "@/lib/prompts";
import { ResidentForm } from "@/components/ResidentForm";
import { PromptResult } from "@/components/PromptResult";
import { WarningBanner } from "@/components/WarningBanner";

type AppState =
  | { step: "form" }
  | { step: "result"; result: GeneratedPrompt };

export default function Home() {
  const [state, setState] = useState<AppState>({ step: "form" });

  function handleSubmit(profile: ResidentProfile) {
    const result = generatePrompt(profile);
    setState({ step: "result", result });
  }

  function handleReset() {
    setState({ step: "form" });
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <WarningBanner />
      {/* ── En-tête ── */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-2xl px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-bold leading-none text-gray-900">
                SocialPrompt
              </h1>
              <p className="mt-0.5 text-xs text-gray-500">
                Générateur de prompts pour éducateurs spécialisés
              </p>
            </div>
          </div>

          {state.step === "form" && (
            <p className="mt-4 text-sm text-gray-600">
              Renseignez le profil du résident, choisissez le type de contenu
              souhaité, puis copiez le prompt généré dans{" "}
              <span className="font-medium text-gray-800">Claude.ai</span> ou{" "}
              <span className="font-medium text-gray-800">ChatGPT</span>.
              Aucune donnée n'est envoyée — tout reste dans votre navigateur.
            </p>
          )}
        </div>
      </header>

      {/* ── Contenu principal ── */}
      <main className="mx-auto max-w-2xl px-4 py-8">
        {/* Indicateur d'étape */}
        <div className="mb-6 flex items-center gap-2">
          <Step active={state.step === "form"} done={state.step === "result"} number={1}>
            Profil résident
          </Step>
          <div className="h-px flex-1 bg-gray-200" />
          <Step active={state.step === "result"} done={false} number={2}>
            Prompt généré
          </Step>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          {state.step === "form" ? (
            <ResidentForm onSubmit={handleSubmit} />
          ) : (
            <PromptResult result={state.result} onReset={handleReset} />
          )}
        </div>
      </main>

      {/* ── Pied de page ── */}
      <footer className="mt-8 pb-8 text-center text-xs text-gray-400">
        SocialPrompt — aucun appel API, aucune donnée transmise.
        <br />
        Conçu pour les professionnels du secteur médico-social français.
      </footer>
    </div>
  );
}

// ─── Composant d'indicateur d'étape ──────────────────────────────────────────

function Step({
  number,
  active,
  done,
  children,
}: {
  number: number;
  active: boolean;
  done: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold transition-colors ${
          done
            ? "bg-green-100 text-green-700"
            : active
            ? "bg-indigo-600 text-white"
            : "bg-gray-100 text-gray-400"
        }`}
      >
        {done ? "✓" : number}
      </span>
      <span
        className={`text-sm font-medium transition-colors ${
          active ? "text-gray-900" : done ? "text-green-700" : "text-gray-400"
        }`}
      >
        {children}
      </span>
    </div>
  );
}
