"use client";

import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import {
  AlertIcon,
  BrainIcon,
  CheckIcon,
  MicIcon,
  SparkleIcon,
} from "@/components/icons";
import { ImageAnalysisCard } from "@/components/ImageAnalysisCard";
import { ANIMALS, DIAGNOSTIC_DEMO, EMOJI } from "@/lib/mock-data";
import type { DiagnosticResult } from "@/lib/types";

const URGENCY_STYLES: Record<DiagnosticResult["urgency"], { bg: string; color: string }> = {
  critique: { bg: "rgba(231,76,60,0.1)", color: "#e74c3c" },
  moderee: { bg: "rgba(230,126,34,0.1)", color: "#e67e22" },
  faible: { bg: "rgba(43,160,143,0.1)", color: "#2BA08F" },
};

const HYPO_PCT_COLOR: Record<"hi" | "md" | "lo", string> = {
  hi: "text-[#e67e22]",
  md: "text-[#2BA08F]",
  lo: "text-[#2BA08F]",
};

const HYPO_BAR: Record<"hi" | "md" | "lo", string> = {
  hi: "from-[#e67e22] to-[#f39c12]",
  md: "from-[#2BA08F] to-[#3dcfb6]",
  lo: "from-[#2BA08F] to-[#58d4c1]",
};

const SUGGESTED_SYMPTOMS = [
  "Vomissements, anorexie, abdomen sensible",
  "Boiterie antérieure gauche, fatigue",
  "Toux sèche persistante, déshydratation",
];

