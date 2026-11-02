"use client";

import { Reveal } from "./reveal";
import { Star, Quote, BadgeCheck } from "lucide-react";
import { BUSINESS, REVIEWS } from "./data";

function Stars({ n = 5 }: { n?: number }) {
  return (
    <p className="flex items-center gap-0.5" aria-label={`${n} de 5 estrellas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < n ? "fill-gold text-gold" : "text-cream/25"}`}
        />
      ))}
    </p>
  );
}

export function Reviews() {
  return (
    <section id="opiniones" className="relative overflow-hidden py-24 sm:py-32">
      <div className="blob right-[-10%] bottom-[0%] h-[380px] w-[380px] bg-neon" style={{ "--d": "-9s" } as React.CSSProperties} />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-neon">Opiniones</p>
          <h2 className="font-display mt-4 text-[clamp(2.6rem,6vw,4.6rem)] leading-[0.95] text-cream">
            Lo que dicen <span className="text-neon">en Google</span>
          </h2>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-cream/80">
              <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"/>
                <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15A11 11 0 0 0 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52Z"/>
              </svg>
              <span className="font-bold tabular">4,9</span>
              <Stars />
              <span className="text-cream/45">· {BUSINESS.googleReviews} reseñas</span>
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-cream/80">
              <BadgeCheck className="h-4 w-4 text-neon" />
              <span className="font-bold tabular">5,0</span>
              <Stars />
              <span className="text-cream/45">· 1.028 en Booksy</span>
            </span>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.name} delay={i * 110}>
              <figure className="card-glow relative flex h-full flex-col rounded-2xl border border-white/10 bg-[#101014] p-7">
                <Quote className="absolute right-6 top-6 h-8 w-8 text-white/[0.06]" aria-hidden="true" />
                <blockquote className="flex-1">
                  <Stars n={r.rating} />
                  <p className="mt-4 text-[15px] leading-relaxed text-cream/80">«{r.text}»</p>
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3.5 border-t border-white/[0.07] pt-5">
                  <span
                    className="font-display grid h-11 w-11 place-items-center rounded-full text-xl text-white"
                    style={{
                      background: `linear-gradient(135deg, hsl(${r.hue} 75% 52%), hsl(${(r.hue + 40) % 360} 70% 38%))`,
                    }}
                    aria-hidden="true"
                  >
                    {r.initial}
                  </span>
                  <span>
                    <span className="block text-sm font-bold text-cream">{r.name}</span>
                    <span className="block text-[11px] uppercase tracking-[0.14em] text-cream/45">
                      Reseña en Google Maps
                    </span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal delay={140} className="mt-8 text-center">
          <a
            href={BUSINESS.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline inline-block text-sm font-semibold text-cream/70 transition-colors hover:text-cream"
          >
            Ver las 231 reseñas en Google Maps →
          </a>
        </Reveal>
      </div>
    </section>
  );
}
