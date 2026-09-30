'use client'

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, X, ArrowRight, CornerDownLeft } from 'lucide-react';
import { TOOLS_REGISTRY } from '@/data/toolsRegistry';
import { CATEGORIES } from '@/data/categories';
import { ToolDefinition } from '@/types/tools';

interface SearchCommandDialogProps {
  onClose: () => void;
}

export function SearchCommandDialog({ onClose }: SearchCommandDialogProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 50);
    return () => window.clearTimeout(focusTimer);
  }, []);

  useEffect(() => {
    const activeItem = listRef.current?.children[selectedIndex] as
      | HTMLElement
      | undefined;
    activeItem?.scrollIntoView({ block: 'nearest' });
  }, [selectedIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const trimmed = query.trim().toLowerCase();
  const filteredTools: ToolDefinition[] = trimmed
    ? TOOLS_REGISTRY.filter((tool) => {
        const inName = tool.name.toLowerCase().includes(trimmed);
        const inDesc = tool.shortDescription.toLowerCase().includes(trimmed);
        const inCategory = tool.category.toLowerCase().includes(trimmed);
        const inTags = tool.tags.some((tag) => tag.toLowerCase().includes(trimmed));
        return inName || inDesc || inCategory || inTags;
      }).slice(0, 10)
    : TOOLS_REGISTRY.filter((t) => t.isPopular).slice(0, 8);

  const handleSelect = (tool: ToolDefinition) => {
    onClose();
    router.push(tool.route);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filteredTools.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredTools.length) % (filteredTools.length || 1));
    } else if (e.key === 'Enter' && filteredTools[selectedIndex]) {
      e.preventDefault();
      handleSelect(filteredTools[selectedIndex]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-ink-900/40 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-line overflow-hidden">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-line">
          <Search className="w-5 h-5 text-stone-500 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search tools by name, category, or keyword... (e.g. 'compress', 'json', 'tax')"
            className="w-full bg-transparent text-sm text-ink placeholder:text-stone-500 outline-none"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-stone-500 hover:text-stone-600"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono font-medium text-stone-500 bg-stone-100 rounded border border-line">
              ESC
            </kbd>
          )}
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2">
          <div className="px-3 py-1.5 text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
            {trimmed ? `Search Results (${filteredTools.length})` : 'Popular Everyday Tools'}
          </div>

          {filteredTools.length === 0 ? (
            <div className="py-12 text-center text-stone-600">
              <p className="text-sm font-medium">
                No tools found matching &quot;{query}&quot;
              </p>
              <p className="text-xs mt-1 text-stone-500">
                Try searching for keywords like &quot;pdf&quot;, &quot;image&quot;, &quot;calculate&quot;, or
                &quot;convert&quot;.
              </p>
            </div>
          ) : (
            <ul ref={listRef} className="space-y-1">
              {filteredTools.map((tool, index) => {
                const category = CATEGORIES[tool.category];
                const isSelected = index === selectedIndex;
                return (
                  <li key={tool.slug}>
                    <Link
                      href={tool.route}
                      onClick={() => onClose()}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`w-full text-left flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-colors ${
                        isSelected
                          ? 'bg-moss-500/10 text-moss-600 dark:bg-moss-500/10 dark:text-moss-300'
                          : 'text-stone-700 dark:text-stone-700 hover:bg-stone-50 dark:hover:bg-stone-200/50'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center shrink-0">
                          <span className="text-xs font-semibold uppercase text-stone-600">
                            {tool.name.slice(0, 2)}
                          </span>
                        </div>
                        <div className="truncate">
                          <div className="font-medium text-ink flex items-center gap-2">
                            <span>{tool.name}</span>
                            <span className="text-xs font-normal text-stone-500">
                              · {category?.name || tool.category}
                            </span>
                          </div>
                          <p className="text-xs text-stone-600 truncate mt-0.5">
                            {tool.shortDescription}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 shrink-0 ml-3 text-stone-500">
                        {isSelected && (
                          <span className="flex items-center gap-1 text-[11px] font-medium text-moss-600">
                            Open <CornerDownLeft className="w-3 h-3" />
                          </span>
                        )}
                        {!isSelected && <ArrowRight className="w-4 h-4 opacity-50" />}
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Footer info bar */}
        <div className="px-4 py-2 bg-stone-50 border-t border-line flex items-center justify-between text-[11px] text-stone-600">
          <div className="flex items-center gap-3">
            <span>Use <kbd className="px-1 py-0.5 rounded bg-stone-200 text-stone-700 font-mono">↑</kbd> <kbd className="px-1 py-0.5 rounded bg-stone-200 text-stone-700 font-mono">↓</kbd> to navigate</span>
            <span><kbd className="px-1 py-0.5 rounded bg-stone-200 text-stone-700 font-mono">↵</kbd> to open</span>
          </div>
          <span>Local client-side execution</span>
        </div>
      </div>
    </div>
  );
}