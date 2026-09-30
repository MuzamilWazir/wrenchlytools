'use client'

import React, { useState, useEffect, useRef } from 'react';
import { Bookmark, Shield, HelpCircle, CheckCircle2, ChevronDown } from 'lucide-react';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { ToolDefinition } from '@/types/tools';
import { recordToolVisit } from '@/lib/storage';
import { toggleFavorite, useFavoriteTools } from '@/lib/useLocalStore';
import { CATEGORIES } from '@/data/categories';
import { getToolBySlug } from '@/data/toolsRegistry';
import { Icon } from '@/components/ui/Icon';
import { ToolRow } from '@/components/ui/ToolCard';

interface ToolWorkspaceProps {
  tool: ToolDefinition;
  children: React.ReactNode;
}

let adScriptQueue = Promise.resolve();

function AdSlot({ position }: { position: 'top' | 'bottom' }) {
  const slotRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const slot = slotRef.current;
    const adKey = position === 'top'
      ? '78fa117d96032cebb4a821fe66743a91'
      : process.env.NEXT_PUBLIC_HIGHREVENUE_BOTTOM_AD_KEY;
    if (!slot || !adKey) return;

    let cancelled = false;
    let script: HTMLScriptElement | null = null;

    adScriptQueue = adScriptQueue.then(
      () =>
        new Promise<void>((resolve) => {
          if (cancelled) {
            resolve();
            return;
          }

          const adWindow = window as Window & {
            atOptions?: {
              key: string;
              format: string;
              height: number;
              width: number;
              params: Record<string, never>;
            };
          };

          adWindow.atOptions = {
            key: adKey,
            format: 'iframe',
            height: 50,
            width: 320,
            params: {},
          };

          script = document.createElement('script');
          script.src = `https://www.highrevenueformat.com/${adKey}/invoke.js`;
          script.async = true;
          script.onload = () => resolve();
          script.onerror = () => resolve();
          slot.appendChild(script);
        }),
    );

    return () => {
      cancelled = true;
      script?.remove();
    };
  }, [position]);

  return (
    <aside
      ref={slotRef}
      aria-label="Advertisement"
      data-ad-slot={`tool-${position}`}
      className="mx-auto mb-6 flex h-12.5 w-80 max-w-full items-center justify-center overflow-hidden border border-dashed border-stone-300 bg-stone-50/70 text-[10px] font-medium uppercase text-stone-400"
    >
      <span>Advertisement</span>
    </aside>
  );
}

export function ToolWorkspace({ tool, children }: ToolWorkspaceProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const favorite = useFavoriteTools(tool.slug);

  useEffect(() => {
    recordToolVisit(tool.slug);
  }, [tool.slug]);

  const handleToggleFavorite = () => {
    toggleFavorite(tool.slug);
  };

  const category = CATEGORIES[tool.category];
  const relatedTools = (tool.relatedToolSlugs || [])
    .map((slug) => getToolBySlug(slug))
    .filter((t): t is ToolDefinition => !!t);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Tools', href: '/tools' },
          { label: category?.name || tool.category, href: `/tools/${tool.category}` },
          { label: tool.name },
        ]}
      />

      {/* Header section with Title, Description, and Favorite */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2 mb-6 pb-6 border-b border-line">
        <div className="flex items-start gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-moss-50 text-moss-600 ring-1 ring-inset ring-moss-100">
            <Icon name={tool.icon} className="h-6 w-6" />
          </span>
          <div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-ink">
                {tool.name}
              </h1>
              <span className="inline-flex items-center gap-1 rounded-full bg-moss-50 px-2.5 py-1 text-[11px] font-semibold text-moss-700">
                <Shield className="h-3.5 w-3.5" />
                {tool.processingType === 'client' ? 'Runs 100% In-Browser' : 'Private Processing'}
              </span>
            </div>
            <p className="text-sm text-stone-600 mt-1.5 max-w-3xl">
              {tool.longDescription || tool.shortDescription}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleToggleFavorite}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              favorite
                ? 'bg-clay-500/15 border-clay-500 text-clay-600'
                : 'bg-white border-line text-stone-600 hover:border-moss-300 hover:text-moss-700'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${favorite ? 'fill-current' : ''}`} />
            <span>{favorite ? 'Favorited' : 'Favorite'}</span>
          </button>
        </div>
      </div>

      <AdSlot position="top" />

      {/* Main interactive tool workspace */}
      <div className="mb-10 rounded-2xl border border-line bg-white p-4 shadow-[0_1px_2px_rgba(27,42,37,0.04),0_10px_28px_-18px_rgba(27,42,37,0.25)] sm:p-6">
        {children}
      </div>

      <AdSlot position="bottom" />

      {/* How to use */}
      {tool.howToUse && tool.howToUse.length > 0 && (
        <section className="mb-8 rounded-2xl border border-line bg-stone-50 p-6">
          <h2 className="text-base font-bold text-ink mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-moss-600" />
            How to use {tool.name}
          </h2>
          <ol className="space-y-2 text-sm text-stone-600">
            {tool.howToUse.map((step, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-moss-500 text-white text-xs font-bold shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* FAQs */}
      {tool.faqs && tool.faqs.length > 0 && (
        <section className="mb-8">
          <h2 className="text-base font-bold text-ink mb-3 flex items-center gap-2">
            <HelpCircle className="h-4 w-4 text-moss-600" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-2">
            {tool.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-line bg-white overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full text-left px-4 py-3 text-sm font-medium text-ink flex items-center justify-between hover:bg-stone-50 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-4 h-4 text-stone-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-3 pt-1 text-xs text-stone-600 leading-relaxed border-t border-line">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Related Tools */}
      {relatedTools.length > 0 && (
        <section className="pt-6 border-t border-line">
          <h3 className="text-sm font-bold text-ink mb-3">
            Related Tools in {category?.name || 'WrenchlyTools'}
          </h3>
          <div className="space-y-2">
            {relatedTools.map((rel) => (
              <ToolRow key={rel.slug} tool={rel} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}