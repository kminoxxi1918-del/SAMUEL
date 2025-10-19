// FIX: Corrected import syntax for React hooks. Named imports should be enclosed in curly braces.
import React, { useState, useCallback } from 'react';
// FIX: Corrected local module import paths for components.
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/pages/HomePage';
import PortfolioPage from './components/pages/PortfolioPage';
import AboutPage from './components/pages/AboutPage';
import ContactPage from './components/pages/ContactPage';
import { LanguageProvider } from './contexts/LanguageContext';

export type Page = 'home' | 'portfolio' | 'about' | 'contact';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const navigateTo = useCallback((page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={navigateTo} />;
      case 'portfolio':
        return <PortfolioPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage onNavigate={navigateTo} />;
    }
  };

  return (
    <LanguageProvider>
      <div className="flex flex-col min-h-screen bg-gray-900">
        <Header currentPage={currentPage} onNavigate={navigateTo} />
        <main className="flex-grow">
          <div className="animate-fadeIn">
            {renderPage()}
          </div>
        </main>
        <Footer onNavigate={navigateTo} />
      </div>
    </LanguageProvider>
  );
};

export default App;