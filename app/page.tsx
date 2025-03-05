// app/page.tsx (updated)
"use client";

import { useEffect, useRef, useState } from "react";
import HeroCarousel from "@/components/hero-carousel";
import FeatureSection from "@/components/feature-section";
import ValuesSection from "@/components/values-section";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const feature1Ref = useRef<HTMLDivElement>(null);
  const feature2Ref = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    // Animate the HeroCarousel
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.5, ease: "power3.out" }
      );
    }

    // Animate sections as they come into view
    const animateSection = (ref: React.RefObject<HTMLDivElement>) => {
      if (ref.current) {
        gsap.fromTo(
          ref.current.children,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    };

    animateSection(feature1Ref);
    animateSection(feature2Ref);
    animateSection(valuesRef);

    // Show/hide Back to Top button
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen relative">
      {/* Hero Section */}
      <section ref={heroRef}>
        <HeroCarousel />
      </section>

      {/* Feature Section 1: What We Offer */}
      <section ref={feature1Ref} className="py-16 bg-background">
        <FeatureSection
          image="/assets/images/services.png"
          translationKey="offer"
        />
      </section>

      {/* Feature Section 2: What Sets Us Apart */}
      <section ref={feature2Ref} className="py-16 bg-muted">
        <FeatureSection
          image="/assets/images/whatsetsapart.jpg"
          reverse={true}
          translationKey="apart"
        />
      </section>

      {/* Values Section */}
      <section ref={valuesRef} className="py-16 bg-background">
        <ValuesSection />
      </section>

      {/* Back to Top Button */}
      {showBackToTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 rounded-full p-4 shadow-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
          aria-label="Back to top"
        >
          <ArrowUp className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
}