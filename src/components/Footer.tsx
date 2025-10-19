
import React from 'react';
import { Page } from '../App';
import { useTranslations } from '../hooks/useTranslations';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { t } = useTranslations();

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left space-y-4 md:space-y-0">
          <div>
            <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} {t('footer_copyright')}</p>
          </div>
          <div className="flex space-x-6">
            <button onClick={() => onNavigate('portfolio')} className="text-sm text-gray-400 hover:text-brand-gold transition-colors">{t('nav_portfolio')}</button>
            <button onClick={() => onNavigate('about')} className="text-sm text-gray-400 hover:text-brand-gold transition-colors">{t('nav_about')}</button>
            <button onClick={() => onNavigate('contact')} className="text-sm text-gray-400 hover:text-brand-gold transition-colors">{t('nav_contact')}</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;