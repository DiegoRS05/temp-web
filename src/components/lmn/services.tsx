"use client";

import { Reveal } from "./reveal";
import { CalendarCheck, BadgePercent, Clock3, Info } from "lucide-react";
import { BUSINESS, SERVICES } from "./data";

export function Services() {
  return (
    <section id="servicios" className="relative overflow-hidden py-24 sm:py-32">
      <div className="blob left-[-10%] top-[20%] h-[400px] w-[400px] bg-gold" style={{ "--d": "-6s" } as React.CSSProperties} />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-neon">Servicios</p>
          <h2 className="font-display mt-4 text-[clamp(2.6rem,6vw,4.6rem)] leading-[0.95] text-cream">
            La carta de <span className="text-neon">La Mano Negra</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-cream/70 sm:text-lg">
            Precios reales de nuestra agenda online en Booksy. Todos los cortes incluyen
            lavado, acabado con productos específicos y ese consejo que necesitas para
            repetirlo en casa.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {SERVICES.map((group, gi) => (
            <Reveal key={group.group} delay={gi * 90} className={group.group === "Barba" ? "lg:row-span-2" : ""}>
              <div className="card-glow h-full rounded-2xl border border-white/10 bg-[#101014] p-6 sm:p-8">
                <h3 className="flex items-center gap-3 font-display text-3xl uppercase tracking-wide text-cream">
                  <span className="barber-pole inline-block h-6 w-2.5 rounded-full" aria-hidden="true" />
                  {group.group}
                  <span className="ml-auto text-sm font-sans normal-case tracking-normal text-cream/35">
                    {group.items.length} {group.items.length === 1 ? "servicio" : "servicios"}
                  </span>
                </h3>

                <ul className="mt-6 space-y-5">
                  {group.items.map((s) => (
                    <li key={s.name} className="group/item relative rounded-xl p-3 transition-colors duration-300 hover:bg-white/[0.04]">
                      {s.tag && (
                        <span className="absolute -top-2.5 right-3 z-10 rounded-full bg-gold px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-black">
                          {s.tag}
                        </span>
                      )}
                      <div className="flex items-baseline gap-3">
                        <h4 className="text-base font-bold text-cream transition-colors group-hover/item:text-gold">
                          {s.name}
                        </h4>
                        <span className="flex-1 border-b border-dotted border-white/20" aria-hidden="true" />
                        <span className="font-display text-2xl text-neon">{s.price}</span>
                      </div>
                      <p className="mt-1.5 flex items-start gap-2 text-sm leading-relaxed text-cream/55">
                        <Clock3 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cream/35" />
                        <span>
                          <span className="font-semibold text-cream/70">{s.duration}</span> · {s.desc}
                        </span>
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120} className="mt-10">
          <div className="relative overflow-hidden rounded-2xl border border-gold/25 bg-gradient-to-r from-gold/[0.09] via-transparent to-neon/[0.09] p-6 sm:p-8">
            <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gold/15 text-gold">
                  <BadgePercent className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="text-lg font-bold text-cream">¿Cada semana en la silla?</h3>
                  <p className="mt-1 max-w-xl text-sm leading-relaxed text-cream/60">
                    Los mantenimientos semanales salen por menos: corte semanal 17 € y
                    corte + barba semanal 20 €. Siempre fresco, sin desayunarte la cartera.
                  </p>
                </div>
              </div>
              <a
                href={BUSINESS.booksyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shine inline-flex shrink-0 items-center gap-2 rounded-full bg-cream px-6 py-3.5 text-sm font-bold uppercase tracking-[0.12em] text-black transition-all duration-300 hover:scale-[1.04] hover:bg-gold active:scale-95"
              >
                <CalendarCheck className="h-4.5 w-4.5" />
                Reservar en Booksy
              </a>
            </div>
          </div>
          <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-cream/40">
            <Info className="h-3.5 w-3.5" />
            Precios actualizados desde Booksy. El «corte fuera de hora» requiere consultar disponibilidad por Instagram o teléfono.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
