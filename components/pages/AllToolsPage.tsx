'use client'

import { useState, useMemo, useEffect } from 'react';
import {
  Search,
  LayoutGrid,
  List,
  X,
  SlidersHorizontal,
  SearchX,
} from 'lucide-react';
import { TOOLS_REGISTRY } from '@/data/toolsRegistry';
import { CATEGORIES, CATEGORY_LIST } from '@/data/categories';
import { ToolCategory } from '@/types/tools';
import { Icon } from '@/components/ui/Icon';
import { ToolCard, ToolRow } from '@/components/ui/ToolCard';

type SortKey = 'popular' | 'alpha';

const PAGE_SIZE = 48;

export function AllToolsPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory | 'all'>('all');
  const [sortBy, setSortBy] = useState<SortKey>('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get('q');
    if (q) setSearch(q);
  }, []);

  const categoryCounts = useMemo(() => {
    const counts = {} as Record<ToolCategory, number>;
    for (const tool of TOOLS_REGISTRY) {
      counts[tool.category] = (counts[tool.category] ?? 0) + 1;
    }
    return counts;
  }, []);

  const filteredTools = useMemo(() => {
    let list = [...TOOLS_REGISTRY];

    if (selectedCategory !== 'all') {
      list = list.filter((t) => t.category === selectedCategory);
    }

    const q = search.toLowerCase().trim();
    if (q) {
      list = list.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.shortDescription.toLowerCase().includes(q) ||
          t.tags.some((tag) => tag.toLowerCase().includes(q)) ||
          (CATEGORIES[t.category]?.name.toLowerCase().includes(q) ?? false)
      );
    }

    if (sortBy === 'popular') {
      list.sort((a, b) => Number(b.isPopular ?? false) - Number(a.isPopular ?? false));
    } else {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [search, selectedCategory, sortBy]);

  const visibleTools = filteredTools.slice(0, visibleCount);
  const hasMore = visibleCount < filteredTools.length;
  const activeCategory =
    selectedCategory === 'all' ? null : CATEGORIES[selectedCategory];
  const filtersActive = search.trim() !== '' || selectedCategory !== 'all';

  const resetFilters = () => {
    setSearch('');
    setSelectedCategory('all');
    setVisibleCount(PAGE_SIZE);
  };

  const selectCategory = (id: ToolCategory | 'all') => {
    setSelectedCategory(id);
    setVisibleCount(PAGE_SIZE);
  };

  const chipBase =
    'inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors';
  const chipIdle = 'border-line bg-white text-stone-700 hover:border-moss-300 hover:bg-moss-50 hover:text-moss-700';
  const chipActive = 'border-moss-500 bg-moss-500 text-white hover:bg-moss-600';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-6">
      {/* Page header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-clay-600">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Full Directory
          </span>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-ink mt-1.5">
            All Tools
          </h1>
          <p className="text-sm text-stone-600 mt-1.5 max-w-xl leading-relaxed">
            Every utility runs in your browser — no sign-up, no uploads, no watermarks.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center rounded-full border border-line bg-white px-3 py-1.5 text-xs font-bold text-moss-700">
            {TOOLS_REGISTRY.length} tools
          </span>
          <span className="inline-flex items-center rounded-full border border-line bg-white px-3 py-1.5 text-xs font-bold text-stone-600">
            {CATEGORY_LIST.length} categories
          </span>
        </div>
      </div>

      {/* Sticky controls */}
      <div className="sticky top-[68px] sm:top-[72px] z-30 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-3 bg-background/85 backdrop-blur-xl border-b border-line/70">
        <div className="flex flex-col sm:flex-row gap-2.5">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setVisibleCount(PAGE_SIZE);
              }}
              placeholder={`Search ${TOOLS_REGISTRY.length} tools by name, keyword, or tag…`}
              aria-label="Search tools"
              className="w-full pl-10 pr-10 py-2.5 text-sm rounded-xl border border-line bg-white text-ink placeholder:text-stone-500 outline-none transition-colors focus:border-moss-400 focus:ring-2 focus:ring-moss-500/20 [&::-webkit-search-cancel-button]:hidden"
            />
            {search && (
              <button
                onClick={() => {
                  setSearch('');
                  setVisibleCount(PAGE_SIZE);
                }}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 flex h-6 w-6 items-center justify-center rounded-full text-stone-500 hover:bg-stone-100 hover:text-ink transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2.5">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortKey)}
              aria-label="Sort tools"
              className="flex-1 sm:flex-none px-3 py-2.5 text-xs font-semibold rounded-xl border border-line bg-white text-stone-700 outline-none transition-colors focus:border-moss-400 focus:ring-2 focus:ring-moss-500/20"
            >
              <option value="popular">Popular first</option>
              <option value="alpha">Name (A–Z)</option>
            </select>

            <div className="flex rounded-xl border border-line overflow-hidden bg-white shrink-0">
              <button
                onClick={() => setViewMode('grid')}
                aria-label="Grid view"
                aria-pressed={viewMode === 'grid'}
                className={`p-2.5 transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-moss-500 text-white'
                    : 'text-stone-600 hover:bg-moss-50 hover:text-moss-600'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                aria-label="List view"
                aria-pressed={viewMode === 'list'}
                className={`p-2.5 border-l border-line transition-colors ${
                  viewMode === 'list'
                    ? 'bg-moss-500 text-white'
                    : 'text-stone-600 hover:bg-moss-50 hover:text-moss-600'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Category chips */}
        <div className="mt-2.5 -mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <button
            onClick={() => selectCategory('all')}
            aria-pressed={selectedCategory === 'all'}
            className={`${chipBase} ${selectedCategory === 'all' ? chipActive : chipIdle}`}
          >
            <span>All</span>
            <span
              className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                selectedCategory === 'all' ? 'bg-white/25' : 'bg-stone-100 text-stone-600'
              }`}
            >
              {TOOLS_REGISTRY.length}
            </span>
          </button>

          {CATEGORY_LIST.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => selectCategory(cat.id)}
                aria-pressed={isActive}
                className={`${chipBase} ${isActive ? chipActive : chipIdle}`}
              >
                <Icon name={cat.icon} className="w-3.5 h-3.5 shrink-0" />
                <span className="whitespace-nowrap">{cat.name.replace(' Tools', '')}</span>
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                    isActive ? 'bg-white/25' : 'bg-stone-100 text-stone-600'
                  }`}
                >
                  {categoryCounts[cat.id]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Result meta */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-stone-600">
          Showing{' '}
          <span className="font-bold text-ink">{Math.min(visibleCount, filteredTools.length)}</span> of{' '}
          <span className="font-bold text-ink">{filteredTools.length}</span>{' '}
          {filteredTools.length === 1 ? 'tool' : 'tools'}
          {activeCategory && (
            <>
              {' '}
              in <span className="font-bold text-moss-700">{activeCategory.name}</span>
            </>
          )}
        </p>

        {filtersActive && (
          <button
            onClick={resetFilters}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-moss-700 hover:text-moss-600 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
            Reset filters
          </button>
        )}
      </div>

      {/* Results */}
      {filteredTools.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-line bg-white px-6 py-16 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-stone-100 text-stone-400">
            <SearchX className="w-6 h-6" />
          </span>
          <p className="mt-4 text-base font-bold text-ink">No tools match “{search}”</p>
          <p className="mt-1 text-xs text-stone-600 max-w-sm">
            Try a different keyword, or clear the filters to browse the full directory.
          </p>
          <button
            onClick={resetFilters}
            className="mt-5 inline-flex items-center gap-1.5 rounded-xl bg-moss-500 px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-moss-600"
          >
            Reset filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
            {visibleTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} className="h-full" />
            ))}
          </div>

          {hasMore && (
            <div className="flex flex-col items-center gap-2 pt-2">
              <button
                onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                className="inline-flex items-center gap-2 rounded-xl border border-line bg-white px-5 py-2.5 text-xs font-bold text-moss-700 transition-colors hover:border-moss-400 hover:bg-moss-50"
              >
                Show {Math.min(PAGE_SIZE, filteredTools.length - visibleCount)} more
              </button>
              <span className="text-[11px] text-stone-500">
                {filteredTools.length - visibleCount} remaining
              </span>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="space-y-2">
            {visibleTools.map((tool) => (
              <ToolRow key={tool.slug} tool={tool} />
            ))}
          </div>

          {hasMore && (
            <div className="flex flex-col items-center gap-2 pt-2">
              <button
                onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                className="inline-flex items-center gap-2 rounded-xl border border-line bg-white px-5 py-2.5 text-xs font-bold text-moss-700 transition-colors hover:border-moss-400 hover:bg-moss-50"
              >
                Show {Math.min(PAGE_SIZE, filteredTools.length - visibleCount)} more
              </button>
              <span className="text-[11px] text-stone-500">
                {filteredTools.length - visibleCount} remaining
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
}
