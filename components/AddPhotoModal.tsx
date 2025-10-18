import React, { useState } from 'react';
import { useTranslations } from '../hooks/useTranslations';
import { MultilingualString } from '../types';
import CloseIcon from './icons/CloseIcon';

interface AddPhotoModalProps {
  imgSrc: string;
  onClose: () => void;
  onSave: (details: { title: MultilingualString; date?: string; location?: MultilingualString }) => void;
}

const AddPhotoModal: React.FC<AddPhotoModalProps> = ({ imgSrc, onClose, onSave }) => {
  const { t } = useTranslations();
  const [titleEn, setTitleEn] = useState('');
  const [titleEs, setTitleEs] = useState('');
  const [date, setDate] = useState('');
  const [locationEn, setLocationEn] = useState('');
  const [locationEs, setLocationEs] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (titleEn.trim() && titleEs.trim()) {
      onSave({
        title: { en: titleEn, es: titleEs },
        date: date || undefined,
        location: (locationEn.trim() || locationEs.trim()) 
          ? { en: locationEn, es: locationEs } 
          : undefined,
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-3xl relative flex gap-8">
        <div className="w-1/2">
          <img src={imgSrc} alt="New photo preview" className="rounded-lg object-contain max-h-[60vh]" />
        </div>
        <div className="w-1/2 flex flex-col">
          <h2 className="text-2xl font-serif text-white mb-6 text-center">{t('photo_add_details_title')}</h2>
          <form onSubmit={handleSubmit} className="flex-grow flex flex-col">
            <div className="space-y-4 overflow-y-auto pr-2">
              <div>
                <label htmlFor="title-en" className="block text-sm font-medium text-gray-300 mb-1">{t('photo_add_title_en')}</label>
                <input type="text" id="title-en" value={titleEn} onChange={(e) => setTitleEn(e.target.value)} required className="w-full bg-gray-700 border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-brand-gold focus:border-brand-gold"/>
              </div>
              <div>
                <label htmlFor="title-es" className="block text-sm font-medium text-gray-300 mb-1">{t('photo_add_title_es')}</label>
                <input type="text" id="title-es" value={titleEs} onChange={(e) => setTitleEs(e.target.value)} required className="w-full bg-gray-700 border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-brand-gold focus:border-brand-gold"/>
              </div>
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-1">{t('photo_add_date')}</label>
                <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full bg-gray-700 border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-brand-gold focus:border-brand-gold"/>
              </div>
              <div>
                <label htmlFor="location-en" className="block text-sm font-medium text-gray-300 mb-1">{t('photo_add_location_en')}</label>
                <input type="text" id="location-en" value={locationEn} onChange={(e) => setLocationEn(e.target.value)} className="w-full bg-gray-700 border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-brand-gold focus:border-brand-gold"/>
              </div>
              <div>
                <label htmlFor="location-es" className="block text-sm font-medium text-gray-300 mb-1">{t('photo_add_location_es')}</label>
                <input type="text" id="location-es" value={locationEs} onChange={(e) => setLocationEs(e.target.value)} className="w-full bg-gray-700 border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-brand-gold focus:border-brand-gold"/>
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-auto pt-6">
              <button type="button" onClick={onClose} className="px-6 py-2 text-sm font-bold text-gray-300 rounded-sm hover:bg-gray-700 transition-colors">
                {t('category_add_cancel_button')}
              </button>
              <button type="submit" className="px-6 py-2 bg-brand-gold text-white font-bold rounded-sm uppercase tracking-widest text-sm hover:bg-opacity-90 transition-all">
                {t('photo_add_save_button')}
              </button>
            </div>
          </form>
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
            <CloseIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPhotoModal;