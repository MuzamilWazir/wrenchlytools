'use client';

import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Autoplay, Keyboard, Pagination } from 'swiper/modules';
import { ArrowLeft, ArrowRight, Flame } from 'lucide-react';
import { TOOLS_REGISTRY } from '@/data/toolsRegistry';
import { ToolCard } from '@/components/ui/ToolCard';

const SWIPER_MODULES = [Pagination, Autoplay, A11y, Keyboard];

export function ToolCarouselSwiper() {
  const tools = TOOLS_REGISTRY.filter((tool) => tool.isPopular);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const navRef = useRef<{ slidePrev: () => void; slideNext: () => void } | null>(null);

  const syncBounds = (swiper: { isBeginning: boolean; isEnd: boolean }) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-labelledby="tool-carousel-heading">
      <div className="flex items-end justify-between gap-6 mb-6">
        <div>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-clay-600">
            <Flame className="w-3.5 h-3.5" />
            Most Used
          </span>
          <h2
            id="tool-carousel-heading"
            className="text-2xl sm:text-3xl font-black tracking-tight text-ink mt-1.5"
          >
            Swipe Through Popular Tools
          </h2>
          <p className="text-sm text-stone-500 mt-1">
            Drag or use the arrows to browse {tools.length} of the most popular utilities.
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => navRef.current?.slidePrev()}
            disabled={isBeginning}
            aria-label="Previous tools"
            className="w-10 h-10 rounded-full border border-line bg-white flex items-center justify-center text-stone-600 hover:border-moss-500 hover:text-moss-600 disabled:opacity-40 disabled:pointer-events-none transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => navRef.current?.slideNext()}
            disabled={isEnd}
            aria-label="Next tools"
            className="w-10 h-10 rounded-full border border-line bg-white flex items-center justify-center text-stone-600 hover:border-moss-500 hover:text-moss-600 disabled:opacity-40 disabled:pointer-events-none transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <Swiper
        modules={SWIPER_MODULES}
        className="tool-swiper"
        spaceBetween={16}
        slidesPerView={1.2}
        grabCursor
        watchOverflow
        onSwiper={(swiper) => {
          navRef.current = swiper;
          syncBounds(swiper);
        }}
        onSlideChange={syncBounds}
        onReachBeginning={syncBounds}
        onReachEnd={syncBounds}
        keyboard={{ enabled: true, onlyInViewport: true }}
        a11y={{
          enabled: true,
          prevSlideMessage: 'Previous tool',
          nextSlideMessage: 'Next tool',
        }}
        autoplay={{ delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true }}
        pagination={{ clickable: true }}
        breakpoints={{
          480: { slidesPerView: 1.9, spaceBetween: 16 },
          640: { slidesPerView: 2.5, spaceBetween: 16 },
          900: { slidesPerView: 3.2, spaceBetween: 20 },
          1200: { slidesPerView: 4, spaceBetween: 20 },
        }}
      >
        {tools.map((tool) => (
          <SwiperSlide key={tool.slug} className="h-auto">
            <div className="h-full">
              <ToolCard tool={tool} className="h-full" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="sm:hidden flex items-center justify-center gap-3 mt-6">
        <button
          type="button"
          onClick={() => navRef.current?.slidePrev()}
          aria-label="Previous tools"
          className="w-10 h-10 rounded-full border border-line bg-white flex items-center justify-center text-stone-600"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => navRef.current?.slideNext()}
          aria-label="Next tools"
          className="w-10 h-10 rounded-full border border-line bg-white flex items-center justify-center text-stone-600"
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
