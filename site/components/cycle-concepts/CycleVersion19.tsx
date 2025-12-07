'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { cycleSteps } from './cycleData';
import { CycleIcon, CycleIconType } from './CycleIcon';

// Version 19: Circular River Flow
// A circular river that flows around continuously
// representing the endless cycle of the JoePlates experience

export function CycleVersion19(): React.ReactElement {
  const [activeStop, setActiveStop] = useState<number | null>(null);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection observer for entrance animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsInView(true);
      },
      { threshold: 0.2 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // River stop positions around the circle (top, right, bottom, left)
  const riverStops = [
    { step: cycleSteps[0], angle: -90, labelSide: 'top' },    // Top - Private Dining
    { step: cycleSteps[1], angle: 0, labelSide: 'right' },     // Right - Travel
    { step: cycleSteps[2], angle: 90, labelSide: 'bottom' },   // Bottom - Collection
    { step: cycleSteps[3], angle: 180, labelSide: 'left' },    // Left - Repeat
  ];

  const circleRadius = 180;
  const centerX = 250;
  const centerY = 250;

  return (
    <div className="py-16 px-4">
      {/* Desktop: Circular river visualization */}
      <div className="hidden md:block">
        <div ref={containerRef} className="relative max-w-2xl mx-auto" style={{ height: '600px' }}>
          {/* SVG Circular River */}
          <svg 
            className="absolute inset-0 w-full h-full" 
            viewBox="0 0 500 500"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              {/* River gradient */}
              <linearGradient id="circleRiverGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--theme-accent)" stopOpacity="0.5" />
                <stop offset="50%" stopColor="var(--theme-accent)" stopOpacity="0.8" />
                <stop offset="100%" stopColor="var(--theme-accent)" stopOpacity="0.5" />
              </linearGradient>
              
              {/* Glow effect */}
              <filter id="circleRiverGlow">
                <feGaussianBlur stdDeviation="6" result="glow" />
                <feMerge>
                  <feMergeNode in="glow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* River blur */}
              <filter id="circleRiverBlur">
                <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
              </filter>
            </defs>

            {/* River background glow */}
            <circle
              cx={centerX}
              cy={centerY}
              r={circleRadius}
              fill="none"
              stroke="var(--theme-accent)"
              strokeWidth="60"
              opacity="0.1"
              filter="url(#circleRiverBlur)"
            />

            {/* Main river path - circular */}
            <circle
              cx={centerX}
              cy={centerY}
              r={circleRadius}
              fill="none"
              stroke="url(#circleRiverGradient)"
              strokeWidth="35"
              strokeLinecap="round"
              className={`transition-all duration-1000 ${isInView ? 'opacity-100' : 'opacity-0'}`}
              style={{
                strokeDasharray: isInView ? 'none' : 1200,
                strokeDashoffset: isInView ? 0 : 1200,
              }}
            />

            {/* Animated flow particles around the circle */}
            {[...Array(12)].map((_, i) => (
              <circle key={i} r="4" fill="white" opacity="0.5">
                <animateMotion
                  dur={`${8 + i * 0.3}s`}
                  repeatCount="indefinite"
                  begin={`${i * 0.6}s`}
                  path={`M ${centerX} ${centerY - circleRadius} A ${circleRadius} ${circleRadius} 0 1 1 ${centerX - 0.01} ${centerY - circleRadius}`}
                />
              </circle>
            ))}

            {/* Direction arrows on the circle */}
            {[45, 135, 225, 315].map((angle) => {
              const rad = (angle * Math.PI) / 180;
              const arrowRadius = circleRadius;
              const x = centerX + arrowRadius * Math.cos(rad);
              const y = centerY + arrowRadius * Math.sin(rad);
              
              return (
                <g key={angle} transform={`translate(${x}, ${y}) rotate(${angle + 90})`}>
                  <polygon 
                    points="-6,-8 6,0 -6,8" 
                    fill="var(--theme-accent)" 
                    opacity="0.7"
                  />
                </g>
              );
            })}
          </svg>

          {/* River stops/landmarks */}
          {riverStops.map((stop, index) => {
            const rad = (stop.angle * Math.PI) / 180;
            const x = 50 + (circleRadius / 2.5) * Math.cos(rad);
            const y = 50 + (circleRadius / 2.5) * Math.sin(rad);
            
            return (
              <div
                key={stop.step.id}
                className={`absolute transition-all duration-500 ${isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: 'translate(-50%, -50%)',
                  transitionDelay: `${index * 0.15}s`,
                }}
                onMouseEnter={() => setActiveStop(index)}
                onMouseLeave={() => setActiveStop(null)}
              >
                {/* Landmark marker with image */}
                <div 
                  className={`
                    relative overflow-hidden rounded-full flex items-center justify-center cursor-pointer
                    transition-all duration-300
                    ${activeStop === index ? 'scale-125 z-20' : 'scale-100 z-10'}
                  `}
                  style={{
                    width: activeStop === index ? '100px' : '80px',
                    height: activeStop === index ? '100px' : '80px',
                    border: `3px solid ${activeStop === index ? 'white' : 'var(--theme-accent)'}`,
                    boxShadow: activeStop === index 
                      ? '0 0 40px var(--theme-accent), 0 10px 40px rgba(0,0,0,0.4)' 
                      : '0 4px 20px rgba(0,0,0,0.3)',
                  }}
                >
                  <Image
                    src={stop.step.image}
                    alt={stop.step.label}
                    fill
                    className="object-cover"
                  />
                  {/* Overlay with icon */}
                  <div 
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      background: activeStop === index 
                        ? 'rgba(0,0,0,0.3)' 
                        : 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 100%)',
                    }}
                  >
                    <CycleIcon type={stop.step.icon as CycleIconType} size={activeStop === index ? 36 : 28} />
                  </div>
                  
                  {/* Ripple effect when active */}
                  {activeStop === index && (
                    <>
                      <div className="absolute inset-0 rounded-full animate-ping" style={{ background: 'var(--theme-accent)', opacity: 0.2 }} />
                    </>
                  )}
                </div>

                {/* Label */}
                <div 
                  className={`
                    absolute whitespace-nowrap text-center
                    transition-all duration-300
                    ${activeStop === index ? 'opacity-100' : 'opacity-70'}
                  `}
                  style={{
                    ...(stop.labelSide === 'top' && { bottom: '110%', left: '50%', transform: 'translateX(-50%)' }),
                    ...(stop.labelSide === 'bottom' && { top: '110%', left: '50%', transform: 'translateX(-50%)' }),
                    ...(stop.labelSide === 'left' && { right: '110%', top: '50%', transform: 'translateY(-50%)' }),
                    ...(stop.labelSide === 'right' && { left: '110%', top: '50%', transform: 'translateY(-50%)' }),
                  }}
                >
                  <span 
                    className="text-white font-semibold text-sm"
                    style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}
                  >
                    {stop.step.shortLabel}
                  </span>
                </div>

                {/* Popup card when active */}
                <div 
                  className={`
                    absolute w-64 p-4 rounded-xl
                    transition-all duration-300 z-30
                    ${activeStop === index 
                      ? 'opacity-100 scale-100 pointer-events-auto' 
                      : 'opacity-0 scale-95 pointer-events-none'}
                  `}
                  style={{
                    background: 'var(--theme-bg-secondary)',
                    border: '1px solid var(--theme-accent)',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                    ...(stop.labelSide === 'top' && { bottom: '130%', left: '50%', transform: 'translateX(-50%)' }),
                    ...(stop.labelSide === 'bottom' && { top: '130%', left: '50%', transform: 'translateX(-50%)' }),
                    ...(stop.labelSide === 'left' && { right: '130%', top: '50%', transform: 'translateY(-50%)' }),
                    ...(stop.labelSide === 'right' && { left: '130%', top: '50%', transform: 'translateY(-50%)' }),
                  }}
                >
                  <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--theme-accent)' }}>
                    Stop {stop.step.number}
                  </span>
                  <h4 className="font-bold text-white text-lg mt-1 mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                    {stop.step.label}
                  </h4>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {stop.step.story}
                  </p>
                </div>
              </div>
            );
          })}

          {/* Center label */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div 
              className="text-center px-6 py-4 rounded-xl"
              style={{
                background: 'rgba(0,0,0,0.6)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <p className="text-white/80 text-sm font-medium" style={{ fontFamily: 'var(--font-heading)' }}>
                The Endless<br />Cycle
              </p>
            </div>
          </div>

          {/* Legend */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
            <p className="text-white/40 text-sm">
              The river of experience flows continuously—each stop enriches the journey.
            </p>
          </div>
        </div>
      </div>

      {/* Mobile: Circular arrangement simplified */}
      <div className="md:hidden">
        <div className="relative mx-auto" style={{ width: '280px', height: '280px' }}>
          {/* Simple circle ring */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="var(--theme-accent)"
              strokeWidth="3"
              opacity="0.4"
            />
            {/* Animated particle */}
            <circle r="2" fill="var(--theme-accent)">
              <animateMotion
                dur="6s"
                repeatCount="indefinite"
                path="M 50 10 A 40 40 0 1 1 49.99 10"
              />
            </circle>
            {/* Direction arrows */}
            {[45, 135, 225, 315].map((angle) => (
              <g key={angle} transform={`rotate(${angle}, 50, 50)`}>
                <polygon 
                  points="88,48 92,50 88,52" 
                  fill="var(--theme-accent)" 
                  opacity="0.6"
                />
              </g>
            ))}
          </svg>

          {/* Mobile stops */}
          {riverStops.map((stop, index) => {
            const rad = (stop.angle * Math.PI) / 180;
            const radius = 35;
            const x = 50 + radius * Math.cos(rad);
            const y = 50 + radius * Math.sin(rad);
            
            return (
              <div
                key={stop.step.id}
                className="absolute"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                onClick={() => setActiveStop(activeStop === index ? null : index)}
              >
                <div 
                  className={`
                    w-14 h-14 rounded-full flex items-center justify-center
                    transition-all duration-300
                    ${activeStop === index ? 'scale-110 ring-2 ring-white' : ''}
                  `}
                  style={{
                    background: activeStop === index ? 'var(--theme-accent)' : 'var(--theme-bg-secondary)',
                    border: '2px solid var(--theme-accent)',
                  }}
                >
                  <CycleIcon type={stop.step.icon as CycleIconType} size={24} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile content cards */}
        <div className="mt-8 space-y-4">
          {cycleSteps.map((step, index) => (
            <div
              key={step.id}
              className={`p-5 rounded-xl transition-all duration-300 ${activeStop === index ? 'ring-2 ring-[var(--theme-accent)]' : ''}`}
              style={{
                background: activeStop === index ? 'var(--theme-accent)' : 'var(--theme-bg-secondary)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
              onClick={() => setActiveStop(activeStop === index ? null : index)}
            >
              <div className="flex items-center gap-3 mb-2">
                <CycleIcon type={step.icon as CycleIconType} size={24} />
                <h4 className="font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                  {step.label}
                </h4>
              </div>
              <p className={`text-sm ${activeStop === index ? 'text-white/90' : 'text-white/60'}`}>
                {activeStop === index ? step.story : step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
