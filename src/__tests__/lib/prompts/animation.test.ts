import { generateAnimationPrompt } from "@/lib/prompts/animation";
import type { ResidentProfile } from "@/types";

const baseProfile: ResidentProfile = {
  prenom: "Thomas",
  age: 34,
  typeHandicap: "deficience_intellectuelle_legere",
  niveauAutonomie: "moyen",
  modeCommunication: "verbal",
  axesPPA: "Développer l'autonomie dans les repas, renforcer les liens sociaux",
  typeContenu: "animation",
};

describe("generateAnimationPrompt", () => {
  it("contient le prénom du résident", () => {
    const result = generateAnimationPrompt(baseProfile);
    expect(result).toContain("Thomas");
  });

  it("contient l'âge du résident", () => {
    const result = generateAnimationPrompt(baseProfile);
    expect(result).toContain("34 ans");
  });

  it("contient le label du type de handicap", () => {
    const result = generateAnimationPrompt(baseProfile);
    expect(result).toContain("Déficience intellectuelle légère");
  });

  it("contient les axes PPA saisis", () => {
    const result = generateAnimationPrompt(baseProfile);
    expect(result).toContain("Développer l'autonomie dans les repas");
  });

  it("contient les 8 sections structurelles", () => {
    const result = generateAnimationPrompt(baseProfile);
    expect(result).toContain("Titre de l'activité");
    expect(result).toContain("Objectifs éducatifs");
    expect(result).toContain("Durée et cadre");
    expect(result).toContain("Matériel nécessaire");
    expect(result).toContain("Déroulement étape par étape");
    expect(result).toContain("Adaptations spécifiques");
    expect(result).toContain("Points de vigilance");
    expect(result).toContain("Indicateurs d'évaluation");
  });

  it("affiche 'Aucune contrainte' quand contexte est absent", () => {
    const result = generateAnimationPrompt(baseProfile);
    expect(result).toContain("Aucune contrainte particulière signalée");
  });

  it("intègre le contexte quand il est fourni", () => {
    const profile = { ...baseProfile, contexte: "Résident sensible au bruit" };
    const result = generateAnimationPrompt(profile);
    expect(result).toContain("Résident sensible au bruit");
    expect(result).not.toContain("Aucune contrainte");
  });

  it("retourne une chaîne non vide", () => {
    const result = generateAnimationPrompt(baseProfile);
    expect(result.length).toBeGreaterThan(100);
  });
});
