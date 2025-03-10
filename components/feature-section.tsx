"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useLanguage } from "./language-provider";
import { cn } from "@/lib/utils";

interface FeatureSectionProps {
  image: string;
  reverse?: boolean;
  translationKey: "offer" | "apart";
}

const FeatureSection = ({
  image,
  reverse = false,
  translationKey,
}: FeatureSectionProps) => {
  const { t } = useLanguage();
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate image (fade in and slide in from the side)
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: reverse ? 50 : -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    // Animate text (fade in and slide up with stagger)
    if (textRef.current) {
      gsap.fromTo(
        textRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, [reverse]);

  return (
    <div className="py-16 md:py-24">
      <div
        className={cn(
          "container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center",
          reverse && "md:grid-flow-dense"
        )}
      >
        <div
          ref={textRef}
          className={cn(
            "relative z-10",
            reverse ? "md:order-2 md:pr-0 md:pl-12" : "md:order-1 md:pl-0 md:pr-12"
          )}
        >
          <h2 className="text-3xl font-bold mb-6">{t(`features.${translationKey}.title`)}</h2>
          <p className="text-muted-foreground leading-relaxed">
            {t(`features.${translationKey}.description`)}
          </p>
        </div>

        <div
          ref={imageRef}
          className={cn(
            "relative",
            reverse ? "md:order-1" : "md:order-2"
          )}
        >
          <div className="rounded-lg overflow-hidden shadow-xl w-full max-w-full">
            <Image
              src={image}
              alt={t(`features.${translationKey}.title`)}
              width={500}
              height={320}
              className="w-full h-auto object-cover"
              style={{ maxHeight: "400px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;