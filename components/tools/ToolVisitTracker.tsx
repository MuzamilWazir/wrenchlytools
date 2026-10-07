'use client'

import { useEffect } from 'react';
import { recordToolVisit } from '@/lib/storage';

export function ToolVisitTracker({ slug }: { slug: string }) {
  useEffect(() => {
    recordToolVisit(slug);
  }, [slug]);

  return null;
}
