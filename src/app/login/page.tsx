"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Role } from "@/lib/types";

const ROLES: { value: Role; label: string; desc: string }[] = [
  { value: "vet", label: "Vétérinaire", desc: "Accès complet aux dossiers et au diagnostic" },
  { value: "asv", label: "Auxiliaire (ASV)", desc: "Planning, accueil et gestion patients" },
  { value: "admin", label: "Admin clinique", desc: "Gestion équipe, facturation et stats" },
];

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<Role>("vet");
  const [email, setEmail] = useState("s.martin@clinique-vetcopilot.fr");
  const [password, setPassword] = useState("demo");
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => router.push("/dashboard"), 700);
  };

  return (
    <div
      className="flex min-h-screen flex-col overflow-hidden lg:flex-row"
      style={{
        background: "linear-gradient(135deg,#0B1D34 0%,#122A44 40%,#0A0E14 100%)",
      }}
    >
      {/* Brand panel */}
      <div className="relative flex flex-1 flex-col justify-center px-8 py-10 text-white lg:px-16 lg:py-16">
        <div
          className="pointer-events-none absolute -top-[20%] -right-[10%] h-[140%] w-[50%]"
          style={{
            background:
              "radial-gradient(ellipse,rgba(43,160,143,.08),transparent 60%)",
          }}
        />
        <div className="relative max-w-md">
          <div className="mb-8 flex items-center gap-3">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-xl text-2xl font-bold"
              style={{ background: "linear-gradient(135deg,#2BA08F,#249582)" }}
            >
              V
            </div>
            <div>
              <div className="font-display text-2xl">VetCopilot</div>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2BA08F]">
                Beta
              </div>
            </div>
          </div>
          <h1 className="mb-4 font-display text-4xl leading-tight">
            L&apos;assistant intelligent
            <br />
            du vétérinaire.
          </h1>
          <p className="mb-8 max-w-sm text-base leading-relaxed text-white/60">
            Planning, dossiers patients, aide au diagnostic et comptes rendus
            SOAP — tout au même endroit, depuis votre poche.
          </p>
          <div className="hidden gap-6 lg:flex">
            {[
              ["+45%", "Temps gagné"],
              ["12 min", "Par consultation"],
              ["4.9/5", "Satisfaction véto"],
            ].map(([v, l]) => (
              <div key={l}>
                <div className="font-display text-2xl text-[#C8A45C]">{v}</div>
                <div className="text-[0.72rem] uppercase tracking-wider text-white/40">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Login card */}
      <div className="flex w-full items-center justify-center bg-transparent px-4 py-10 lg:w-[480px] lg:px-10">
        <div
          className="w-full max-w-sm rounded-[28px] p-8 shadow-[0_20px_60px_rgba(0,0,0,.4)]"
          style={{
            background: "rgba(255,255,255,.96)",
            backdropFilter: "blur(20px)",
          }}
        >
          <h2 className="mb-1 font-display text-2xl text-[#0B1D34]">Connexion</h2>
          <p className="mb-6 text-sm text-[#8C98A6]">
            Bienvenue. Sélectionnez votre rôle pour continuer.
          </p>

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="vc-label">Email professionnel</label>
              <input
                type="email"
                className="vc-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="vc-label">Mot de passe</label>
              <input
                type="password"
                className="vc-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="vc-label">Rôle</label>
              <div className="space-y-2">
                {ROLES.map((r) => (
                  <button
                    key={r.value}
                    type="button"
                    onClick={() => setRole(r.value)}
                    className={`flex w-full items-start gap-3 rounded-xl border-[1.5px] px-3 py-2.5 text-left transition-all ${
                      role === r.value
                        ? "border-[#2BA08F] bg-[rgba(43,160,143,0.06)]"
                        : "border-[#E9ECF1] bg-white hover:border-[#2BA08F]/50"
                    }`}
                  >
                    <div
                      className={`mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                        role === r.value
                          ? "border-[#2BA08F] bg-[#2BA08F]"
                          : "border-[#8C98A6]"
                      }`}
                    >
                      {role === r.value && (
                        <span className="h-1.5 w-1.5 rounded-full bg-white" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-semibold text-[#0B1D34]">{r.label}</div>
                      <div className="text-[0.72rem] text-[#8C98A6]">{r.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="vc-btn vc-btn-primary vc-btn-lg w-full justify-center disabled:opacity-60"
            >
              {loading ? "Connexion…" : "Se connecter"}
            </button>
            <p className="text-center text-[0.72rem] text-[#8C98A6]">
              Démo — saisie automatique pré-remplie, cliquez pour entrer.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
