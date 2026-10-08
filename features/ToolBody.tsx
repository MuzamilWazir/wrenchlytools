'use client'

import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';
import { TOOL_COMPONENT_BINDINGS, CATEGORY_MODULES } from './toolComponentMap';

function ToolSkeleton() {
  return (
    <div className="space-y-6 animate-pulse" role="status" aria-label="Loading tool">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="h-32 rounded-2xl bg-stone-200/70" />
        <div className="h-32 rounded-2xl bg-stone-200/70" />
      </div>
      <div className="h-40 rounded-2xl bg-stone-200/70" />
    </div>
  );
}

/**
 * One lazily-loaded wrapper per tool, built once at module scope so the
 * component identity is identical on the server and the client. Because
 * these use next/dynamic's default (ssr: true), the tool UI is rendered
 * into the page HTML instead of a JS-only skeleton.
 */
const TOOL_COMPONENTS: Record<string, ComponentType> = {};
for (const [slug, binding] of Object.entries(TOOL_COMPONENT_BINDINGS)) {
  const { category, exportName } = binding;
  TOOL_COMPONENTS[slug] = dynamic(
    () =>
      CATEGORY_MODULES[category]().then((module) => ({
        default: module[exportName],
      })),
    { loading: ToolSkeleton }
  );
}

export default function ToolBody({ slug }: { slug: string }) {
  const Loaded = TOOL_COMPONENTS[slug];

  if (!Loaded) {
    return (
      <div className="rounded-2xl border border-dashed border-stone-300 p-8 text-center text-sm text-stone-500">
        This tool is not available.
      </div>
    );
  }

  return <Loaded />;
}
