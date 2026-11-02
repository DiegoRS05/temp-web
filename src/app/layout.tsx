import type { Metadata, Viewport } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "La Mano Negra · Barbería & Peluquería Unisex en A Coruña",
  description:
    "Peluquería unisex en el corazón de A Coruña (Rúa Cordonería, 8). Cortes, barba y estilo con las mejores técnicas. 4,9★ en Google · Reserva tu cita en Booksy.",
  keywords: [
    "barbería A Coruña",
    "peluquería A Coruña",
    "La Mano Negra",
    "corte de pelo A Coruña",
    "barba A Coruña",
    "barbería Cordonería",
  ],
  openGraph: {
    title: "La Mano Negra · Barbería & Peluquería Unisex en A Coruña",
    description:
      "Cortes, barba y estilo en Rúa Cordonería 8. Reserva tu cita en Booksy. 4,9★ en Google.",
    images: ["/img/og.jpg"],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "La Mano Negra · Barbería & Peluquería Unisex en A Coruña",
    description:
      "Cortes, barba y estilo en Rúa Cordonería 8. Reserva tu cita en Booksy.",
    images: ["/img/og.jpg"],
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-icon.png" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${bebas.variable} antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
