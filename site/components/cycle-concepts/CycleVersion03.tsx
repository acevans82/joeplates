'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { cycleSteps } from './cycleData';
import { CycleIcon, CycleIconType } from './CycleIcon';

// Version 03: Checkered "Process" Layout
// Alternating image left/right rows with step numbers
// When centered/focused, sections get the accent color treatment

export function CycleVersion03(): React.ReactElement {
  const [centeredIndex, setCenteredIndex] = useState<number>(0);
  const [visibleRows, setVisibleRows] = useState<Set<number>>(new Set());
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Track which row is centered in the viewport
  useEffect(() => {
    const handleScroll = (): void => {
      const viewportCenter = window.innerHeight / 2;
      let closestIndex = 0;
      let closestDistance = Infinity;

      rowRefs.current.forEach((ref, index) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          const rowCenter = rect.top + rect.height / 2;
          const distance = Math.abs(rowCenter - viewportCenter);
          
          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
          }
        }
      });

      setCenteredIndex(closestIndex);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track visibility for entrance animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.getAttribute('data-index') || '0', 10);
          if (entry.isIntersecting) {
            setVisibleRows((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.2, rootMargin: '-50px' }
    );

    rowRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="py-12 space-y-0">
      {cycleSteps.map((step, index) => {
        const isEven = index % 2 === 0;
        const isVisible = visibleRows.has(index);
        const isCentered = centeredIndex === index;
        
        return (
          <div
            key={step.id}
            ref={(el) => { rowRefs.current[index] = el; }}
            data-index={index}
            className={`
              grid grid-cols-1 md:grid-cols-2 gap-0
              transition-all duration-700 ease-out
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
            `}
          >
            {/* Image Side */}
            <div 
              className={`relative aspect-[4/3] md:aspect-auto md:min-h-[450px] ${isEven ? 'md:order-1' : 'md:order-2'}`}
              style={{
                transitionDelay: isVisible ? '100ms' : '0ms',
              }}
            >
              <Image
                src={step.image}
                alt={step.label}
                fill
                className="object-cover"
              />
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-black/20" />
              
              {/* Centered step number badge */}
              <div 
                className="absolute inset-0 flex items-center justify-center"
              >
                <div 
                  className={`w-28 h-28 md:w-32 md:h-32 rounded-full flex items-center justify-center transition-all duration-500`}
                  style={{
                    background: isCentered ? 'var(--theme-accent)' : 'rgba(0,0,0,0.6)',
                    boxShadow: isCentered 
                      ? '0 12px 40px rgba(0,0,0,0.5), 0 0 60px rgba(var(--theme-accent-rgb), 0.3)'
                      : '0 8px 30px rgba(0,0,0,0.4)',
                    border: isCentered ? 'none' : '2px solid rgba(255,255,255,0.2)',
                  }}
                >
                  <span className="text-white text-4xl md:text-5xl font-bold">0{step.number}</span>
                </div>
              </div>
            </div>
            
            {/* Content Side */}
            <div 
              className={`
                flex items-center p-8 md:p-12 lg:p-16 transition-all duration-500
                ${isEven ? 'md:order-2' : 'md:order-1'}
              `}
              style={{
                background: isCentered 
                  ? 'linear-gradient(135deg, var(--theme-accent) 0%, color-mix(in srgb, var(--theme-accent) 80%, black) 100%)'
                  : 'var(--theme-bg-secondary)',
                transitionDelay: isVisible ? '200ms' : '0ms',
              }}
            >
              <div className="max-w-lg">
                {/* Icon and label */}
                <div className="flex items-center gap-3 mb-4">
                  <CycleIcon type={step.icon as CycleIconType} size={36} />
                  <span 
                    className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full transition-all duration-500`}
                    style={{ 
                      background: isCentered ? 'rgba(255,255,255,0.2)' : 'var(--theme-accent)/20',
                      color: isCentered ? 'white' : 'var(--theme-accent)',
                    }}
                  >
                    Step {step.number}
                  </span>
                </div>

                {/* Title */}
                <h3 
                  className="text-3xl md:text-4xl font-bold text-white mb-4"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {step.label}
                </h3>

                {/* Story */}
                <p className={`text-lg leading-relaxed mb-4 transition-colors duration-500 ${isCentered ? 'text-white/90' : 'text-white/70'}`}>
                  {step.story}
                </p>

                {/* Description */}
                <p className={`text-sm leading-relaxed transition-colors duration-500 ${isCentered ? 'text-white/70' : 'text-white/50'}`}>
                  {step.description}
                </p>

                {/* Arrow indicator for flow */}
                {index < cycleSteps.length - 1 && (
                  <div 
                    className={`hidden md:flex mt-8 items-center gap-2 transition-opacity duration-500`}
                    style={{ 
                      color: isCentered ? 'white' : 'var(--theme-accent)',
                      opacity: isCentered ? 1 : 0.7,
                    }}
                  >
                    <span className="text-sm font-medium">Next</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {/* Summary bar */}
      <div 
        className="py-8 px-6 text-center"
        style={{ background: 'var(--theme-bg-primary)' }}
      >
        <p className="text-lg" style={{ color: 'var(--theme-accent)' }}>
          Private Dining <span className="text-white/30 mx-3">→</span>
          Travel <span className="text-white/30 mx-3">→</span>
          Collection & Curation <span className="text-white/30 mx-3">→</span>
          Repeat
        </p>
      </div>
    </div>
  );
}
