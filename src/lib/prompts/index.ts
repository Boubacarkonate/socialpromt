import type { ResidentProfile, GeneratedPrompt } from "@/types";
import { generateAnimationPrompt } from "./animation";
import { generatePPAPrompt } from "./ppa";
import { generateMediationPrompt } from "./mediation";

export function generatePrompt(profile: ResidentProfile): GeneratedPrompt {
  const generators = {
    animation: generateAnimationPrompt,
    ppa: generatePPAPrompt,
    mediation: generateMediationPrompt,
  };

  const content = generators[profile.typeContenu](profile);

  return {
    content,
    contentType: profile.typeContenu,
    generatedAt: new Date(),
    charCount: content.length,
  };
}
