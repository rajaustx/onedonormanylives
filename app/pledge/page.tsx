import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";
import { PledgePageClient } from "@/components/pledge/PledgePageClient";
import { getPledgeData, getPledgeCount } from "@/lib/pledges";

export default async function PledgePage() {
  const pledgeData = getPledgeData();
  const pledgeCount = getPledgeCount();

  return (
    <>
      <Header />
      <PledgePageClient pledgeData={pledgeData} pledgeCount={pledgeCount} />
      <Footer />
    </>
  );
}
