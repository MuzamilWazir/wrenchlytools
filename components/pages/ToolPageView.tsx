'use client'

import { ToolWorkspace } from '@/components/tools/ToolWorkspace';
import { ToolDefinition } from '@/types/tools';
import ToolBody from '@/features/ToolBody';

interface ToolPageViewProps {
  tool: ToolDefinition;
  /** Server-rendered editorial content shown below the tool. */
  guide?: React.ReactNode;
}

export function ToolPageView({ tool, guide }: ToolPageViewProps) {
  return (
    <ToolWorkspace tool={tool} guide={guide}>
      <ToolBody slug={tool.slug} />
    </ToolWorkspace>
  );
}
