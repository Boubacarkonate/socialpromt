"use client";

import { useEffect, useState } from "react";

export function WarningBanner() {
  const [modalOpen, setModalOpen] = useState(false);

  // Ferme la modale avec Échap
  useEffect(() => {
    if (!modalOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setModalOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [modalOpen]);

  // Bloque le scroll du body quand la modale est ouverte
  useEffect(() => {
    document.body.style.overflow = modalOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [modalOpen]);

  return (
    <>
      {/* ── Bandeau ── */}
      <div
        role="alert"
        className="flex items-center justify-center gap-2 bg-amber-50 border-b border-amber-200 px-4 py-2 text-center text-xs text-amber-800"
      >
        <span aria-hidden="true">⚠️</span>
        <span>
          Prototype démonstratif — Ne pas saisir de données réelles — Contenu généré à valider par un professionnel.
        </span>
        <button
          onClick={() => setModalOpen(true)}
          className="shrink-0 underline underline-offset-2 font-medium hover:text-amber-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-1 rounded"
        >
          En savoir plus
        </button>
      </div>

      {/* ── Modale ── */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="warning-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setModalOpen(false)}
            aria-hidden="true"
          />

          {/* Contenu */}
          <div className="relative z-10 w-full max-w-lg rounded-2xl bg-white shadow-xl">
            {/* En-tête modale */}
            <div className="flex items-start justify-between gap-4 border-b border-gray-100 px-6 py-5">
              <div className="flex items-center gap-2">
                <span className="text-xl" aria-hidden="true">⚠️</span>
                <h2
                  id="warning-modal-title"
                  className="text-base font-semibold text-gray-900"
                >
                  Avertissements importants
                </h2>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                aria-label="Fermer"
                className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M18 6 6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>

            {/* Corps */}
            <div className="flex flex-col gap-5 overflow-y-auto max-h-[60vh] px-6 py-5 text-sm text-gray-700">

              <p className="text-gray-600 leading-relaxed">
                SocialPrompt est un prototype développé à des fins de démonstration.
              </p>

              <Section emoji="🔒" title="Données personnelles">
                Ne saisissez pas d'informations réelles concernant des résidents.
                Utilisez uniquement des données fictives. Cet outil n'est pas
                conforme RGPD pour un usage professionnel en l'état.
              </Section>

              <Section emoji="🤖" title="Contenu généré par IA">
                Les prompts générés sont des suggestions. Tout document produit
                via une IA doit être relu, corrigé et validé par un éducateur
                ou cadre professionnel avant toute utilisation institutionnelle.
              </Section>

              <Section emoji="🏥" title="Mise en production — recommandations">
                <span>
                  Si votre structure souhaite utiliser cet outil en conditions
                  réelles, il est fortement recommandé de :
                </span>
                <ol className="mt-2 flex flex-col gap-1 list-decimal list-inside text-gray-600">
                  <li>Déployer votre propre instance de l'application</li>
                  <li>
                    L'associer à une IA auto-hébergée (ex&nbsp;: Ollama, Mistral
                    en local) afin de garantir qu'aucune donnée résident
                    ne transite vers des serveurs externes
                  </li>
                  <li>Faire auditer l'outil par votre DPO ou référent RGPD</li>
                  <li>Valider les prompts avec un cadre éducatif de la structure</li>
                </ol>
                <p className="mt-2 text-gray-500 italic">
                  Une IA auto-hébergée garantit que les données restent
                  dans votre infrastructure et ne sont jamais transmises à des tiers.
                </p>
              </Section>

              <Section emoji="🚧" title="Statut du projet">
                Ce projet est un MVP de portfolio. Il n'est pas destiné à un
                usage en production sans accompagnement technique préalable.
              </Section>

              <p className="text-xs text-gray-400 pt-1 border-t border-gray-100">
                Développé par Boubacar Konaté — éducateur spécialisé reconverti développeur web.
              </p>
            </div>

            {/* Pied */}
            <div className="border-t border-gray-100 px-6 py-4">
              <button
                onClick={() => setModalOpen(false)}
                className="w-full rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 transition-colors"
              >
                J'ai compris
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Section({
  emoji,
  title,
  children,
}: {
  emoji: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <p className="flex items-center gap-1.5 font-semibold text-gray-900">
        <span aria-hidden="true">{emoji}</span>
        {title}
      </p>
      <p className="text-gray-600 leading-relaxed">{children}</p>
    </div>
  );
}
