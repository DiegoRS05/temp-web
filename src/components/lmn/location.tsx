"use client";

import { Reveal } from "./reveal";
import { MapPin, Phone, Instagram, Facebook, CalendarCheck, ExternalLink, ShieldCheck, Cookie } from "lucide-react";
import { BUSINESS } from "./data";
import { useLmn } from "./store";

export function Location() {
  const consent = useLmn((s) => s.consent);
  const openSettings = useLmn((s) => s.openSettings);

  return (
    <section id="contacto" className="relative overflow-hidden py-24 sm:py-32">
      <div className="blob left-[-12%] bottom-[-10%] h-[400px] w-[400px] bg-gold" style={{ "--d": "-3s" } as React.CSSProperties} />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="flex items-center justify-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-neon">
            <MapPin className="h-3.5 w-3.5" />
            Contacto
          </p>
          <h2 className="font-display mt-4 text-[clamp(2.6rem,6vw,4.6rem)] leading-[0.95] text-cream">
            Estamos en <span className="text-neon">Cordonería 8</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          {/* ─── Tarjeta de contacto ─── */}
          <Reveal dir="left">
            <div className="card-glow flex h-full flex-col rounded-2xl border border-white/10 bg-[#101014] p-7 sm:p-8">
              <ul className="space-y-5">
                <li className="flex items-start gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-neon/10 text-neon">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.14em] text-cream/50">Dirección</p>
                    <p className="mt-1 text-lg font-semibold text-cream">
                      {BUSINESS.address}, {BUSINESS.postalCode}
                    </p>
                    <p className="text-sm text-cream/60">{BUSINESS.city}, {BUSINESS.country}</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-neon/10 text-neon">
                    <Phone className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.14em] text-cream/50">Teléfono</p>
                    <a href={`tel:${BUSINESS.phoneIntl}`} className="link-underline mt-1 inline-block text-lg font-semibold text-cream">
                      {BUSINESS.phone}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-neon/10 text-neon">
                    <CalendarCheck className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.14em] text-cream/50">Reservas</p>
                    <a
                      href={BUSINESS.booksyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline mt-1 inline-block text-lg font-semibold text-cream"
                    >
                      Booksy · La Mano Negra
                    </a>
                  </div>
                </li>
              </ul>

              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href={BUSINESS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-shine inline-flex items-center gap-2.5 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-cream transition-all duration-300 hover:border-neon/60 hover:text-neon active:scale-95"
                >
                  <Instagram className="h-4.5 w-4.5" />
                  {BUSINESS.instagramHandle}
                </a>
                <a
                  href={BUSINESS.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-shine inline-flex items-center gap-2.5 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-cream transition-all duration-300 hover:border-neon/60 hover:text-neon active:scale-95"
                >
                  <Facebook className="h-4.5 w-4.5" />
                  Facebook
                </a>
              </div>

              <a
                href={BUSINESS.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shine mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-cream pt-3.5 pb-3.5 mt-7 px-6 text-sm font-bold uppercase tracking-[0.12em] text-black transition-all duration-300 hover:bg-gold active:scale-95"
              >
                Cómo llegar
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </Reveal>

          {/* ─── Mapa (solo con cookies aceptadas) ─── */}
          <Reveal dir="right" delay={120}>
            <div className="relative h-full min-h-[420px] overflow-hidden rounded-2xl border border-white/10 bg-[#101014]">
              {consent === "accepted" ? (
                <div className="absolute inset-0">
                  <iframe
                    src={BUSINESS.mapsEmbed}
                    title="Mapa de Google Maps: La Mano Negra, Rúa Cordonería 8, A Coruña"
                    width="600"
                    height="450"
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full border-0"
                  />
                </div>
              ) : (
                <div className="absolute inset-0">
                  {/* sustituto estático con la foto real de la calle */}
                  <img
                    src="/img/calle-map-ph-800.webp"
                    alt="Vista de la Rúa Cordonería, donde se encuentra La Mano Negra"
                    width={800}
                    height={450}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover opacity-45"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0cbf] to-transparent" />
                  <div className="relative flex h-full flex-col items-center justify-center gap-4 p-8 text-center">
                    <span className="grid h-14 w-14 place-items-center rounded-full border border-neon/40 bg-neon/10 text-neon">
                      <Cookie className="h-6 w-6" />
                    </span>
                    <h3 className="font-display text-3xl tracking-wide text-cream">
                      {consent === "rejected" ? "Mapa desactivado" : "El mapa espera tu permiso"}
                    </h3>
                    <p className="max-w-sm text-sm leading-relaxed text-cream/65">
                      {consent === "rejected"
                        ? "Has rechazado las cookies de terceros, así que no cargamos Google Maps. Puedes cambiarlo cuando quieras."
                        : "Google Maps es un servicio de terceros que instala cookies. Acepta las cookies para ver el mapa aquí."}
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3">
                      <button
                        onClick={openSettings}
                        className="btn-shine rounded-full bg-neon px-6 py-3 text-sm font-bold uppercase tracking-[0.12em] text-white transition-all duration-300 hover:scale-[1.04] active:scale-95"
                      >
                        {consent === "rejected" ? "Activar el mapa" : "Ver el mapa"}
                      </button>
                      <a
                        href={BUSINESS.directionsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full border border-white/20 px-6 py-3 text-sm font-bold uppercase tracking-[0.12em] text-cream transition-colors hover:border-gold hover:text-gold"
                      >
                        Abrir en Google Maps
                      </a>
                    </div>
                    <p className="mt-2 flex items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] text-cream/35">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      Nada se carga sin tu consentimiento
                    </p>
                  </div>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
