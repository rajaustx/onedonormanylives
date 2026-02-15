import { Header } from "@/components/home/Header";
import { Hero } from "@/components/Hero";
import { IndiaRealitySection } from "@/components/home/IndiaRealitySection";
import { StatsSection } from "@/components/home/StatsSection";
import { WorldwideSection } from "@/components/home/WorldwideSection";
import { MythBustingSection } from "@/components/home/MythBustingSection";
import { Footer } from "@/components/home/Footer";
import { StickyCTA } from "@/components/ui/StickyCTA";

export default function Home() {
  return (
    <>
      <Header />
      <main className="pb-24 pt-20">
        <Hero />
        <IndiaRealitySection />
        <StatsSection />
        <WorldwideSection />
        <MythBustingSection />
        <Footer />
      </main>
      <StickyCTA
        text="Ready to learn more about anonymous kidney donation?"
        ctaLabel="Wall of Appreciation"
        ctaHref="/wall"
      />
    </>
  );
}
