'use client'

import dynamic from 'next/dynamic';

const CoverLetterGenerator = dynamic(
  () =>
    import('@/features/generators/CoverLetterGenerator').then(
      (mod) => mod.CoverLetterGeneratorTool
    ),
  {
    ssr: false,
    loading: () => <CoverLetterToolSkeleton />,
  }
);

function FieldSkeleton({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse rounded-lg bg-stone-200/70 ${className}`} />;
}

function CoverLetterToolSkeleton() {
  return (
    <div role="status" aria-label="Loading cover letter generator" className="space-y-5">
      <span className="sr-only">Loading cover letter generator…</span>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-3 rounded-2xl border border-line bg-stone-50/60 p-4">
          <FieldSkeleton className="h-9 w-full" />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <FieldSkeleton className="h-14" />
            <FieldSkeleton className="h-14" />
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <FieldSkeleton className="h-14" />
            <FieldSkeleton className="h-14" />
          </div>
          <FieldSkeleton className="h-14" />
          <FieldSkeleton className="h-24" />
          <FieldSkeleton className="h-16" />
          <FieldSkeleton className="h-24" />
          <div className="flex flex-wrap gap-2">
            <FieldSkeleton className="h-9 w-32" />
            <FieldSkeleton className="h-9 w-32" />
            <FieldSkeleton className="h-9 w-32" />
          </div>
        </div>
        <div className="flex flex-col rounded-2xl border border-line bg-white p-4">
          <FieldSkeleton className="mb-3 h-4 w-48" />
          <FieldSkeleton className="min-h-[380px] w-full flex-1" />
          <div className="mt-3 flex flex-wrap gap-2">
            <FieldSkeleton className="h-9 w-32" />
            <FieldSkeleton className="h-9 w-32" />
            <FieldSkeleton className="h-9 w-20" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function CoverLetterToolLoader() {
  return <CoverLetterGenerator />;
}
