"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useLmn, type LegalDoc } from "./store";
import { LEGAL_META } from "./legal";

/** Visor a pantalla completa de los documentos legales. */
export function LegalOverlay() {
  const legalDoc = useLmn((s) => s.legalDoc);
  const closeLegal = useLmn((s) => s.closeLegal);
  const openLegal = useLmn((s) => s.openLegal);

  useEffect(() => {
    if (!legalDoc) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLegal();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [legalDoc, closeLegal]);

  if (!legalDoc) return null;
  const meta = LEGAL_META[legalDoc as Exclude<LegalDoc, null>];

  return (
    <div
      className="overlay-in fixed inset-0 z-[90] bg-black/80 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label={meta.title}
      onClick={closeLegal}
    >
      <div
        className="sheet-in absolute inset-x-2 bottom-2 top-10 overflow-hidden rounded-2xl border border-white/12 bg-[#101014] shadow-2xl sm:inset-x-auto sm:left-1/2 sm:top-12 sm:bottom-12 sm:w-[min(760px,92vw)] sm:-translate-x-1/2"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="barber-pole h-1.5 w-full" aria-hidden="true" />

        {/* cabecera */}
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-white/10 bg-[#101014f2] px-5 py-4 backdrop-blur-md sm:px-8">
          <div>
            <h2 className="font-display text-3xl tracking-wide text-cream">{meta.title}</h2>
            <p className="text-[11px] uppercase tracking-[0.16em] text-cream/40">{meta.updated}</p>
          </div>
          <button
            onClick={closeLegal}
            aria-label="Cerrar documento"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/15 text-cream transition-transform hover:rotate-90 active:scale-90"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* documento */}
        <div className="max-h-[calc(100%-86px)] overflow-y-auto px-5 py-6 sm:px-8">
          {meta.render()}
        </div>

        {/* pie: cambiar de documento */}
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 border-t border-white/10 bg-[#101014f2] px-4 py-3 backdrop-blur-md">
          {(Object.keys(LEGAL_META) as Exclude<LegalDoc, null>[]).map((k) => (
            <button
              key={k}
              onClick={() => openLegal(k)}
              className={`rounded-full px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.1em] transition-colors ${
                k === legalDoc ? "bg-neon text-white" : "text-cream/55 hover:text-cream"
              }`}
            >
              {LEGAL_META[k].title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
