import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";
import { PressPageClient } from "@/components/press/PressPageClient";
import { pressEntries } from "@/lib/press";

export default function PressPage() {
  const sortedEntries = [...pressEntries].sort(
    (a, b) => b.date.localeCompare(a.date)
  );
  return (
    <>
      <Header />
      <PressPageClient entries={sortedEntries} />
      <Footer />
    </>
  );
}
