'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { storybookChapters, cycleSteps } from './cycleData';
import { CycleIcon, CycleIconType } from './CycleIcon';

// Version 12: Storybook Layout
// Four chapters with illustrations, titles, and narrative paragraphs
// Horizontal scroll on desktop, vertical stack on mobile

export function CycleVersion12(): React.ReactElement {
  const [activeChapter, setActiveChapter] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const chapterRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = (): void => {
      const scrollLeft = container.scrollLeft;
      const containerWidth = container.offsetWidth;
      const chapterIndex = Math.round(scrollLeft / containerWidth);
      setActiveChapter(Math.min(chapterIndex, storybookChapters.length - 1));
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToChapter = (index: number): void => {
    chapterRefs.current[index]?.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'nearest', 
      inline: 'start' 
    });
  };

  return (
    <div className="py-12">
      {/* Chapter navigation */}
      <div className="flex justify-center gap-2 mb-8 px-4">
        {storybookChapters.map((chapter, index) => (
          <button
            key={chapter.chapter}
            onClick={() => scrollToChapter(index)}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
            `}
            style={{
              background: activeChapter === index ? 'var(--theme-accent)' : 'var(--theme-bg-secondary)',
              color: activeChapter === index ? 'white' : 'rgba(255,255,255,0.5)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            Ch. {chapter.chapter}
          </button>
        ))}
      </div>

      {/* Desktop: Horizontal scroll */}
      <div className="hidden md:block">
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth"
          style={{ 
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <style jsx>{`div::-webkit-scrollbar { display: none; }`}</style>
          
          {storybookChapters.map((chapter, index) => (
            <div
              key={chapter.chapter}
              ref={(el) => { chapterRefs.current[index] = el; }}
              className="flex-shrink-0 w-full snap-start"
            >
              <div className="max-w-6xl mx-auto px-8">
                <div 
                  className="grid grid-cols-2 gap-12 p-12 rounded-3xl min-h-[500px]"
                  style={{
                    background: 'linear-gradient(135deg, var(--theme-bg-secondary) 0%, var(--theme-bg-primary) 100%)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    boxShadow: '0 40px 100px rgba(0,0,0,0.5)',
                  }}
                >
                  {/* Image side */}
                  <div className="relative rounded-2xl overflow-hidden">
                    <Image
                      src={cycleSteps[index].image}
                      alt={chapter.title}
                      fill
                      className="object-cover"
                    />
                    <div 
                      className="absolute inset-0"
                      style={{
                        background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.7) 100%)',
                      }}
                    />
                    
                    {/* Chapter number overlay */}
                    <div className="absolute top-6 left-6">
                      <span 
                        className="inline-block px-4 py-2 rounded-full text-sm font-bold"
                        style={{ 
                          background: 'rgba(0,0,0,0.6)', 
                          backdropFilter: 'blur(10px)',
                          color: 'var(--theme-accent)',
                          border: '1px solid var(--theme-accent)',
                        }}
                      >
                        Chapter {chapter.chapter}
                      </span>
                    </div>

                    {/* Icon at bottom */}
                    <div className="absolute bottom-6 left-6">
                      <CycleIcon type={cycleSteps[index].icon as CycleIconType} size={48} />
                    </div>
                  </div>

                  {/* Text side */}
                  <div className="flex flex-col justify-center">
                    <span 
                      className="text-sm font-semibold uppercase tracking-wider mb-4"
                      style={{ color: 'var(--theme-accent)' }}
                    >
                      {chapter.subtitle}
                    </span>
                    
                    <h2 
                      className="text-4xl font-bold text-white mb-6"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {chapter.title}
                    </h2>
                    
                    <p className="text-xl text-white/70 leading-relaxed mb-8 italic">
                      &ldquo;{chapter.narrative}&rdquo;
                    </p>

                    {/* Page turn indicator */}
                    {index < storybookChapters.length - 1 && (
                      <button
                        onClick={() => scrollToChapter(index + 1)}
                        className="inline-flex items-center gap-2 text-sm font-medium transition-all hover:gap-4"
                        style={{ color: 'var(--theme-accent)' }}
                      >
                        Continue to Chapter {chapter.chapter + 1}
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </button>
                    )}

                    {index === storybookChapters.length - 1 && (
                      <button
                        onClick={() => scrollToChapter(0)}
                        className="inline-flex items-center gap-2 text-sm font-medium transition-all hover:gap-4"
                        style={{ color: 'var(--theme-accent)' }}
                      >
                        <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        The story repeats...
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll hint */}
        <div className="flex justify-center mt-6 gap-2">
          {storybookChapters.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToChapter(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeChapter === index ? 'w-8' : ''
              }`}
              style={{
                background: activeChapter === index ? 'var(--theme-accent)' : 'rgba(255,255,255,0.2)',
              }}
            />
          ))}
        </div>
      </div>

      {/* Mobile: Vertical stack */}
      <div className="md:hidden px-4 space-y-8">
        {storybookChapters.map((chapter, index) => (
          <div
            key={chapter.chapter}
            className="rounded-2xl overflow-hidden"
            style={{
              background: 'var(--theme-bg-secondary)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            {/* Image */}
            <div className="relative aspect-[16/10]">
              <Image
                src={cycleSteps[index].image}
                alt={chapter.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute top-4 left-4">
                <span 
                  className="px-3 py-1 rounded-full text-xs font-bold"
                  style={{ background: 'var(--theme-accent)', color: 'white' }}
                >
                  Chapter {chapter.chapter}
                </span>
              </div>
              <div className="absolute bottom-4 left-4">
                <CycleIcon type={cycleSteps[index].icon as CycleIconType} size={36} />
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <span 
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: 'var(--theme-accent)' }}
              >
                {chapter.subtitle}
              </span>
              <h3 
                className="text-2xl font-bold text-white mt-2 mb-4"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {chapter.title}
              </h3>
              <p className="text-white/70 text-sm italic leading-relaxed">
                &ldquo;{chapter.narrative}&rdquo;
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


