import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ResidentForm } from "@/components/ResidentForm";

const mockOnSubmit = jest.fn();

describe("ResidentForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("affiche tous les champs du formulaire", () => {
    render(<ResidentForm onSubmit={mockOnSubmit} />);
    expect(screen.getByLabelText(/prénom fictif/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/âge/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/type de handicap/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/niveau d'autonomie/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mode de communication/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/axes du ppa/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contexte/i)).toBeInTheDocument();
  });

  it("affiche le bouton de soumission", () => {
    render(<ResidentForm onSubmit={mockOnSubmit} />);
    expect(screen.getByRole("button", { name: /générer le prompt/i })).toBeInTheDocument();
  });

  it("affiche les 3 options de type de contenu", () => {
    render(<ResidentForm onSubmit={mockOnSubmit} />);
    expect(screen.getByText(/Support d'animation/i)).toBeInTheDocument();
    expect(screen.getByText(/Objectifs PPA/i)).toBeInTheDocument();
    expect(screen.getByText(/Fiche de médiation/i)).toBeInTheDocument();
  });

  it("sélectionne 'animation' par défaut", () => {
    render(<ResidentForm onSubmit={mockOnSubmit} />);
    const radioAnimation = screen.getByRole("radio", { name: /support d'animation/i });
    expect(radioAnimation).toBeChecked();
  });

  it("affiche les erreurs si soumis avec des champs vides", async () => {
    render(<ResidentForm onSubmit={mockOnSubmit} />);
    fireEvent.click(screen.getByRole("button", { name: /générer le prompt/i }));
    await waitFor(() => {
      expect(screen.getByText(/le prénom est requis/i)).toBeInTheDocument();
    });
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it("affiche une erreur si l'âge est hors limites", async () => {
    render(<ResidentForm onSubmit={mockOnSubmit} />);
    await userEvent.type(screen.getByLabelText(/prénom fictif/i), "Thomas");
    await userEvent.type(screen.getByLabelText(/âge/i), "15");
    fireEvent.click(screen.getByRole("button", { name: /générer le prompt/i }));
    await waitFor(() => {
      expect(screen.getByText(/18 et 99/i)).toBeInTheDocument();
    });
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it("affiche le bouton désactivé quand isLoading est vrai", () => {
    render(<ResidentForm onSubmit={mockOnSubmit} isLoading={true} />);
    const btn = screen.getByRole("button", { name: /génération en cours/i });
    expect(btn).toBeDisabled();
  });
});
