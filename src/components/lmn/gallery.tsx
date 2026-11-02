"use client";

import { useCallback, useEffect, useState } from "react";
import { Reveal } from "./reveal";
import { X, ChevronLeft, ChevronRight, ZoomIn, Camera } from "lucide-react";

interface GImg {
  src: string;
  full: string;
  alt: string;
  w: number;
  h: number;
  label: string;
}

const IMGS: GImg[] = [
  {
    src: "/img/interior-g-900.webp",
    full: "/img/interior-hero-1000.webp",
    alt: "Interior de La Mano Negra con el rótulo de neón y la silla de barbería",
    w: 1000,
    h: 750,
    label: "El local · interior",
  },
  {
    src: "/img/fachada-g-900.webp",
    full: "/img/fachada-g-900.webp",
    alt: "Fachada de La Mano Negra en la Rúa Cordonería con neón rojo",
    w: 900,
    h: 658,
    label: "La fachada",
  },
  {
    src: "/img/corte-g-900.webp",
    full: "/img/corte-g-900.webp",
    alt: "Corte de pelo a tijera en La Mano Negra",
    w: 900,
    h: 506,
    label: "Al trabajo",
  },
  {
    src: "/img/silla-g-900.webp",
    full: "/img/silla-g-900.webp",
    alt: "Silla de barbería clásica y detalle del interior",
    w: 900,
    h: 506,
    label: "La silla",
  },
  {
    src: "/img/calle-g-900.webp",
    full: "/img/calle-g-900.webp",
    alt: "Vista de la Rúa Cordonería donde está el local",
    w: 900,
    h: 506,
    label: "Rúa Cordonería",
  },
];

export function Gallery() {
  const [idx, setIdx] = useState<number | null>(null);

  const close = useCallback(() => setIdx(null), []);
  const move = useCallback(
    (d: number) => setIdx((i) => (i === null ? i : (i + d + IMGS.length) % IMGS.length)),
    []
  );

  // teclado + bloqueo de scroll con el lightbox abierto
  useEffect(() => {
    if (idx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") move(1);
      if (e.key === "ArrowLeft") move(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [idx, close, move]);

  return (
    <section id="galeria" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-neon">
              <Camera className="h-3.5 w-3.5" />
              Galería
            </p>
            <h2 className="font-display mt-4 text-[clamp(2.6rem,6vw,4.6rem)] leading-[0.95] text-cream">
              Bienvenido <span className="text-neon">al local</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-cream/60">
            Luz industrial, suelo de mosaico original y nuestra silla de barbería. Toca
            cualquier foto para verla en grande.
          </p>
        </Reveal>

        {/* mosaico encuadrado */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          <Reveal dir="zoom" className="col-span-2 row-span-2">
            <button
              onClick={() => setIdx(0)}
              className="g-item frame block h-full w-full text-left"
              aria-label="Ampliar foto del interior"
            >
              <div className="relative h-full overflow-hidden rounded-2xl border border-white/10">
                <img
                  src={IMGS[0].src}
                  alt={IMGS[0].alt}
                  width={IMGS[0].w}
                  height={IMGS[0].h}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                <div className="g-overlay absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/85 to-transparent p-4">
                  <span className="font-display text-xl text-cream">{IMGS[0].label}</span>
                  <ZoomIn className="h-5 w-5 text-gold" />
                </div>
              </div>
            </button>
          </Reveal>

          {IMGS.slice(1).map((im, i) => (
            <Reveal key={im.src} dir="zoom" delay={100 + i * 90}>
              <button
                onClick={() => setIdx(i + 1)}
                className="g-item frame frame-2 block h-full w-full text-left"
                aria-label={`Ampliar foto: ${im.label}`}
              >
                <div className="relative h-full overflow-hidden rounded-2xl border border-white/10">
                  <img
                    src={im.src}
                    alt={im.alt}
                    width={im.w}
                    height={im.h}
                    loading="lazy"
                    className="h-[220px] w-full object-cover sm:h-[240px]"
                  />
                  <div className="g-overlay absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/85 to-transparent p-3.5">
                    <span className="text-sm font-semibold text-cream">{im.label}</span>
                    <ZoomIn className="h-4.5 w-4.5 text-gold" />
                  </div>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ─── Lightbox ─── */}
      {idx !== null && (
        <div
          className="overlay-in fixed inset-0 z-[80] flex items-center justify-center bg-black/92 p-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label="Visor de fotos"
          onClick={close}
        >
          <button
            onClick={close}
            aria-label="Cerrar visor"
            className="absolute right-4 top-4 grid h-12 w-12 place-items-center rounded-full border border-white/20 text-cream transition-transform hover:rotate-90 active:scale-90"
          >
            <X className="h-5 w-5" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); move(-1); }}
            aria-label="Foto anterior"
            className="absolute left-3 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/20 text-cream transition-all hover:border-neon hover:text-neon active:scale-90 sm:left-6"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <figure className="lb-in max-h-[86vh] max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <img
              src={IMGS[idx].full}
              alt={IMGS[idx].alt}
              width={IMGS[idx].w}
              height={IMGS[idx].h}
              className="max-h-[76vh] w-auto max-w-full rounded-xl border border-white/15 object-contain shadow-2xl"
            />
            <figcaption className="mt-4 flex items-center justify-between">
              <span className="font-display text-2xl text-cream">{IMGS[idx].label}</span>
              <span className="tabular text-sm text-cream/50">
                {idx + 1} / {IMGS.length}
              </span>
            </figcaption>
          </figure>

          <button
            onClick={(e) => { e.stopPropagation(); move(1); }}
            aria-label="Foto siguiente"
            className="absolute right-3 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/20 text-cream transition-all hover:border-neon hover:text-neon active:scale-90 sm:right-6"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      )}
    </section>
  );
}
