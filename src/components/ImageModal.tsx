import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Photo, Category, MultilingualString } from '../types';
import { useTranslations } from '../hooks/useTranslations';
import CloseIcon from './icons/CloseIcon';
import ArrowLeftIcon from './icons/ArrowLeftIcon';
import ArrowRightIcon from './icons/ArrowRightIcon';
import EditIcon from './icons/EditIcon';
import TrashIcon from './icons/TrashIcon';
import MoveIcon from './icons/MoveIcon';

interface ImageModalProps {
  photo: Photo;
  categories: Category[];
  currentCategoryId: string;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  hasNext: boolean;
  hasPrev: boolean;
  onUpdatePhotoDetails: (photoId: number, newTitle: MultilingualString) => void;
  onDeletePhoto: (photoId: number) => void;
  onMovePhoto: (photoId: number, currentCategoryId: string, newCategoryId: string) => void;
}

const ImageModal: React.FC<ImageModalProps> = ({
  photo,
  categories,
  currentCategoryId,
  onClose,
  onNext,
  onPrev,
  hasNext,
  hasPrev,
  onUpdatePhotoDetails,
  onDeletePhoto,
  onMovePhoto,
}) => {
  const { t, language } = useTranslations();
  const [isFading, setIsFading] = useState(false);
  const [displayPhoto, setDisplayPhoto] = useState(photo);

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitleEn, setEditedTitleEn] = useState(photo.title.en);
  const [editedTitleEs, setEditedTitleEs] = useState(photo.title.es);

  const [isMoveMenuOpen, setIsMoveMenuOpen] = useState(false);
  const moveMenuRef = useRef<HTMLDivElement>(null);

  const handleNext = useCallback(() => {
    if (hasNext) {
      setIsFading(true);
      setTimeout(() => onNext(), 250);
    }
  }, [hasNext, onNext]);

  const handlePrev = useCallback(() => {
    if (hasPrev) {
      setIsFading(true);
      setTimeout(() => onPrev(), 250);
    }
  }, [hasPrev, onPrev]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, onClose]);
  
  useEffect(() => {
    if (photo.id !== displayPhoto.id) {
      setTimeout(() => {
        setDisplayPhoto(photo);
        setEditedTitleEn(photo.title.en);
        setEditedTitleEs(photo.title.es);
        setIsEditing(false);
        setIsFading(false);
      }, 250);
    }
  }, [photo, displayPhoto.id]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (moveMenuRef.current && !moveMenuRef.current.contains(event.target as Node)) {
            setIsMoveMenuOpen(false);
        }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [moveMenuRef]);

  const handleSaveEdit = () => {
    if(editedTitleEn.trim() && editedTitleEs.trim()) {
      onUpdatePhotoDetails(displayPhoto.id, { en: editedTitleEn, es: editedTitleEs });
      setIsEditing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col items-center justify-center animate-fadeIn" onClick={onClose} onContextMenu={(e) => e.preventDefault()}>
      <div className="absolute top-4 right-4 z-[60]">
        <button onClick={onClose} className="text-white p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 transition-colors" aria-label="Close">
            <CloseIcon />
        </button>
      </div>

      <div className="relative w-full h-full flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="relative flex-grow w-full flex items-center justify-center p-4 md:p-8">
            {hasPrev && (
                <button onClick={handlePrev} className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-50 text-white p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 transition-colors">
                <ArrowLeftIcon />
                </button>
            )}

            <div className="relative w-full h-full flex items-center justify-center">
                <img
                key={displayPhoto.id}
                src={displayPhoto.url}
                alt={displayPhoto.title[language]}
                className={`transition-all duration-500 ease-in-out max-w-full max-h-full object-contain ${
                    isFading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                }`}
                />
            </div>

            {hasNext && (
                <button onClick={handleNext} className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 text-white p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 transition-colors">
                <ArrowRightIcon />
                </button>
            )}
        </div>

        <div className="w-full bg-black bg-opacity-70 shrink-0">
            <div className={`max-w-5xl mx-auto p-4 text-white transition-opacity duration-500 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex-grow">
                         {!isEditing ? (
                            <div>
                                <h2 className="text-2xl font-serif break-words">{displayPhoto.title[language]}</h2>
                                <div className="flex items-center flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-gray-400">
                                    {displayPhoto.date && <span>{displayPhoto.date}</span>}
                                    {displayPhoto.date && displayPhoto.location && <span className="opacity-50 hidden sm:inline">&bull;</span>}
                                    {displayPhoto.location && <span>{displayPhoto.location[language]}</span>}
                                </div>
                            </div>
                         ) : (
                            <div className="max-w-sm space-y-2">
                                <input type="text" value={editedTitleEn} onChange={e => setEditedTitleEn(e.target.value)} className="w-full bg-gray-700 border-gray-600 rounded-md py-1 px-2 text-white" placeholder="Title (EN)" />
                                <input type="text" value={editedTitleEs} onChange={e => setEditedTitleEs(e.target.value)} className="w-full bg-gray-700 border-gray-600 rounded-md py-1 px-2 text-white" placeholder="Título (ES)" />
                            </div>
                         )}
                    </div>
                    <div className="flex items-center gap-4 text-gray-400 shrink-0 mt-3 sm:mt-0">
                        {!isEditing ? (
                            <>
                                <button onClick={() => setIsEditing(true)} className="hover:text-white transition-colors" title={t('edit_photo_tooltip')}><EditIcon /></button>
                                <button onClick={() => onDeletePhoto(displayPhoto.id)} className="hover:text-white transition-colors" title={t('delete_photo_tooltip')}><TrashIcon /></button>
                                <div className="relative" ref={moveMenuRef}>
                                    <button onClick={() => setIsMoveMenuOpen(prev => !prev)} className="hover:text-white transition-colors" title={t('move_photo_tooltip')}><MoveIcon /></button>
                                    {isMoveMenuOpen && categories.length > 0 && (
                                        <div className="absolute bottom-full mb-2 right-0 sm:left-1/2 sm:-translate-x-1/2 bg-gray-800 rounded-md shadow-lg z-10 w-48 py-1">
                                            {categories.filter(cat => cat.id !== currentCategoryId).map(cat => (
                                                <button key={cat.id} onClick={() => onMovePhoto(displayPhoto.id, currentCategoryId, cat.id)} className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">{cat.name[language]}</button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                             <div className="flex gap-2">
                                <button onClick={handleSaveEdit} className="text-xs px-3 py-1 bg-brand-gold rounded-sm">{t('save_button')}</button>
                                <button onClick={() => setIsEditing(false)} className="text-xs px-3 py-1 bg-gray-600 rounded-sm">{t('cancel_button')}</button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-4 pt-4 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left gap-4">
                     <p className="text-xs text-gray-500">{t('image_copyright_notice')}</p>
                     <button onClick={onClose} className="text-sm text-brand-gold hover:underline shrink-0">
                        &larr; {t('image_modal_back_to_gallery')}
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;