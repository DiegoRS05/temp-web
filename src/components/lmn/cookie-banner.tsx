"use client";

import { useState, useSyncExternalStore } from "react";
import { Cookie, ShieldCheck, X, Check, Ban } from "lucide-react";
import { useLmn } from "./store";

/**
 * Banner de consentimiento (RGPD). El mapa de Google solo se carga si el
 * usuario acepta; la elección se guarda en localStorage.
 */
export function CookieBanner() {
  const consent = useLmn((s) => s.consent);
  const setConsent = useLmn((s) => s.setConsent);
  const openSettings = useLmn((s) => s.openSettings);
  const settingsOpen = useLmn((s) => s.settingsOpen);
  const openLegal = useLmn((s) => s.openLegal);

  const emptySubscribe = () => () => {};
  // false durante SSR/hidratación, true en cliente → evita mismatch del banner
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const [expanded, setExpanded] = useState(false);
  // toggle de contenido de terceros, inicializado con el consentimiento guardado
  const [consentUI, setConsentUI] = useState(() => useLmn.getState().consent !== "rejected");

  const settingsVisible = settingsOpen || expanded;
  const visible = mounted && (consent === null || settingsVisible);

  if (!visible) return null;

  const close = (c: "accepted" | "rejected") => {
    setConsent(c);
    setExpanded(false);
  };

  const dismissSettings = () => {
    setExpanded(false);
    useLmn.setState({ settingsOpen: false });
  };

  return (
    <div
      className="banner-up fixed inset-x-3 bottom-3 z-[75] sm:inset-x-auto sm:left-6 sm:bottom-6 sm:w-[420px]"
      role="dialog"
      aria-modal="false"
      aria-label="Aviso de cookies"
    >
      <div className="overflow-hidden rounded-2xl border border-white/12 bg-[#141419]/97 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl">
        <div className="barber-pole h-1.5 w-full" aria-hidden="true" />
        <div className="p-5 sm:p-6">
          <div className="flex items-start gap-3.5">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-neon/12 text-neon">
              <Cookie className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-base font-bold text-cream">Tu privacidad, primero</h2>
              <p className="mt-1.5 text-[13px] leading-relaxed text-cream/65">
                Usamos un pequeño almacenamiento local para recordar tu elección. El
                mapa de Google Maps es contenido de terceros y{" "}
                <span className="font-semibold text-cream">solo se carga si lo aceptas</span>.
                {" "}
                <button
                  onClick={() => openLegal("cookies")}
                  className="link-underline font-semibold text-gold"
                >
                  Política de cookies
                </button>
              </p>
            </div>
          </div>

          {settingsVisible && (
            <div className="menu-item-in mt-4 space-y-2.5 rounded-xl border border-white/10 bg-black/30 p-4">
              <label className="flex items-center justify-between gap-3">
                <span className="text-sm font-semibold text-cream/85">Almacenamiento necesario</span>
                <span className="rounded-full bg-emerald-400/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-emerald-300">
                  Siempre activo
                </span>
              </label>
              <label className="flex items-center justify-between gap-3">
                <span className="text-sm text-cream/85">
                  Mapa de Google Maps
                  <span className="block text-xs text-cream/45">Contenido de terceros (Google)</span>
                </span>
                <button
                  role="switch"
                  aria-checked={consentUI}
                  onClick={() => setConsentUI((v) => !v)}
                  className={`relative h-6.5 w-11.5 shrink-0 rounded-full transition-colors duration-300 ${
                    consentUI ? "bg-neon" : "bg-white/15"
                  }`}
                >
                  <span
                    className={`absolute top-1 h-4.5 w-4.5 rounded-full bg-white transition-all duration-300 ${
                      consentUI ? "left-6" : "left-1"
                    }`}
                  />
                </button>
              </label>
            </div>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-2.5">
            {settingsVisible ? (
              <>
                <button
                  onClick={() => close(consentUI ? "accepted" : "rejected")}
                  className="btn-shine inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-neon px-4 py-2.5 text-[13px] font-bold text-white transition-transform active:scale-95"
                >
                  <Check className="h-4 w-4" />
                  Guardar elección
                </button>
                <button
                  onClick={dismissSettings}
                  aria-label="Cerrar ajustes"
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-cream/70 transition-colors hover:text-cream"
                >
                  <X className="h-4 w-4" />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => close("accepted")}
                  className="btn-shine inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-neon px-4 py-2.5 text-[13px] font-bold text-white transition-transform active:scale-95"
                >
                  <Check className="h-4 w-4" />
                  Aceptar
                </button>
                <button
                  onClick={() => close("rejected")}
                  className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-white/18 px-4 py-2.5 text-[13px] font-bold text-cream/85 transition-colors hover:border-white/40 active:scale-95"
                >
                  <Ban className="h-4 w-4" />
                  Rechazar
                </button>
                <button
                  onClick={() => setExpanded(true)}
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-2.5 text-[13px] font-semibold text-cream/55 transition-colors hover:text-cream"
                >
                  <ShieldCheck className="h-4 w-4" />
                  Configurar
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
