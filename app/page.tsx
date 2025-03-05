import HeroCarousel from '@/components/hero-carousel';
import FeatureSection from '@/components/feature-section';
import ValuesSection from '@/components/values-section';

export default function Home() {
  return (
    <div>
      <HeroCarousel />
      
      <FeatureSection
        image="/assets/images/services.png"
        translationKey="offer"
      />
      
      <FeatureSection
        image="/assets/images/whatsetsapart.jpg" // Update this URL if the image should be different
        reverse={true}
        translationKey="apart"
      />
      
      <ValuesSection />
    </div>
  );
}