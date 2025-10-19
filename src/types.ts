// FIX: Removed self-import of 'MultilingualString' to resolve a declaration conflict.
export interface MultilingualString {
  en: string;
  es: string;
}

export interface Photo {
  id: number;
  url: string;
  title: MultilingualString;
  date?: string;
  location?: MultilingualString;
}

export interface Category {
  id: string;
  name: MultilingualString;
  coverImage: string;
  photos: Photo[];
}