import { Scissors } from "lucide-react";
import { MARQUEE_WORDS } from "./data";

/** Cinta infinita tipo marquesina. CSS puro (GPU) → sin tirones. */
export function Marquee({ reverse = false }: { reverse?: boolean }) {
  const items = [...MARQUEE_WORDS, ...MARQUEE_WORDS];
  return (
    <div
      className={`relative overflow-hidden border-y border-white/[0.07] bg-[#101014] py-4 ${
        reverse ? "marquee-reverse marquee-paused" : "marquee-paused"
      }`}
      aria-hidden="true"
    >
      <div className="marquee-track flex w-max items-center gap-8 pr-8" style={{ "--speed": "32s" } as React.CSSProperties}>
        {items.map((w, i) => (
          <span key={i} className="flex items-center gap-8">
            <span className="font-display text-2xl uppercase tracking-[0.08em] text-cream/85">{w}</span>
            <Scissors className="h-4 w-4 shrink-0 text-neon" />
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#0a0a0c] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#0a0a0c] to-transparent" />
    </div>
  );
}

/** Franja divisoria de barbería animada (como el poste clásico). */
export function BarberPole() {
  return <div className="barber-pole h-2 w-full opacity-80" aria-hidden="true" />;
}
