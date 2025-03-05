// app/about/page.tsx
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/components/language-provider";

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);


export default function AboutPage() {
  const { t, language } = useLanguage();

  // Refs for GSAP animations
  const aboutRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const approachRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP Animations
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

    // Animate each section
    animateSection(aboutRef);
    animateSection(servicesRef);
    animateSection(approachRef);
    animateSection(teamRef);
  }, []);

  // Services data with dummy photos
  const services = [
    {
      title: t('footer.services.serumTherapy') || "Serum Therapy",
      description:
        language === "tr"
          ? "Evde serum terapisi ile sıvı ihtiyacınızı karşılayın ve iyileşme sürecinizi hızlandırın."
          : "Receive serum therapy at home to meet your hydration needs and accelerate recovery.",
      image: "/assets/images/serum-therapy.jpg",
    },
    {
      title: t('footer.services.cuppingTherapy') || "Cupping Therapy",
      description:
        language === "tr"
          ? "Hacamat terapisi ile toksinleri vücudunuzdan atın ve kan dolaşımınızı iyileştirin."
          : "Detoxify your body and improve blood circulation with cupping therapy.",
      image: "/assets/images/cupping-therapy.jpg",
    },
    {
      title: t('footer.services.vitaminTherapy') || "Vitamin Therapy",
      description:
        language === "tr"
          ? "Vitamin terapisi ile enerji seviyenizi artırın ve bağışıklık sisteminizi güçlendirin."
          : "Boost your energy levels and strengthen your immune system with vitamin therapy.",
      image: "/assets/images/vitamin-therapy.jpg",
    },
    {
      title: t('footer.services.injection') || "Injection",
      description:
        language === "tr"
          ? "Evde enjeksiyon hizmetlerimizle sağlığınızı koruyun, kolay ve güvenli bir şekilde."
          : "Protect your health with our at-home injection services, easily and safely.",
      image: "/assets/images/injection-service.jpg",
    },
    {
      title: t('footer.services.leechingTherapy') || "Leeching Therapy",
      description:
        language === "tr"
          ? "Sülük terapisi ile doğal yollarla ağrı ve iltihabı azaltın."
          : "Reduce pain and inflammation naturally with leeching therapy.",
      image: "/assets/images/leech-therapy.png",
    },
  ];

  return (
    <div className="pt-24">
      <div className="container mx-auto px-4 py-12">
        {/* About Section */}
        <section ref={aboutRef} className="mb-16">
          <h1 className="text-4xl font-bold mb-8 text-center">{t('about.title')}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <Image
                src="https://images.unsplash.com/photo-1576765608866-5b51046452be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80"
                alt="About Carenest"
                width={2074}
                height={1383}
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
        </section>

        {/* Services Section */}
        <section ref={servicesRef} className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            {t('footer.services') || "Our Services"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-card rounded-lg shadow-md overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  width={600}
                  height={400}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Our Approach Section */}
        <section ref={approachRef} className="mb-16 bg-muted rounded-lg p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-8 text-center">{t('about.approach.title') || "Our Approach"}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-3">{t('about.approach.personCentered.title') || "Person-Centered Care"}</h3>
              <p className="text-muted-foreground mb-6">
                {t('about.approach.personCentered.description') ||
                  "We believe in tailoring our care to each individual's unique needs, preferences, and goals. Our person-centered approach ensures that every client receives care that respects their dignity, autonomy, and personal choices."}
              </p>

              <h3 className="text-xl font-bold mb-3">{t('about.approach.continuousImprovement.title') || "Continuous Improvement"}</h3>
              <p className="text-muted-foreground">
                {t('about.approach.continuousImprovement.description') ||
                  "We are committed to ongoing learning and improvement. Through regular training, feedback, and evaluation, we continuously enhance our services to provide the highest quality care possible."}
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-3">{t('about.approach.collaborativeCare.title') || "Collaborative Care"}</h3>
              <p className="text-muted-foreground mb-6">
                {t('about.approach.collaborativeCare.description') ||
                  "We work closely with clients, families, healthcare professionals, and community resources to create a comprehensive care network. This collaborative approach ensures that all aspects of a client's well-being are addressed."}
              </p>

              <h3 className="text-xl font-bold mb-3">{t('about.approach.ethicalPractice.title') || "Ethical Practice"}</h3>
              <p className="text-muted-foreground">
                {t('about.approach.ethicalPractice.description') ||
                  "Our work is guided by strong ethical principles, including respect, integrity, and accountability. We adhere to the highest standards of professional conduct in all our interactions."}
              </p>
            </div>
          </div>
        </section>

        {/* Our Team Section */}
        <section ref={teamRef} className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">{t('about.team.title')}</h2>
          <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-12">
            {t('about.team.description')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card rounded-lg shadow-md overflow-hidden">
                <Image
                  src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${i + 10}.jpg`}
                  alt={`Team Member ${i}`}
                  width={400}
                  height={400}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{t(`about.team.member${i}.name`) || `Team Member ${i}`}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {t(`about.team.member${i}.position`) || "Position Title"}
                  </p>
                  <p className="text-muted-foreground">
                    {t(`about.team.member${i}.description`) ||
                      "Dedicated professional with years of experience in providing compassionate care."}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}