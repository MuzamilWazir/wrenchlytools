'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Star } from 'lucide-react';
import { CATEGORIES } from '@/data/categories';
import { ToolDefinition } from '@/types/tools';
import { Icon } from '@/components/ui/Icon';

export function PopularBadge() {
  return (
    <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-clay-50 px-2 py-0.5 text-[10px] font-bold text-clay-600 ring-1 ring-inset ring-clay-100">
      <Star className="h-2.5 w-2.5 fill-current" />
      Popular
    </span>
  );
}

/** Reveals the card once it scrolls into view (skipped for reduced-motion users). */
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -32px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, visible };
}

export function ToolIconTile({ tool, size = 'md' }: { tool: ToolDefinition; size?: 'md' | 'sm' }) {
  const box = size === 'md' ? 'h-10 w-10' : 'h-8 w-8';
  const glyph = size === 'md' ? 'h-5 w-5' : 'h-4 w-4';
  return (
    <span
      className={`flex ${box} shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-moss-50 to-moss-100/70 text-moss-600 ring-1 ring-inset ring-moss-100 transition-all duration-300 group-hover:from-moss-500 group-hover:to-moss-600 group-hover:text-white group-hover:ring-moss-500 group-hover:shadow-[0_0_18px_rgba(14,107,85,0.4)]`}
    >
      <Icon name={tool.icon} className={glyph} />
    </span>
  );
}

interface ToolCardProps {
  tool: ToolDefinition;
  footerLabel?: string;
  /** Replaces the category name on the left of the card footer. */
  footerNote?: string;
  className?: string;
}

export function ToolCard({
  tool,
  footerLabel = 'Open Tool',
  footerNote,
  className = '',
}: ToolCardProps) {
  const { ref, visible } = useReveal<HTMLAnchorElement>();

  return (
    <Link
      ref={ref}
      href={tool.route}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-white/75 p-4 backdrop-blur-md transition-all duration-300 ease-out hover:-translate-y-1 hover:border-moss-300 hover:bg-white hover:shadow-[0_1px_2px_rgba(27,42,37,0.04),0_18px_40px_-18px_rgba(14,107,85,0.4)] ${visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'} ${className}`}
    >
      {/* Neon top edge, revealed on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-moss-400 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      {/* Glass sheen sweep on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-moss-500/[0.04] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      {/* Top Icon Badge */}
      <div className="icon-badge relative flex items-start justify-between gap-3">
        <ToolIconTile tool={tool} />
        {tool.isPopular && <PopularBadge />}
      </div>

      {/* Content Section */}
      <div className="card-content relative mt-3.5">
        <h3 className="text-sm font-bold leading-snug text-ink transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-moss-700 group-hover:to-moss-500 group-hover:bg-clip-text group-hover:text-transparent">
          {tool.name}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-stone-600">
          {tool.shortDescription}
        </p>
      </div>

      {/* Divider Line */}
      <div className="card-divider relative mt-3.5 border-t border-line" />

      {/* Footer Row */}
      <div className="card-footer relative mt-3 flex items-center justify-between gap-2">
        <span className="category-tag truncate text-[10px] font-semibold uppercase tracking-wide text-stone-500">
          {footerNote ?? CATEGORIES[tool.category]?.name}
        </span>
        <span className="action-btn inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-moss-600 transition-colors duration-300 group-hover:text-moss-700">
          {footerLabel}
          <ArrowRight className="h-3.5 w-3.5 transition-all duration-300 group-hover:translate-x-1 group-hover:drop-shadow-[0_0_6px_rgba(14,107,85,0.8)]" />
        </span>
      </div>
    </Link>
  );
}

export function ToolRow({ tool }: { tool: ToolDefinition }) {
  const { ref, visible } = useReveal<HTMLAnchorElement>();

  return (
    <Link
      ref={ref}
      href={tool.route}
      className={`group relative flex items-center gap-3.5 overflow-hidden rounded-2xl border border-line bg-white/75 p-3.5 backdrop-blur-md transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-moss-300 hover:bg-white hover:shadow-[0_1px_2px_rgba(27,42,37,0.04),0_14px_32px_-18px_rgba(14,107,85,0.4)] ${visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'}`}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-moss-400 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <ToolIconTile tool={tool} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="truncate text-sm font-bold text-ink transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-moss-700 group-hover:to-moss-500 group-hover:bg-clip-text group-hover:text-transparent">
            {tool.name}
          </h3>
          {tool.isPopular && <PopularBadge />}
        </div>
        <p className="mt-0.5 truncate text-xs text-stone-600">{tool.shortDescription}</p>
      </div>
      <span className="hidden shrink-0 rounded-full bg-stone-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-stone-600 sm:block">
        {CATEGORIES[tool.category]?.name}
      </span>
      <ArrowRight className="h-4 w-4 shrink-0 text-stone-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-moss-600 group-hover:drop-shadow-[0_0_6px_rgba(14,107,85,0.7)]" />
    </Link>
  );
}
