'use client'

import Link from 'next/link';
import { Wrench, ArrowLeft, Search } from 'lucide-react';
import { useSearch } from '@/components/providers/SearchProvider';
import { TOOLS_REGISTRY } from '@/data/toolsRegistry';

export default function NotFound() {
  const { openSearch } = useSearch();

  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-6">
      <div className="w-16 h-16 mx-auto rounded-2xl bg-moss-500/10 text-moss-600 flex items-center justify-center">
        <Wrench className="w-8 h-8 rotate-45" />
      </div>
      <div>
        <span className="text-xs font-bold text-moss-600 uppercase tracking-wider">404 Error</span>
        <h1 className="text-3xl sm:text-4xl font-black text-ink mt-1">
          Tool or Page Not Found
        </h1>
        <p className="text-sm text-stone-600 mt-2">
          The requested page or utility could not be found. Check the URL or use our global search to find what you need.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="flex items-center gap-1.5 px-4 py-2 bg-stone-100 text-slate-800 rounded-xl text-xs font-bold"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>
        <button
          onClick={openSearch}
          className="flex items-center gap-1.5 px-4 py-2 bg-moss-500 text-white rounded-xl text-xs font-bold"
        >
          <Search className="w-3.5 h-3.5" />
          <span>Search {TOOLS_REGISTRY.length}+ Tools</span>
        </button>
      </div>
    </div>
  );
}
