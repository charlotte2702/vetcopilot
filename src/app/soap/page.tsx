"use client";

import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import {
  CheckIcon,
  ClockIcon,
  FileTextIcon,
  SparkleIcon,
  UserIcon,
} from "@/components/icons";
import { ANIMALS, EMOJI, SOAP_DEMO } from "@/lib/mock-data";
import type { SoapReport } from "@/lib/types";

type View = "vet" | "owner";

const SECTIONS: { key: keyof SoapReport; label: string; letter: string; color: string }[] = [
  { key: "subjective", label: "Subjectif", letter: "S", color: "#2BA08F" },
  { key: "objective", label: "Objectif", letter: "O", color: "#C8A45C" },
  { key: "assessment", label: "Analyse", letter: "A", color: "#9b59b6" },
  { key: "plan", label: "Plan", letter: "P", color: "#0B1D34" },
];

export default function SoapPage() {
  const [view, setView] = useState<View>("vet");
  const [generating, setGenerating] = useState(false);
  const [report, setReport] = useState<SoapReport | null>(SOAP_DEMO);

  const regenerate = () => {
    setGenerating(true);
    setReport(null);
    setTimeout(() => {
      setGenerating(false);
      setReport(SOAP_DEMO);
    }, 1400);
  };

  const animal = ANIMALS.find((a) => a.name === SOAP_DEMO.animalName);

  return (
    <AppShell title="Comptes rendus SOAP" subtitle="Générés et structurés par l'assistant IA">
      {/* Header card */}
      <div className="vc-card mb-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[rgba(43,160,143,0.08)] text-2xl">
              {animal ? EMOJI[animal.avatar] : "🐾"}
            </div>
            <div>
              <h3 className="font-display text-[1.1rem] text-[#0B1D34]">
                {SOAP_DEMO.animalName} · {SOAP_DEMO.ownerName}
              </h3>
              <div className="flex items-center gap-2 text-[0.78rem] text-[#8C98A6]">
                <ClockIcon className="h-3.5 w-3.5" /> {SOAP_DEMO.date} · {SOAP_DEMO.vet}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={regenerate} className="vc-btn vc-btn-outline vc-btn-sm">
              <SparkleIcon className="h-3.5 w-3.5" /> Régénérer
            </button>
            <button className="vc-btn vc-btn-primary vc-btn-sm">
              <CheckIcon className="h-3.5 w-3.5" /> Valider
            </button>
          </div>
        </div>
      </div>

      {/* View toggle */}
      <div className="mb-5 flex gap-1 rounded-xl bg-white p-1 shadow-sm">
        <button
          onClick={() => setView("vet")}
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2 text-[0.82rem] font-semibold transition-all ${
            view === "vet" ? "bg-[#0B1D34] text-white" : "text-[#8C98A6] hover:text-[#0B1D34]"
          }`}
        >
          <FileTextIcon className="h-4 w-4" /> Version vétérinaire
        </button>
        <button
          onClick={() => setView("owner")}
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2 text-[0.82rem] font-semibold transition-all ${
            view === "owner" ? "bg-[#0B1D34] text-white" : "text-[#8C98A6] hover:text-[#0B1D34]"
          }`}
        >
          <UserIcon className="h-4 w-4" /> Version propriétaire
        </button>
      </div>

      {/* Generating state */}
      {generating && (
        <div className="vc-card flex flex-col items-center gap-3 py-10">
          <div
            className="h-10 w-10 animate-spin rounded-full border-4 border-[#E9ECF1] border-t-[#2BA08F]"
            aria-hidden
          />
          <div className="text-[0.92rem] font-semibold text-[#0B1D34]">
            Régénération du compte rendu…
          </div>
        </div>
      )}

      {/* Report content */}
      {!generating && report && view === "vet" && (
        <div className="space-y-4 vc-slide-up">
          {SECTIONS.map((section) => (
            <div key={section.key} className="vc-card">
              <div className="mb-3 flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl font-display text-lg font-bold text-white"
                  style={{ background: section.color }}
                >
                  {section.letter}
                </div>
                <div>
                  <h3 className="font-display text-[1.05rem] text-[#0B1D34]">
                    {section.label}
                  </h3>
                  <p className="text-[0.7rem] uppercase tracking-wider text-[#8C98A6]">
                    Section {section.letter}
                  </p>
                </div>
              </div>
              <div className="whitespace-pre-line text-[0.88rem] leading-relaxed text-[#0B1D34]">
                {report[section.key] as string}
              </div>
            </div>
          ))}
        </div>
      )}

      {!generating && report && view === "owner" && (
        <div className="vc-card vc-slide-up">
          <div className="mb-3 flex items-center gap-2 text-[0.78rem] font-semibold text-[#2BA08F]">
            <UserIcon className="h-4 w-4" />
            Synthèse simplifiée à destination du propriétaire
          </div>
          <div className="whitespace-pre-line rounded-xl bg-[#F5F7FA] p-5 text-[0.92rem] leading-relaxed text-[#0B1D34]">
            {report.ownerSummary}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <button className="vc-btn vc-btn-outline vc-btn-sm">Copier le texte</button>
            <button className="vc-btn vc-btn-primary vc-btn-sm">
              Envoyer par email au propriétaire
            </button>
          </div>
        </div>
      )}
    </AppShell>
  );
}
