import React, { useState, useEffect, useRef } from 'react';
import { CATEGORIES } from '../../constants';
import { Category, Photo, MultilingualString } from '../../types';
import { useTranslations } from '../../hooks/useTranslations';
import ImageModal from '../ImageModal';
import CameraModal from '../CameraModal';
import AddPhotoModal from '../AddPhotoModal';
import PlusIcon from '../icons/PlusIcon';
import CameraIcon from '../icons/CameraIcon';
import UploadIcon from '../icons/UploadIcon';
import CloseIcon from '../icons/CloseIcon';
import TrashIcon from '../icons/TrashIcon';

const LOCAL_STORAGE_KEY = 'samuel-urban-wild-portfolio-data';

const PortfolioPage: React.FC = () => {
  const { t, language } = useTranslations();
  
  const [categories, setCategories] = useState<Category[]>(() => {
    try {
      const savedData = window.localStorage.getItem(LOCAL_STORAGE_KEY);
      return savedData ? JSON.parse(savedData) : CATEGORIES;
    } catch (error) {
      console.error("Could not parse saved categories, falling back to default.", error);
      return CATEGORIES;
    }
  });

  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  // Modals state
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [newCategoryNameEn, setNewCategoryNameEn] = useState('');
  const [newCategoryNameEs, setNewCategoryNameEs] = useState('');
  const [isAddPhotoMenuOpen, setIsAddPhotoMenuOpen] = useState(false);
  const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);
  const [isAddPhotoDetailsModalOpen, setIsAddPhotoDetailsModalOpen] = useState(false);
  const [newPhotoSrc, setNewPhotoSrc] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const addPhotoMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(categories));
    } catch (error) {
      console.error("Could not save categories.", error);
    }
  }, [categories]);

  useEffect(() => {
    if (!activeCategoryId && categories.length > 0) {
      setActiveCategoryId(categories[0].id);
    }
  }, [categories, activeCategoryId]);

  const activeCategory = categories.find(c => c.id === activeCategoryId);
  const photos = activeCategory?.photos || [];

  const openModal = (index: number) => setSelectedPhotoIndex(index);
  const closeModal = () => setSelectedPhotoIndex(null);

  const handleNext = () => {
    if (selectedPhotoIndex !== null && selectedPhotoIndex < photos.length - 1) {
      setSelectedPhotoIndex(prev => (prev !== null ? prev + 1 : null));
    }
  };

  const handlePrev = () => {
    if (selectedPhotoIndex !== null && selectedPhotoIndex > 0) {
      setSelectedPhotoIndex(prev => (prev !== null ? prev - 1 : null));
    }
  };
  
  const handleAddCategory = () => {
    if (newCategoryNameEn.trim() && newCategoryNameEs.trim()) {
      const newCategory: Category = {
        id: `${Date.now()}-${newCategoryNameEn.toLowerCase().replace(/\s+/g, '-')}`,
        name: { en: newCategoryNameEn, es: newCategoryNameEs },
        coverImage: `https://picsum.photos/seed/${Date.now()}/800/600`,
        photos: [],
      };
      setCategories([...categories, newCategory]);
      setActiveCategoryId(newCategory.id);
      setNewCategoryNameEn('');
      setNewCategoryNameEs('');
      setIsAddCategoryModalOpen(false);
    }
  };

  const handleDeleteCategory = (categoryIdToDelete: string) => {
    if (!window.confirm(t('delete_category_confirm'))) {
      return;
    }
    setCategories(prevCategories => {
      const updatedCategories = prevCategories.filter(c => c.id !== categoryIdToDelete);
      if (activeCategoryId === categoryIdToDelete) {
        setActiveCategoryId(updatedCategories.length > 0 ? updatedCategories[0].id : null);
      }
      return updatedCategories;
    });
  };

  const handlePhotoCaptured = (imageDataUrl: string) => {
    setNewPhotoSrc(imageDataUrl);
    setIsCameraModalOpen(false);
    setIsAddPhotoDetailsModalOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setNewPhotoSrc(event.target?.result as string);
        setIsAddPhotoDetailsModalOpen(true);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
    setIsAddPhotoMenuOpen(false);
  };
  
  const handleSavePhotoDetails = (details: { title: MultilingualString; date?: string; location?: MultilingualString }) => {
    if (activeCategoryId && newPhotoSrc) {
      const newPhoto: Photo = {
        id: Date.now(),
        url: newPhotoSrc,
        ...details,
      };
      const updatedCategories = categories.map(c => {
        if (c.id === activeCategoryId) {
          return { ...c, photos: [...c.photos, newPhoto] };
        }
        return c;
      });
      setCategories(updatedCategories);
      setNewPhotoSrc(null);
      setIsAddPhotoDetailsModalOpen(false);
    }
  };
  
  const handleUpdatePhotoDetails = (photoId: number, newTitle: MultilingualString) => {
    setCategories(prevCategories => prevCategories.map(category => ({
      ...category,
      photos: category.photos.map(photo =>
        photo.id === photoId ? { ...photo, title: newTitle } : photo
      )
    })));
  };

  const handleDeletePhoto = (photoIdToDelete: number) => {
    if (!window.confirm(t('delete_photo_confirm'))) {
        return;
    }
    setCategories(prevCategories => {
        return prevCategories.map(category => {
            if (category.id === activeCategoryId) {
                const updatedPhotos = category.photos.filter(photo => photo.id !== photoIdToDelete);
                return { ...category, photos: updatedPhotos };
            }
            return category;
        });
    });
    closeModal();
  };

  const handleMovePhoto = (photoId: number, currentCatId: string, newCatId: string) => {
    if (currentCatId === newCatId) return;
    let photoToMove: Photo | undefined;
    const updatedCategories = categories.map(cat => {
      if (cat.id === currentCatId) {
        photoToMove = cat.photos.find(p => p.id === photoId);
        return { ...cat, photos: cat.photos.filter(p => p.id !== photoId) };
      }
      return cat;
    });

    if (photoToMove) {
      const finalCategories = updatedCategories.map(cat => {
        if (cat.id === newCatId) {
          return { ...cat, photos: [...cat.photos, photoToMove!] };
        }
        return cat;
      });
      setCategories(finalCategories);
      closeModal();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (addPhotoMenuRef.current && !addPhotoMenuRef.current.contains(event.target as Node)) {
        setIsAddPhotoMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedPhoto = selectedPhotoIndex !== null ? photos[selectedPhotoIndex] : null;

  return (
    <div className="py-20 bg-gray-900 text-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
            <div className="text-left">
                <h1 className="text-4xl md:text-5xl font-serif text-white mb-2">{t('portfolio_title')}</h1>
                <p className="text-lg text-gray-400">{t('portfolio_subtitle')}</p>
            </div>
            <button
                onClick={() => setIsAddCategoryModalOpen(true)}
                className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-sm flex items-center gap-2 transition-colors"
                title={t('portfolio_add_category_button')}
              >
                <PlusIcon /> <span className="hidden md:inline">{t('portfolio_add_category_button')}</span>
            </button>
        </div>


        <div className="flex flex-wrap justify-start gap-2 md:gap-4 mb-12 border-b border-gray-700 pb-4">
          {categories.map(category => (
            <div key={category.id} className="relative group">
              <button
                onClick={() => setActiveCategoryId(category.id)}
                className={`px-4 py-2 text-sm font-medium rounded-sm transition-all duration-200 ${
                  activeCategoryId === category.id ? 'bg-brand-gold text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {category.name[language]}
              </button>
            </div>
          ))}
        </div>

        {activeCategory && (
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-4">
                    <h2 className="text-2xl md:text-3xl font-serif text-white">{activeCategory.name[language]}</h2>
                     {categories.length > 0 && (
                        <button 
                          onClick={() => handleDeleteCategory(activeCategory.id)}
                          className="text-gray-500 hover:text-red-500 transition-colors"
                          title={`${t('delete_photo_tooltip')} ${activeCategory.name[language]}`}
                        >
                          <TrashIcon />
                        </button>
                      )}
                </div>
                 <div className="relative" ref={addPhotoMenuRef}>
                    <button
                      onClick={() => setIsAddPhotoMenuOpen(prev => !prev)}
                      className="bg-brand-gold text-white font-bold py-2 px-4 rounded-sm flex items-center gap-2 hover:bg-opacity-90 transition-all"
                    >
                      <PlusIcon /> <span className="hidden md:inline">{t('portfolio_add_photo_button')}</span>
                    </button>
                    {isAddPhotoMenuOpen && (
                      <div className="absolute top-full right-0 mt-2 w-56 bg-gray-800 rounded-md shadow-lg z-20 py-1">
                        <button
                          onClick={() => {setIsCameraModalOpen(true); setIsAddPhotoMenuOpen(false);}}
                          className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 flex items-center gap-3"
                        >
                          <CameraIcon /> {t('take_photo_button')}
                        </button>
                        <button
                          onClick={() => {fileInputRef.current?.click(); setIsAddPhotoMenuOpen(false);}}
                          className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 flex items-center gap-3"
                        >
                          <UploadIcon /> {t('upload_photo_button')}
                        </button>
                        <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
                      </div>
                    )}
                </div>
            </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((photo, index) => (
            <div key={photo.id} className="relative overflow-hidden rounded-md cursor-pointer group" onClick={() => openModal(index)} onContextMenu={(e) => e.preventDefault()}>
              <img src={photo.url} alt={photo.title[language]} className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-300"/>
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-white font-bold text-lg">{photo.title[language]}</h3>
              </div>
            </div>
          ))}
        </div>
        
        {photos.length === 0 && activeCategory && (
            <div className="text-center py-16 text-gray-500">
                <p>This category is empty.</p>
                <p>Add a new photo to get started!</p>
            </div>
        )}

      </div>
      
      {selectedPhoto && activeCategoryId && (
        <ImageModal
          photo={selectedPhoto}
          categories={categories.filter(c => c.id !== activeCategoryId)}
          currentCategoryId={activeCategoryId}
          onClose={closeModal}
          onNext={handleNext}
          onPrev={handlePrev}
          hasNext={selectedPhotoIndex !== null && selectedPhotoIndex < photos.length - 1}
          hasPrev={selectedPhotoIndex !== null && selectedPhotoIndex > 0}
          onUpdatePhotoDetails={handleUpdatePhotoDetails}
          onDeletePhoto={handleDeletePhoto}
          onMovePhoto={handleMovePhoto}
        />
      )}

      {isAddCategoryModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-md relative">
            <h2 className="text-2xl font-serif text-white mb-6 text-center">{t('category_add_modal_title')}</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="cat-name-en" className="block text-sm font-medium text-gray-300 mb-1">{t('category_add_name_en')}</label>
                <input type="text" id="cat-name-en" value={newCategoryNameEn} onChange={(e) => setNewCategoryNameEn(e.target.value)} className="w-full bg-gray-700 border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-brand-gold focus:border-brand-gold"/>
              </div>
              <div>
                <label htmlFor="cat-name-es" className="block text-sm font-medium text-gray-300 mb-1">{t('category_add_name_es')}</label>
                <input type="text" id="cat-name-es" value={newCategoryNameEs} onChange={(e) => setNewCategoryNameEs(e.target.value)} className="w-full bg-gray-700 border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-brand-gold focus:border-brand-gold"/>
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-8">
              <button onClick={() => setIsAddCategoryModalOpen(false)} className="px-6 py-2 text-sm font-bold text-gray-300 rounded-sm hover:bg-gray-700 transition-colors">{t('category_add_cancel_button')}</button>
              <button onClick={handleAddCategory} className="px-6 py-2 bg-brand-gold text-white font-bold rounded-sm uppercase tracking-widest text-sm hover:bg-opacity-90 transition-all">{t('category_add_save_button')}</button>
            </div>
             <button onClick={() => setIsAddCategoryModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                <CloseIcon />
            </button>
          </div>
        </div>
      )}

      {isCameraModalOpen && <CameraModal onClose={() => setIsCameraModalOpen(false)} onCapture={handlePhotoCaptured} />}
      
      {isAddPhotoDetailsModalOpen && newPhotoSrc && (
        <AddPhotoModal
          imgSrc={newPhotoSrc}
          onClose={() => setIsAddPhotoDetailsModalOpen(false)}
          onSave={handleSavePhotoDetails}
        />
      )}

    </div>
  );
};

export default PortfolioPage;