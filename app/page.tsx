import HeroCarousel from '@/components/hero-carousel';
import FeatureSection from '@/components/feature-section';
import ValuesSection from '@/components/values-section';

export default function Home() {
  return (
    <div>
      <HeroCarousel />
      
      <FeatureSection
        image="https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
        translationKey="offer"
      />
      
      <FeatureSection
        image="https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" // Update this URL if the image should be different
        reverse={true}
        translationKey="apart"
      />
      
      <ValuesSection />
    </div>
  );
}