"use client";

import Image from 'next/image';
import { useLanguage } from './language-provider';
import { cn } from '@/lib/utils';

interface FeatureSectionProps {
  image: string;
  reverse?: boolean;
  translationKey: 'offer' | 'apart';
}

const FeatureSection = ({
  image,
  reverse = false,
  translationKey,
}: FeatureSectionProps) => {
  const { t } = useLanguage();

  return (
    <div className="py-16 md:py-24">
      <div
        className={cn(
          "container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center",
          reverse && "md:grid-flow-dense"
        )}
      >
        <div
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
          className={cn(
            "relative",
            reverse ? "md:order-1 -ml-0 md:-ml-24" : "md:order-2 -mr-0 md:-mr-24"
          )}
        >
          <div className="rounded-lg overflow-hidden shadow-xl">
            <Image
              src={image}
              alt={t(`features.${translationKey}.title`)}
              width={500}
              height={320}
              className="w-full h-auto object-cover"
              style={{ maxHeight: '400px' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;