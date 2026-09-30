'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES } from '@/data/categories';
import { TOOLS_REGISTRY } from '@/data/toolsRegistry';
import { CategoryInfo } from '@/types/tools';
import { Icon } from '@/components/ui/Icon';

export function CategoryCard({ category }: { category: CategoryInfo }) {
  const count = TOOLS_REGISTRY.filter((t) => t.category === category.id).length;

  return (
    <Link
      href={`/tools/${category.slug}`}
      className="group flex flex-col rounded-2xl border border-line bg-white p-5 transition-all hover:border-moss-400 hover:shadow-[0_12px_28px_-18px_rgba(27,42,37,0.45)]"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-moss-50 text-moss-600 ring-1 ring-inset ring-moss-100 transition-colors group-hover:bg-moss-500 group-hover:text-white group-hover:ring-moss-500">
          <Icon name={category.icon} className="h-5 w-5" />
        </span>
        <span className="rounded-full bg-stone-100 px-2.5 py-1 text-[10px] font-bold text-stone-600">
          {count}
        </span>
      </div>

      <h3 className="mt-3.5 text-sm font-bold text-ink transition-colors group-hover:text-moss-700">
        {category.name}
      </h3>
      <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-stone-600">
        {category.description}
      </p>

      <div className="mt-3.5 flex items-center gap-1 border-t border-line pt-3 text-xs font-semibold text-moss-600">
        Browse tools
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
      </div>
    </Link>
  );
}

export function CategoryHeroBanner({ category }: { category: CategoryInfo }) {
  const count = TOOLS_REGISTRY.filter((t) => t.category === category.id).length;

  return (
    <div className="flex flex-col items-start gap-6 rounded-3xl border border-moss-800 bg-moss-900 p-7 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8">
      <div className="flex items-start gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-moss-500/20 text-moss-300 ring-1 ring-inset ring-moss-700">
          <Icon name={category.icon} className="h-6 w-6" />
        </span>
        <div className="max-w-xl">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-moss-300">
            Category Directory · {count} Tools
          </span>
          <h1 className="text-3xl font-black tracking-tight sm:text-4xl">{category.name}</h1>
          <p className="mt-2 text-sm leading-relaxed text-stone-300">{category.description}</p>
        </div>
      </div>
    </div>
  );
}

export { CATEGORIES };
