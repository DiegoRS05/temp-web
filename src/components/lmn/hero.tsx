"use client";

import { useEffect, useRef } from "react";
import { Star, MapPin, ArrowDown, CalendarCheck, Sparkles } from "lucide-react";
import { BUSINESS } from "./data";

export function Hero() {
  const imgRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // parallax sutil (solo transform, rAF → sin tirones en móvil)
  useEffect(() => {
    const img = imgRef.current;
    const section = sectionRef.current;
    if (!img || !section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = Math.min(window.scrollY, window.innerHeight);
        img.style.transform = `translate3d(0, ${y * 0.12}px, 0) scale(${1 + y * 0.00006})`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      id="inicio"
      ref={sectionRef}
      className="grain relative flex min-h-[100svh] items-center overflow-hidden pt-24 pb-16 sm:pt-28"
    >
      {/* fondos */}
      <div className="blob left-[-10%] top-[-10%] h-[420px] w-[420px] bg-neon" style={{ "--d": "0ms" } as React.CSSProperties} />
      <div className="blob bottom-[-20%] right-[-8%] h-[460px] w-[460px] bg-gold" style={{ "--d": "-7s" } as React.CSSProperties} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,#0a0a0c_78%)]" />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        {/* ─── Texto ─── */}
        <div className="text-center lg:text-left">
          <p
            className="hero-rise mx-auto inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/[0.08] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold lg:mx-0"
            style={{ "--d": "50ms" } as React.CSSProperties}
          >
            <Sparkles className="h-3.5 w-3.5" />
            Barbería & Peluquería unisex
          </p>

          <h1 className="font-display mt-5 text-[clamp(4.2rem,14vw,10.5rem)] leading-[0.88] text-cream">
            <span className="hero-rise block" style={{ "--d": "150ms" } as React.CSSProperties}>
              LA MANO
            </span>
            <span className="hero-rise neon-text block" style={{ "--d": "280ms" } as React.CSSProperties}>
              NEGRA
            </span>
          </h1>

          <p
            className="hero-rise mx-auto mt-6 max-w-xl text-balance text-base leading-relaxed text-cream/70 sm:text-lg lg:mx-0"
            style={{ "--d": "400ms" } as React.CSSProperties}
          >
            Tu peluquería en el corazón de A Coruña. Cortes, barba y estilo con las
            mejores técnicas y un trato cercano. <span className="text-cream">Solo con cita previa</span> —
            reserva en un minuto.
          </p>

          <div
            className="hero-rise mt-8 flex flex-col items-center gap-3.5 sm:flex-row lg:justify-start sm:justify-center"
            style={{ "--d": "520ms" } as React.CSSProperties}
          >
            <a
              href={BUSINESS.booksyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shine inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-neon px-8 py-4 text-sm font-bold uppercase tracking-[0.14em] text-white shadow-[0_14px_44px_-10px_rgba(255,46,63,0.75)] transition-all duration-300 hover:scale-[1.045] hover:shadow-[0_18px_54px_-10px_rgba(255,46,63,0.9)] active:scale-95 sm:w-auto"
            >
              <CalendarCheck className="h-5 w-5" />
              Reservar cita
            </a>
            <a
              href="#servicios"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-cream/25 px-8 py-4 text-sm font-bold uppercase tracking-[0.14em] text-cream transition-all duration-300 hover:border-gold/70 hover:text-gold active:scale-95 sm:w-auto"
            >
              Ver servicios y precios
            </a>
          </div>

          {/* métricas reales */}
          <dl
            className="hero-rise mx-auto mt-10 grid max-w-lg grid-cols-3 divide-x divide-white/10 rounded-2xl border border-white/10 bg-white/[0.03] py-4 backdrop-blur-sm lg:mx-0"
            style={{ "--d": "640ms" } as React.CSSProperties}
          >
            <div className="px-3 text-center">
              <dt className="sr-only">Valoración en Google</dt>
              <dd className="font-display flex items-center justify-center gap-1.5 text-3xl text-cream">
                <Star className="h-4.5 w-4.5 fill-gold text-gold" />
                <span className="tabular">4,9</span>
              </dd>
              <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-cream/50">231 reseñas Google</p>
            </div>
            <div className="px-3 text-center">
              <dt className="sr-only">Valoración en Booksy</dt>
              <dd className="font-display flex items-center justify-center gap-1.5 text-3xl text-cream">
                <Star className="h-4.5 w-4.5 fill-gold text-gold" />
                <span className="tabular">5,0</span>
              </dd>
              <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-cream/50">1.028 reseñas Booksy</p>
            </div>
            <div className="px-3 text-center">
              <dt className="sr-only">Ubicación</dt>
              <dd className="font-display flex items-center justify-center gap-1.5 text-3xl text-cream">
                <MapPin className="h-4.5 w-4.5 text-neon" />
                <span className="text-2xl">Centro</span>
              </dd>
              <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-cream/50">A Coruña</p>
            </div>
          </dl>
        </div>

        {/* ─── Imagen enmarcada ─── */}
        <div className="relative mx-auto w-full max-w-[540px] lg:max-w-none">
          <div className="hero-img relative">
            <div ref={imgRef} className="frame will-change-transform">
              <div
                className="relative overflow-hidden rounded-2xl border border-white/10 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)]"
                style={{ "--frame-radius": "1rem" } as React.CSSProperties}
              >
                <picture>
                  <source srcSet="/img/interior-hero-1000.webp" media="(max-width: 640px)" />
                  <img
                    src="/img/interior-hero-1800.webp"
                    alt="Interior de La Mano Negra: silla de barbería, suelo de mosaico y rótulo de neón"
                    width={1800}
                    height={1350}
                    fetchPriority="high"
                    className="h-auto w-full object-cover"
                  />
                </picture>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                {/* etiqueta del local */}
                <div className="absolute bottom-4 left-4 rounded-xl border border-white/15 bg-black/55 px-4 py-2.5 backdrop-blur-md">
                  <p className="flex items-center gap-2 text-sm font-semibold text-cream">
                    <MapPin className="h-4 w-4 text-neon" />
                    {BUSINESS.address}, {BUSINESS.city}
                  </p>
                </div>
              </div>
            </div>

            {/* tarjeta flotante: reseña */}
            <div
              className="float-y absolute -left-3 -top-5 rounded-2xl border border-white/12 bg-[#141419]/90 px-4 py-3 shadow-xl backdrop-blur-md sm:-left-8"
              style={{ "--d": "0ms" } as React.CSSProperties}
            >
              <p className="flex items-center gap-1 text-gold">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" />
                ))}
              </p>
              <p className="mt-1 text-xs font-medium text-cream/80">«Servicio de 10»</p>
              <p className="text-[10px] uppercase tracking-[0.16em] text-cream/40">Reseña de Google</p>
            </div>

            {/* tarjeta flotante: cita previa */}
            <div
              className="float-y absolute -bottom-6 -right-2 flex items-center gap-3 rounded-2xl border border-neon/30 bg-[#141419]/90 px-4 py-3 shadow-xl backdrop-blur-md sm:-right-6"
              style={{ "--d": "-2.5s" } as React.CSSProperties}
            >
              <span className="relative grid h-9 w-9 place-items-center rounded-full bg-neon/15 text-neon">
                <span className="dot-ping absolute inset-0 rounded-full text-neon/40" />
                <CalendarCheck className="relative h-4.5 w-4.5" />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-cream">Solo con cita</p>
                <p className="text-[11px] text-cream/50">Reserva online 24/7</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <a
        href="#nosotros"
        aria-label="Bajar a la sección nosotros"
        className="cue-bounce absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-cream/50 transition-colors hover:text-neon md:block"
      >
        <ArrowDown className="h-6 w-6" />
      </a>
    </section>
  );
}
