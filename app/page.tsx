import { Header } from "@/components/home/Header";
import { Hero } from "@/components/Hero";
import { SparkSection } from "@/components/home/SparkSection";
import {
  MiniInfographicReality,
  MiniInfographicCulture,
} from "@/components/home/MiniInfographics";
import { HowChangeBeginsSection } from "@/components/home/HowChangeBeginsSection";
import { PledgeCTABand } from "@/components/home/PledgeCTABand";
import { OneDonorStorySection } from "@/components/home/OneDonorStorySection";
import { TheGapSection } from "@/components/home/TheGapSection";
import { WhyPledgeSection } from "@/components/home/WhyPledgeSection";
import { MythBustingSection } from "@/components/home/MythBustingSection";
import { JoinMovementSection } from "@/components/home/JoinMovementSection";
import { Footer } from "@/components/home/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="pb-24 pt-20">
        <Hero />
        <SparkSection />
        <MiniInfographicReality />
        <HowChangeBeginsSection />
        <MiniInfographicCulture />
        <PledgeCTABand />
        <OneDonorStorySection />
        <TheGapSection />
        <WhyPledgeSection />
        <MythBustingSection />
        <JoinMovementSection />
        <Footer />
      </main>
    </>
  );
}
