import { generateMediationPrompt } from "@/lib/prompts/mediation";
import type { ResidentProfile } from "@/types";

const baseProfile: ResidentProfile = {
  prenom: "Karim",
  age: 28,
  typeHandicap: "polyhandicap_leger",
  niveauAutonomie: "eleve",
  modeCommunication: "non_verbal",
  axesPPA: "Expression des besoins, autonomie dans les déplacements",
  typeContenu: "mediation",
};

describe("generateMediationPrompt", () => {
  it("contient le prénom du résident", () => {
    const result = generateMediationPrompt(baseProfile);
    expect(result).toContain("Karim");
  });

  it("contient le label du type de handicap", () => {
    const result = generateMediationPrompt(baseProfile);
    expect(result).toContain("Polyhandicap léger");
  });

  it("contient le mode de communication non verbal", () => {
    const result = generateMediationPrompt(baseProfile);
    expect(result).toContain("Non verbal");
  });

  it("contient les 6 sections structurelles", () => {
    const result = generateMediationPrompt(baseProfile);
    expect(result).toContain("Analyse préalable");
    expect(result).toContain("Objectifs de la médiation");
    expect(result).toContain("Posture éducative recommandée");
    expect(result).toContain("Déroulement de la séquence");
    expect(result).toContain("Supports et outils adaptés");
    expect(result).toContain("Trace écrite et suivi");
  });

  it("utilise le contexte comme sujet de médiation quand fourni", () => {
    const profile = { ...baseProfile, contexte: "Aborder la sexualité" };
    const result = generateMediationPrompt(profile);
    expect(result).toContain("Aborder la sexualité");
    expect(result).not.toContain("non précisé");
  });

  it("indique sujet non précisé quand contexte est absent", () => {
    const result = generateMediationPrompt(baseProfile);
    expect(result).toContain("non précisé");
  });
});
