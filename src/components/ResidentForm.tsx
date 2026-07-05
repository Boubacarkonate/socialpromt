"use client";

import { useState } from "react";
import type { ResidentProfile, ContentType, TypeHandicap, NiveauAutonomie, ModeCommunication } from "@/types";
import {
  TYPE_HANDICAP_LABELS,
  NIVEAU_AUTONOMIE_LABELS,
  MODE_COMMUNICATION_LABELS,
  CONTENT_TYPE_LABELS,
  CONTENT_TYPE_DESCRIPTIONS,
} from "@/types";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface ResidentFormProps {
  onSubmit: (profile: ResidentProfile) => void;
  isLoading?: boolean;
}

type FormState = {
  prenom: string;
  age: number | "";
  typeHandicap: TypeHandicap | "";
  niveauAutonomie: NiveauAutonomie | "";
  modeCommunication: ModeCommunication | "";
  axesPPA: string;
  typeContenu: ContentType;
  contexte: string;
};

const INITIAL_STATE: FormState = {
  prenom: "",
  age: "",
  typeHandicap: "",
  niveauAutonomie: "",
  modeCommunication: "",
  axesPPA: "",
  typeContenu: "animation",
  contexte: "",
};
type FieldErrors = Partial<Record<keyof ResidentProfile, string>>;

