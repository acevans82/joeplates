'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { cycleSteps } from './cycleData';
import { CycleIcon, CycleIconType } from './CycleIcon';

// Version 20: Golden Spiral - Growth Over Time
// A nautilus/Fibonacci spiral that expands outward from dining
// Each rotation represents a year, showing compounding growth

export function CycleVersion20(): React.ReactElement {
  const [activeYear, setActiveYear] = useState(1);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const [spiralProgress, setSpiralProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Animate spiral drawing on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight * 0.7)));
      setSpiralProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Generate golden spiral path
  const generateSpiralPath = (rotations: number = 3): string => {
    const points: string[] = [];
    const goldenRatio = 1.618;
    const steps = rotations * 100;
    const centerX = 400;
    const centerY = 350;
    
    for (let i = 0; i <= steps; i++) {
      const t = i / 100; // rotations
      const angle = t * Math.PI * 2;
      const radius = 20 * Math.pow(goldenRatio, t * 0.5);
      const x = centerX + radius * Math.cos(angle - Math.PI / 2);
      const y = centerY + radius * Math.sin(angle - Math.PI / 2);
      points.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`);
    }
    return points.join(' ');
  };

  // Calculate positions for steps along spiral
  const getStepPosition = (stepIndex: number, year: number = 1) => {
    const goldenRatio = 1.618;
    const baseRotation = (stepIndex / 4) + (year - 1);
    const angle = baseRotation * Math.PI * 2 - Math.PI / 2;
    const radius = 20 * Math.pow(goldenRatio, baseRotation * 0.5);
    const centerX = 400;
    const centerY = 350;
    
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
      scale: 0.5 + (year * 0.2),
    };
  };

  // Years for visualization (showing 3 rotations)
  const years = [1, 2, 3];

  return (
    <div className="py-16 px-4">
      {/* Desktop: Spiral visualization */}
      <div className="hidden md:block">
        <div ref={containerRef} className="relative max-w-4xl mx-auto" style={{ height: '750px' }}>
          {/* Year selector */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20">
            <div 
              className="inline-flex p-1 rounded-full"
              style={{ background: 'var(--theme-bg-secondary)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => setActiveYear(year)}
                  className={`
                    px-5 py-2 rounded-full font-semibold text-sm transition-all duration-300
                  `}
                  style={{
                    background: activeYear === year ? 'var(--theme-accent)' : 'transparent',
                    color: activeYear === year ? 'white' : 'rgba(255,255,255,0.5)',
                  }}
                >
                  Year {year}
                </button>
              ))}
            </div>
          </div>

          {/* SVG Spiral */}
          <svg 
            className="absolute inset-0 w-full h-full" 
            viewBox="0 0 800 700"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              {/* Spiral gradient */}
              <linearGradient id="spiralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--theme-accent)" stopOpacity="0.2" />
                <stop offset="50%" stopColor="var(--theme-accent)" stopOpacity="0.6" />
                <stop offset="100%" stopColor="var(--theme-accent)" stopOpacity="0.9" />
              </linearGradient>
              
              {/* Glow filter */}
              <filter id="spiralGlow">
                <feGaussianBlur stdDeviation="3" result="glow" />
                <feMerge>
                  <feMergeNode in="glow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Golden rectangle pattern */}
              <pattern id="goldenGrid" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <rect width="100" height="100" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
              </pattern>
            </defs>

            {/* Background golden rectangles hint */}
            <rect x="0" y="0" width="800" height="700" fill="url(#goldenGrid)" />

            {/* Main spiral path */}
            <path
              d={generateSpiralPath(3.5)}
              fill="none"
              stroke="url(#spiralGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              filter="url(#spiralGlow)"
              style={{
                strokeDasharray: 3000,
                strokeDashoffset: 3000 - (spiralProgress * 3000),
                transition: 'stroke-dashoffset 0.5s ease-out',
              }}
            />

            {/* Year rings (subtle arcs) */}
            {years.map((year) => {
              const goldenRatio = 1.618;
              const radius = 20 * Math.pow(goldenRatio, year * 0.5);
              return (
                <circle
                  key={`ring-${year}`}
                  cx="400"
                  cy="350"
                  r={radius}
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="1"
                  strokeDasharray="4 8"
                  opacity={activeYear >= year ? 0.5 : 0.1}
                />
              );
            })}

            {/* Center origin point */}
            <circle cx="400" cy="350" r="15" fill="var(--theme-accent)" />
            <circle cx="400" cy="350" r="25" fill="none" stroke="var(--theme-accent)" strokeWidth="2" opacity="0.5" />
          </svg>

          {/* Step nodes along spiral */}
          {cycleSteps.map((step, stepIndex) => {
            const pos = getStepPosition(stepIndex, activeYear);
            const isActive = hoveredStep === stepIndex;
            
            return (
              <div
                key={`${step.id}-${activeYear}`}
                className="absolute transition-all duration-500"
                style={{
                  left: `${(pos.x / 800) * 100}%`,
                  top: `${(pos.y / 700) * 100}%`,
                  transform: `translate(-50%, -50%) scale(${isActive ? 1.2 : pos.scale})`,
                  zIndex: isActive ? 30 : 10,
                }}
                onMouseEnter={() => setHoveredStep(stepIndex)}
                onMouseLeave={() => setHoveredStep(null)}
              >
                <div 
                  className="relative cursor-pointer"
                  style={{
                    transition: 'all 0.3s ease',
                  }}
                >
                  {/* Node */}
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{
                      background: isActive ? 'var(--theme-accent)' : stepIndex === 0 ? 'var(--theme-accent)' : 'var(--theme-bg-secondary)',
                      border: `2px solid ${isActive || stepIndex === 0 ? 'var(--theme-accent)' : 'rgba(255,255,255,0.2)'}`,
                      boxShadow: isActive 
                        ? '0 0 40px var(--theme-accent), 0 10px 40px rgba(0,0,0,0.4)' 
                        : '0 4px 20px rgba(0,0,0,0.3)',
                    }}
                  >
                    <CycleIcon type={step.icon as CycleIconType} size={24} />
                  </div>

                  {/* Year badge */}
                  <div 
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{
                      background: 'var(--theme-bg-secondary)',
                      border: '1px solid var(--theme-accent)',
                      color: 'var(--theme-accent)',
                    }}
                  >
                    {activeYear}
                  </div>

                  {/* Tooltip */}
                  {isActive && (
                    <div 
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-64 p-4 rounded-xl text-center animate-fade-in"
                      style={{
                        background: 'var(--theme-bg-secondary)',
                        border: '1px solid var(--theme-accent)',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                      }}
                    >
                      <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--theme-accent)' }}>
                        Year {activeYear} • {step.shortLabel}
                      </span>
                      <h4 className="font-bold text-white text-lg mt-1" style={{ fontFamily: 'var(--font-heading)' }}>
                        {step.label}
                      </h4>
                      <p className="text-white/70 text-sm mt-2">{step.story}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Growth indicator */}
          <div className="absolute bottom-4 right-4 p-4 rounded-xl" style={{ background: 'var(--theme-bg-secondary)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div className="flex items-center gap-3">
              <svg className="w-8 h-8" style={{ color: 'var(--theme-accent)' }} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <div>
                <span className="text-xs text-white/50 block">Collection Growth</span>
                <span className="text-white font-bold" style={{ color: 'var(--theme-accent)' }}>
                  Year {activeYear}: {activeYear === 1 ? '~20 bottles' : activeYear === 2 ? '~50 bottles' : '~100+ bottles'}
                </span>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
            <p className="text-white/40 text-sm">
              The golden spiral: each cycle expands, but always returns through the same four steps.
            </p>
          </div>
        </div>
      </div>

      {/* Mobile: Simplified spiral with year tabs */}
      <div className="md:hidden">
        {/* Year tabs */}
        <div className="flex justify-center mb-8">
          <div 
            className="inline-flex p-1 rounded-full"
            style={{ background: 'var(--theme-bg-secondary)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setActiveYear(year)}
                className="px-4 py-2 rounded-full font-semibold text-xs transition-all duration-300"
                style={{
                  background: activeYear === year ? 'var(--theme-accent)' : 'transparent',
                  color: activeYear === year ? 'white' : 'rgba(255,255,255,0.5)',
                }}
              >
                Year {year}
              </button>
            ))}
          </div>
        </div>

        {/* Simplified spiral graphic */}
        <div className="flex justify-center mb-8">
          <svg viewBox="0 0 200 200" className="w-32 h-32">
            <defs>
              <linearGradient id="mobileSpiral" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--theme-accent)" stopOpacity="0.3" />
                <stop offset="100%" stopColor="var(--theme-accent)" stopOpacity="0.9" />
              </linearGradient>
            </defs>
            
            {/* Simplified spiral */}
            <path
              d="M 100 100 
                 C 100 70, 130 70, 130 100
                 C 130 130, 70 130, 70 100
                 C 70 50, 150 50, 150 100
                 C 150 150, 50 150, 50 100
                 C 50 30, 170 30, 170 100"
              fill="none"
              stroke="url(#mobileSpiral)"
              strokeWidth="4"
              strokeLinecap="round"
            />
            
            {/* Center point */}
            <circle cx="100" cy="100" r="8" fill="var(--theme-accent)" />
            
            {/* Year indicator dots */}
            {years.map((year, i) => {
              const angle = (i * 120 - 90) * (Math.PI / 180);
              const radius = 30 + i * 25;
              const x = 100 + radius * Math.cos(angle);
              const y = 100 + radius * Math.sin(angle);
              return (
                <circle
                  key={year}
                  cx={x}
                  cy={y}
                  r={activeYear === year ? 6 : 4}
                  fill={activeYear >= year ? 'var(--theme-accent)' : 'rgba(255,255,255,0.3)'}
                />
              );
            })}
          </svg>
        </div>

        {/* Year context */}
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
            Year {activeYear} Journey
          </h3>
          <p className="text-white/50 text-sm mt-1">
            {activeYear === 1 && 'Your first rotation through the JoePlates cycle'}
            {activeYear === 2 && 'Deeper connections, growing collection'}
            {activeYear === 3 && 'A well-curated cellar, lifelong memories'}
          </p>
        </div>

        {/* Steps for selected year */}
        <div className="space-y-4">
          {cycleSteps.map((step, index) => (
            <div 
              key={step.id}
              className="p-4 rounded-xl"
              style={{
                background: index === 0 ? 'var(--theme-accent)' : 'var(--theme-bg-secondary)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background: index === 0 ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.05)',
                    transform: `scale(${0.8 + activeYear * 0.1})`,
                  }}
                >
                  <CycleIcon type={step.icon as CycleIconType} size={20} />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                    {step.label}
                  </h4>
                  <p className={`text-xs mt-1 ${index === 0 ? 'text-white/80' : 'text-white/50'}`}>
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Growth note */}
        <div className="mt-8 text-center">
          <div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
            style={{ background: 'var(--theme-bg-secondary)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <svg className="w-4 h-4" style={{ color: 'var(--theme-accent)' }} viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <span className="text-xs text-white/60">
              Each year, the spiral expands
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

