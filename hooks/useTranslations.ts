
import { useLanguage } from '../contexts/LanguageContext';
import { translations, TranslationKeys } from '../translations';

export const useTranslations = () => {
  const { language, setLanguage } = useLanguage();

  const t = (key: TranslationKeys): string => {
    return translations[language][key] || key;
  };

  return { t, language, setLanguage };
};
