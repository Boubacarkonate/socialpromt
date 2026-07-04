import { generatePrompt } from "@/lib/prompts";
import type { ResidentProfile } from "@/types";

const baseProfile: ResidentProfile = {
  prenom: "Alice",
  age: 30,
  typeHandicap: "deficience_intellectuelle_moderee",
  niveauAutonomie: "moyen",
  modeCommunication: "verbal",
  axesPPA: "Autonomie, socialisation",
  typeContenu: "animation",
};

describe("generatePrompt", () => {
  it("retourne un GeneratedPrompt avec content non vide", () => {
    const result = generatePrompt(baseProfile);
    expect(result.content).toBeTruthy();
    expect(result.content.length).toBeGreaterThan(0);
  });

  it("retourne le bon contentType", () => {
    const result = generatePrompt(baseProfile);
    expect(result.contentType).toBe("animation");
  });

  it("calcule charCount = longueur du content", () => {
    const result = generatePrompt(baseProfile);
    expect(result.charCount).toBe(result.content.length);
  });

  it("retourne une Date pour generatedAt", () => {
    const result = generatePrompt(baseProfile);
    expect(result.generatedAt).toBeInstanceOf(Date);
  });

  it("dispatche vers ppa quand typeContenu = ppa", () => {
    const profile = { ...baseProfile, typeContenu: "ppa" as const };
    const result = generatePrompt(profile);
    expect(result.contentType).toBe("ppa");
    expect(result.content).toContain("SMART");
  });

  it("dispatche vers mediation quand typeContenu = mediation", () => {
    const profile = { ...baseProfile, typeContenu: "mediation" as const };
    const result = generatePrompt(profile);
    expect(result.contentType).toBe("mediation");
    expect(result.content).toContain("Analyse préalable");
  });

  it("dispatche vers animation quand typeContenu = animation", () => {
    const profile = { ...baseProfile, typeContenu: "animation" as const };
    const result = generatePrompt(profile);
    expect(result.contentType).toBe("animation");
    expect(result.content).toContain("Points de vigilance");
  });
});
