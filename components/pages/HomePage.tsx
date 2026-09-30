'use client'

import Link from 'next/link';
import Image from 'next/image';
import { Search, ArrowRight, ShieldCheck, Zap, Lock, Sparkles, Star, Clock } from 'lucide-react';
import { CATEGORY_LIST } from '@/data/categories';
import { getPopularTools, TOOLS_REGISTRY } from '@/data/toolsRegistry';
import { useFavorites, useRecentTools } from '@/lib/useLocalStore';
import { useSearch } from '@/components/providers/SearchProvider';
import { ToolCarouselSwiper } from '@/components/pages/ToolCarouselSwiper';
import { ToolCard, ToolIconTile } from '@/components/ui/ToolCard';
import { CategoryCard } from '@/components/ui/CategoryCard';
import { ToolDefinition } from '@/types/tools';

const POPULAR_QUICK_LINKS = [
  'word-counter',
  'image-compressor',
  'qr-code-generator',
  'pdf-merger',
  'json-formatter',
];

export function HomePage() {
  const { openSearch } = useSearch();
  const favorites = useFavorites();
  const recentSlugs = useRecentTools().map((item) => item.slug);
  const popularTools = getPopularTools();

  const favoriteTools: ToolDefinition[] = TOOLS_REGISTRY.filter((tool) =>
    favorites.includes(tool.slug)
  );

  const recentTools: ToolDefinition[] = recentSlugs
    .map((slug) => TOOLS_REGISTRY.find((t) => t.slug === slug))
    .filter((t): t is ToolDefinition => !!t)
    .slice(0, 4);

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative isolate -mt-[68px] flex min-h-[640px] items-center overflow-hidden bg-moss-900 text-white pt-32 pb-36 sm:-mt-[72px] sm:pt-36 sm:pb-40 lg:min-h-[760px]">
        {/* Full-bleed background image — pulled up behind the sticky navbar */}
        <Image
          src="/Heroimage.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-20 object-cover object-center"
        />
        {/* Scrim keeps the headline and search legible over the photo */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-r from-moss-900/96 via-moss-900/88 to-moss-900/45"
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-moss-900/85 via-moss-900/20 to-transparent" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-moss-200 bg-moss-800 border border-moss-700 px-3 py-1.5 rounded-full">
                <Sparkles className="w-3.5 h-3.5 text-moss-300" />
                <span>Over 80+ Browser-Based Utilities</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-balance">
                Everything you need. <span className="text-moss-300">One toolbox.</span>
              </h1>

              <p className="text-base sm:text-lg text-stone-300 max-w-xl leading-relaxed">
                From quick text fixes and image editing to everyday calculations and developer utilities, get things done with simple, free online tools.
              </p>

              {/* Large prominent search field */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  openSearch();
                }}
                className="max-w-xl"
              >
                <div
                  onClick={openSearch}
                  className="flex items-center bg-white border border-moss-700 rounded-2xl p-2 cursor-pointer shadow-2xl hover:border-moss-400 transition-colors"
                >
                  <Search className="w-5 h-5 text-stone-500 ml-3 mr-3" />
                  <input
                    type="text"
                    readOnly
                    tabIndex={-1}
                    placeholder="Search for a tool... (e.g. 'compress', 'json', 'pdf')"
                    className="w-full bg-transparent text-sm text-ink placeholder:text-stone-500 outline-none cursor-pointer"
                  />
                  <button
                    type="button"
                    onClick={openSearch}
                    className="px-5 py-2.5 bg-moss-500 hover:bg-moss-600 text-white text-xs font-bold rounded-xl shrink-0 transition-colors"
                  >
                    Search Tools
                  </button>
                </div>
              </form>

              {/* Quick links & badge */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-stone-400 pt-2">
                <span className="font-semibold text-stone-300">Popular:</span>
                {POPULAR_QUICK_LINKS.map((slug) => {
                  const tool = TOOLS_REGISTRY.find((t) => t.slug === slug);
                  if (!tool) return null;
                  return (
                    <Link
                      key={slug}
                      href={tool.route}
                      className="hover:text-white transition-colors underline decoration-moss-700 underline-offset-4"
                    >
                      {tool.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Privacy badge — bottom-right of the hero */}
        <div className="absolute bottom-6 left-4 right-4 z-10 sm:bottom-8 sm:left-auto sm:right-6 lg:right-8">
          <div className="ml-auto flex w-fit items-center gap-3 rounded-2xl border border-moss-700 bg-white/90 px-4 py-3 text-xs text-stone-600 shadow-2xl backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-moss-600 shrink-0" />
              <span className="font-medium">100% In-Browser Privacy</span>
            </div>
            <span className="hidden h-3.5 w-px bg-line sm:block" />
            <span className="font-semibold text-moss-700">Zero Server Uploads</span>
          </div>
        </div>
      </section>

      <ToolCarouselSwiper />

      {/* Favorites / Recents row (if available) */}
      {(favoriteTools.length > 0 || recentTools.length > 0) && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {favoriteTools.length > 0 && (
              <div className="p-6 rounded-2xl border border-line bg-white">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-ink flex items-center gap-2">
                    <Star className="w-4 h-4 text-clay-600 fill-clay-500" />
                    <span>Your Favorite Tools</span>
                  </h3>
                  <Link href="/favorites" className="text-xs text-moss-600 hover:underline">
                    View all ({favoriteTools.length}) →
                  </Link>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {favoriteTools.slice(0, 4).map((t) => (
                    <Link
                      key={t.slug}
                      href={t.route}
                      className="group flex items-center gap-2.5 rounded-xl border border-line bg-stone-50 p-2.5 transition-colors hover:border-moss-400 hover:bg-white"
                    >
                      <ToolIconTile tool={t} size="sm" />
                      <div className="min-w-0">
                        <div className="truncate text-xs font-semibold text-ink transition-colors group-hover:text-moss-700">
                          {t.name}
                        </div>
                        <div className="mt-0.5 truncate text-[10px] text-stone-600">
                          {t.shortDescription}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {recentTools.length > 0 && (
              <div className="p-6 rounded-2xl border border-line bg-white">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-ink flex items-center gap-2">
                    <Clock className="w-4 h-4 text-moss-600" />
                    <span>Recently Used Tools</span>
                  </h3>
                  <Link href="/recent" className="text-xs text-moss-600 hover:underline">
                    View history →
                  </Link>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {recentTools.map((t) => (
                    <Link
                      key={t.slug}
                      href={t.route}
                      className="group flex items-center gap-2.5 rounded-xl border border-line bg-stone-50 p-2.5 transition-colors hover:border-moss-400 hover:bg-white"
                    >
                      <ToolIconTile tool={t} size="sm" />
                      <div className="min-w-0">
                        <div className="truncate text-xs font-semibold text-ink transition-colors group-hover:text-moss-700">
                          {t.name}
                        </div>
                        <div className="mt-0.5 truncate text-[10px] text-stone-600">
                          {t.shortDescription}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Popular Tools Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-ink">
              Popular Everyday Tools
            </h2>
            <p className="text-sm text-stone-500 mt-1">
              Curated collection of the most frequently used utilities by students and professionals.
            </p>
          </div>
          <Link
            href="/tools"
            className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-moss-600 hover:text-moss-700"
          >
            <span>All {TOOLS_REGISTRY.length}+ Tools</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {popularTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} className="h-full" />
          ))}
        </div>
      </section>

      {/* Explore Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-ink">
            Explore Categories
          </h2>
          <p className="text-sm text-stone-500 mt-1">
            Organized directories covering every productivity domain.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CATEGORY_LIST.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* Why WrenchlyTools (Trust and Architecture) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-white text-ink border border-line shadow-sm">
          <div className="max-w-3xl mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Designed for speed, built for privacy.
            </h2>
            <p className="text-sm text-stone-600 mt-2 leading-relaxed">
              Unlike generic utility websites filled with intrusive ads and slow server uploads, WrenchlyTools processes your documents and calculations locally in your web browser.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-line">
            <div>
              <div className="w-10 h-10 rounded-xl bg-moss-500/10 text-moss-600 flex items-center justify-center mb-3">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold mb-1">Local Browser Processing</h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                Images, text files, and PDFs are manipulated using Canvas, WebAssembly, and local APIs. Your confidential files never leave your device.
              </p>
            </div>

            <div>
              <div className="w-10 h-10 rounded-xl bg-clay-500/10 text-clay-600 flex items-center justify-center mb-3">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold mb-1">Zero Latency & No Sign-ups</h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                No credit cards, accounts, or rate-limited countdowns. Jump straight into the workspace, finish the task in seconds, and leave with your result.
              </p>
            </div>

            <div>
              <div className="w-10 h-10 rounded-xl bg-moss-500/10 text-moss-600 flex items-center justify-center mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold mb-1">Clean & Watermark-Free</h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                Every exported PDF, resized image, and generated barcode is 100% clean and free of forced branding or watermarks.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
