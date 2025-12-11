'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { cycleSteps } from './cycleData';
import { CycleIcon, CycleIconType } from './CycleIcon';

// Version 17: DNA Helix - Intertwined Journey
// Two strands (Experience & Growth) weave together through each step
// Shows how personal experience and collection growth intertwine

export function CycleVersion17(): React.ReactElement {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll for helix animation
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight + rect.height)));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Generate helix path points
  const generateHelixPath = (strand: 'left' | 'right', steps: number = 100): string => {
    const points: string[] = [];
    const amplitude = 150;
    const frequency = 0.8;
    const phase = strand === 'right' ? Math.PI : 0;
    
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const x = 400 + Math.sin(t * Math.PI * frequency * 4 + phase) * amplitude;
      const y = t * 900;
      points.push(`${i === 0 ? 'M' : 'L'} ${x} ${y}`);
    }
    return points.join(' ');
  };

  // Step positions along the helix
  const stepPositions = [
    { y: 100, side: 'left' },
    { y: 325, side: 'right' },
    { y: 550, side: 'left' },
    { y: 775, side: 'right' },
  ];

  return (
    <div className="py-16 px-4">
      {/* Desktop: Helix visualization */}
      <div className="hidden md:block">
        <div ref={containerRef} className="relative max-w-4xl mx-auto" style={{ height: '1000px' }}>
          {/* SVG Helix strands */}
          <svg 
            className="absolute inset-0 w-full h-full" 
            viewBox="0 0 800 900"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              {/* Gradients for strands */}
              <linearGradient id="strandExperience" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="var(--theme-accent)" stopOpacity="0.3" />
                <stop offset="50%" stopColor="var(--theme-accent)" stopOpacity="0.8" />
                <stop offset="100%" stopColor="var(--theme-accent)" stopOpacity="0.3" />
              </linearGradient>
              <linearGradient id="strandGrowth" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="white" stopOpacity="0.1" />
                <stop offset="50%" stopColor="white" stopOpacity="0.3" />
                <stop offset="100%" stopColor="white" stopOpacity="0.1" />
              </linearGradient>
              
              {/* Glow filter */}
              <filter id="helixGlow">
                <feGaussianBlur stdDeviation="4" result="glow" />
                <feMerge>
                  <feMergeNode in="glow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Connecting rungs (like DNA base pairs) */}
            {stepPositions.map((pos, i) => {
              const leftX = 400 + Math.sin((pos.y / 900) * Math.PI * 0.8 * 4) * 150;
              const rightX = 400 + Math.sin((pos.y / 900) * Math.PI * 0.8 * 4 + Math.PI) * 150;
              return (
                <line
                  key={`rung-${i}`}
                  x1={leftX}
                  y1={pos.y}
                  x2={rightX}
                  y2={pos.y}
                  stroke="var(--theme-accent)"
                  strokeWidth="2"
                  opacity={activeStep === i ? 0.8 : 0.2}
                  strokeDasharray={activeStep === i ? 'none' : '4 4'}
                />
              );
            })}

            {/* Left strand - Experience */}
            <path
              d={generateHelixPath('left')}
              fill="none"
              stroke="url(#strandExperience)"
              strokeWidth="4"
              filter="url(#helixGlow)"
              strokeLinecap="round"
              style={{
                strokeDasharray: 2000,
                strokeDashoffset: 2000 - (scrollProgress * 2000),
                transition: 'stroke-dashoffset 0.1s ease-out',
              }}
            />

            {/* Right strand - Growth */}
            <path
              d={generateHelixPath('right')}
              fill="none"
              stroke="url(#strandGrowth)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="8 4"
              style={{
                opacity: 0.5,
              }}
            />
          </svg>

          {/* Step nodes */}
          {cycleSteps.map((step, index) => {
            const pos = stepPositions[index];
            const t = pos.y / 900;
            const xOffset = pos.side === 'left' ? -250 : 250;
            const nodeX = 400 + Math.sin(t * Math.PI * 0.8 * 4 + (pos.side === 'left' ? 0 : Math.PI)) * 150;
            
            return (
              <div
                key={step.id}
                className={`absolute transition-all duration-500 ${pos.side === 'left' ? 'text-right' : 'text-left'}`}
                style={{
                  top: `${(pos.y / 900) * 100}%`,
                  left: '50%',
                  transform: `translateX(${xOffset}px) translateY(-50%)`,
                  width: '280px',
                }}
                onMouseEnter={() => setActiveStep(index)}
                onMouseLeave={() => setActiveStep(null)}
              >
                <div 
                  className={`
                    inline-flex items-center gap-4 p-5 rounded-2xl cursor-pointer
                    transition-all duration-300
                    ${pos.side === 'left' ? 'flex-row-reverse' : 'flex-row'}
                    ${activeStep === index ? 'scale-105' : 'scale-100'}
                  `}
                  style={{
                    background: activeStep === index ? 'var(--theme-accent)' : 'var(--theme-bg-secondary)',
                    border: `2px solid ${activeStep === index ? 'var(--theme-accent)' : 'rgba(255,255,255,0.1)'}`,
                    boxShadow: activeStep === index 
                      ? '0 20px 50px rgba(0,0,0,0.5), 0 0 30px rgba(var(--theme-accent-rgb), 0.3)' 
                      : '0 10px 30px rgba(0,0,0,0.3)',
                  }}
                >
                  {/* Icon node */}
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      background: activeStep === index ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.05)',
                    }}
                  >
                    <CycleIcon type={step.icon as CycleIconType} size={28} />
                  </div>
                  
                  {/* Content */}
                  <div className={pos.side === 'left' ? 'text-right' : 'text-left'}>
                    <span 
                      className="text-xs font-bold uppercase tracking-wider block mb-1"
                      style={{ color: activeStep === index ? 'rgba(255,255,255,0.8)' : 'var(--theme-accent)' }}
                    >
                      Step {step.number}
                    </span>
                    <h4 
                      className="font-bold text-white text-lg"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {step.label}
                    </h4>
                    {activeStep === index && (
                      <p className="text-white/80 text-sm mt-2 animate-fade-in">
                        {step.story}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Strand labels */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <div className="w-8 h-1 rounded" style={{ background: 'var(--theme-accent)' }} />
            <span className="text-xs text-white/50 uppercase tracking-wider">Experience</span>
          </div>
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <span className="text-xs text-white/50 uppercase tracking-wider">Growth</span>
            <div className="w-8 h-1 rounded bg-white/30" style={{ border: '1px dashed rgba(255,255,255,0.3)' }} />
          </div>

          {/* Return indicator at bottom */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
            <svg className="w-12 h-12 mx-auto mb-2" style={{ color: 'var(--theme-accent)' }} viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <p className="text-white/40 text-sm">The strands intertwine, always returning to dining</p>
          </div>
        </div>
      </div>

      {/* Mobile: Vertical zigzag */}
      <div className="md:hidden">
        <div className="relative">
          {/* Zigzag connector */}
          <svg className="absolute left-0 top-0 w-full h-full" style={{ zIndex: 0 }}>
            <path
              d="M 20% 60 Q 80% 140 20% 220 Q 80% 300 20% 380 Q 80% 460 20% 540 Q 80% 620 20% 700"
              fill="none"
              stroke="var(--theme-accent)"
              strokeWidth="2"
              opacity="0.3"
            />
          </svg>

          <div className="space-y-8 relative z-10">
            {cycleSteps.map((step, index) => (
              <div 
                key={step.id}
                className={`flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
              >
                <div 
                  className="w-4/5 p-5 rounded-2xl"
                  style={{
                    background: index === 0 ? 'var(--theme-accent)' : 'var(--theme-bg-secondary)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ background: index === 0 ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.05)' }}
                    >
                      <CycleIcon type={step.icon as CycleIconType} size={20} />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--theme-accent)' }}>
                        Step {step.number}
                      </span>
                      <h4 className="font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                        {step.label}
                      </h4>
                    </div>
                  </div>
                  <p className={`text-sm ${index === 0 ? 'text-white/90' : 'text-white/60'}`}>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Return arrow */}
          <div className="flex justify-center mt-8">
            <div className="flex items-center gap-2 text-white/40">
              <svg className="w-5 h-5" style={{ color: 'var(--theme-accent)' }} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span className="text-xs">Cycle continues</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



