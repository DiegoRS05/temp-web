"use client";

import { Instagram, Facebook, Phone, Scissors, MapPin } from "lucide-react";
import { BUSINESS, NAV_LINKS } from "./data";
import { useLmn } from "./store";
import { BarberPole } from "./marquee";

export function Footer() {
  const openLegal = useLmn((s) => s.openLegal);
  const openSettings = useLmn((s) => s.openSettings);

  return (
    <footer className="mt-auto">
      <BarberPole />
      <div className="border-t border-white/[0.07] bg-[#0c0c0f]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr]">
            {/* marca */}
            <div>
              <a href="#inicio" className="flex items-center gap-2.5">
                <span className="grid h-10 w-10 place-items-center rounded-lg border border-neon/60 bg-black/40">
                  <Scissors className="h-5 w-5 text-neon" />
                </span>
                <span className="font-display text-3xl leading-none tracking-wide text-cream">
                  LA MANO <span className="text-neon">NEGRA</span>
                </span>
              </a>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/55">
                {BUSINESS.tagline}. Claridad, trato directo y las mejores técnicas para
                que salgas del local con ganas de volver.
              </p>
              <div className="mt-5 flex items-center gap-3">
                <a
                  href={BUSINESS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram de La Mano Negra"
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/12 text-cream/75 transition-all duration-300 hover:-translate-y-1 hover:border-neon/60 hover:text-neon"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href={BUSINESS.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook de La Mano Negra"
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/12 text-cream/75 transition-all duration-300 hover:-translate-y-1 hover:border-neon/60 hover:text-neon"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href={`tel:${BUSINESS.phoneIntl}`}
                  aria-label={`Llamar al ${BUSINESS.phone}`}
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/12 text-cream/75 transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:text-gold"
                >
                  <Phone className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* enlaces */}
            <nav aria-label="Enlaces del sitio">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-cream/40">Secciones</h3>
              <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 md:grid-cols-1">
                {NAV_LINKS.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="link-underline text-sm text-cream/65 transition-colors hover:text-cream">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* contacto + legal */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-cream/40">Encuéntranos</h3>
              <p className="mt-4 flex items-start gap-2 text-sm leading-relaxed text-cream/65">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-neon" />
                <span>
                  {BUSINESS.address}, {BUSINESS.postalCode} {BUSINESS.city}
                  <br />
                  {BUSINESS.phone}
                </span>
              </p>

              <h3 className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-cream/40">Legal</h3>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <button onClick={() => openLegal("aviso")} className="link-underline text-sm text-cream/65 transition-colors hover:text-cream">
                    Aviso legal
                  </button>
                </li>
                <li>
                  <button onClick={() => openLegal("privacidad")} className="link-underline text-sm text-cream/65 transition-colors hover:text-cream">
                    Política de privacidad
                  </button>
                </li>
                <li>
                  <button onClick={() => openLegal("cookies")} className="link-underline text-sm text-cream/65 transition-colors hover:text-cream">
                    Política de cookies
                  </button>
                </li>
                <li>
                  <button onClick={openSettings} className="link-underline text-sm text-cream/65 transition-colors hover:text-cream">
                    Gestionar cookies
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/[0.07] pt-6 text-center sm:flex-row sm:text-left">
            <p className="text-xs text-cream/40">
              © {new Date().getFullYear()} La Mano Negra · Todos los derechos reservados
            </p>
            <p className="text-xs text-cream/40">
              Hecho con cariño en A Coruña · Reservas en{" "}
              <a
                href={BUSINESS.booksyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-gold transition-colors hover:text-cream"
              >
                Booksy
              </a>
            </p>
          </div>
        </div>
        <div className="pb-safe" />
      </div>
    </footer>
  );
}
