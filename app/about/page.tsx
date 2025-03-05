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
      title: t('footer.services.homeDoctorVisit') || "Home Doctor Visit",
      description:
        language === "tr"
          ? "Evde doktor muayenesi ile sağlık hizmetini ayağınıza getirin."
          : "Receive professional medical care at home with a doctor visit.",
      image: "/assets/images/home-doctor-visit.jpg",
    },
    {
      title: t('footer.services.homeCheckup') || "Home Checkup",
      description:
        language === "tr"
          ? "Evde check-up hizmetimizle genel sağlık durumunuzu değerlendirin."
          : "Get a comprehensive health assessment with our home checkup service.",
      image: "/assets/images/home-checkup.jpg",
    },
    {
      title: t('footer.services.bloodTests') || "Blood Tests",
      description:
        language === "tr"
          ? "Evde kan tahlili hizmetimizle sağlığınızı düzenli olarak takip edin."
          : "Monitor your health with our convenient at-home blood tests.",
      image: "/assets/images/blood-test.jpg",
    },
    {
      title: t('footer.services.cancerScreening') || "Cancer Screening Tests",
      description:
        language === "tr"
          ? "Erken teşhis için evde kanser tarama testlerinizi yaptırın."
          : "Detect early signs of cancer with at-home screening tests.",
      image: "/assets/images/cancer-screening.jpg",
    },
    {
      title: t('footer.services.bpSugarMonitoring') || "Blood Pressure & Sugar Monitoring",
      description:
        language === "tr"
          ? "Evde tansiyon ve şeker takibi ile sağlığınızı kontrol altında tutun."
          : "Keep track of your health with at-home blood pressure and sugar monitoring.",
      image: "/assets/images/bp-sugar-monitoring.jpg",
    },
    {
      title: t('footer.services.injection') || "Injection Services",
      description:
        language === "tr"
          ? "Evde enjeksiyon hizmetlerimizle sağlığınızı kolay ve güvenli bir şekilde koruyun."
          : "Protect your health with our safe and convenient at-home injection services.",
      image: "/assets/images/injection-service.jpg",
    },
    {
      title: t('footer.services.serumTherapy') || "Serum Therapy",
      description:
        language === "tr"
          ? "Evde serum terapisi ile sıvı ihtiyacınızı karşılayarak iyileşme sürecinizi hızlandırın."
          : "Receive at-home serum therapy to stay hydrated and speed up your recovery.",
      image: "/assets/images/serum-therapy.jpg",
    },
    {
      title: t('footer.services.vitaminTherapy') || "Vitamin Therapy",
      description:
        language === "tr"
          ? "Vitamin terapisi ile enerji seviyenizi artırın ve bağışıklık sisteminizi güçlendirin."
          : "Boost your energy and strengthen your immune system with vitamin therapy.",
      image: "/assets/images/vitamin-therapy.jpg",
    },
    {
      title: t('footer.services.ozoneTherapy') || "Ozone Therapy",
      description:
        language === "tr"
          ? "Ozon terapisi ile bağışıklık sisteminizi güçlendirin ve hücresel yenilenmeyi destekleyin."
          : "Boost your immune system and promote cellular renewal with ozone therapy.",
      image: "/assets/images/ozone-therapy.jpg",
    },
    {
      title: t('footer.services.prpTherapy') || "PRP Therapy",
      description:
        language === "tr"
          ? "PRP tedavisi ile cildinizi yenileyin ve sağlıklı bir görünüm kazanın."
          : "Rejuvenate your skin and achieve a youthful glow with PRP therapy.",
      image: "/assets/images/prp-therapy.jpeg",
    },
    {
      title: t('footer.services.medicalAesthetics') || "Medical Aesthetics",
      description:
        language === "tr"
          ? "Medikal estetik uygulamalarımızla doğal güzelliğinizi koruyun."
          : "Enhance your natural beauty with our medical aesthetic treatments.",
      image: "/assets/images/medical-aesthetics.png",
    },
    {
      title: t('footer.services.cuppingTherapy') || "Cupping Therapy",
      description:
        language === "tr"
          ? "Hacamat terapisi ile vücudunuzu toksinlerden arındırın ve kan dolaşımınızı iyileştirin."
          : "Detoxify your body and improve circulation with cupping therapy.",
      image: "/assets/images/cupping-therapy.jpg",
    },
    {
      title: t('footer.services.leechingTherapy') || "Leech Therapy",
      description:
        language === "tr"
          ? "Sülük terapisi ile ağrı ve iltihabı doğal yollarla azaltın."
          : "Relieve pain and inflammation naturally with leech therapy.",
      image: "/assets/images/leech-therapy.png",
    },
    {
      title: t('footer.services.catheterCare') || "Catheter Insertion & Removal",
      description:
        language === "tr"
          ? "Sonda takma ve çıkarma işlemlerinizde uzman desteği alın."
          : "Receive expert assistance for catheter insertion and removal at home.",
      image: "/assets/images/catheter-care.jpg",
    },
    {
      title: t('footer.services.woundCare') || "Wound Care",
      description:
        language === "tr"
          ? "Evde profesyonel yara bakımı ile daha hızlı iyileşin."
          : "Heal faster with professional at-home wound care services.",
      image: "/assets/images/wound-care.jpg",
    }
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