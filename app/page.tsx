import { Header } from "@/components/home/Header";
import { Hero } from "@/components/Hero";
import { OneDonorStorySection } from "@/components/home/OneDonorStorySection";
import { TheGapSection } from "@/components/home/TheGapSection";
import { WhyPledgeSection } from "@/components/home/WhyPledgeSection";
import { MythBustingSection } from "@/components/home/MythBustingSection";
import { JoinMovementSection } from "@/components/home/JoinMovementSection";
import { Footer } from "@/components/home/Footer";
import { StickyCTA } from "@/components/ui/StickyCTA";

export default function Home() {
  return (
    <>
      <Header />
      <main className="pb-24 pt-20">
        <Hero />
        <OneDonorStorySection />
        <TheGapSection />
        <WhyPledgeSection />
        <MythBustingSection />
        <JoinMovementSection />
        <Footer />
      </main>
      <StickyCTA
        text="Appreciation from around the world"
        ctaLabel="Wall of Appreciation"
        ctaHref="/wall"
      />
    </>
  );
}
