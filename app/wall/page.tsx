import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";
import { AppreciationWall } from "@/components/AppreciationWall";
import { WallStickySection } from "@/components/wall/WallStickySection";
import { getAppreciationData } from "@/lib/appreciation";

export default async function WallPage() {
  const appreciationData = getAppreciationData();

  return (
    <>
      <Header />
      <main className="relative min-h-screen pt-24">
        <WallStickySection />
        <AppreciationWall data={appreciationData} />
      </main>
      <Footer />
    </>
  );
}
