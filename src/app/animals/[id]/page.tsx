import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import {
  AlertIcon,
  BrainIcon,
  ChevronLeftIcon,
  ClockIcon,
  HeartIcon,
  SyringeIcon,
} from "@/components/icons";
import { EMOJI, findAnimalById } from "@/lib/mock-data";
import type { Vaccination } from "@/lib/types";

const VACC_DOT: Record<Vaccination["status"], { color: string; label: string }> = {
  ok: { color: "#2BA08F", label: "À jour" },
  soon: { color: "#C8A45C", label: "Bientôt" },
  late: { color: "#e74c3c", label: "En retard" },
};

const HIST_TYPE_STYLE: Record<string, string> = {
  consultation: "vc-tag-teal",
  surgery: "vc-tag-purple",
  emergency: "vc-tag-red",
  vaccination: "vc-tag-gold",
};

export default async function AnimalDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const animalId = Number(id);
  const animal = findAnimalById(animalId);
  if (!animal) notFound();

  const lastWeight = animal.weights[animal.weights.length - 1];
  const firstWeight = animal.weights[0];
  const weightDelta = (lastWeight.value - firstWeight.value).toFixed(2);

  return (
    <AppShell title={`Fiche de ${animal.name}`} subtitle={`${animal.species} · ${animal.breed}`}>
      <Link
        href={"/animals" as never}
        className="vc-btn vc-btn-outline vc-btn-sm mb-5"
      >
        <ChevronLeftIcon className="h-3.5 w-3.5" /> Retour aux patients
      </Link>

      {/* Profil header */}
      <div className="vc-card mb-5">
        <div className="flex flex-wrap items-start gap-5">
          <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-3xl bg-[rgba(43,160,143,0.08)] text-4xl">
            {EMOJI[animal.avatar]}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-display text-2xl text-[#0B1D34]">{animal.name}</h2>
              <span className="vc-tag vc-tag-teal">{animal.sex}</span>
              <span className="vc-tag vc-tag-dark">{animal.weight}</span>
              <span className="vc-tag vc-tag-dark">{animal.age}</span>
            </div>
            <div className="mt-1 text-[0.84rem] text-[#8C98A6]">
              {animal.species} · {animal.breed}
              {animal.chip && <> · puce {animal.chip}</>}
            </div>
            {animal.allergies.length > 0 && (
              <div className="mt-2 flex items-center gap-2 text-[0.78rem] text-[#e74c3c]">
                <AlertIcon className="h-4 w-4" />
                Allergies : <strong>{animal.allergies.join(", ")}</strong>
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <button className="vc-btn vc-btn-outline vc-btn-sm">Modifier</button>
            <button className="vc-btn vc-btn-primary vc-btn-sm">
              <BrainIcon className="h-3.5 w-3.5" /> Consulter
            </button>
          </div>
        </div>
        {/* Owner */}
        <div className="mt-5 grid gap-4 border-t border-[#F5F7FA] pt-4 sm:grid-cols-3">
          <div>
            <div className="text-[0.68rem] font-semibold uppercase tracking-wider text-[#8C98A6]">
              Propriétaire
            </div>
            <div className="text-[0.92rem] font-semibold text-[#0B1D34]">{animal.owner}</div>
          </div>
          <div>
            <div className="text-[0.68rem] font-semibold uppercase tracking-wider text-[#8C98A6]">
              Téléphone
            </div>
            <div className="text-[0.92rem] text-[#0B1D34]">{animal.phone}</div>
          </div>
          <div>
            <div className="text-[0.68rem] font-semibold uppercase tracking-wider text-[#8C98A6]">
              Email
            </div>
            <div className="truncate text-[0.92rem] text-[#0B1D34]">{animal.email}</div>
          </div>
        </div>
      </div>

      {/* Two-col content */}
      <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
        {/* Left: history + vaccins */}
        <div className="space-y-5">
          {/* Vaccinations */}
          <div className="vc-card">
            <div className="mb-3 flex items-center gap-2">
              <SyringeIcon className="h-4 w-4 text-[#2BA08F]" />
              <h3 className="font-display text-[1.05rem] text-[#0B1D34]">Vaccinations</h3>
            </div>
            <div>
              {animal.vaccinations.map((v) => {
                const dot = VACC_DOT[v.status];
                return (
                  <div
                    key={v.name}
                    className="flex items-center gap-3 border-b border-[#F5F7FA] py-3 last:border-0"
                  >
                    <span
                      className="h-2.5 w-2.5 flex-shrink-0 rounded-full"
                      style={{ background: dot.color }}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-[0.86rem] font-semibold text-[#0B1D34]">
                        {v.name}
                      </div>
                      <div className="text-[0.74rem] text-[#8C98A6]">Rappel : {v.date}</div>
                    </div>
                    <span
                      className="vc-tag"
                      style={{
                        background: `${dot.color}1f`,
                        color: dot.color,
                      }}
                    >
                      {dot.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* History */}
          <div className="vc-card">
            <div className="mb-3 flex items-center gap-2">
              <ClockIcon className="h-4 w-4 text-[#2BA08F]" />
              <h3 className="font-display text-[1.05rem] text-[#0B1D34]">
                Historique médical
              </h3>
            </div>
            <div className="space-y-3">
              {animal.history.map((h, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 rounded-xl bg-[#F5F7FA] p-3"
                >
                  <div className="min-w-0 flex-1">
                    <div className="text-[0.88rem] font-semibold text-[#0B1D34]">
                      {h.title}
                    </div>
                    <div className="text-[0.72rem] text-[#8C98A6]">{h.date}</div>
                  </div>
                  <span className={`vc-tag ${HIST_TYPE_STYLE[h.type] ?? "vc-tag-dark"}`}>
                    {h.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: weight + treatments */}
        <div className="space-y-5">
          {/* Weight evolution */}
          <div className="vc-card">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-display text-[1.05rem] text-[#0B1D34]">Évolution du poids</h3>
              <span
                className={`vc-tag ${Number(weightDelta) >= 0 ? "vc-tag-teal" : "vc-tag-red"}`}
              >
                {Number(weightDelta) >= 0 ? "+" : ""}
                {weightDelta} kg
              </span>
            </div>
            <div className="flex h-32 items-end gap-2">
              {animal.weights.map((w) => {
                const max = Math.max(...animal.weights.map((p) => p.value));
                const pct = Math.max(20, (w.value / max) * 100);
                return (
                  <div key={w.month} className="flex flex-1 flex-col items-center gap-1">
                    <div
                      className="w-full rounded-t-md"
                      style={{
                        height: `${pct}%`,
                        background:
                          "linear-gradient(180deg,#2BA08F,#3dcfb6)",
                      }}
                    />
                    <div className="text-[0.66rem] text-[#8C98A6]">{w.month}</div>
                  </div>
                );
              })}
            </div>
            <div className="mt-3 text-center text-[0.82rem] text-[#0B1D34]">
              Dernier relevé :{" "}
              <strong>{lastWeight.value} kg</strong>
            </div>
          </div>

          {/* Treatments */}
          <div className="vc-card">
            <div className="mb-3 flex items-center gap-2">
              <HeartIcon className="h-4 w-4 text-[#e74c3c]" />
              <h3 className="font-display text-[1.05rem] text-[#0B1D34]">
                Traitements en cours
              </h3>
            </div>
            {animal.treatments.length === 0 ? (
              <div className="rounded-lg bg-[#F5F7FA] py-6 text-center text-[0.82rem] text-[#8C98A6]">
                Aucun traitement en cours
              </div>
            ) : (
              <div className="space-y-3">
                {animal.treatments.map((t) => (
                  <div key={t.name} className="rounded-xl border border-[#E9ECF1] p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[0.88rem] font-semibold text-[#0B1D34]">
                        {t.name}
                      </span>
                      <span className="vc-tag vc-tag-teal">{t.frequency}</span>
                    </div>
                    <div className="mt-1 text-[0.74rem] text-[#8C98A6]">
                      Dosage : {t.dosage} · Depuis : {t.startedAt}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
