import type { Metadata } from "next";
import { DM_Serif_Display, Source_Sans_3 } from "next/font/google";
import { ContactModalProvider } from "@/components/contact/ContactModalContext";
import "./globals.css";

const dmSerif = DM_Serif_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400"],
});

const sourceSans = Source_Sans_3({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://onedonormanylives.com"),
  title: "One Donor Many Lives | Anonymous Kidney Donation",
  description:
    "Anonymous non-directed kidney donation is when someone gives a kidney to a stranger. Learn about this act of profound generosity and how one donor can start a chain of hope.",
  openGraph: {
    title: "One Donor Many Lives",
    description: "One act of generosity. A chain of hope.",
    url: "https://onedonormanylives.com",
    siteName: "One Donor Many Lives",
    images: [
      {
        url: "https://onedonormanylives.com/tree-of-life-logo.webp",
        width: 1200,
        height: 1200,
        alt: "One Donor Many Lives logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://onedonormanylives.com/tree-of-life-logo.webp"],
  },
  icons: {
    icon: "/tree-of-life-logo.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSerif.variable} ${sourceSans.variable}`}>
      <body className="min-h-screen bg-stone-50 font-sans text-stone-900 antialiased dark:bg-stone-950 dark:text-stone-100">
        <ContactModalProvider>{children}</ContactModalProvider>
      </body>
    </html>
  );
}
