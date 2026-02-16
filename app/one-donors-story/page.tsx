import type { Metadata } from "next";
import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";
import { OneDonorsStoryClient } from "@/components/story/OneDonorsStoryClient";

export const metadata: Metadata = {
  title: "One Donor's Story | Dr. Thankam Subramonian",
  description:
    "How one decision traveled 12 years and changed countless lives. The story of Karnataka's first anonymous kidney donor.",
};

export default function OneDonorsStoryPage() {
  return (
    <>
      <Header />
      <OneDonorsStoryClient />
      <Footer />
    </>
  );
}
