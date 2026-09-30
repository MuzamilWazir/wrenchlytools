'use client'

import Link from 'next/link';
import { Star, Trash2 } from 'lucide-react';
import { toggleFavorite, useFavorites } from '@/lib/useLocalStore';
import { TOOLS_REGISTRY } from '@/data/toolsRegistry';
import { ToolCard } from '@/components/ui/ToolCard';

export function FavoritesPage() {
  const favSlugs = useFavorites();

  const favTools = TOOLS_REGISTRY.filter((t) => favSlugs.includes(t.slug));

  const handleRemove = (e: React.MouseEvent, slug: string) => {
    e.stopPropagation();
    e.preventDefault();
    toggleFavorite(slug);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-ink flex items-center gap-3">
          <Star className="w-8 h-8 text-clay-600 fill-clay-500" />
          <span>Your Favorite Tools</span>
        </h1>
        <p className="text-sm text-stone-600 mt-1">
          Quickly access the utilities you use most. Saved locally in your browser without requiring an account.
        </p>
      </div>

      {favTools.length === 0 ? (
        <div className="py-20 text-center border-2 border-dashed rounded-3xl bg-stone-50 border-line">
          <Star className="w-12 h-12 text-stone-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-stone-700">No favorite tools saved yet</h3>
          <p className="text-xs text-stone-600 mt-1 max-w-sm mx-auto">
            Click the &quot;Favorite&quot; star button on any tool page to pin it here for instant 1-click access.
          </p>
          <Link
            href="/tools"
            className="mt-6 inline-block px-5 py-2.5 bg-moss-500 text-white text-xs font-bold rounded-xl"
          >
            Explore Tools Directory
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {favTools.map((tool) => (
            <div key={tool.slug} className="relative">
              <ToolCard tool={tool} className="h-full" />
              <button
                onClick={(e) => handleRemove(e, tool.slug)}
                title="Remove from favorites"
                aria-label={`Remove ${tool.name} from favorites`}
                className="absolute right-3 top-3 z-10 flex h-7 w-7 items-center justify-center rounded-lg bg-white/90 text-stone-500 ring-1 ring-line backdrop-blur transition-colors hover:bg-rose-50 hover:text-rose-600 hover:ring-rose-200"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
