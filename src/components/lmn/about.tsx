"use client";

import { Reveal } from "./reveal";
import { CreditCard, PawPrint, Wifi, CalendarClock, Users, Sparkles } from "lucide-react";

const FEATURES = [
  { icon: Users, label: "Peluquería unisex", desc: "Para todo el mundo, sin etiquetas" },
  { icon: CalendarClock, label: "Solo con cita previa", desc: "Sin esperas ni zonas de espera" },
  { icon: CreditCard, label: "Tarjeta aceptada", desc: "Pago con tarjeta de crédito" },
  { icon: PawPrint, label: "Mascotas bienvenidas", desc: "Tu peludo puede acompañarte" },
  { icon: Wifi, label: "Wi-Fi en el local", desc: "Conéctate mientras te arreglas" },
];

export function About() {
  return (
    <section id="nosotros" className="relative overflow-hidden py-24 sm:py-32">
      <div className="blob right-[-12%] top-[10%] h-[380px] w-[380px] bg-neon" style={{ "--d": "-4s" } as React.CSSProperties} />

      <div className="mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:gap-12">
        {/* ─── Collage enmarcado ─── */}
        <div className="relative order-2 mx-auto w-full max-w-[560px] lg:order-1">
          <Reveal dir="zoom">
            <div className="frame">
              <div className="overflow-hidden rounded-2xl border border-white/10 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.85)]">
                <img
                  src="/img/silla-g-900.webp"
                  alt="Silla de barbería clásica en el interior de La Mano Negra"
                  width={900}
                  height={506}
                  loading="lazy"
                  className="h-auto w-full object-cover"
                />
              </div>
            </div>
          </Reveal>

          <Reveal dir="left" delay={150} className="absolute -bottom-10 -left-2 w-[52%] sm:-left-8">
            <div className="frame frame-2">
              <div className="overflow-hidden rounded-xl border border-white/10 bg-[#101014] shadow-[0_30px_60px_-25px_rgba(0,0,0,0.9)]">
                <img
                  src="/img/corte-t-560.webp"
                  alt="Corte de pelo en curso en La Mano Negra"
                  width={560}
                  height={315}
                  loading="lazy"
                  className="h-auto w-full object-cover"
                />
              </div>
            </div>
          </Reveal>

          <Reveal dir="right" delay={280} className="absolute -right-2 -top-8 w-[44%] sm:-right-7">
            <div className="frame">
              <div className="overflow-hidden rounded-xl border border-white/10 bg-[#101014] shadow-[0_30px_60px_-25px_rgba(0,0,0,0.9)]">
                <img
                  src="/img/fachada-t-560.webp"
                  alt="Fachada de La Mano Negra con su rótulo de neón rojo"
                  width={560}
                  height={409}
                  loading="lazy"
                  className="h-auto w-full object-cover"
                />
              </div>
            </div>
          </Reveal>

          {/* pegatina giratoria */}
          <Reveal delay={380} className="absolute -bottom-8 right-6 hidden sm:block">
            <div className="float-y rounded-2xl border border-gold/40 bg-[#141419]/95 px-4 py-3 shadow-xl backdrop-blur-md" style={{ "--d": "-1.5s" } as React.CSSProperties}>
              <p className="font-display text-2xl leading-none text-gold">Rúa Cordonería 8</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-cream/50">El centro de A Coruña</p>
            </div>
          </Reveal>
        </div>

        {/* ─── Texto ─── */}
        <div className="order-1 lg:order-2">
          <Reveal>
            <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-neon">
              <Sparkles className="h-3.5 w-3.5" />
              Nosotros
            </p>
            <h2 className="font-display mt-4 text-[clamp(2.6rem,6vw,4.6rem)] leading-[0.95] text-cream">
              Claridad, trato directo <span className="text-neon">y mucho estilo</span>
            </h2>
          </Reveal>

          <Reveal delay={120}>
            <p className="mt-6 text-base leading-relaxed text-cream/70 sm:text-lg">
              En La Mano Negra creemos que un buen corte empieza por escuchar. La claridad,
              el trato directo y la implicación son fundamentales en nuestra forma de
              trabajar: te asesoramos, te proponemos y cortamos con precisión, desde los
              looks más clásicos hasta los más actuales.
            </p>
            <p className="mt-4 text-base leading-relaxed text-cream/70 sm:text-lg">
              Somos tu peluquería <span className="text-cream">unisex</span> en el centro de A Coruña.
              Cada servicio acaba con productos específicos y ese detalle que hace que
              salgas del local queriendo volver.
            </p>
          </Reveal>

          <ul className="mt-9 grid gap-3 sm:grid-cols-2">
            {FEATURES.map((f, i) => (
              <Reveal key={f.label} delay={160 + i * 80} className={i === FEATURES.length - 1 ? "sm:col-span-2" : ""}>
                <li className="card-glow flex items-center gap-3.5 rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-neon/10 text-neon">
                    <f.icon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-sm font-bold text-cream">{f.label}</span>
                    <span className="block text-xs text-cream/50">{f.desc}</span>
                  </span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
