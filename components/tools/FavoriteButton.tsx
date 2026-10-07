'use client'

import { Bookmark } from 'lucide-react';
import { toggleFavorite, useFavoriteTools } from '@/lib/useLocalStore';

export function FavoriteButton({ slug }: { slug: string }) {
  const favorite = useFavoriteTools(slug);

  return (
    <button
      onClick={() => toggleFavorite(slug)}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
        favorite
          ? 'bg-clay-500/15 border-clay-500 text-clay-600'
          : 'bg-white border-line text-stone-600 hover:border-moss-300 hover:text-moss-700'
      }`}
    >
      <Bookmark className={`w-3.5 h-3.5 ${favorite ? 'fill-current' : ''}`} />
      <span>{favorite ? 'Favorited' : 'Favorite'}</span>
    </button>
  );
}
