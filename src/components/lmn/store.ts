"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Consent = "accepted" | "rejected" | null;
export type LegalDoc = "aviso" | "privacidad" | "cookies" | null;

interface LmnState {
  consent: Consent;
  setConsent: (c: Exclude<Consent, null>) => void;
  legalDoc: LegalDoc;
  openLegal: (d: Exclude<LegalDoc, null>) => void;
  closeLegal: () => void;
  settingsOpen: boolean;
  openSettings: () => void;
}

export const useLmn = create<LmnState>()(
  persist(
    (set) => ({
      consent: null,
      setConsent: (c) => set({ consent: c, settingsOpen: false }),
      legalDoc: null,
      openLegal: (d) => set({ legalDoc: d }),
      closeLegal: () => set({ legalDoc: null }),
      settingsOpen: false,
      openSettings: () => set({ settingsOpen: true }),
    }),
    {
      name: "lmn-consent",
      partialize: (s) => ({ consent: s.consent }),
    }
  )
);
