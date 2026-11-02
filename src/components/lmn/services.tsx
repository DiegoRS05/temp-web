"use client";

import { Reveal } from "./reveal";
import { CalendarCheck, BadgePercent, Clock3, Info } from "lucide-react";
import { BUSINESS, SERVICES, type Service } from "./data";

/**
 * Composición tipo «carta de barbería», encuadrada sin huecos vacíos:
 *  - CORTE (4 servicios) → tarjeta protagonista a la izquierda (7/12).
 *  - BARBA + PACKS → apiladas a la derecha (5/12), igualando la altura de Corte.
 *  - EXTRAS → franja horizontal a todo el ancho, a modo de nota final del menú.
 * En móvil todo se apila en orden natural: Corte → Barba → Packs → Extras.
 */

type Accent = {
  pole: string; // variante de color del poste
  glow: string; // variante de brillo del card al hover
  line: string; // color de la línea de encuadre superior
  price: string; // color del precio
  nameHover: string; // color del nombre al hover
};

const ACCENTS: Record<string, Accent> = {
  Corte: {
    pole: "",
    glow: "",
    line: "via-neon/50",
    price: "text-neon",
    nameHover: "group-hover/item:text-neon",
  },
  Barba: {
    pole: "barber-pole-gold",
    glow: "card-glow-gold",
    line: "via-gold/60",
    price: "text-gold",
    nameHover: "group-hover/item:text-gold",
  },
  Packs: {
    pole: "",
    glow: "card-glow-duo",
    line: "via-gold/60",
    price: "bg-gradient-to-r from-gold to-neon bg-clip-text text-transparent",
    nameHover: "group-hover/item:text-gold",
  },
  Extras: {
    pole: "barber-pole-cream",
    glow: "card-glow-cream",
    line: "via-cream/40",
    price: "text-cream",
    nameHover: "group-hover/item:text-cream",
  },
};

type ServiceGroup = (typeof SERVICES)[number];

function GroupCard({
  group,
  index,
  variant,
}: {
  group: ServiceGroup;
  index: string;
  variant: "main" | "side";
}) {
  const accent = ACCENTS[group.group] ?? ACCENTS.Corte;
  const isMain = variant === "main";

  return (
    <article
      className={`card-glow ${accent.glow} relative flex h-full flex-col rounded-2xl border border-white/10 bg-[#101014] ${
        isMain ? "p-6 sm:p-8" : "p-5 sm:p-6"
      }`}
    >
      {/* Línea de encuadre superior */}
      <span
        aria-hidden="true"
        className={`absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent ${accent.line} to-transparent`}
      />
      {/* Numeral de fondo */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-2 right-4 z-0 font-display text-8xl leading-none text-cream/[0.05] select-none"
      >
        {index}
      </span>

      <div className="relative z-10 flex h-full flex-col">
        <h3
          className={`flex items-center gap-3 font-display uppercase tracking-wide text-cream ${
            isMain ? "text-3xl" : "text-2xl"
          }`}
        >
          <span
            className={`barber-pole ${accent.pole} inline-block rounded-full ${
              isMain ? "h-6 w-2.5" : "h-5 w-2"
            }`}
            aria-hidden="true"
          />
          {group.group}
          <span className="ml-auto font-sans text-sm normal-case tracking-normal text-cream/35">
            {group.items.length} {group.items.length === 1 ? "servicio" : "servicios"}
          </span>
        </h3>

        <ul
          className={
            isMain
              ? "mt-6 space-y-5"
              : "mt-5 flex flex-1 flex-col justify-center space-y-4"
          }
        >
          {group.items.map((s) => (
            <li
              key={s.name}
              className="group/item relative rounded-xl p-3 transition-colors duration-300 hover:bg-white/[0.04]"
            >
              {s.tag && (
                <span className="absolute -top-2.5 right-3 z-10 rounded-full bg-gold px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-black">
                  {s.tag}
                </span>
              )}
              <div className="flex items-baseline gap-3">
                <h4
                  className={`text-base font-bold text-cream transition-colors ${accent.nameHover}`}
                >
                  {s.name}
                </h4>
                <span className="flex-1 border-b border-dotted border-white/20" aria-hidden="true" />
                <span className={`font-display text-2xl ${accent.price}`}>{s.price}</span>
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
    </article>
  );
}

export function Services() {
  const main = SERVICES[0]; // Corte
  const side = SERVICES.slice(1, 3); // Barba, Packs
  const strip = SERVICES[3]; // Extras
  const indexOf = (g: ServiceGroup) => `0${SERVICES.indexOf(g) + 1}`;

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

        {/* Parrilla bento: Corte | Barba+Packs */}
        <div className="mt-14 grid gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <GroupCard group={main} index={indexOf(main)} variant="main" />
          </Reveal>

          <div className="flex flex-col gap-6 lg:col-span-5">
            {side.map((g, i) => (
              <Reveal key={g.group} delay={90 + i * 80} className="flex-1">
                <GroupCard group={g} index={indexOf(g)} variant="side" />
              </Reveal>
            ))}
          </div>
        </div>

        {/* Extras: franja horizontal a todo el ancho */}
        <Reveal delay={100} className="mt-6">
          <article className="card-glow card-glow-cream relative rounded-2xl border border-white/10 bg-[#101014] px-6 py-5 sm:px-8">
            <span
              aria-hidden="true"
              className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-cream/40 to-transparent"
            />
            <div className="relative z-10 flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-6">
              <h3 className="flex shrink-0 items-center gap-3 font-display text-2xl uppercase tracking-wide text-cream">
                <span className="barber-pole barber-pole-cream inline-block h-5 w-2 rounded-full" aria-hidden="true" />
                {strip.group}
              </h3>
              {strip.items.map((s: Service) => (
                <div key={s.name} className="flex min-w-0 flex-1 flex-wrap items-center gap-x-3 gap-y-2">
                  <h4 className="text-base font-bold text-cream">{s.name}</h4>
                  <span className="hidden min-w-8 flex-1 border-b border-dotted border-white/20 sm:block" aria-hidden="true" />
                  <span className={`font-display text-2xl ${ACCENTS.Extras.price}`}>{s.price}</span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1 text-xs text-cream/60">
                    <Clock3 className="h-3 w-3" />
                    {s.duration}
                  </span>
                  <p className="w-full text-sm text-cream/55 lg:ml-auto lg:w-auto lg:max-w-[280px] lg:text-right">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </article>
        </Reveal>

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
