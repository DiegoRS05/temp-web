"use client";

import { useEffect, useState } from "react";
import { CalendarCheck, ArrowUp } from "lucide-react";
import { BUSINESS } from "./data";
import { useLmn } from "./store";

/** Botón flotante de reserva (aparece tras el hero) + volver arriba. */
export function FloatingActions() {
  const [show, setShow] = useState(false);
  const consent = useLmn((s) => s.consent);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const bannerVisible = consent === null; // mientras el banner está en pantalla, cedemos el sitio

  return (
    <div
      className={`fixed bottom-4 right-4 z-[65] flex flex-col items-end gap-3 transition-all duration-500 sm:bottom-6 sm:right-6 ${
        show && !bannerVisible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Volver arriba"
        className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-[#141419]/90 text-cream/80 shadow-xl backdrop-blur-md transition-all hover:border-gold/60 hover:text-gold active:scale-90"
      >
        <ArrowUp className="h-5 w-5" />
      </button>
      <a
        href={BUSINESS.booksyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-shine flex items-center gap-2 rounded-full bg-neon py-3.5 pl-4.5 pr-5 text-sm font-bold uppercase tracking-[0.1em] text-white shadow-[0_14px_44px_-10px_rgba(255,46,63,0.8)] transition-transform hover:scale-[1.05] active:scale-95"
      >
        <CalendarCheck className="h-4.5 w-4.5" />
        <span className="hidden sm:inline">Reservar cita</span>
        <span className="sm:hidden">Reservar</span>
      </a>
    </div>
  );
}
