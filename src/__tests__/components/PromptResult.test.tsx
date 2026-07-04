import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import { PromptResult } from "@/components/PromptResult";
import type { GeneratedPrompt } from "@/types";

const mockResult: GeneratedPrompt = {
  content: "Tu es un éducateur spécialisé expert en animation...",
  contentType: "animation",
  generatedAt: new Date("2026-07-04T10:00:00"),
  charCount: 52,
};

const mockOnReset = jest.fn();

// Mock navigator.clipboard
Object.assign(navigator, {
  clipboard: { writeText: jest.fn().mockResolvedValue(undefined) },
});

describe("PromptResult", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("affiche le contenu du prompt", () => {
    render(<PromptResult result={mockResult} onReset={mockOnReset} />);
    expect(screen.getByText(/Tu es un éducateur spécialisé/)).toBeInTheDocument();
  });

  it("affiche le label du type de contenu", () => {
    render(<PromptResult result={mockResult} onReset={mockOnReset} />);
    expect(screen.getAllByText(/Support d'animation/i).length).toBeGreaterThan(0);
  });

  it("affiche le nombre de caractères", () => {
    render(<PromptResult result={mockResult} onReset={mockOnReset} />);
    expect(screen.getByText(/52/)).toBeInTheDocument();
  });

  it("affiche le bouton Copier", () => {
    render(<PromptResult result={mockResult} onReset={mockOnReset} />);
    expect(screen.getByRole("button", { name: /copier le prompt/i })).toBeInTheDocument();
  });

  it("affiche le bouton Nouveau profil", () => {
    render(<PromptResult result={mockResult} onReset={mockOnReset} />);
    expect(screen.getByRole("button", { name: /nouveau profil/i })).toBeInTheDocument();
  });

  it("copie le prompt dans le presse-papier au clic", async () => {
    render(<PromptResult result={mockResult} onReset={mockOnReset} />);
    const btn = screen.getByRole("button", { name: /copier le prompt/i });
    await act(async () => { fireEvent.click(btn); });
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(mockResult.content);
  });

  it("affiche 'Prompt copié !' après la copie", async () => {
    render(<PromptResult result={mockResult} onReset={mockOnReset} />);
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /copier le prompt/i }));
    });
    expect(screen.getByRole("button", { name: /prompt copié/i })).toBeInTheDocument();
  });

  it("appelle onReset au clic sur Nouveau profil", () => {
    render(<PromptResult result={mockResult} onReset={mockOnReset} />);
    fireEvent.click(screen.getByRole("button", { name: /nouveau profil/i }));
    expect(mockOnReset).toHaveBeenCalledTimes(1);
  });
});
