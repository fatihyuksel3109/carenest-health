"use client";

import { useLanguage } from '@/components/language-provider';

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="pt-24">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">{t('about.title')}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1576765608866-5b51046452be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80" 
              alt="About Carenest" 
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-4">{t('about.mission.title')}</h2>
            <p className="text-muted-foreground mb-6">{t('about.mission.description')}</p>
            
            <h2 className="text-2xl font-bold mb-4">{t('about.vision.title')}</h2>
            <p className="text-muted-foreground">{t('about.vision.description')}</p>
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">{t('about.team.title')}</h2>
          <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-12">
            {t('about.team.description')}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card rounded-lg shadow-md overflow-hidden">
                <img 
                  src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${i + 10}.jpg`} 
                  alt={`Team Member ${i}`} 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">Team Member {i}</h3>
                  <p className="text-sm text-muted-foreground mb-4">Position Title</p>
                  <p className="text-muted-foreground">
                    Dedicated professional with years of experience in providing compassionate care.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-muted rounded-lg p-8 md:p-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Our Approach</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-3">Person-Centered Care</h3>
              <p className="text-muted-foreground mb-6">
                We believe in tailoring our care to each individual's unique needs, preferences, and goals. Our person-centered approach ensures that every client receives care that respects their dignity, autonomy, and personal choices.
              </p>
              
              <h3 className="text-xl font-bold mb-3">Continuous Improvement</h3>
              <p className="text-muted-foreground">
                We are committed to ongoing learning and improvement. Through regular training, feedback, and evaluation, we continuously enhance our services to provide the highest quality care possible.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-3">Collaborative Care</h3>
              <p className="text-muted-foreground mb-6">
                We work closely with clients, families, healthcare professionals, and community resources to create a comprehensive care network. This collaborative approach ensures that all aspects of a client's well-being are addressed.
              </p>
              
              <h3 className="text-xl font-bold mb-3">Ethical Practice</h3>
              <p className="text-muted-foreground">
                Our work is guided by strong ethical principles, including respect, integrity, and accountability. We adhere to the highest standards of professional conduct in all our interactions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}