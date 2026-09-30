'use client'

import Link from 'next/link';
import { Clock, Trash2 } from 'lucide-react';
import { clearRecentTools, useRecentTools } from '@/lib/useLocalStore';
import { TOOLS_REGISTRY } from '@/data/toolsRegistry';
import { ToolDefinition } from '@/types/tools';
import { ToolCard } from '@/components/ui/ToolCard';

interface RecentEntry {
  tool: ToolDefinition;
  time: number;
}

export function RecentPage() {
  const recents = useRecentTools();

  const handleClear = () => {
    clearRecentTools();
  };

  const recentList: RecentEntry[] = recents
    .map((r) => {
      const tool = TOOLS_REGISTRY.find((t) => t.slug === r.slug);
      return tool ? { tool, time: r.visitedAt } : null;
    })
    .filter((entry): entry is RecentEntry => entry !== null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-ink flex items-center gap-3">
            <Clock className="w-8 h-8 text-moss-600" />
            <span>Recently Visited Tools</span>
          </h1>
          <p className="text-sm text-stone-600 mt-1">
            Tools you have recently accessed on this browser session.
          </p>
        </div>

        {recentList.length > 0 && (
          <button
            onClick={handleClear}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-rose-500 hover:bg-rose-50 rounded-lg transition-colors border border-rose-200"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear History</span>
          </button>
        )}
      </div>

      {recentList.length === 0 ? (
        <div className="py-20 text-center border-2 border-dashed rounded-3xl bg-stone-50 border-line">
          <Clock className="w-12 h-12 text-stone-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-stone-700">No recently accessed tools</h3>
          <p className="text-xs text-stone-600 mt-1">Tools you use will be cataloged here automatically.</p>
          <Link
            href="/tools"
            className="mt-6 inline-block px-5 py-2.5 bg-moss-500 text-white text-xs font-bold rounded-xl"
          >
            Explore Tools
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {recentList.map(({ tool, time }) => (
            <ToolCard
              key={tool.slug}
              tool={tool}
              footerLabel="Reopen"
              footerNote={new Date(time).toLocaleDateString()}
              className="h-full"
            />
          ))}
        </div>
      )}
    </div>
  );
}
