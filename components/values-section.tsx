"use client";

import { Heart, Users, Lightbulb } from 'lucide-react';
import { useLanguage } from './language-provider';

const ValuesSection = () => {
  const { t } = useLanguage();

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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