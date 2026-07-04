import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SocialPrompt — Générateur de prompts pour éducateurs spécialisés",
  description:
    "Créez des prompts professionnels pour l'accompagnement en foyer d'hébergement. Supports d'animation, objectifs PPA, fiches de médiation.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="font-sans antialiased" suppressHydrationWarning>{children}</body>
    </html>
  );
}
