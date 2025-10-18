
import React from 'react';
import { useLanguage, Language } from '../contexts/LanguageContext';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const switchLanguage = (lang: Language) => {
    setLanguage(lang);
  };

  const buttonClasses = (lang: Language) => 
    `px-3 py-1 text-xs font-bold rounded-sm transition-colors duration-200 ${
      language === lang 
        ? 'bg-brand-gold text-white' 
        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
    }`;

  return (
    <div className="flex items-center space-x-2">
      <button onClick={() => switchLanguage('en')} className={buttonClasses('en')}>
        EN
      </button>
      <button onClick={() => switchLanguage('es')} className={buttonClasses('es')}>
        ES
      </button>
    </div>
  );
};

export default LanguageSwitcher;
