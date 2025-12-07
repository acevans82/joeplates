'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { cycleSteps, cycleTagline } from './cycleData';
import { CycleIcon, CycleIconType } from './CycleIcon';

// Version 10: Stepper with Sticky Side Panel
// Left: Sticky heading and summary, Right: Scrolling step cards

export function CycleVersion10(): React.ReactElement {
  const [activeIndex, setActiveIndex] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0', 10);
            setActiveIndex(index);
          }
        });
      },
      { 
        threshold: 0.5,
        rootMargin: '-100px 0px -100px 0px',
      }
    );

    stepRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="py-12">
      {/* Desktop: Split with sticky */}
      <div className="hidden lg:grid grid-cols-5 gap-8 max-w-7xl mx-auto px-8">
        {/* Sticky Left Panel */}
        <div className="col-span-2">
          <div className="sticky top-32">
            <span 
              className="inline-block px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-6"
              style={{ 
                background: 'var(--cycle-badge-bg, var(--theme-accent))', 
                color: 'var(--cycle-badge-fg, white)' 
              }}
            >
              The JoePlates Cycle
            </span>
            
            <h2 
              className="text-4xl font-bold text-white mb-6"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              <span className="block whitespace-nowrap">
                Dine → Travel → Curate
              </span>
              <span className="block whitespace-nowrap">
                ← Repeat
              </span>
            </h2>
            
            <p className="text-white/60 text-lg leading-relaxed mb-8">
              Most people first meet Joe at the table. From there, a rhythm begins—one that 
              carries through seasons, travels, and growing collections.
            </p>

            {/* Progress indicator */}
            <div className="space-y-3">
              {cycleSteps.map((step, index) => (
                <button
                  key={step.id}
                  onClick={() => {
                    stepRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                  className={`
                    flex items-center gap-3 w-full text-left p-3 rounded-lg
                    transition-all duration-300
                  `}
                  style={{
                    background: activeIndex === index 
                      ? 'var(--theme-bg-secondary)' 
                      : 'transparent',
                    border: activeIndex === index 
                      ? '1px solid var(--theme-accent)' 
                      : '1px solid transparent',
                  }}
                >
                  <div 
                    className={`
                      w-8 h-8 rounded-full flex items-center justify-center
                      transition-all duration-300
                    `}
                    style={{
                      background: activeIndex === index || index === 0 
                        ? 'var(--badge-solid-bg, var(--theme-accent))' 
                        : 'rgba(255,255,255,0.1)',
                      color: activeIndex === index || index === 0
                        ? 'var(--badge-solid-fg, white)'
                        : '#ffffff',
                    }}
                  >
                    <CycleIcon type={step.icon as CycleIconType} size={16} />
                  </div>
                  <span 
                    className={`font-medium transition-colors ${
                      activeIndex === index ? 'text-white' : 'text-white/50'
                    }`}
                  >
                    {step.label}
                  </span>
                  {activeIndex === index && (
                    <svg className="w-4 h-4 ml-auto text-[var(--theme-accent)]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Scrolling Right Panel */}
        <div className="col-span-3 space-y-8">
          {cycleSteps.map((step, index) => (
            <div
              key={step.id}
              ref={(el) => { stepRefs.current[index] = el; }}
              data-index={index}
              className={`
                p-8 rounded-2xl transition-all duration-500
                ${activeIndex === index ? 'scale-100' : 'scale-[0.98] opacity-70'}
              `}
              style={{
                background: activeIndex === index 
                  ? 'var(--theme-bg-secondary)' 
                  : 'transparent',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: activeIndex === index 
                  ? '0 20px 60px rgba(0,0,0,0.4)' 
                  : 'none',
              }}
            >
              {/* Image */}
              <div className="relative aspect-video rounded-xl overflow-hidden mb-6">
                <Image
                  src={step.image}
                  alt={step.label}
                  fill
                  className="object-cover"
                />
                <div 
                  className="absolute top-4 left-4 px-3 py-1 rounded-full flex items-center gap-2"
                  style={{
                    background: index === 0 ? 'var(--badge-solid-bg, var(--theme-accent))' : 'rgba(0,0,0,0.6)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <div
                    style={{ color: index === 0 ? 'var(--badge-solid-fg, white)' : '#ffffff' }}
                  >
                    <CycleIcon type={step.icon as CycleIconType} size={20} />
                  </div>
                  <span
                    className="text-sm font-bold"
                    style={{ color: index === 0 ? 'var(--badge-solid-fg, white)' : '#ffffff' }}
                  >
                    Step {step.number}
                  </span>
                </div>
              </div>

              {/* Content */}
              <h3 
                className="text-2xl font-bold text-white mb-4"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {step.label}
              </h3>
              
              <p className="text-white/70 text-lg leading-relaxed mb-4">
                {step.story}
              </p>
              
              <p className="text-white/50 text-sm">
                {step.description}
              </p>

              {/* Connection arrow */}
              {index < cycleSteps.length - 1 && (
                <div className="flex justify-center mt-8">
                  <svg className="w-6 h-6 text-[var(--theme-accent)] animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Tablet/Mobile: Standard stack */}
      <div className="lg:hidden px-4 space-y-6">
        <div className="text-center mb-8">
          <span 
            className="inline-block px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-4"
            style={{ 
              background: 'var(--cycle-badge-bg, var(--theme-accent))', 
              color: 'var(--cycle-badge-fg, white)' 
            }}
          >
            The JoePlates Cycle
          </span>
          <h2 
            className="text-3xl font-bold text-white mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {cycleTagline}
          </h2>
        </div>

        {cycleSteps.map((step, index) => (
          <div
            key={step.id}
            className="p-6 rounded-xl"
            style={{
              background: index === 0 ? 'var(--badge-solid-bg, var(--theme-accent))' : 'var(--theme-bg-secondary)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
              <Image src={step.image} alt={step.label} fill className="object-cover" />
            </div>
            <div className="flex items-center gap-2 mb-2">
              <div
                style={{ color: index === 0 ? 'var(--badge-solid-fg, white)' : '#ffffff' }}
              >
                <CycleIcon type={step.icon as CycleIconType} size={24} />
              </div>
              <span
                className="text-xs font-bold"
                style={{ color: index === 0 ? 'var(--badge-solid-fg, white)' : '#ffffffb3' }}
              >
                Step {step.number}
              </span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
              {step.label}
            </h3>
            <p
              className="text-sm"
              style={{ color: index === 0 ? 'var(--badge-solid-fg, white)' : '#ffffff99' }}
            >
              {step.story}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}


