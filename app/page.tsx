// app/page.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import HeroCarousel from "@/components/hero-carousel";
import FeatureSection from "@/components/feature-section";
import ValuesSection from "@/components/values-section";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useLanguage } from "@/components/language-provider";
import { servicesData } from "@/data/services";

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const { t } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);
  const feature1Ref = useRef<HTMLDivElement>(null);
  const feature2Ref = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const animationRef = useRef<GSAPAnimation | null>(null); // Store the GSAP animation instance

  // Duplicate the services data for infinite scroll
  const duplicatedServices = [...servicesData, ...servicesData];

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
    animateSection(servicesRef);
    animateSection(valuesRef);

    // Show/hide Back to Top button
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // Run only on mount (no dependencies for static animations)

  useEffect(() => {
    // Clean up previous animation before starting a new one
    if (animationRef.current) {
      animationRef.current.kill();
    }

    // Set up the infinite scroll animation for service cards
    if (sliderRef.current) {
      const totalWidth = sliderRef.current.scrollWidth / 2; // Half because we duplicated the data

      // GSAP animation for infinite scroll
      animationRef.current = gsap.to(sliderRef.current, {
        x: -totalWidth,
        duration: 30,
        ease: "linear",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
        },
      });

      // Pause on hover
      const pauseAnimation = () => animationRef.current?.pause();
      const resumeAnimation = () => animationRef.current?.resume();

      sliderRef.current.addEventListener("mouseenter", pauseAnimation);
      sliderRef.current.addEventListener("mouseleave", resumeAnimation);

      // Clean up event listeners and animation on unmount
      return () => {
        sliderRef.current?.removeEventListener("mouseenter", pauseAnimation);
        sliderRef.current?.removeEventListener("mouseleave", resumeAnimation);
        animationRef.current?.kill();
      };
    }
  }, []); // Run only on mount (we'll handle translation updates via React rendering)

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
      <section ref={feature1Ref} className="py-16 bg-muted">
        <FeatureSection
          image="/assets/images/services.png"
          translationKey="offer"
        />
      </section>

      {/* Feature Section 2: What Sets Us Apart */}
      <section ref={feature2Ref} className="py-16 bg-background">
        <FeatureSection
          image="/assets/images/whatsetsapart.jpg"
          reverse={true}
          translationKey="apart"
        />
      </section>

      {/* Services Section with Infinite Slider */}
      <section ref={servicesRef} className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">
            {t('footer.services') || "Our Services"}
          </h2>
          <div className="overflow-hidden">
            <div
              ref={sliderRef}
              className="flex space-x-4 py-2"
              style={{ width: "max-content" }}
            >
              {duplicatedServices.map((service, index) => (
                <div
                  key={index}
                  className="bg-card rounded-lg shadow-md overflow-hidden w-80 flex-shrink-0"
                  aria-roledescription="carousel item"
                >
                  <Image
                    src={service.image}
                    alt={t(service.titleKey)}
                    width={320}
                    height={200}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-bold mb-2">{t(service.titleKey)}</h3>
                    <p className="text-muted-foreground text-sm">{t(service.descriptionKey)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
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