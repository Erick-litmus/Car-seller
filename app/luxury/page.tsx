import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LuxuryHero from "@/components/home/LuxuryHero";

export const metadata = {
  title: "Experience Unrivaled Luxury - Car Seller",
  description: "Discover a curated collection of premium used cars with our exclusive luxury vehicles.",
};

export default function LuxuryPage() {
  return (
    <main className="flex-grow bg-brand-light">
      <Navbar />
      <LuxuryHero />
      <Footer />
    </main>
  );
}
