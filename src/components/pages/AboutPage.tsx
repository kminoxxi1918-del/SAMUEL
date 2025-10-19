import React from 'react';
import { useTranslations } from '../../hooks/useTranslations';

const AboutPage: React.FC = () => {
  const { t } = useTranslations();
  return (
    <div className="py-20 bg-gray-900 text-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/3">
            <img 
              src="https://images.pexels.com/photos/3175054/pexels-photo-3175054.jpeg" 
              alt="Samuel, the photographer"
              className="rounded-full shadow-2xl mx-auto w-64 h-64 md:w-full md:h-auto object-cover"
            />
          </div>
          <div className="md:w-2/3 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">{t('about_title')}</h1>
            <p className="text-brand-gold text-lg mb-6">{t('about_subtitle')}</p>
            <div className="text-gray-300 space-y-4 leading-relaxed">
              <p>{t('about_p1')}</p>
              <p>{t('about_p2')}</p>
              <p>{t('about_p3')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;