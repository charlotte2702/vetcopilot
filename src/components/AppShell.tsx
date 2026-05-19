"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CURRENT_USER } from "@/lib/mock-data";
import {
  AlertIcon,
  BellIcon,
  BrainIcon,
  CalendarIcon,
  CloseIcon,
  DashIcon,
  EuroIcon,
  FileTextIcon,
  LogoutIcon,
  MenuIcon,
  PawIcon,
  SearchIcon,
  SettingsIcon,
} from "./icons";

type NavItem = {
  key: string;
  href: string;
  label: string;
  icon: (p: { className?: string }) => React.JSX.Element;
  match?: (path: string) => boolean;
  badge?: { value: string; tone: "teal" | "red" };
};

const NAV_PRIMARY: NavItem[] = [
  { key: "dashboard", href: "/dashboard", label: "Tableau de bord", icon: DashIcon },
  { key: "planning", href: "/planning", label: "Planning", icon: CalendarIcon, badge: { value: "9", tone: "teal" } },
  {
    key: "animals",
    href: "/animals",
    label: "Dossiers patients",
    icon: PawIcon,
    match: (p) => p.startsWith("/animals"),
  },
  { key: "diagnostic", href: "/diagnostic", label: "Aide diagnostic", icon: BrainIcon },
  { key: "soap", href: "/soap", label: "Comptes rendus SOAP", icon: FileTextIcon, badge: { value: "2", tone: "red" } },
];

const NAV_SECONDARY: NavItem[] = [
  { key: "billing", href: "#", label: "Facturation", icon: EuroIcon },
  { key: "settings", href: "#", label: "Paramètres", icon: SettingsIcon },
];

const MOBILE_ITEMS: NavItem[] = [
  { key: "dashboard", href: "/dashboard", label: "Accueil", icon: DashIcon },
  { key: "planning", href: "/planning", label: "Agenda", icon: CalendarIcon },
  {
    key: "animals",
    href: "/animals",
    label: "Patients",
    icon: PawIcon,
    match: (p) => p.startsWith("/animals"),
  },
  { key: "diagnostic", href: "/diagnostic", label: "IA", icon: BrainIcon },
  { key: "soap", href: "/soap", label: "SOAP", icon: FileTextIcon },
];

function isActive(item: NavItem, pathname: string) {
  if (item.match) return item.match(pathname);
  return pathname === item.href;
}

function NavLink({ item, pathname, onClick }: { item: NavItem; pathname: string; onClick?: () => void }) {
  const active = isActive(item, pathname);
  const Icon = item.icon;
  return (
    <Link
      href={item.href as never}
      onClick={onClick}
      className={`group relative flex items-center gap-3 rounded-[11px] px-3 py-2.5 text-[0.82rem] font-medium transition-all ${
        active ? "bg-teal/[0.12] text-white" : "text-white/45 hover:bg-white/[0.04] hover:text-white/85"
      }`}
      style={active ? { background: "rgba(43,160,143,.12)" } : undefined}
    >
      {active && (
        <span
          className="absolute left-0 top-1/2 h-3/5 w-[3px] -translate-y-1/2 rounded-r"
          style={{ background: "#2BA08F" }}
        />
      )}
      <Icon className={`h-[19px] w-[19px] flex-shrink-0 transition-opacity ${active ? "opacity-100" : "opacity-55 group-hover:opacity-100"}`} />
      <span>{item.label}</span>
      {item.badge && (
        <span
          className={`ml-auto min-w-[20px] rounded-lg px-1.5 py-0.5 text-center text-[0.62rem] font-bold ${
            item.badge.tone === "teal" ? "text-[#2BA08F]" : "text-[#e74c3c]"
          }`}
          style={{
            background: item.badge.tone === "teal" ? "rgba(43,160,143,.2)" : "rgba(231,76,60,.2)",
          }}
        >
          {item.badge.value}
        </span>
      )}
    </Link>
  );
}

