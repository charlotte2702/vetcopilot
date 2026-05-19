"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { PlusIcon, SearchIcon } from "@/components/icons";
import { ANIMALS, EMOJI } from "@/lib/mock-data";

const SPECIES_FILTERS = ["all", "Chien", "Chat", "Lapin"];

export default function AnimalsPage() {
  const [query, setQuery] = useState("");
  const [species, setSpecies] = useState("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ANIMALS.filter((a) => {
      const matchQ =
        !q ||
        a.name.toLowerCase().includes(q) ||
        a.owner.toLowerCase().includes(q) ||
        a.breed.toLowerCase().includes(q);
      const matchS = species === "all" || a.species === species;
      return matchQ && matchS;
    });
  }, [query, species]);

  return (
    <AppShell title="Dossiers patients" subtitle={`${ANIMALS.length} patients enregistrés`}>
      {/* Search + add */}
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <div className="flex h-11 min-w-[240px] flex-1 items-center gap-2 rounded-xl border-[1.5px] border-[#E9ECF1] bg-white px-3 focus-within:border-[#2BA08F] focus-within:shadow-[0_0_0_3px_var(--tg)]">
          <SearchIcon className="h-4 w-4 text-[#8C98A6]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher par nom, race, propriétaire…"
            className="flex-1 bg-transparent text-[0.86rem] outline-none placeholder:text-[#8C98A6]"
          />
        </div>
        <button className="vc-btn vc-btn-primary">
          <PlusIcon className="h-4 w-4" /> Nouveau patient
        </button>
      </div>

      {/* Species filter */}
      <div className="mb-5 flex flex-wrap gap-2">
        {SPECIES_FILTERS.map((s) => (
          <button
            key={s}
            onClick={() => setSpecies(s)}
            className={`rounded-full px-4 py-1.5 text-[0.78rem] font-semibold transition-colors ${
              species === s
                ? "bg-[#0B1D34] text-white"
                : "bg-white text-[#8C98A6] hover:text-[#0B1D34]"
            }`}
          >
            {s === "all" ? "Toutes espèces" : s}
          </button>
        ))}
      </div>

      {/* Animals grid */}
      {filtered.length === 0 ? (
        <div className="vc-card text-center text-[0.86rem] text-[#8C98A6]">
          Aucun patient ne correspond à votre recherche.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((animal) => (
            <Link
              key={animal.id}
              href={`/animals/${animal.id}` as never}
              className="vc-card group flex flex-col gap-3 transition-all hover:-translate-y-0.5"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-[rgba(43,160,143,0.08)] text-2xl">
                  {EMOJI[animal.avatar]}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="truncate font-display text-[1.05rem] text-[#0B1D34]">
                      {animal.name}
                    </h3>
                    <span className="vc-tag vc-tag-teal">{animal.sex}</span>
                  </div>
                  <div className="text-[0.78rem] text-[#8C98A6]">
                    {animal.breed} · {animal.age}
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 text-[0.72rem]">
                <span className="vc-tag vc-tag-dark">{animal.species}</span>
                <span className="vc-tag vc-tag-dark">{animal.weight}</span>
                {animal.allergies.length > 0 && (
                  <span className="vc-tag vc-tag-red">Allergies</span>
                )}
              </div>
              <div className="border-t border-[#F5F7FA] pt-2.5 text-[0.78rem] text-[#0B1D34]">
                <div className="font-semibold">{animal.owner}</div>
                <div className="text-[#8C98A6]">{animal.phone}</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </AppShell>
  );
}
