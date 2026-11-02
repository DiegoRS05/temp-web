"use client";

import { useEffect, useState } from "react";
import { Menu, X, Scissors, Instagram, Facebook, Phone } from "lucide-react";
import { BUSINESS, NAV_LINKS } from "./data";
import { useLmn } from "./store";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#inicio");
  const openLegal = useLmn((s) => s.openLegal);

  // sombra/fondo al hacer scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // scrollspy
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive("#" + e.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  // bloquear scroll con el menú abierto
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          open
            ? "z-[87] bg-transparent"
            : scrolled
              ? "bg-[#0a0a0ccc] backdrop-blur-xl shadow-[0_10px_40px_-18px_rgba(0,0,0,0.8)] border-b border-white/[0.07]"
              : "bg-transparent border-b border-transparent"
        }`}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 transition-all duration-500 sm:px-6 ${
            scrolled ? "h-16" : "h-20"
          }`}
        >
          {/* Logo */}
          <a href="#inicio" className="group flex items-center gap-2.5" aria-label="La Mano Negra - inicio">
            <span className="grid h-9 w-9 place-items-center rounded-lg border border-neon/60 bg-black/40 transition-transform duration-500 group-hover:rotate-[10deg]">
              <Scissors className="h-4.5 w-4.5 text-neon" strokeWidth={2.2} />
            </span>
            <span className="font-display text-2xl leading-none tracking-wide text-cream">
              LA MANO <span className="text-neon">NEGRA</span>
            </span>
          </a>

          {/* Nav desktop */}
          <nav className="hidden items-center gap-6 lg:flex" aria-label="Principal">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                data-active={active === l.href}
                className="link-underline text-[13px] font-medium uppercase tracking-[0.14em] text-cream/70 transition-colors hover:text-cream data-[active=true]:text-cream"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <a
              href={BUSINESS.booksyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shine hidden rounded-full bg-neon px-5 py-2.5 text-[13px] font-bold uppercase tracking-[0.12em] text-white shadow-[0_8px_30px_-8px_rgba(255,46,63,0.7)] transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_12px_40px_-8px_rgba(255,46,63,0.85)] active:scale-95 sm:inline-flex"
            >
              Reservar cita
            </a>

            {/* Hamburguesa */}
            <button
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              className="relative z-[70] grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-black/50 text-cream transition-transform duration-300 active:scale-90 lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Menú móvil / tablet */}
      <div
        className={`fixed inset-0 z-[85] lg:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-500 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`absolute inset-x-3 top-[84px] origin-top overflow-hidden rounded-2xl border border-white/10 bg-[#101014]/95 shadow-2xl transition-all duration-500 ${
            open ? "translate-y-0 opacity-100" : "-translate-y-6 opacity-0"
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación"
        >
          {/* cabecera decorativa */}
          <div className="barber-pole h-1.5 w-full" />
          <nav className="flex flex-col px-6 pb-6 pt-6" aria-label="Menú móvil">
            {NAV_LINKS.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                style={{ "--d": `${80 + i * 55}ms` } as React.CSSProperties}
                className={`menu-item-in group flex items-center justify-between border-b border-white/[0.06] py-3.5 ${
                  open ? "" : ""
                }`}
              >
                <span className="font-display text-3xl tracking-wide text-cream transition-colors group-hover:text-neon">
                  {l.label}
                </span>
                <span className="text-xs tabular text-cream/30">0{i + 1}</span>
              </a>
            ))}

            <div className="menu-item-in mt-5 flex items-center gap-3" style={{ "--d": "500ms" } as React.CSSProperties}>
              <a
                href={BUSINESS.booksyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shine flex-1 rounded-full bg-neon px-5 py-3.5 text-center text-sm font-bold uppercase tracking-[0.12em] text-white shadow-[0_8px_30px_-8px_rgba(255,46,63,0.7)] active:scale-95"
              >
                Reservar cita
              </a>
              <a
                href={`tel:${BUSINESS.phoneIntl}`}
                aria-label="Llamar por teléfono"
                className="grid h-12 w-12 place-items-center rounded-full border border-gold/50 text-gold transition-transform active:scale-90"
              >
                <Phone className="h-5 w-5" />
              </a>
            </div>

            <div className="menu-item-in mt-5 flex items-center justify-between" style={{ "--d": "560ms" } as React.CSSProperties}>
              <div className="flex items-center gap-3">
                <a
                  href={BUSINESS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram de La Mano Negra"
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/12 text-cream/80 transition-all hover:border-neon/60 hover:text-neon"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href={BUSINESS.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook de La Mano Negra"
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/12 text-cream/80 transition-all hover:border-neon/60 hover:text-neon"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              </div>
              <button
                onClick={() => {
                  setOpen(false);
                  openLegal("cookies");
                }}
                className="text-xs uppercase tracking-[0.14em] text-cream/40 transition-colors hover:text-cream/80"
              >
                Cookies
              </button>
            </div>
          </nav>
          <div className="pb-safe" />
        </div>
      </div>
    </>
  );
}
