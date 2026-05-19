"use client";

import { useState } from "react";
import { DEMO_PROFILES, ROLE_LABEL } from "@/lib/mock-data";
import type { User } from "@/lib/types";

const STORAGE_KEY = "vc-profile-id";

function go(profile: User) {
  try {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, profile.id);
    }
  } catch {
    // ignore storage errors (privacy mode, etc.)
  }
  // Full page navigation — bypasses Next.js RSC fetch so it works even
  // if a stale service worker is intercepting requests.
  window.location.href = "/dashboard";
}

export default function LoginPage() {
  const [email, setEmail] = useState("s.martin@clinique-vetcopilot.fr");
  const [password, setPassword] = useState("demo");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    go(DEMO_PROFILES[0]);
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
      <div className="flex w-full items-center justify-center px-4 py-10 lg:w-[480px] lg:px-10">
        <div
          className="w-full max-w-sm rounded-[28px] p-7 shadow-[0_20px_60px_rgba(0,0,0,.4)]"
          style={{
            background: "rgba(255,255,255,.96)",
            backdropFilter: "blur(20px)",
          }}
        >
          <h2 className="mb-1 font-display text-2xl text-[#0B1D34]">Connexion</h2>
          <p className="mb-5 text-sm text-[#8C98A6]">
            Mode démo — choisissez un profil pour commencer.
          </p>

          {/* Quick role buttons */}
          <div className="mb-5 space-y-2">
            {DEMO_PROFILES.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => go(p)}
                className="group flex w-full items-center gap-3 rounded-xl border-[1.5px] border-[#E9ECF1] bg-white px-3 py-2.5 text-left transition-all hover:-translate-y-px hover:border-[#2BA08F] hover:shadow-[0_4px_14px_rgba(43,160,143,0.18)]"
              >
                <div
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-[0.82rem] font-bold text-white"
                  style={{
                    background:
                      p.role === "vet"
                        ? "linear-gradient(135deg,#2BA08F,#249582)"
                        : p.role === "asv"
                          ? "linear-gradient(135deg,#C8A45C,#d4b06a)"
                          : "linear-gradient(135deg,#0B1D34,#122A44)",
                  }}
                >
                  {p.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[0.88rem] font-semibold text-[#0B1D34]">
                    {p.name}
                  </div>
                  <div className="text-[0.72rem] text-[#8C98A6]">{ROLE_LABEL[p.role]}</div>
                </div>
                <span className="text-[#2BA08F] opacity-0 transition-opacity group-hover:opacity-100">
                  →
                </span>
              </button>
            ))}
          </div>

          <div className="relative mb-5 text-center">
            <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 border-t border-[#E9ECF1]" />
            <span className="relative bg-white px-3 text-[0.7rem] font-semibold uppercase tracking-wider text-[#8C98A6]">
              ou
            </span>
          </div>

          <form onSubmit={submit} className="space-y-3">
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
            <button
              type="submit"
              className="vc-btn vc-btn-primary vc-btn-lg w-full justify-center"
            >
              Sign In
            </button>
            <p className="text-center text-[0.7rem] text-[#8C98A6]">
              Démo statique — aucune authentification réelle.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
