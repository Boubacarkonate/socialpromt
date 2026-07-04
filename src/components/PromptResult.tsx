"use client";

import { useState } from "react";
import type { GeneratedPrompt } from "@/types";
import { CONTENT_TYPE_LABELS } from "@/types";

interface PromptResultProps {
  result: GeneratedPrompt;
  onReset: () => void;
}

export function PromptResult({ result, onReset }: PromptResultProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(result.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback pour les navigateurs sans accès clipboard
      const textarea = document.createElement("textarea");
      textarea.value = result.content;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  }

  const label = CONTENT_TYPE_LABELS[result.contentType];
  const generatedAtFormatted = result.generatedAt.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="flex flex-col gap-6">
      {/* En-tête */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Prompt généré — {label}
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            {result.charCount.toLocaleString("fr-FR")} caractères · généré à{" "}
            {generatedAtFormatted}
          </p>
        </div>

        {/* Badge type de contenu */}
        <span className="shrink-0 rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700">
          {label}
        </span>
      </div>

      {/* Zone de texte du prompt */}
      <div className="relative rounded-xl border border-gray-200 bg-gray-50">
        <pre className="max-h-[480px] overflow-y-auto whitespace-pre-wrap break-words p-5 font-mono text-sm leading-relaxed text-gray-800">
          {result.content}
        </pre>
      </div>

      {/* Instructions d'utilisation */}
      <p className="rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800">
        <span className="font-semibold">Comment utiliser ce prompt :</span>{" "}
        copiez-le ci-dessous, puis collez-le directement dans{" "}
        <a
          href="https://claude.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2"
        >
          Claude.ai
        </a>{" "}
        ou{" "}
        <a
          href="https://chatgpt.com"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2"
        >
          ChatGPT
        </a>
        .
      </p>

      {/* Actions */}
      <div className="flex flex-col gap-3 sm:flex-row">
        {/* Bouton copier */}
        <button
          onClick={handleCopy}
          className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
            copied
              ? "bg-green-600 text-white focus-visible:ring-green-600"
              : "bg-indigo-600 text-white hover:bg-indigo-700 focus-visible:ring-indigo-600"
          }`}
        >
          {copied ? (
            <>
              <CheckIcon />
              Prompt copié !
            </>
          ) : (
            <>
              <CopyIcon />
              Copier le prompt
            </>
          )}
        </button>

        {/* Bouton recommencer */}
        <button
          onClick={onReset}
          className="flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2"
        >
          <RefreshIcon />
          Nouveau profil
        </button>
      </div>
    </div>
  );
}

// ─── Icônes inline (pas de dépendance externe) ────────────────────────────────

function CopyIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  );
}
