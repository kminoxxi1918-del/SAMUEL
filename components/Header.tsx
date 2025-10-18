import React, { useState } from 'react';
import { Page } from '../App';
import { useTranslations } from '../hooks/useTranslations';
import LanguageSwitcher from './LanguageSwitcher';
import MenuIcon from './icons/MenuIcon';
import CloseIcon from './icons/CloseIcon';

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const { t } = useTranslations();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks: { page: Page; label: string }[] = [
    { page: 'home', label: t('nav_home') },
    { page: 'portfolio', label: t('nav_portfolio') },
    { page: 'about', label: t('nav_about') },
    { page: 'contact', label: t('nav_contact') },
  ];

  const getLinkClasses = (page: Page) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      currentPage === page
        ? 'text-brand-gold'
        : 'text-gray-300 hover:text-white'
    }`;

  return (
    <header className="bg-gray-900 sticky top-0 z-40 border-b border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <button onClick={() => onNavigate('home')} className="text-white font-serif text-xl font-bold">
              Samuel Urban & Wild
            </button>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map(({ page, label }) => (
              <button key={page} onClick={() => onNavigate(page)} className={getLinkClasses(page)}>
                {label}
              </button>
            ))}
            <LanguageSwitcher />
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map(({ page, label }) => (
              <button
                key={page}
                onClick={() => {
                  onNavigate(page);
                  setIsMenuOpen(false);
                }}
                className={`${getLinkClasses(page)} w-full text-left block`}
              >
                {label}
              </button>
            ))}
            <div className="pt-4 px-3">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;