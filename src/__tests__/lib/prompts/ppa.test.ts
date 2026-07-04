import { generatePPAPrompt } from "@/lib/prompts/ppa";
import type { ResidentProfile } from "@/types";

const baseProfile: ResidentProfile = {
  prenom: "Marie",
  age: 42,
  typeHandicap: "handicap_psychique",
  niveauAutonomie: "faible",
  modeCommunication: "caa",
  axesPPA: "Gestion des émotions, participation aux activités collectives",
  typeContenu: "ppa",
};

describe("generatePPAPrompt", () => {
  it("contient le prénom dans la formulation des objectifs", () => {
    const result = generatePPAPrompt(baseProfile);
    expect(result).toContain("Marie");
  });

  it("contient le label du type de handicap", () => {
    const result = generatePPAPrompt(baseProfile);
    expect(result).toContain("Handicap psychique");
  });

  it("contient le label CAA pour la communication", () => {
    const result = generatePPAPrompt(baseProfile);
    expect(result).toContain("Communication Augmentée et Alternative");
  });

  it("contient les axes PPA saisis", () => {
    const result = generatePPAPrompt(baseProfile);
    expect(result).toContain("Gestion des émotions");
  });

  it("contient le cadre SMART", () => {
    const result = generatePPAPrompt(baseProfile);
    expect(result).toContain("SMART");
  });

  it("contient le gabarit d'objectif avec les 4 champs attendus", () => {
    const result = generatePPAPrompt(baseProfile);
    expect(result).toContain("Formulation");
    expect(result).toContain("Indicateur d'évaluation");
    expect(result).toContain("Moyens");
    expect(result).toContain("Échéance");
  });

  it("intègre le contexte quand il est fourni", () => {
    const profile = { ...baseProfile, contexte: "Suivi psychiatrique en cours" };
    const result = generatePPAPrompt(profile);
    expect(result).toContain("Suivi psychiatrique en cours");
  });

  it("affiche le message par défaut quand contexte est absent", () => {
    const result = generatePPAPrompt(baseProfile);
    expect(result).toContain("Pas d'élément contextuel particulier");
  });
});
