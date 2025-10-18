
import { Category } from './types';

export const CATEGORIES: Category[] = [
  {
    id: 'weddings',
    name: { en: 'Weddings', es: 'Bodas' },
    coverImage: 'https://picsum.photos/id/1074/800/600',
    photos: [
      { id: 1, url: 'https://picsum.photos/id/1018/1200/800', title: { en: 'Mountain Vows', es: 'Votos en la Montaña' } },
      { id: 2, url: 'https://picsum.photos/id/1027/1200/800', title: { en: 'First Dance', es: 'Primer Baile' } },
      { id: 3, url: 'https://picsum.photos/id/1040/1200/800', title: { en: 'Beach Ceremony', es: 'Ceremonia en la Playa' } },
      { id: 4, url: 'https://picsum.photos/id/1043/1200/800', title: { en: 'Bridal Portrait', es: 'Retrato de Novia' } },
      { id: 5, url: 'https://picsum.photos/id/1044/1200/800', title: { en: 'Candid Moment', es: 'Momento Espontáneo' } },
      { id: 6, url: 'https://picsum.photos/id/1045/1200/800', title: { en: 'The Rings', es: 'Los Anillos' } },
      { id: 7, url: 'https://picsum.photos/id/1074/1200/800', title: { en: 'Sunset Kiss', es: 'Beso al Atardecer' } },
      { id: 8, url: 'https://picsum.photos/id/1080/1200/800', title: { en: 'Reception Fun', es: 'Fiesta en la Recepción' } },
    ],
  },
  {
    id: 'portraits',
    name: { en: 'Portraits', es: 'Retratos' },
    coverImage: 'https://picsum.photos/id/22/800/600',
    photos: [
      { id: 9, url: 'https://picsum.photos/id/22/1200/800', title: { en: 'The Thinker', es: 'El Pensador' } },
      { id: 10, url: 'https://picsum.photos/id/33/1200/800', title: { en: 'Urban Explorer', es: 'Explorador Urbano' } },
      { id: 11, url: 'https://picsum.photos/id/42/1200/800', title: { en: 'Studio Headshot', es: 'Retrato de Estudio' } },
      { id: 12, url: 'https://picsum.photos/id/48/1200/800', title: { en: 'Joyful Smile', es: 'Sonrisa Alegre' } },
      { id: 13, url: 'https://picsum.photos/id/64/1200/800', title: { en: 'Golden Hour', es: 'La Hora Dorada' } },
      { id: 14, url: 'https://picsum.photos/id/65/1200/800', title: { en: 'Contemplation', es: 'Contemplación' } },
      { id: 15, url: 'https://picsum.photos/id/1005/1200/800', title: { en: 'Family Bond', es: 'Vínculo Familiar' } },
      { id: 16, url: 'https://picsum.photos/id/1011/1200/800', title: { en: 'Nature\'s Child', es: 'Niño de la Naturaleza' } },
    ],
  },
  {
    id: 'landscapes',
    name: { en: 'Landscapes', es: 'Paisajes' },
    coverImage: 'https://picsum.photos/id/1015/800/600',
    photos: [
      { id: 17, url: 'https://picsum.photos/id/1015/1200/800', title: { en: 'Alpine Lake', es: 'Lago Alpino' } },
      { id: 18, url: 'https://picsum.photos/id/1016/1200/800', title: { en: 'Desert Dunes', es: 'Dunas del Desierto' } },
      { id: 19, url: 'https://picsum.photos/id/1019/1200/800', title: { en: 'Misty Forest', es: 'Bosque Nebuloso' } },
      { id: 20, url: 'https://picsum.photos/id/1025/1200/800', title: { en: 'Ocean Sunset', es: 'Atardecer en el Océano' } },
      { id: 21, url: 'https://picsum.photos/id/1035/1200/800', title: { en: 'Canyon View', es: 'Vista del Cañón' } },
      { id: 22, url: 'https://picsum.photos/id/1036/1200/800', title: { en: 'Winter Morning', es: 'Mañana de Invierno' } },
      { id: 23, url: 'https://picsum.photos/id/1037/1200/800', title: { en: 'Coastal Cliffs', es: 'Acantilados Costeros' } },
      { id: 24, url: 'https://picsum.photos/id/1041/1200/800', title: { en: 'Starry Night', es: 'Noche Estrellada' } },
    ],
  },
];
