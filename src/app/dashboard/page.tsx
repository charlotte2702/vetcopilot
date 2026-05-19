import { AppShell } from "@/components/AppShell";
import { AppointmentRow } from "@/components/AppointmentRow";
import {
  AlertIcon,
  BrainIcon,
  CalendarIcon,
  CheckIcon,
  ClockIcon,
  FileTextIcon,
  PawIcon,
  PlusIcon,
  SparkleIcon,
} from "@/components/icons";
import Link from "next/link";
import {
  ANIMALS,
  APPOINTMENTS,
  CURRENT_USER,
  NOTIFICATIONS,
} from "@/lib/mock-data";

function StatCard({
  icon,
  iconBg,
  value,
  label,
  change,
  changeTone,
}: {
  icon: React.ReactNode;
  iconBg: string;
  value: string | number;
  label: string;
  change?: string;
  changeTone?: "up" | "down" | "neutral";
}) {
  const toneColor =
    changeTone === "up"
      ? "text-[#27ae60]"
      : changeTone === "down"
        ? "text-[#e74c3c]"
        : "text-[#8C98A6]";
  return (
    <div className="vc-card">
      <div className="flex items-center gap-3.5">
        <div
          className="flex h-[46px] w-[46px] flex-shrink-0 items-center justify-center rounded-[13px]"
          style={{ background: iconBg }}
        >
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-display text-[1.6rem] font-extrabold leading-none text-[#0B1D34]">
            {value}
          </div>
          <div className="mt-1 text-[0.73rem] text-[#8C98A6]">{label}</div>
          {change && (
            <div className={`mt-1 text-[0.65rem] font-bold ${toneColor}`}>{change}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const totalToday = APPOINTMENTS.length;
  const urgent = APPOINTMENTS.filter((a) => a.status === "urg").length;
  const done = APPOINTMENTS.filter((a) => a.status === "done").length;
  const crPending = 2;
  const firstName = CURRENT_USER.name.split(" ").slice(1).join(" ");

  const now = "10:23";
  const next = APPOINTMENTS.find((a) => a.status === "ok" || a.status === "wait");
  const unreadNotifs = NOTIFICATIONS.filter((n) => n.unread).slice(0, 3);

  return (
    <AppShell title="Tableau de bord" subtitle="Vue d'ensemble de votre journée">
      {/* Welcome banner */}
      <div className="vc-welcome mb-5 vc-slide-up">
        <div className="relative z-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-[1.6rem] leading-tight">
              Bonjour, {firstName}.
            </h2>
            <p className="mt-1 max-w-md text-sm text-white/65">
              Vous avez <strong className="text-white">{totalToday} consultations</strong>{" "}
              prévues aujourd&apos;hui, dont <strong className="text-white">{urgent} urgentes</strong>.
              Excellente journée à vous.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href={"/diagnostic" as never} className="vc-btn vc-btn-primary">
              <BrainIcon className="h-4 w-4" /> Aide diagnostic
            </Link>
            <Link href={"/planning" as never} className="vc-btn vc-btn-gold">
              <CalendarIcon className="h-4 w-4" /> Voir le planning
            </Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard
          icon={<CalendarIcon className="h-5 w-5 text-[#2BA08F]" />}
          iconBg="rgba(43,160,143,0.12)"
          value={totalToday}
          label="RDV aujourd'hui"
          change="+12% vs hier"
          changeTone="up"
        />
        <StatCard
          icon={<AlertIcon className="h-5 w-5 text-[#e74c3c]" />}
          iconBg="rgba(231,76,60,0.12)"
          value={urgent}
          label="Cas urgents"
          change="Priorité"
          changeTone="down"
        />
        <StatCard
          icon={<CheckIcon className="h-5 w-5 text-[#27ae60]" />}
          iconBg="rgba(46,204,113,0.12)"
          value={done}
          label="Consult. réalisées"
          change={`${Math.round((done / totalToday) * 100)}% du jour`}
          changeTone="up"
        />
        <StatCard
          icon={<FileTextIcon className="h-5 w-5 text-[#C8A45C]" />}
          iconBg="rgba(200,164,92,0.12)"
          value={crPending}
          label="CR à rédiger"
          change="À traiter"
          changeTone="neutral"
        />
      </div>

      {/* Two-col content */}
      <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
        {/* Upcoming appointments */}
        <div className="vc-card">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-display text-[1.05rem] text-[#0B1D34]">
                Prochains rendez-vous
              </h3>
              <p className="text-[0.72rem] text-[#8C98A6]">Aujourd&apos;hui — Mardi 19 mai</p>
            </div>
            <Link
              href={"/planning" as never}
              className="text-[0.78rem] font-semibold text-[#2BA08F] hover:underline"
            >
              Tout voir →
            </Link>
          </div>
          <div className="space-y-2">
            {APPOINTMENTS.slice(0, 5).map((apt) => {
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
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#F5F7FA] pt-4">
            <div className="flex items-center gap-2 text-[0.78rem] text-[#8C98A6]">
              <ClockIcon className="h-4 w-4 text-[#2BA08F]" />
              <span>
                Maintenant {now} — prochain RDV :{" "}
                <strong className="text-[#0B1D34]">{next?.time}</strong>
              </span>
            </div>
            <button className="vc-btn vc-btn-outline vc-btn-sm">
              <PlusIcon className="h-3.5 w-3.5" /> Nouveau RDV
            </button>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-5">
          {/* Quick actions card */}
          <div className="vc-card-dark relative">
            <div className="relative z-10">
              <div className="mb-1 flex items-center gap-2 text-[#2BA08F]">
                <SparkleIcon className="h-4 w-4" />
                <span className="text-[0.65rem] font-bold uppercase tracking-widest">
                  Assistant IA
                </span>
              </div>
              <h3 className="mb-1.5 font-display text-[1.15rem] text-white">
                Lancer une consultation
              </h3>
              <p className="mb-4 text-[0.82rem] text-white/55">
                Saisissez les symptômes, l&apos;IA propose les hypothèses et examens.
              </p>
              <Link href={"/diagnostic" as never} className="vc-btn vc-btn-primary w-full justify-center">
                Démarrer
              </Link>
            </div>
          </div>

          {/* Alerts */}
          <div className="vc-card">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-display text-[1.05rem] text-[#0B1D34]">Alertes</h3>
              <span className="vc-tag vc-tag-red">{unreadNotifs.length} non lues</span>
            </div>
            <div className="space-y-3">
              {unreadNotifs.map((n) => (
                <div key={n.id} className="flex gap-3">
                  <span
                    className={`mt-1 h-2 w-2 flex-shrink-0 rounded-full ${
                      n.type === "urg"
                        ? "bg-[#e74c3c]"
                        : n.type === "apt"
                          ? "bg-[#2BA08F]"
                          : "bg-[#C8A45C]"
                    }`}
                  />
                  <div className="min-w-0">
                    <div className="truncate text-[0.82rem] font-semibold text-[#0B1D34]">
                      {n.title}
                    </div>
                    <div className="line-clamp-2 text-[0.74rem] text-[#8C98A6]">{n.text}</div>
                    <div className="mt-0.5 text-[0.66rem] text-[#8C98A6]">{n.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick patients */}
          <div className="vc-card">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-display text-[1.05rem] text-[#0B1D34]">Patients récents</h3>
              <Link href={"/animals" as never} className="text-[0.74rem] font-semibold text-[#2BA08F] hover:underline">
                Tous →
              </Link>
            </div>
            <div className="space-y-2">
              {ANIMALS.slice(0, 3).map((a) => (
                <Link
                  key={a.id}
                  href={`/animals/${a.id}` as never}
                  className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-[#F5F7FA]"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#F5F7FA]">
                    <PawIcon className="h-4 w-4 text-[#2BA08F]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[0.84rem] font-semibold text-[#0B1D34]">
                      {a.name} <span className="text-[#8C98A6]">· {a.breed}</span>
                    </div>
                    <div className="truncate text-[0.7rem] text-[#8C98A6]">{a.owner}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
