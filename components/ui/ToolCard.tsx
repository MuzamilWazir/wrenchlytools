'use client';

import Link from 'next/link';
import { ArrowRight, Star } from 'lucide-react';
import { CATEGORIES } from '@/data/categories';
import { ToolDefinition } from '@/types/tools';
import { Icon } from '@/components/ui/Icon';

export function PopularBadge() {
  return (
    <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-clay-50 px-2 py-0.5 text-[10px] font-bold text-clay-600">
      <Star className="h-2.5 w-2.5 fill-current" />
      Popular
    </span>
  );
}

export function ToolIconTile({ tool, size = 'md' }: { tool: ToolDefinition; size?: 'md' | 'sm' }) {
  const box = size === 'md' ? 'h-10 w-10' : 'h-8 w-8';
  const glyph = size === 'md' ? 'h-5 w-5' : 'h-4 w-4';
  return (
    <span
      className={`flex ${box} shrink-0 items-center justify-center rounded-xl bg-moss-50 text-moss-600 ring-1 ring-inset ring-moss-100 transition-colors group-hover:bg-moss-500 group-hover:text-white group-hover:ring-moss-500`}
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
  return (
    <Link
      href={tool.route}
      className={`group flex flex-col rounded-2xl border border-line bg-white p-4 transition-all hover:border-moss-400 hover:shadow-[0_12px_28px_-18px_rgba(27,42,37,0.45)] ${className}`}
    >
      <div className="flex items-start justify-between gap-3">
        <ToolIconTile tool={tool} />
        {tool.isPopular && <PopularBadge />}
      </div>

      <h3 className="mt-3.5 text-sm font-bold leading-snug text-ink transition-colors group-hover:text-moss-700">
        {tool.name}
      </h3>
      <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-stone-600">
        {tool.shortDescription}
      </p>

      <div className="mt-3.5 flex items-center justify-between gap-2 border-t border-line pt-3">
        <span className="truncate text-[10px] font-semibold uppercase tracking-wide text-stone-500">
          {footerNote ?? CATEGORIES[tool.category]?.name}
        </span>
        <span className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-moss-600">
          {footerLabel}
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}

export function ToolRow({ tool }: { tool: ToolDefinition }) {
  return (
    <Link
      href={tool.route}
      className="group flex items-center gap-3.5 rounded-2xl border border-line bg-white p-3.5 transition-all hover:border-moss-400 hover:shadow-sm"
    >
      <ToolIconTile tool={tool} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="truncate text-sm font-bold text-ink transition-colors group-hover:text-moss-700">
            {tool.name}
          </h3>
          {tool.isPopular && <PopularBadge />}
        </div>
        <p className="mt-0.5 truncate text-xs text-stone-600">{tool.shortDescription}</p>
      </div>
      <span className="hidden shrink-0 rounded-full bg-stone-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-stone-600 sm:block">
        {CATEGORIES[tool.category]?.name}
      </span>
      <ArrowRight className="h-4 w-4 shrink-0 text-stone-400 transition-all group-hover:translate-x-0.5 group-hover:text-moss-600" />
    </Link>
  );
}
