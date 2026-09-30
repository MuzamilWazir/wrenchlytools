'use client'

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Wrench, Search, Menu, X, ChevronDown } from 'lucide-react';
import { CATEGORY_LIST } from '@/data/categories';
import { useFavorites } from '@/lib/useLocalStore';
import { useSearch } from '@/components/providers/SearchProvider';

export function Header() {
  const pathname = usePathname();
  const { openSearch } = useSearch();
  const favorites = useFavorites();
  const favoritesCount = favorites.length;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);

  const navLinks = [
    { label: 'All Tools', href: '/tools' },
    { label: 'Favorites', href: '/favorites', badge: favoritesCount > 0 ? favoritesCount : undefined },
    { label: 'Recent', href: '/recent' },
    { label: 'Blog', href: '/blog' },
    { label: 'About', href: '/about' },
  ];

  const pill = 'flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition-colors';
  const pillIdle = 'text-moss-800 hover:bg-moss-50 hover:text-moss-600';
  const pillActive = 'bg-moss-500 text-white hover:bg-moss-600';

  const iconButton =
    'flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white text-moss-700 transition-colors hover:border-moss-200 hover:bg-moss-50 hover:text-moss-600';

  return (
    <header className="sticky top-0 z-40 w-full px-3 pt-3 sm:px-5 sm:pt-4">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-2 rounded-full border border-line bg-white/90 px-2.5 shadow-[0_10px_30px_-14px_rgba(27,42,37,0.28)] backdrop-blur-xl backdrop-saturate-150 sm:px-3">
        {/* Wordmark */}
        <Link
          href="/"
          aria-label="WrenchlyTools home"
          className="flex shrink-0 items-center gap-2 rounded-full pl-1 pr-2 transition-opacity hover:opacity-80"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-moss-500 text-white">
            <Wrench className="h-4 w-4" />
          </span>
          <span className="text-[15px] font-extrabold tracking-tight text-ink">
            Wrenchly<span className="text-moss-600">Tools</span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="ml-1 hidden items-center gap-0.5 md:flex">
          <div className="relative">
            <button
              onClick={() => setCategoriesDropdownOpen(!categoriesDropdownOpen)}
              onBlur={() => setTimeout(() => setCategoriesDropdownOpen(false), 200)}
              aria-expanded={categoriesDropdownOpen}
              className={`${pill} ${
                categoriesDropdownOpen ? 'bg-moss-50 text-moss-600' : pillIdle
              }`}
            >
              <span>Categories</span>
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform ${categoriesDropdownOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {categoriesDropdownOpen && (
              <div className="absolute left-0 top-full mt-3 w-64 overflow-hidden rounded-3xl border border-line bg-white p-1.5 shadow-[0_20px_45px_-22px_rgba(27,42,37,0.35)]">
                {CATEGORY_LIST.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/tools/${cat.slug}`}
                    onClick={() => setCategoriesDropdownOpen(false)}
                    className="flex items-center justify-between rounded-full px-3.5 py-2 text-[13px] font-medium text-stone-700 transition-colors hover:bg-moss-50 hover:text-moss-700"
                  >
                    <span>{cat.name}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wide text-stone-500">
                      Browse
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? 'page' : undefined}
                className={`${pill} ${isActive ? pillActive : pillIdle}`}
              >
                <span>{link.label}</span>
                {link.badge !== undefined && (
                  <span
                    className={`inline-flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-extrabold ${
                      isActive ? 'bg-white/25 text-white' : 'bg-clay-500 text-white'
                    }`}
                  >
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="ml-auto flex items-center gap-1.5">
          <button
            onClick={openSearch}
            title="Search tools (Ctrl+K / Cmd+K)"
            aria-label="Search tools"
            className="hidden items-center gap-2 rounded-full border border-line bg-stone-50 px-3 py-1.5 text-xs font-medium text-stone-600 transition-colors hover:border-moss-200 hover:bg-moss-50 hover:text-moss-700 sm:flex"
          >
            <Search className="h-3.5 w-3.5" />
            <span>Search tools...</span>
            <kbd className="rounded-md border border-line bg-white px-1.5 py-0.5 font-mono text-[9px] text-stone-500">
              ⌘K
            </kbd>
          </button>

          <button onClick={openSearch} aria-label="Search tools" className={`${iconButton} sm:hidden`}>
            <Search className="h-4 w-4" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            className={`${iconButton} md:hidden`}
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="mx-auto mt-2 max-w-6xl overflow-hidden rounded-3xl border border-line bg-white p-3 shadow-[0_20px_45px_-22px_rgba(27,42,37,0.35)] md:hidden">
          <div className="grid grid-cols-2 gap-1.5 pb-3">
            {CATEGORY_LIST.map((cat) => (
              <Link
                key={cat.id}
                href={`/tools/${cat.slug}`}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-full bg-stone-50 px-3.5 py-2 text-[13px] font-semibold text-stone-700 transition-colors hover:bg-moss-50 hover:text-moss-700"
              >
                {cat.name}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-1 border-t border-line pt-3">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex items-center justify-between rounded-full px-3.5 py-2 text-sm font-semibold transition-colors ${
                    isActive ? 'bg-moss-500 text-white' : 'text-stone-700 hover:bg-moss-50 hover:text-moss-700'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge !== undefined && (
                    <span
                      className={`inline-flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-extrabold ${
                        isActive ? 'bg-white/25 text-white' : 'bg-clay-500 text-white'
                      }`}
                    >
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