export default function DiagnosticPage() {
  const [symptoms, setSymptoms] = useState("");
  const [animalId, setAnimalId] = useState(ANIMALS[0].id);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<DiagnosticResult | null>(null);
  const [recording, setRecording] = useState(false);

  const selectedAnimal = ANIMALS.find((a) => a.id === animalId) ?? ANIMALS[0];

  const analyze = () => {
    if (!symptoms.trim()) return;
    setAnalyzing(true);
    setResults(null);
    setTimeout(() => {
      setAnalyzing(false);
      setResults(DIAGNOSTIC_DEMO);
    }, 1700);
  };

  const toggleMic = () => {
    if (recording) {
      setRecording(false);
      return;
    }
    setRecording(true);
    setTimeout(() => {
      setRecording(false);
      setSymptoms(
        "Vomissements répétés depuis 48h, perte d'appétit complète, légère déshydratation, abdomen sensible à la palpation crâniale.",
      );
    }, 2000);
  };

  const urgency = results ? URGENCY_STYLES[results.urgency] : null;

  return (
    <AppShell title="Aide au diagnostic" subtitle="Assistant IA · Suggestions cliniques">
      {/* Patient + symptômes */}
      <div className="grid gap-5 lg:grid-cols-[360px_1fr]">
        {/* Patient selector */}
        <div className="vc-card">
          <h3 className="mb-3 font-display text-[1.05rem] text-[#0B1D34]">Patient</h3>
          <div className="space-y-2">
            {ANIMALS.map((a) => (
              <button
                key={a.id}
                onClick={() => setAnimalId(a.id)}
                className={`flex w-full items-center gap-3 rounded-xl border-[1.5px] px-3 py-2.5 text-left transition-all ${
                  animalId === a.id
                    ? "border-[#2BA08F] bg-[rgba(43,160,143,0.05)]"
                    : "border-[#E9ECF1] bg-white hover:border-[#2BA08F]/50"
                }`}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[rgba(43,160,143,0.08)] text-xl">
                  {EMOJI[a.avatar]}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[0.86rem] font-semibold text-[#0B1D34]">
                    {a.name} <span className="text-[#8C98A6]">· {a.breed}</span>
                  </div>
                  <div className="truncate text-[0.72rem] text-[#8C98A6]">
                    {a.age} · {a.weight} · {a.owner}
                  </div>
                </div>
              </button>
            ))}
          </div>
          {selectedAnimal.allergies.length > 0 && (
            <div className="mt-4 flex items-start gap-2 rounded-xl bg-[rgba(231,76,60,0.08)] p-3 text-[0.78rem] text-[#e74c3c]">
              <AlertIcon className="h-4 w-4 flex-shrink-0" />
              <span>
                Allergies connues : <strong>{selectedAnimal.allergies.join(", ")}</strong>
              </span>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="vc-card">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-display text-[1.05rem] text-[#0B1D34]">Symptômes observés</h3>
            <span className="vc-tag vc-tag-teal">
              <SparkleIcon className="h-3 w-3" />
              Assistant IA
            </span>
          </div>
          <textarea
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="Décrivez les symptômes, comportements observés, antécédents pertinents…"
            rows={5}
            className="vc-input resize-none"
          />
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap gap-1.5">
              {SUGGESTED_SYMPTOMS.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setSymptoms(s)}
                  className="rounded-full bg-[rgba(43,160,143,0.08)] px-3 py-1 text-[0.7rem] font-semibold text-[#2BA08F] transition-colors hover:bg-[#2BA08F] hover:text-white"
                >
                  {s.split(",")[0]}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={toggleMic}
                className={`vc-btn vc-btn-sm ${
                  recording ? "vc-btn-danger" : "vc-btn-outline"
                }`}
              >
                <MicIcon className="h-3.5 w-3.5" />
                {recording ? "Enregistrement…" : "Dictée"}
              </button>
              <button
                onClick={analyze}
                disabled={!symptoms.trim() || analyzing}
                className="vc-btn vc-btn-primary disabled:opacity-60"
              >
                <BrainIcon className="h-4 w-4" />
                {analyzing ? "Analyse en cours…" : "Analyser"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      {analyzing && (
        <div className="vc-card mt-5 flex flex-col items-center gap-3 py-10">
          <div
            className="h-10 w-10 animate-spin rounded-full border-4 border-[#E9ECF1] border-t-[#2BA08F]"
            aria-hidden
          />
          <div className="text-[0.92rem] font-semibold text-[#0B1D34]">
            L&apos;assistant analyse les symptômes…
          </div>
          <div className="text-[0.78rem] text-[#8C98A6]">
            Recherche dans la base de cas cliniques
          </div>
        </div>
      )}

      {/* Image analysis section */}
      <div className="mt-5">
        <ImageAnalysisCard />
      </div>

      {results && !analyzing && (
        <div className="mt-5 space-y-4">
          {/* Urgency header */}
          <div className="vc-card">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3">
              <div>
                <h3 className="font-display text-[1.15rem] text-[#0B1D34]">
                  Résultats du diagnostic assisté
                </h3>
                <p className="text-[0.78rem] text-[#8C98A6]">
                  {results.hypotheses.length} hypothèses pour {selectedAnimal.name}
                </p>
              </div>
              {urgency && (
                <span
                  className="inline-flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-[0.74rem] font-bold tracking-wider"
                  style={{
                    background: urgency.bg,
                    color: urgency.color,
                    border: `1px solid ${urgency.color}26`,
                  }}
                >
                  <AlertIcon className="h-3.5 w-3.5" /> URGENCE {results.urgencyLabel}
                </span>
              )}
            </div>
          </div>

          {/* Hypotheses */}
          <div className="space-y-3">
            {results.hypotheses.map((h, i) => (
              <div key={i} className="vc-card vc-slide-up">
                <div className="flex items-start justify-between gap-3">
                  <h4 className="font-display text-[1rem] leading-snug text-[#0B1D34]">
                    {h.name}
                  </h4>
                  <span className={`text-lg font-extrabold ${HYPO_PCT_COLOR[h.level]}`}>
                    {h.probability}%
                  </span>
                </div>
                <div className="my-2 h-1.5 overflow-hidden rounded-full bg-[#F5F7FA]">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${HYPO_BAR[h.level]} transition-all duration-1000`}
                    style={{ width: `${h.probability}%` }}
                  />
                </div>
                <p className="mb-3 text-[0.84rem] italic leading-relaxed text-[#8C98A6]">
                  {h.description}
                </p>
                <div className="rounded-xl border border-[rgba(43,160,143,0.08)] bg-[rgba(43,160,143,0.04)] p-3.5">
                  <div className="mb-2 flex items-center gap-1.5 text-[0.78rem] font-bold text-[#2BA08F]">
                    <CheckIcon className="h-3.5 w-3.5" /> Examens conseillés
                  </div>
                  <ul className="space-y-1">
                    {h.exams.map((exam) => (
                      <li
                        key={exam}
                        className="relative pl-3.5 text-[0.82rem] leading-relaxed text-[#0B1D34]"
                      >
                        <span className="absolute left-0.5 top-0.5 text-base font-extrabold text-[#2BA08F]">
                          ·
                        </span>
                        {exam}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <p className="rounded-xl bg-[#F5F7FA] p-3.5 text-[0.78rem] leading-relaxed text-[#8C98A6]">
            ⚠️ Ces suggestions sont des aides à la décision basées sur l&apos;IA. Elles ne
            remplacent en aucun cas le jugement clinique du vétérinaire.
          </p>
        </div>
      )}
    </AppShell>
  );
}
