import React, { useState } from 'react';
import { useTranslations } from '../../hooks/useTranslations';
import InstagramIcon from '../icons/InstagramIcon';
import FacebookIcon from '../icons/FacebookIcon';
import WhatsAppIcon from '../icons/WhatsAppIcon';

const ContactPage: React.FC = () => {
  const { t } = useTranslations();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    const formData = new FormData(e.target as HTMLFormElement);

    try {
      const response = await fetch('https://formspree.io/f/xvovqezr', { // Placeholder endpoint, replace with your own
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setStatus('success');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="py-20 bg-gray-900 text-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">{t('contact_title')}</h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">{t('contact_subtitle')}</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">{t('contact_form_name')}</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full bg-gray-700 border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-brand-gold"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">{t('contact_form_email')}</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-gray-700 border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-brand-gold"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">{t('contact_form_message')}</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="w-full bg-gray-700 border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-brand-gold"
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full bg-brand-gold text-white font-bold py-3 px-8 rounded-sm uppercase tracking-widest text-sm hover:bg-opacity-90 transition-all duration-300 disabled:bg-opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? t('contact_form_sending') : t('contact_form_send')}
                </button>
              </div>
            </form>
            {status === 'success' && <p className="mt-4 text-center text-green-400">{t('contact_form_success')}</p>}
            {status === 'error' && <p className="mt-4 text-center text-red-400">{t('contact_form_error')}</p>}
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-white mb-4">{t('contact_social_title')}</h3>
            <div className="flex justify-center md:justify-start space-x-6">
              <a href="https://www.instagram.com/l_i_m_r_e_u_s" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-gold transition-colors"><InstagramIcon /></a>
              <a href="https://www.facebook.com/ssam.lucena.1" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-gold transition-colors"><FacebookIcon /></a>
              <a href="https://wa.me/584121731704" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-gold transition-colors"><WhatsAppIcon /></a>
            </div>
            <div className="mt-8 text-gray-400 space-y-2">
              <p><strong>Email:</strong> <a href="mailto:lucenasamuel540@gmail.com" className="hover:text-brand-gold transition-colors">lucenasamuel540@gmail.com</a></p>
              <p><strong>Phone:</strong> <a href="https://wa.me/584121731704" target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold transition-colors">+58 412 173 1704</a></p>
              <p><strong>Location:</strong> Caracas, Venezuela</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;