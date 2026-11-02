"use client";

import { useEffect, useState } from "react";
import { Reveal } from "./reveal";
import { Clock3, CalendarCheck } from "lucide-react";
import { BUSINESS, SCHEDULE } from "./data";

interface Status {
  open: boolean;
  label: string;
}

/** Estado abierto/cerrado calculado en la hora local (España). */
function computeStatus(now: Date): Status {
  // hora de España/Madrid desde cualquier zona
  const fmt = new Intl.DateTimeFormat("es-ES", {
    timeZone: "Europe/Madrid",
    weekday: "long",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  });
  const parts = fmt.formatToParts(now);
  const weekday = parts.find((p) => p.type === "weekday")?.value ?? "";
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? "0");
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? "0");
  const t = hour * 60 + minute; // minutos desde medianoche

  const ranges: Record<string, [number, number][]> = {
    martes: [[600, 900], [960, 1230]],
    miércoles: [[600, 900], [960, 1230]],
    jueves: [[600, 900], [960, 1230]],
    viernes: [[600, 900], [960, 1230]],
    sábado: [[540, 960]],
    domingo: [],
    lunes: [],
  };
  const today = ranges[weekday] ?? [];
  const dayNames = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
  const todayIdx = dayNames.indexOf(weekday);

  const min = (r: [number, number]) => r[0];
  const hhmm = (m: number) => `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;

  const active = today.find((r) => t >= r[0] && t < r[1]);
  if (active) {
    return { open: true, label: `Abierto ahora · hasta las ${hhmm(active[1])}` };
  }
  const nextToday = today.find((r) => t < min(r));
  if (nextToday) {
    return { open: false, label: `Cerrado · hoy abrimos a las ${hhmm(nextToday[0])}` };
  }
  // buscar el próximo día con horario (máx. 7 iteraciones)
  for (let i = 1; i <= 7; i++) {
    const d = (todayIdx + i) % 7;
    const rs = ranges[dayNames[d]];
    if (rs && rs.length) {
      const when = i === 1 ? "mañana" : `el ${dayNames[d]}`;
      return { open: false, label: `Cerrado · abrimos ${when} a las ${hhmm(min(rs))}` };
    }
  }
  return { open: false, label: "Horario no disponible" };
}

const TODAY_INDEX = () => {
  // JS: 0=domingo…6=sábado → coincide con jsDay de SCHEDULE
  return new Date().getDay();
};

export function Hours() {
  const [status, setStatus] = useState<Status | null>(null);
  const [today, setToday] = useState<number>(-1);

  useEffect(() => {
    const update = () => {
      setStatus(computeStatus(new Date()));
      setToday(new Date().getDay());
    };
    update();
    const iv = setInterval(update, 60_000);
    return () => clearInterval(iv);
  }, []);

  return (
    <section id="horario" className="relative py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-neon">
            <Clock3 className="h-3.5 w-3.5" />
            Horario
          </p>
          <h2 className="font-display mt-4 text-[clamp(2.6rem,6vw,4.6rem)] leading-[0.95] text-cream">
            ¿Cuándo <span className="text-neon">te toca?</span>
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-cream/70">
            Trabajamos con cita previa para dedicarte la silla entera a ti. Elige tu
            hueco en Booksy y ven con calma: sin zonas de espera.
          </p>

          {/* estado en vivo */}
          <div
            className={`mt-8 inline-flex items-center gap-3.5 rounded-2xl border px-5 py-4 transition-colors duration-500 ${
              status?.open
                ? "border-emerald-400/40 bg-emerald-400/[0.07]"
                : "border-neon/40 bg-neon/[0.07]"
            }`}
            aria-live="polite"
          >
            <span className={`relative grid h-3.5 w-3.5 place-items-center ${status?.open ? "text-emerald-400" : "text-neon"}`}>
              <span className="dot-ping absolute inset-0 rounded-full" />
              <span className="relative h-3 w-3 rounded-full bg-current" />
            </span>
            <span className="text-sm font-bold text-cream">
              {status ? status.label : "Comprobando horario…"}
            </span>
          </div>

          <div className="mt-8">
            <a
              href={BUSINESS.booksyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shine inline-flex items-center gap-2.5 rounded-full bg-neon px-7 py-3.5 text-sm font-bold uppercase tracking-[0.14em] text-white shadow-[0_14px_44px_-10px_rgba(255,46,63,0.75)] transition-all duration-300 hover:scale-[1.045] active:scale-95"
            >
              <CalendarCheck className="h-4.5 w-4.5" />
              Elegir mi hueco
            </a>
          </div>
        </Reveal>

        {/* tabla de horario */}
        <Reveal dir="right" delay={120}>
          <div className="card-glow overflow-hidden rounded-2xl border border-white/10 bg-[#101014]">
            <div className="barber-pole h-1.5 w-full" aria-hidden="true" />
            <ul className="divide-y divide-white/[0.06]">
              {SCHEDULE.map((d) => {
                const isToday = d.jsDay === today;
                return (
                  <li
                    key={d.day}
                    className={`flex items-center justify-between gap-4 px-6 py-4 transition-colors duration-500 ${
                      isToday ? "bg-neon/[0.08]" : "hover:bg-white/[0.03]"
                    }`}
                    aria-current={isToday ? "date" : undefined}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className={`h-2 w-2 rounded-full ${
                          isToday ? "bg-neon shadow-[0_0_12px_rgba(255,46,63,0.9)]" : d.ranges[0] === "Cerrado" ? "bg-white/15" : "bg-gold/70"
                        }`}
                        aria-hidden="true"
                      />
                      <span className={`text-[15px] ${isToday ? "font-bold text-cream" : "font-medium text-cream/75"}`}>
                        {d.day}
                      </span>
                      {isToday && (
                        <span className="rounded-full bg-neon px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-white">
                          Hoy
                        </span>
                      )}
                    </span>
                    <span className="text-right">
                      {d.ranges[0] === "Cerrado" ? (
                        <span className="text-sm font-semibold uppercase tracking-[0.1em] text-cream/35">Cerrado</span>
                      ) : (
                        d.ranges.map((r) => (
                          <span key={r} className={`block text-sm tabular ${isToday ? "font-bold text-cream" : "text-cream/65"}`}>
                            {r}
                          </span>
                        ))
                      )}
                    </span>
                  </li>
                );
              })}
            </ul>
            <p className="border-t border-white/[0.06] px-6 py-3.5 text-center text-[11px] uppercase tracking-[0.16em] text-cream/40">
              Horario oficial de Google Maps
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
