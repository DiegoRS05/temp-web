import { Header } from "@/components/lmn/header";
import { Hero } from "@/components/lmn/hero";
import { Marquee } from "@/components/lmn/marquee";
import { About } from "@/components/lmn/about";
import { Services } from "@/components/lmn/services";
import { Gallery } from "@/components/lmn/gallery";
import { Reviews } from "@/components/lmn/reviews";
import { Hours } from "@/components/lmn/hours";
import { Location } from "@/components/lmn/location";
import { Footer } from "@/components/lmn/footer";
import { CookieBanner } from "@/components/lmn/cookie-banner";
import { LegalOverlay } from "@/components/lmn/legal-overlay";
import { FloatingActions } from "@/components/lmn/floating-actions";
import { BarberPole } from "@/components/lmn/marquee";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-clip bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <Marquee />
        <About />
        <BarberPole />
        <Services />
        <Gallery />
        <Marquee reverse />
        <Reviews />
        <Hours />
        <Location />
      </main>
      <Footer />
      <CookieBanner />
      <LegalOverlay />
      <FloatingActions />
    </div>
  );
}
