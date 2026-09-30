'use client'

import dynamic from 'next/dynamic';
import { ToolWorkspace } from '@/components/tools/ToolWorkspace';
import { ToolDefinition } from '@/types/tools';

const ToolBody = dynamic(() => import('@/features/ToolBody'), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
      <div className="w-9 h-9 rounded-xl bg-stone-200 animate-pulse" />
      <p className="text-xs font-medium text-stone-600">
        Loading workspace...
      </p>
    </div>
  ),
});

export function ToolPageView({ tool }: { tool: ToolDefinition }) {
  return (
    <ToolWorkspace tool={tool}>
      <ToolBody slug={tool.slug} />
    </ToolWorkspace>
  );
}
