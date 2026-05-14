"use client";

import { HeroSection } from "@/components/sections/HeroSection";
import { EmpathySection } from "@/components/sections/EmpathySection";
import { PlannerSection } from "@/components/sections/PlannerSection";
import { OfferSection } from "@/components/sections/OfferSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { FaqSection } from "@/components/sections/FaqSection";
import { FormSection } from "@/components/sections/FormSection";
import { Footer } from "@/components/sections/Footer";
import { StickyCtaBar } from "@/components/ui/StickyCtaBar";
import { useReveal } from "@/hooks/useReveal";

export default function ExpectingPage() {
  useReveal();

  return (
    <>
      <HeroSection />
      <EmpathySection />
      <PlannerSection />
      <OfferSection />
      <GallerySection />
      <FaqSection />
      <FormSection />
      <Footer />
      <StickyCtaBar />
    </>
  );
}
