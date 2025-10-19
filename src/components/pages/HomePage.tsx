
import React from 'react';
import { Page } from '../../App';
import { useTranslations } from '../../hooks/useTranslations';

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { t } = useTranslations();

  return (
    <div className="relative h-[calc(100vh-80px)] min-h-[500px] flex items-center justify-center text-center text-white overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
      <img
        src="https://picsum.photos/id/1043/1920/1080"
        alt="Hero Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="relative z-20 p-8 max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4 animate-slide-in-up">{t('home_title')}</h1>
        <p className="text-lg md:text-xl text-gray-200 mb-8 animate-slide-in-up animation-delay-300">
          {t('home_subtitle')}
        </p>
        <button
          onClick={() => onNavigate('portfolio')}
          className="bg-brand-gold text-white font-bold py-3 px-8 rounded-sm uppercase tracking-widest text-sm hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 animate-slide-in-up animation-delay-600"
        >
          {t('home_cta')}
        </button>
      </div>
       <style>{`
        @keyframes slide-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-in-up {
          animation: slide-in-up 0.6s ease-out forwards;
        }
        .animation-delay-300 { animation-delay: 0.3s; }
        .animation-delay-600 { animation-delay: 0.6s; }
        .animate-slide-in-up { opacity: 0; }
       `}</style>
    </div>
  );
};

export default HomePage;