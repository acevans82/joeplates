'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { cycleSteps } from './cycleData';
import { CycleIcon, CycleIconType } from './CycleIcon';

// Version 18: Seasons Clock Wheel
// A clock/calendar metaphor where dining is at 12 o'clock
// Shows the yearly rhythm and return to dining each season

export function CycleVersion18(): React.ReactElement {
  const [activeSegment, setActiveSegment] = useState<number | null>(0);
  const [handAngle, setHandAngle] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Animate the clock hand
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setHandAngle((prev) => {
        const newAngle = (prev + 0.5) % 360;
        // Update active segment based on hand position
        const segment = Math.floor(((newAngle + 45) % 360) / 90);
        setActiveSegment(segment);
        return newAngle;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Season/step configuration
  const seasons = [
    { step: cycleSteps[0], label: 'Winter', color: '#4A5568', angle: 0 },
    { step: cycleSteps[1], label: 'Spring', color: '#48BB78', angle: 90 },
    { step: cycleSteps[2], label: 'Summer', color: '#ED8936', angle: 180 },
    { step: cycleSteps[3], label: 'Fall', color: '#C53030', angle: 270 },
  ];

  const createArcPath = (startAngle: number, endAngle: number, innerRadius: number, outerRadius: number): string => {
    const start = ((startAngle - 90) * Math.PI) / 180;
    const end = ((endAngle - 90) * Math.PI) / 180;
    
    const x1 = 200 + innerRadius * Math.cos(start);
    const y1 = 200 + innerRadius * Math.sin(start);
    const x2 = 200 + outerRadius * Math.cos(start);
    const y2 = 200 + outerRadius * Math.sin(start);
    const x3 = 200 + outerRadius * Math.cos(end);
    const y3 = 200 + outerRadius * Math.sin(end);
    const x4 = 200 + innerRadius * Math.cos(end);
    const y4 = 200 + innerRadius * Math.sin(end);

    return `M ${x1} ${y1} L ${x2} ${y2} A ${outerRadius} ${outerRadius} 0 0 1 ${x3} ${y3} L ${x4} ${y4} A ${innerRadius} ${innerRadius} 0 0 0 ${x1} ${y1}`;
  };

  return (
    <div className="py-16 px-4">
      {/* Desktop: Clock visualization */}
      <div className="hidden md:block">
        <div 
          ref={containerRef}
          className="relative max-w-3xl mx-auto"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Clock face */}
          <svg viewBox="0 0 400 400" className="w-full max-w-[600px] mx-auto">
            <defs>
              {/* Segment gradients */}
              {seasons.map((season, i) => (
                <linearGradient key={`grad-${i}`} id={`segment-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={season.color} stopOpacity="0.3" />
                  <stop offset="100%" stopColor={season.color} stopOpacity="0.1" />
                </linearGradient>
              ))}
              
              {/* Clock face shadow */}
              <filter id="clockShadow">
                <feDropShadow dx="0" dy="4" stdDeviation="10" floodOpacity="0.3" />
              </filter>
              
              {/* Hand glow */}
              <filter id="handGlow">
                <feGaussianBlur stdDeviation="2" result="glow" />
                <feMerge>
                  <feMergeNode in="glow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Outer ring */}
            <circle cx="200" cy="200" r="190" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
            
            {/* Season segments */}
            {seasons.map((season, i) => (
              <g key={season.step.id}>
                <path
                  d={createArcPath(i * 90, (i + 1) * 90, 80, 180)}
                  fill={`url(#segment-${i})`}
                  stroke={activeSegment === i ? 'var(--theme-accent)' : 'rgba(255,255,255,0.1)'}
                  strokeWidth={activeSegment === i ? 2 : 1}
                  className="cursor-pointer transition-all duration-300"
                  style={{
                    opacity: activeSegment === i ? 1 : 0.7,
                    filter: activeSegment === i ? 'url(#clockShadow)' : 'none',
                  }}
                  onMouseEnter={() => setActiveSegment(i)}
                />
              </g>
            ))}

            {/* Hour marks */}
            {[...Array(12)].map((_, i) => {
              const angle = ((i * 30 - 90) * Math.PI) / 180;
              const x1 = 200 + 175 * Math.cos(angle);
              const y1 = 200 + 175 * Math.sin(angle);
              const x2 = 200 + 185 * Math.cos(angle);
              const y2 = 200 + 185 * Math.sin(angle);
              const isQuarter = i % 3 === 0;
              
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={isQuarter ? 'var(--theme-accent)' : 'rgba(255,255,255,0.3)'}
                  strokeWidth={isQuarter ? 3 : 1}
                />
              );
            })}

            {/* Season labels on outer ring */}
            {seasons.map((season, i) => {
              const angle = ((i * 90 + 45 - 90) * Math.PI) / 180;
              const x = 200 + 155 * Math.cos(angle);
              const y = 200 + 155 * Math.sin(angle);
              
              return (
                <text
                  key={`label-${i}`}
                  x={x}
                  y={y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={activeSegment === i ? 'white' : 'rgba(255,255,255,0.5)'}
                  fontSize="12"
                  fontWeight={activeSegment === i ? 'bold' : 'normal'}
                  className="uppercase tracking-wider"
                  style={{ transition: 'fill 0.3s ease' }}
                >
                  {season.label}
                </text>
              );
            })}

            {/* Step icons in segments */}
            {seasons.map((season, i) => {
              const angle = ((i * 90 + 45 - 90) * Math.PI) / 180;
              const x = 200 + 120 * Math.cos(angle);
              const y = 200 + 120 * Math.sin(angle);
              
              return (
                <g 
                  key={`icon-${i}`} 
                  transform={`translate(${x - 16}, ${y - 16})`}
                  className="cursor-pointer"
                  onMouseEnter={() => setActiveSegment(i)}
                >
                  <circle
                    cx="16"
                    cy="16"
                    r="20"
                    fill={activeSegment === i ? 'var(--theme-accent)' : 'var(--theme-bg-secondary)'}
                    stroke={activeSegment === i ? 'var(--theme-accent)' : 'rgba(255,255,255,0.2)'}
                    strokeWidth="2"
                    style={{ transition: 'all 0.3s ease' }}
                  />
                  <foreignObject x="4" y="4" width="24" height="24">
                    <div className="w-full h-full flex items-center justify-center">
                      <CycleIcon type={season.step.icon as CycleIconType} size={20} />
                    </div>
                  </foreignObject>
                </g>
              );
            })}

            {/* Clock hand */}
            <g transform={`rotate(${handAngle}, 200, 200)`} filter="url(#handGlow)">
              <line
                x1="200"
                y1="200"
                x2="200"
                y2="90"
                stroke="var(--theme-accent)"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <circle cx="200" cy="90" r="8" fill="var(--theme-accent)" />
            </g>

            {/* Center hub */}
            <circle cx="200" cy="200" r="50" fill="var(--theme-bg-primary)" stroke="var(--theme-accent)" strokeWidth="3" />
            <circle cx="200" cy="200" r="45" fill="var(--theme-bg-secondary)" />
            
            {/* Center text */}
            <text x="200" y="195" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
              JoePlates
            </text>
            <text x="200" y="212" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="10">
              YEARLY CYCLE
            </text>
          </svg>

          {/* Active step details */}
          {activeSegment !== null && (
            <div 
              className="mt-8 p-6 rounded-2xl max-w-xl mx-auto animate-fade-in"
              style={{
                background: 'var(--theme-bg-secondary)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ background: 'var(--theme-accent)' }}
                >
                  <CycleIcon type={seasons[activeSegment].step.icon as CycleIconType} size={28} />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider" style={{ color: seasons[activeSegment].color }}>
                    {seasons[activeSegment].label}
                  </span>
                  <h3 className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                    {seasons[activeSegment].step.label}
                  </h3>
                </div>
              </div>
              <p className="text-white/70 leading-relaxed">
                {seasons[activeSegment].step.story}
              </p>
            </div>
          )}

          {/* Legend */}
          <div className="mt-8 text-center">
            <p className="text-white/40 text-sm">
              Hover over each season to explore • The clock hand shows time&apos;s continuous motion
            </p>
          </div>
        </div>
      </div>

      {/* Mobile: Vertical seasons */}
      <div className="md:hidden">
        {/* Mini clock graphic */}
        <div className="flex justify-center mb-8">
          <svg viewBox="0 0 100 100" className="w-24 h-24">
            <circle cx="50" cy="50" r="45" fill="none" stroke="var(--theme-accent)" strokeWidth="2" opacity="0.3" />
            {seasons.map((season, i) => {
              const startAngle = i * 90;
              const endAngle = (i + 1) * 90;
              const start = ((startAngle - 90) * Math.PI) / 180;
              const end = ((endAngle - 90) * Math.PI) / 180;
              const x1 = 50 + 35 * Math.cos(start);
              const y1 = 50 + 35 * Math.sin(start);
              const x2 = 50 + 35 * Math.cos(end);
              const y2 = 50 + 35 * Math.sin(end);
              return (
                <path
                  key={i}
                  d={`M 50 50 L ${x1} ${y1} A 35 35 0 0 1 ${x2} ${y2} Z`}
                  fill={season.color}
                  opacity={activeSegment === i ? 0.8 : 0.3}
                />
              );
            })}
            <circle cx="50" cy="50" r="15" fill="var(--theme-bg-secondary)" stroke="var(--theme-accent)" strokeWidth="2" />
          </svg>
        </div>

        {/* Season cards */}
        <div className="space-y-6">
          {seasons.map((season, index) => (
            <div
              key={season.step.id}
              className={`p-5 rounded-2xl transition-all duration-300 ${activeSegment === index ? 'scale-[1.02]' : ''}`}
              style={{
                background: activeSegment === index ? 'var(--theme-accent)' : 'var(--theme-bg-secondary)',
                border: `2px solid ${activeSegment === index ? 'var(--theme-accent)' : 'rgba(255,255,255,0.1)'}`,
              }}
              onClick={() => setActiveSegment(index)}
            >
              <div className="flex items-center gap-4">
                <div 
                  className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{ background: season.color, opacity: 0.8 }}
                >
                  <CycleIcon type={season.step.icon as CycleIconType} size={24} />
                </div>
                <div className="flex-1">
                  <span 
                    className="text-xs font-bold uppercase tracking-wider"
                    style={{ color: activeSegment === index ? 'rgba(255,255,255,0.8)' : season.color }}
                  >
                    {season.label}
                  </span>
                  <h4 className="font-bold text-white text-lg" style={{ fontFamily: 'var(--font-heading)' }}>
                    {season.step.label}
                  </h4>
                </div>
              </div>
              {activeSegment === index && (
                <p className="mt-4 text-white/80 text-sm animate-fade-in">
                  {season.step.story}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <div className="inline-flex items-center gap-2 text-white/40">
            <svg className="w-5 h-5" style={{ color: 'var(--theme-accent)' }} viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-xs">The seasons keep turning</span>
          </div>
        </div>
      </div>
    </div>
  );
}