export function ResidentForm({ onSubmit, isLoading = false }: ResidentFormProps) {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<FieldErrors>({});

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key as keyof ResidentProfile]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  }

  function validate(): FieldErrors {
    const errs: FieldErrors = {};
    if (!form.prenom.trim()) errs.prenom = "Le prénom est requis.";
    const ageNum = Number(form.age);
    if (!form.age || isNaN(ageNum) || ageNum < 18 || ageNum > 99)
      errs.age = "L'âge doit être compris entre 18 et 99 ans.";
    if (!form.typeHandicap) errs.typeHandicap = "Veuillez sélectionner un type de handicap.";
    if (!form.niveauAutonomie) errs.niveauAutonomie = "Veuillez sélectionner un niveau d'autonomie.";
    if (!form.modeCommunication) errs.modeCommunication = "Veuillez sélectionner un mode de communication.";
    if (!form.axesPPA.trim()) errs.axesPPA = "Les axes du PPA sont requis.";
    return errs;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    onSubmit({
      prenom: form.prenom.trim(),
      age: Number(form.age),
      typeHandicap: form.typeHandicap as TypeHandicap,
      niveauAutonomie: form.niveauAutonomie as NiveauAutonomie,
      modeCommunication: form.modeCommunication as ModeCommunication,
      axesPPA: form.axesPPA.trim(),
      typeContenu: form.typeContenu,
      contexte: form.contexte.trim() || undefined,
    });
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-8">

      {/* ── Section 1 : Identité ── */}
      <fieldset className="flex flex-col gap-5">
        <legend className="text-base font-semibold text-gray-900">
          Identité du résident
        </legend>
        <p className="text-sm text-gray-500 -mt-3">
          Utilisez un prénom fictif — ne saisissez pas de données nominatives réelles.
        </p>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {/* Prénom */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="prenom">Prénom fictif</Label>
            <Input
              id="prenom"
              placeholder="ex. Thomas"
              value={form.prenom}
              onChange={(e) => set("prenom", e.target.value)}
              aria-describedby={errors.prenom ? "prenom-error" : undefined}
              aria-invalid={!!errors.prenom}
            />
            {errors.prenom && (
              <p id="prenom-error" className="text-xs text-red-600">{errors.prenom}</p>
            )}
          </div>

          {/* Âge */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="age">Âge</Label>
            <Input
              id="age"
              type="number"
              min={18}
              max={99}
              placeholder="ex. 34"
              value={form.age}
              onChange={(e) => set("age", e.target.value === "" ? "" : Number(e.target.value))}
              aria-describedby={errors.age ? "age-error" : undefined}
              aria-invalid={!!errors.age}
            />
            {errors.age && (
              <p id="age-error" className="text-xs text-red-600">{errors.age}</p>
            )}
          </div>
        </div>
      </fieldset>

      {/* ── Section 2 : Profil clinique ── */}
      <fieldset className="flex flex-col gap-5">
        <legend className="text-base font-semibold text-gray-900">
          Profil clinique et fonctionnel
        </legend>

        {/* Type de handicap */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="typeHandicap">Type de handicap</Label>
          <Select
            value={form.typeHandicap}
            onValueChange={(v) => set("typeHandicap", v as TypeHandicap)}
          >
            <SelectTrigger
              id="typeHandicap"
              aria-describedby={errors.typeHandicap ? "handicap-error" : undefined}
              aria-invalid={!!errors.typeHandicap}
            >
              <SelectValue placeholder="Sélectionner…" />
            </SelectTrigger>
            <SelectContent>
              {(Object.entries(TYPE_HANDICAP_LABELS) as [TypeHandicap, string][]).map(
                ([value, label]) => (
                  <SelectItem key={value} value={value}>{label}</SelectItem>
                )
              )}
            </SelectContent>
          </Select>
          {errors.typeHandicap && (
            <p id="handicap-error" className="text-xs text-red-600">{errors.typeHandicap}</p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {/* Niveau d'autonomie */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="niveauAutonomie">Niveau d'autonomie</Label>
            <Select
              value={form.niveauAutonomie}
              onValueChange={(v) => set("niveauAutonomie", v as NiveauAutonomie)}
            >
              <SelectTrigger
                id="niveauAutonomie"
                aria-describedby={errors.niveauAutonomie ? "autonomie-error" : undefined}
                aria-invalid={!!errors.niveauAutonomie}
              >
                <SelectValue placeholder="Sélectionner…" />
              </SelectTrigger>
              <SelectContent>
                {(Object.entries(NIVEAU_AUTONOMIE_LABELS) as [NiveauAutonomie, string][]).map(
                  ([value, label]) => (
                    <SelectItem key={value} value={value}>{label}</SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
            {errors.niveauAutonomie && (
              <p id="autonomie-error" className="text-xs text-red-600">{errors.niveauAutonomie}</p>
            )}
          </div>

          {/* Mode de communication */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="modeCommunication">Mode de communication</Label>
            <Select
              value={form.modeCommunication}
              onValueChange={(v) => set("modeCommunication", v as ModeCommunication)}
            >
              <SelectTrigger
                id="modeCommunication"
                aria-describedby={errors.modeCommunication ? "communication-error" : undefined}
                aria-invalid={!!errors.modeCommunication}
              >
                <SelectValue placeholder="Sélectionner…" />
              </SelectTrigger>
              <SelectContent>
                {(Object.entries(MODE_COMMUNICATION_LABELS) as [ModeCommunication, string][]).map(
                  ([value, label]) => (
                    <SelectItem key={value} value={value}>{label}</SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
            {errors.modeCommunication && (
              <p id="communication-error" className="text-xs text-red-600">{errors.modeCommunication}</p>
            )}
          </div>
        </div>
      </fieldset>

      {/* ── Section 3 : PPA ── */}
      <fieldset className="flex flex-col gap-5">
        <legend className="text-base font-semibold text-gray-900">
          Projet Personnalisé d'Accompagnement
        </legend>

        {/* Axes PPA */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="axesPPA">Axes du PPA en cours</Label>
          <Textarea
            id="axesPPA"
            placeholder="ex. Développer l'autonomie dans les repas, renforcer les liens sociaux avec les pairs, travailler la gestion des émotions…"
            rows={3}
            value={form.axesPPA}
            onChange={(e) => set("axesPPA", e.target.value)}
            aria-describedby={errors.axesPPA ? "axes-error" : "axes-hint"}
            aria-invalid={!!errors.axesPPA}
          />
          {errors.axesPPA ? (
            <p id="axes-error" className="text-xs text-red-600">{errors.axesPPA}</p>
          ) : (
            <p id="axes-hint" className="text-xs text-gray-500">
              Décrivez librement les axes prioritaires définis lors de la dernière réunion PPA.
            </p>
          )}
        </div>

        {/* Contexte optionnel */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="contexte">
            Contexte ou contrainte particulière{" "}
            <span className="font-normal text-gray-400">(optionnel)</span>
          </Label>
          <Textarea
            id="contexte"
            placeholder="ex. Résident très sensible au bruit, séance en petit groupe uniquement, sujet abordé : la sexualité…"
            rows={2}
            value={form.contexte}
            onChange={(e) => set("contexte", e.target.value)}
          />
        </div>
      </fieldset>

      {/* ── Section 4 : Type de contenu ── */}
      <fieldset className="flex flex-col gap-4">
        <legend className="text-base font-semibold text-gray-900">
          Type de contenu à générer
        </legend>

        <RadioGroup
          value={form.typeContenu}
          onValueChange={(v) => set("typeContenu", v as ContentType)}
          className="flex flex-col gap-3"
        >
          {(Object.keys(CONTENT_TYPE_LABELS) as ContentType[]).map((value) => (
            <label
              key={value}
              htmlFor={`type-${value}`}
              className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors ${
                form.typeContenu === value
                  ? "border-indigo-500 bg-indigo-50"
                  : "border-gray-200 bg-white hover:bg-gray-50"
              }`}
            >
              <RadioGroupItem
                id={`type-${value}`}
                value={value}
                className="mt-0.5 shrink-0"
              />
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-medium text-gray-900">
                  {CONTENT_TYPE_LABELS[value]}
                </span>
                <span className="text-xs text-gray-500">
                  {CONTENT_TYPE_DESCRIPTIONS[value]}
                </span>
              </div>
            </label>
          ))}
        </RadioGroup>
      </fieldset>

      {/* ── Soumission ── */}
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-xl py-3 text-sm font-semibold"
      >
        {isLoading ? "Génération en cours…" : "Générer le prompt"}
      </Button>
    </form>
  );
}
