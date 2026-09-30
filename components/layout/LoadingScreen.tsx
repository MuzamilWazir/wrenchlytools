'use client'

import { useState, useEffect } from 'react';
import { Wrench } from 'lucide-react';

export function LoadingScreen({ onFinish }: { onFinish: () => void }) {
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFade(true);
      setTimeout(onFinish, 300);
    }, 600);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-background text-ink transition-opacity duration-300 ${
        fade ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-moss-500 shadow-lg mb-4">
        <Wrench className="w-8 h-8 text-white animate-pulse" />
      </div>
      <div className="text-xl font-bold tracking-tight text-ink mb-2 flex items-center gap-2">
        <span>Wrenchly<span className="text-moss-600">Tools</span></span>
      </div>
      <p className="text-xs text-stone-600 font-medium">Getting your toolbox ready...</p>
      <div className="w-32 h-1 bg-stone-200 rounded-full mt-4 overflow-hidden">
        <div className="h-full bg-moss-500 rounded-full animate-[progress_1s_ease-in-out_infinite]" />
      </div>
    </div>
  )
}
