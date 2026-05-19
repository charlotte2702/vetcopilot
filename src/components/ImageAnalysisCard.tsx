"use client";

import { useRef, useState } from "react";
import {
  AlertIcon,
  BrainIcon,
  CheckIcon,
  CloseIcon,
  PlusIcon,
  SparkleIcon,
} from "@/components/icons";
import { IMAGE_ANALYSIS_DEMOS, IMAGE_CATEGORIES } from "@/lib/mock-data";
import type {
  ImageAnalysisResult,
  ImageCategory,
  UploadedImage,
} from "@/lib/types";

const HYPO_BAR: Record<"hi" | "md" | "lo", string> = {
  hi: "from-[#e67e22] to-[#f39c12]",
  md: "from-[#2BA08F] to-[#3dcfb6]",
  lo: "from-[#2BA08F] to-[#58d4c1]",
};

const HYPO_PCT: Record<"hi" | "md" | "lo", string> = {
  hi: "text-[#e67e22]",
  md: "text-[#2BA08F]",
  lo: "text-[#2BA08F]",
};

export function ImageAnalysisCard() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [category, setCategory] = useState<ImageCategory>("radio-thorax");
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<ImageAnalysisResult | null>(null);

  const openPicker = () => inputRef.current?.click();

  const addFiles = (files: FileList | null) => {
    if (!files) return;
    const valid = Array.from(files).filter((f) => f.type.startsWith("image/"));
    if (valid.length === 0) return;
    const newImages = valid.map((f) => ({
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      url: URL.createObjectURL(f),
      name: f.name,
      category,
    }));
    setImages((prev) => [...prev, ...newImages]);
    setResult(null);
  };

  const removeImage = (id: string) => {
    setImages((prev) => {
      const img = prev.find((i) => i.id === id);
      if (img) URL.revokeObjectURL(img.url);
      return prev.filter((i) => i.id !== id);
    });
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    addFiles(e.dataTransfer.files);
  };

  const analyze = () => {
    if (images.length === 0) return;
    setAnalyzing(true);
    setResult(null);
    setTimeout(() => {
      setAnalyzing(false);
      setResult(IMAGE_ANALYSIS_DEMOS[category]);
    }, 1800);
  };

  const reset = () => {
    images.forEach((i) => URL.revokeObjectURL(i.url));
    setImages([]);
    setResult(null);
  };

  return (
    <div className="vc-card">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="font-display text-[1.05rem] text-[#0B1D34]">
            Analyse d&apos;image
          </h3>
          <span className="vc-tag vc-tag-teal">
            <SparkleIcon className="h-3 w-3" />
            Assistant IA
          </span>
        </div>
        {images.length > 0 && (
          <button onClick={reset} className="vc-btn vc-btn-ghost vc-btn-sm">
            Réinitialiser
          </button>
        )}
      </div>

      {/* Category selector */}
      <div className="mb-3">
        <label className="vc-label">Type d&apos;examen</label>
        <div className="flex flex-wrap gap-2">
          {IMAGE_CATEGORIES.map((c) => (
            <button
              key={c.value}
              onClick={() => setCategory(c.value)}
              className={`flex items-center gap-1.5 rounded-full border-[1.5px] px-3 py-1.5 text-[0.74rem] font-semibold transition-all ${
                category === c.value
                  ? "border-[#2BA08F] bg-[rgba(43,160,143,0.08)] text-[#2BA08F]"
                  : "border-[#E9ECF1] bg-white text-[#8C98A6] hover:border-[#2BA08F]/50"
              }`}
            >
              <span>{c.icon}</span> {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Drop zone / upload area */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        onClick={images.length === 0 ? openPicker : undefined}
        className={`rounded-2xl border-2 border-dashed p-5 text-center transition-all ${
          images.length === 0 ? "cursor-pointer" : "cursor-default"
        } ${
          dragOver
            ? "border-[#2BA08F] bg-[rgba(43,160,143,0.04)] shadow-[0_0_0_4px_var(--tg)]"
            : images.length > 0
              ? "border-[rgba(43,160,143,0.18)] bg-[rgba(43,160,143,0.02)]"
              : "border-[#E9ECF1] hover:border-[#2BA08F] hover:bg-[rgba(43,160,143,0.02)]"
        }`}
      >
        {images.length === 0 ? (
          <div className="py-6">
            <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgba(43,160,143,0.08)] text-[#2BA08F]">
              <PlusIcon className="h-6 w-6" />
            </div>
            <div className="text-[0.92rem] font-semibold text-[#0B1D34]">
              Importer une image
            </div>
            <div className="mt-1 text-[0.78rem] text-[#8C98A6]">
              Cliquez ou glissez-déposez (radio, dermato, écho, photo clinique…)
            </div>
            <div className="mt-3 text-[0.7rem] text-[#8C98A6]">
              JPG, PNG, WEBP — plusieurs images possibles
            </div>
          </div>
        ) : (
          <>
            <div className="grid gap-2.5 [grid-template-columns:repeat(auto-fill,minmax(110px,1fr))]">
              {images.map((img) => (
                <div
                  key={img.id}
                  className="group relative aspect-square overflow-hidden rounded-xl border-2 border-transparent bg-[#F5F7FA] transition-all hover:border-[#2BA08F] hover:shadow-md"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.url}
                    alt={img.name}
                    className="h-full w-full object-cover"
                  />
                  <button
                    onClick={() => removeImage(img.id)}
                    className="absolute top-1.5 right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-[rgba(231,76,60,0.92)] text-white opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100"
                    aria-label="Retirer l'image"
                  >
                    <CloseIcon className="h-3.5 w-3.5" />
                  </button>
                  <div className="absolute right-0 bottom-0 left-0 truncate bg-gradient-to-t from-black/70 to-transparent p-1 text-center text-[0.62rem] font-semibold text-white">
                    {img.name}
                  </div>
                </div>
              ))}
              <button
                onClick={openPicker}
                className="flex aspect-square items-center justify-center rounded-xl border-2 border-dashed border-[#E9ECF1] text-[#8C98A6] transition-colors hover:border-[#2BA08F] hover:text-[#2BA08F]"
                aria-label="Ajouter une autre image"
              >
                <PlusIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-3 text-[0.74rem] text-[#8C98A6]">
              {images.length} image{images.length > 1 ? "s" : ""} prête
              {images.length > 1 ? "s" : ""} à l&apos;analyse
            </div>
          </>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
        />
      </div>

      {/* Actions */}
      <div className="mt-3 flex flex-wrap justify-end gap-2">
        <button
          onClick={analyze}
          disabled={images.length === 0 || analyzing}
          className="vc-btn vc-btn-primary disabled:opacity-60"
        >
          <BrainIcon className="h-4 w-4" />
          {analyzing ? "Analyse en cours…" : "Analyser l'image"}
        </button>
      </div>

      {/* Analyzing state */}
      {analyzing && (
        <div className="mt-4 flex flex-col items-center gap-3 rounded-xl bg-[#F5F7FA] py-8">
          <div
            className="h-10 w-10 animate-spin rounded-full border-4 border-[#E9ECF1] border-t-[#2BA08F]"
            aria-hidden
          />
          <div className="text-[0.9rem] font-semibold text-[#0B1D34]">
            Analyse visuelle en cours…
          </div>
          <div className="text-[0.74rem] text-[#8C98A6]">
            Détection des structures et anomalies
          </div>
        </div>
      )}

      {/* Result */}
      {result && !analyzing && (
        <div className="mt-4 space-y-4 vc-slide-up">
          {/* Detected exam header */}
          <div className="rounded-2xl border border-[rgba(43,160,143,0.15)] bg-gradient-to-br from-[rgba(43,160,143,0.05)] to-[rgba(200,164,92,0.04)] p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-2xl shadow-sm">
                  {result.examIcon}
                </div>
                <div>
                  <div className="text-[0.65rem] font-bold uppercase tracking-widest text-[#2BA08F]">
                    Type d&apos;examen détecté
                  </div>
                  <div className="font-display text-[1.05rem] text-[#0B1D34]">
                    {result.examType}
                  </div>
                </div>
              </div>
              <span className="vc-tag vc-tag-teal">
                <CheckIcon className="h-3 w-3" /> Confiance {result.confidence}%
              </span>
            </div>
          </div>

          {/* Findings */}
          <div>
            <div className="mb-2 flex items-center gap-1.5 text-[0.78rem] font-bold uppercase tracking-wider text-[#0B1D34]">
              <SparkleIcon className="h-3.5 w-3.5 text-[#C8A45C]" />
              Observations
            </div>
            <ul className="space-y-1.5">
              {result.findings.map((f) => (
                <li
                  key={f}
                  className="relative rounded-xl bg-[#F5F7FA] py-2 pr-3 pl-7 text-[0.84rem] leading-relaxed text-[#0B1D34]"
                >
                  <span className="absolute top-2 left-3 text-[#C8A45C]">·</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Hypotheses */}
          <div>
            <div className="mb-2 flex items-center gap-1.5 text-[0.78rem] font-bold uppercase tracking-wider text-[#0B1D34]">
              <BrainIcon className="h-3.5 w-3.5 text-[#2BA08F]" />
              Suspicions
            </div>
            <div className="space-y-2.5">
              {result.hypotheses.map((h) => (
                <div
                  key={h.name}
                  className="rounded-xl border border-[#E9ECF1] bg-white p-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="text-[0.86rem] font-semibold text-[#0B1D34]">
                      {h.name}
                    </div>
                    <span className={`text-base font-extrabold ${HYPO_PCT[h.level]}`}>
                      {h.probability}%
                    </span>
                  </div>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[#F5F7FA]">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${HYPO_BAR[h.level]} transition-all duration-1000`}
                      style={{ width: `${h.probability}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div className="rounded-2xl border border-[rgba(43,160,143,0.08)] bg-[rgba(43,160,143,0.04)] p-4">
            <div className="mb-2 flex items-center gap-1.5 text-[0.78rem] font-bold uppercase tracking-wider text-[#2BA08F]">
              <CheckIcon className="h-3.5 w-3.5" />
              Recommandations
            </div>
            <ul className="space-y-1.5">
              {result.recommendations.map((r) => (
                <li
                  key={r}
                  className="relative pl-4 text-[0.84rem] leading-relaxed text-[#0B1D34]"
                >
                  <span className="absolute top-0 left-0.5 font-extrabold text-[#2BA08F]">
                    ·
                  </span>
                  {r}
                </li>
              ))}
            </ul>
          </div>

          {/* Disclaimer */}
          <div className="flex items-start gap-2 rounded-xl bg-[rgba(200,164,92,0.08)] p-3 text-[0.78rem] leading-relaxed text-[#0B1D34]">
            <AlertIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#C8A45C]" />
            <span>
              <strong>L&apos;IA est un outil d&apos;aide à la décision.</strong> Le vétérinaire garde
              la décision finale sur le diagnostic et la prise en charge. Confronter
              systématiquement aux observations cliniques.
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
