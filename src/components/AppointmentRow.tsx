import Link from "next/link";
import { EMOJI } from "@/lib/mock-data";
import type { Appointment } from "@/lib/types";

const STATUS_STYLES: Record<Appointment["status"], { label: string; classes: string }> = {
  ok: { label: "Confirmé", classes: "bg-[rgba(43,160,143,0.08)] text-[#2BA08F]" },
  wait: { label: "En attente", classes: "bg-[rgba(200,164,92,0.08)] text-[#C8A45C]" },
  urg: { label: "Urgent", classes: "bg-[rgba(231,76,60,0.08)] text-[#e74c3c]" },
  done: { label: "Terminé", classes: "bg-[rgba(46,204,113,0.08)] text-[#27ae60]" },
};

const AVATAR_BG: Record<Appointment["avatar"], string> = {
  dog: "bg-[rgba(43,160,143,0.08)]",
  cat: "bg-[rgba(200,164,92,0.08)]",
  bird: "bg-[rgba(231,76,60,0.08)]",
  rabbit: "bg-[rgba(11,29,52,0.05)]",
  hamster: "bg-[rgba(231,76,60,0.08)]",
  horse: "bg-[rgba(11,29,52,0.05)]",
};

export function AppointmentRow({
  apt,
  animalId,
  background = true,
}: {
  apt: Appointment;
  animalId?: number;
  background?: boolean;
}) {
  const st = STATUS_STYLES[apt.status];
  const body = (
    <div
      className={`flex items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-white hover:shadow-sm ${
        background ? "bg-[#F5F7FA]" : ""
      }`}
    >
      <div className="min-w-[44px] flex-shrink-0 text-[0.76rem] font-bold text-[#2BA08F]">
        {apt.time}
      </div>
      <div
        className={`flex h-[38px] w-[38px] flex-shrink-0 items-center justify-center rounded-[11px] text-[1.05rem] ${AVATAR_BG[apt.avatar]}`}
      >
        {EMOJI[apt.avatar]}
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-[0.86rem] font-semibold text-[#0B1D34]">
          {apt.animalName} <span className="text-[#8C98A6]">· {apt.ownerName}</span>
        </div>
        <div className="truncate text-[0.74rem] text-[#8C98A6]">{apt.reason}</div>
      </div>
      <span className={`flex-shrink-0 rounded-full px-2 py-0.5 text-[0.66rem] font-semibold ${st.classes}`}>
        {st.label}
      </span>
    </div>
  );
  return animalId ? (
    <Link href={`/animals/${animalId}` as never} className="block">
      {body}
    </Link>
  ) : (
    body
  );
}
