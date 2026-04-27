"use client";

import { useLenis } from "@/hooks/useLenis";
import { HeroSection } from "@/components/sections/HeroSection";
import { EmpathySection } from "@/components/sections/EmpathySection";
import { OfferSection } from "@/components/sections/OfferSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { FaqSection } from "@/components/sections/FaqSection";
import { FormSection } from "@/components/sections/FormSection";
import { Footer } from "@/components/sections/Footer";
import { StickyCtaBar } from "@/components/ui/StickyCtaBar";
import { FloatingNav } from "@/components/ui/FloatingNav";

export default function ExpectingPage() {
  useLenis();

  return (
    <main className="relative noise-overlay">
      <HeroSection />
      <EmpathySection />
      <OfferSection />
      <GallerySection />
      <FaqSection />
      <FormSection />
      <Footer />
      <FloatingNav />
      <StickyCtaBar />
    </main>
  );
}
