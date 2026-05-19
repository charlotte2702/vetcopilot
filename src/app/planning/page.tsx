"use client";

import { useState, useMemo } from "react";
import { AppShell } from "@/components/AppShell";
import { AppointmentRow } from "@/components/AppointmentRow";
import { PlusIcon } from "@/components/icons";
import { ANIMALS, APPOINTMENTS } from "@/lib/mock-data";

type Filter = "all" | "Dr. Martin" | "Dr. Durand";

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "Toute l'équipe" },
  { value: "Dr. Martin", label: "Dr. Martin" },
  { value: "Dr. Durand", label: "Dr. Durand" },
];

const STATUS_LEGEND = [
  { color: "#27ae60", label: "Terminé" },
  { color: "#2BA08F", label: "Confirmé" },
  { color: "#C8A45C", label: "En attente" },
  { color: "#e74c3c", label: "Urgent" },
];

export default function PlanningPage() {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(
    () =>
      filter === "all"
        ? APPOINTMENTS
        : APPOINTMENTS.filter((a) => a.vet === filter),
    [filter],
  );

  // Group by morning/afternoon
  const groups = useMemo(() => {
    const morning = filtered.filter((a) => Number(a.time.split(":")[0]) < 12);
    const afternoon = filtered.filter((a) => Number(a.time.split(":")[0]) >= 12);
    return [
      { label: "Matin", items: morning },
      { label: "Après-midi", items: afternoon },
    ];
  }, [filtered]);

  const totals = useMemo(
    () => ({
      total: filtered.length,
      urgent: filtered.filter((a) => a.status === "urg").length,
      done: filtered.filter((a) => a.status === "done").length,
    }),
    [filtered],
  );

  return (
    <AppShell title="Planning" subtitle="Mardi 19 mai 2026">
      {/* Header bar */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-1 rounded-xl bg-white p-1 shadow-sm">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`rounded-lg px-3.5 py-1.5 text-[0.78rem] font-semibold transition-all ${
                filter === f.value
                  ? "bg-[#0B1D34] text-white"
                  : "text-[#8C98A6] hover:text-[#0B1D34]"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <button className="vc-btn vc-btn-primary vc-btn-sm">
          <PlusIcon className="h-3.5 w-3.5" /> Nouveau RDV
        </button>
      </div>

      {/* Summary */}
      <div className="mb-5 grid grid-cols-3 gap-3">
        {[
          { label: "Total", value: totals.total, tone: "text-[#0B1D34]" },
          { label: "Urgents", value: totals.urgent, tone: "text-[#e74c3c]" },
          { label: "Terminés", value: totals.done, tone: "text-[#27ae60]" },
        ].map((s) => (
          <div key={s.label} className="vc-card text-center">
            <div className={`font-display text-2xl font-extrabold leading-none ${s.tone}`}>
              {s.value}
            </div>
            <div className="mt-1 text-[0.72rem] text-[#8C98A6]">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mb-4 flex flex-wrap gap-3 text-[0.72rem] text-[#8C98A6]">
        {STATUS_LEGEND.map((l) => (
          <div key={l.label} className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full" style={{ background: l.color }} />
            {l.label}
          </div>
        ))}
      </div>

      {/* Timeline groups */}
      <div className="space-y-5">
        {groups.map((group) => (
          <div key={group.label} className="vc-card">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-display text-[1.05rem] text-[#0B1D34]">{group.label}</h3>
              <span className="vc-tag vc-tag-dark">{group.items.length} RDV</span>
            </div>
            {group.items.length === 0 ? (
              <div className="rounded-lg bg-[#F5F7FA] py-8 text-center text-[0.82rem] text-[#8C98A6]">
                Aucun rendez-vous
              </div>
            ) : (
              <div className="space-y-2">
                {group.items.map((apt) => {
                  const animal = ANIMALS.find((a) => a.name === apt.animalName);
                  return (
                    <AppointmentRow
                      key={apt.id}
                      apt={apt}
                      animalId={animal?.id}
                    />
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </AppShell>
  );
}