function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={onClose}
          aria-hidden
        />
      )}
      <aside
        className={`fixed bottom-0 left-0 top-0 z-50 flex w-[260px] flex-col overflow-hidden text-white transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
        style={{
          background:
            "linear-gradient(195deg,#152D47 0%,#0B1D34 40%,#0A0E14 100%)",
        }}
      >
        <div className="flex items-center justify-between px-5 pb-4 pt-5">
          <Link href="/dashboard" className="flex items-center gap-3" onClick={onClose}>
            <div
              className="flex h-10 w-10 items-center justify-center rounded-[11px] text-lg font-bold text-white"
              style={{ background: "linear-gradient(135deg,#2BA08F,#249582)" }}
            >
              V
            </div>
            <div>
              <div className="font-display text-[1.15rem] leading-none">VetCopilot</div>
              <div className="mt-1 text-[0.6rem] font-semibold uppercase tracking-[0.13em] text-[#2BA08F]">
                Beta
              </div>
            </div>
          </Link>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-white/60 hover:bg-white/10 lg:hidden"
            aria-label="Fermer le menu"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="mx-4 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <nav className="flex flex-1 flex-col gap-px overflow-y-auto p-2.5">
          <div className="px-3 pb-1 pt-4 text-[0.58rem] font-bold uppercase tracking-[0.12em] text-white/25">
            Principal
          </div>
          {NAV_PRIMARY.map((item) => (
            <NavLink key={item.key} item={item} pathname={pathname} onClick={onClose} />
          ))}

          <div className="px-3 pb-1 pt-4 text-[0.58rem] font-bold uppercase tracking-[0.12em] text-white/25">
            Gestion
          </div>
          {NAV_SECONDARY.map((item) => (
            <NavLink key={item.key} item={item} pathname={pathname} onClick={onClose} />
          ))}
        </nav>

        <div className="flex items-center gap-3 border-t border-white/[0.06] px-4 py-3.5">
          <div
            className="relative flex h-9 w-9 items-center justify-center rounded-full text-[0.78rem] font-bold text-white"
            style={{ background: "linear-gradient(135deg,#2BA08F,#C8A45C)" }}
          >
            {CURRENT_USER.initials}
            <span className="absolute -right-0.5 -bottom-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#0B1D34] bg-[#2ecc71]" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-[0.82rem] font-semibold text-white">{CURRENT_USER.name}</div>
            <div className="text-[0.65rem] text-white/50">Vétérinaire</div>
          </div>
          <Link
            href="/login"
            className="rounded-lg p-2 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Déconnexion"
          >
            <LogoutIcon className="h-4 w-4" />
          </Link>
        </div>
      </aside>
    </>
  );
}

function Header({ title, subtitle, onMenu }: { title: string; subtitle?: string; onMenu: () => void }) {
  return (
    <header
      className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-black/[0.04] bg-white/75 px-4 backdrop-blur-xl backdrop-saturate-150 md:px-7"
    >
      <div className="flex min-w-0 items-center gap-3">
        <button
          onClick={onMenu}
          className="rounded-lg p-2 text-[#8C98A6] transition-colors hover:bg-[#F5F7FA] hover:text-[#0B1D34] lg:hidden"
          aria-label="Ouvrir le menu"
        >
          <MenuIcon className="h-5 w-5" />
        </button>
        <div className="min-w-0">
          <h1 className="truncate font-display text-[1.2rem] text-[#0B1D34]">{title}</h1>
          {subtitle && <p className="truncate text-[0.72rem] text-[#8C98A6]">{subtitle}</p>}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="hidden h-[38px] w-[220px] items-center gap-2 rounded-xl border-[1.5px] border-[#E9ECF1] bg-[#F5F7FA] px-3 transition-all focus-within:border-[#2BA08F] focus-within:w-[280px] focus-within:shadow-[0_0_0_3px_var(--tg)] md:flex">
          <SearchIcon className="h-4 w-4 text-[#8C98A6]" />
          <input
            placeholder="Rechercher…"
            className="flex-1 bg-transparent text-[0.82rem] text-[#0B1D34] outline-none placeholder:text-[#8C98A6]"
          />
          <kbd className="rounded bg-[#E9ECF1] px-1.5 py-0.5 text-[0.6rem] font-semibold text-[#8C98A6]">⌘K</kbd>
        </div>
        <button
          className="relative flex h-[38px] w-[38px] items-center justify-center rounded-full border-[1.5px] border-[#E9ECF1] bg-[#F5F7FA] text-[#8C98A6] transition-colors hover:border-[#2BA08F] hover:bg-white hover:text-[#2BA08F]"
          aria-label="Notifications"
        >
          <BellIcon className="h-[18px] w-[18px]" />
          <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full border-2 border-[#F5F7FA] bg-[#e74c3c]" />
        </button>
      </div>
    </header>
  );
}

function MobileNav() {
  const pathname = usePathname();
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-30 flex border-t border-black/5 bg-white/90 backdrop-blur-xl vc-safe-bottom lg:hidden"
    >
      {MOBILE_ITEMS.map((item) => {
        const active = isActive(item, pathname);
        const Icon = item.icon;
        return (
          <Link
            key={item.key}
            href={item.href as never}
            className="flex flex-1 flex-col items-center justify-center gap-1 py-2.5 transition-colors"
          >
            <Icon
              className={`h-[22px] w-[22px] ${active ? "text-[#2BA08F]" : "text-[#8C98A6]"}`}
            />
            <span
              className={`text-[0.66rem] font-semibold ${active ? "text-[#2BA08F]" : "text-[#8C98A6]"}`}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}

export function AppShell({
  title,
  subtitle,
  children,
  fab,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  fab?: React.ReactNode;
}) {
  const [sbOpen, setSbOpen] = useState(false);
  return (
    <div className="flex min-h-screen">
      <Sidebar open={sbOpen} onClose={() => setSbOpen(false)} />
      <div className="flex min-h-screen flex-1 flex-col lg:ml-[260px]">
        <Header title={title} subtitle={subtitle} onMenu={() => setSbOpen(true)} />
        <main className="flex-1 px-4 pt-5 pb-24 md:px-7 md:pb-12 vc-fade-in">{children}</main>
        {fab}
      </div>
      <MobileNav />
    </div>
  );
}

export { AlertIcon };
