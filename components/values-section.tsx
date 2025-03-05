// app/components/values-section.tsx
"use client";

import { useEffect, useRef } from "react";
import { Heart, Users, Lightbulb } from "lucide-react";
import { gsap } from "gsap";
import { useLanguage } from "./language-provider";

const ValuesSection = () => {
  const { t } = useLanguage();
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate value cards (fade in and scale up with stagger)
    if (cardsRef.current) {
      gsap.fromTo(
        cardsRef.current.children,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, []);

  const values = [
    {
      icon: <Heart className="h-10 w-10 text-chart-1" />,
      title: t('values.compassion.title'),
      description: t('values.compassion.description'),
    },
    {
      icon: <Users className="h-10 w-10 text-chart-2" />,
      title: t('values.community.title'),
      description: t('values.community.description'),
    },
    {
      icon: <Lightbulb className="h-10 w-10 text-chart-3" />,
      title: t('values.empowering.title'),
      description: t('values.empowering.description'),
    },
  ];

  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">{t('values.title') || "Our Values"}</h2>
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-card p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="mb-4">{value.icon}</div>
              <h3 className="text-xl font-bold mb-2">{value.title}</h3>
              <p className="text-muted-foreground">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;