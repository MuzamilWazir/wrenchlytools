'use client'

import Link from 'next/link';
import { CATEGORIES } from '@/data/categories';
import { getToolsByCategory } from '@/data/toolsRegistry';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { ToolCard } from '@/components/ui/ToolCard';
import { CategoryHeroBanner } from '@/components/ui/CategoryCard';

export function CategoryPageView({ categoryParam }: { categoryParam: string }) {
  const category = CATEGORIES[categoryParam as keyof typeof CATEGORIES];
  const tools = getToolsByCategory(categoryParam);

  if (!category) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-ink">Category Not Found</h1>
        <p className="text-xs text-stone-600 mt-2">The requested category does not exist in our directory.</p>
        <Link
          href="/tools"
          className="mt-4 inline-block px-4 py-2 bg-moss-500 text-white text-xs font-bold rounded-xl"
        >
          View All Tools
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Tools', href: '/tools' },
          { label: category.name },
        ]}
      />

      {/* Category Hero Banner */}
      <CategoryHeroBanner category={category} />

      {/* Tool Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {tools.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>
    </div>
  );
}
