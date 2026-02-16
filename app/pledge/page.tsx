import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";
import { PledgePageClient } from "@/components/pledge/PledgePageClient";
import { getPledgeData } from "@/lib/pledges";

export const dynamic = "force-dynamic";

export default async function PledgePage() {
  const pledgeData = getPledgeData();
  const pledgeCount = pledgeData.length;

  return (
    <>
      <Header />
      <PledgePageClient pledgeData={pledgeData} pledgeCount={pledgeCount} />
      <Footer />
    </>
  );
}
