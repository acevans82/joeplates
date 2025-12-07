'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { cycleSteps } from './cycleData';
import { CycleIcon, CycleIconType } from './CycleIcon';

// Version 02: Sticky Scroll Stepper
// Smooth scroll-driven step transitions with full viewport sections

export function CycleVersion02(): React.ReactElement {
  const [activeStep, setActiveStep] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const updateScroll = useCallback(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const containerTop = rect.top;
    const containerHeight = container.offsetHeight;
    const viewportHeight = window.innerHeight;
    
    // Calculate scroll progress through the container (0 to 1)
    const scrollableDistance = containerHeight - viewportHeight;
    const scrolledAmount = -containerTop;
    
    if (scrolledAmount <= 0) {
      setActiveStep(0);
      setScrollProgress(0);
    } else if (scrolledAmount >= scrollableDistance) {
      setActiveStep(cycleSteps.length - 1);
      setScrollProgress(1);
    } else {
      // Smooth progress calculation
      const progress = scrolledAmount / scrollableDistance;
      setScrollProgress(progress);
      
      // Each step gets equal portion of the scroll
      const stepSize = 1 / cycleSteps.length;
      const currentStepIndex = Math.min(
        cycleSteps.length - 1,
        Math.floor(progress / stepSize)
      );
      setActiveStep(currentStepIndex);
    }
  }, []);

  useEffect(() => {
    const handleScroll = (): void => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = requestAnimationFrame(updateScroll);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [updateScroll]);

  // Calculate opacity for each step based on scroll progress
  const getStepOpacity = (stepIndex: number): number => {
    const stepSize = 1 / cycleSteps.length;
    const stepStart = stepIndex * stepSize;
    const stepEnd = (stepIndex + 1) * stepSize;
    
    if (scrollProgress < stepStart - stepSize * 0.5) return 0;
    if (scrollProgress > stepEnd + stepSize * 0.5) return 0;
    if (scrollProgress >= stepStart && scrollProgress <= stepEnd) return 1;
    
    // Fade in/out at boundaries
    if (scrollProgress < stepStart) {
      return Math.max(0, 1 - (stepStart - scrollProgress) / (stepSize * 0.5));
    }
    return Math.max(0, 1 - (scrollProgress - stepEnd) / (stepSize * 0.5));
  };

  // Calculate transform for parallax effect
  const getStepTransform = (stepIndex: number): string => {
    const stepSize = 1 / cycleSteps.length;
    const stepCenter = (stepIndex + 0.5) * stepSize;
    const diff = scrollProgress - stepCenter;
    const translateY = diff * 100; // pixels of parallax
    return `translateY(${translateY}px)`;
  };

  return (
    <div 
      ref={containerRef}
      className="relative"
      style={{ height: `${(cycleSteps.length + 0.5) * 100}vh` }}
    >
      {/* Sticky viewport */}
      <div 
        className="sticky top-0 h-screen overflow-hidden"
        style={{ paddingTop: '80px' }}
      >
        {/* Progress bar */}
        <div className="absolute top-[80px] left-0 right-0 h-1 bg-white/5 z-20 overflow-hidden">
          <div 
            className="h-full"
            style={{ 
              width: `${scrollProgress * 100}%`,
              background: 'linear-gradient(90deg, var(--theme-accent), color-mix(in srgb, var(--theme-accent) 70%, white))',
              boxShadow: '0 0 20px var(--theme-accent)',
              transition: 'width 0.1s ease-out',
            }}
          />
        </div>

        {/* Step indicators */}
        <div className="absolute top-[100px] left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {cycleSteps.map((step, index) => {
            const isActive = index === activeStep;
            const isPast = index < activeStep;
            
            return (
              <button
                key={step.id}
                onClick={() => {
                  // Scroll to step
                  if (!containerRef.current) return;
                  const stepSize = 1 / cycleSteps.length;
                  const targetProgress = index * stepSize + stepSize * 0.5;
                  const containerHeight = containerRef.current.offsetHeight;
                  const viewportHeight = window.innerHeight;
                  const scrollableDistance = containerHeight - viewportHeight;
                  const containerTop = containerRef.current.getBoundingClientRect().top + window.scrollY;
                  const targetScroll = containerTop + targetProgress * scrollableDistance;
                  window.scrollTo({ top: targetScroll, behavior: 'smooth' });
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer"
                style={{
                  background: isActive 
                    ? 'var(--theme-accent)' 
                    : isPast 
                      ? 'rgba(var(--theme-accent-rgb, 200, 150, 100), 0.4)' 
                      : 'rgba(255,255,255,0.1)',
                  transform: isActive ? 'scale(1.1)' : 'scale(1)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: isActive ? '0 4px 20px rgba(0,0,0,0.3)' : 'none',
                }}
              >
                <CycleIcon type={step.icon as CycleIconType} size={16} />
                <span 
                  className="text-sm font-medium text-white"
                  style={{ opacity: isActive ? 1 : 0.6 }}
                >
                  {step.shortLabel}
                </span>
              </button>
            );
          })}
        </div>

        {/* Background images with crossfade */}
        <div className="absolute inset-0">
          {cycleSteps.map((step, index) => {
            const opacity = getStepOpacity(index);
            return (
              <div
                key={`bg-${step.id}`}
                className="absolute inset-0"
                style={{ 
                  opacity,
                  transition: 'opacity 0.5s ease-out',
                  visibility: opacity > 0 ? 'visible' : 'hidden',
                }}
              >
                <Image
                  src={step.image}
                  alt={step.label}
                  fill
                  className="object-cover"
                  style={{
                    transform: getStepTransform(index),
                    transition: 'transform 0.1s ease-out',
                  }}
                  priority={index === 0}
                />
                <div 
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.8) 100%)',
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Content sections */}
        <div className="relative z-10 h-full flex items-center justify-center">
          {cycleSteps.map((step, index) => {
            const opacity = getStepOpacity(index);
            const stepSize = 1 / cycleSteps.length;
            const stepCenter = (index + 0.5) * stepSize;
            const diff = scrollProgress - stepCenter;
            const translateY = diff * 150;
            const scale = 1 - Math.abs(diff) * 0.5;
            
            return (
              <div
                key={`content-${step.id}`}
                className="absolute inset-0 flex flex-col items-center justify-center px-8"
                style={{
                  opacity: Math.max(0, opacity),
                  transform: `translateY(${translateY}px) scale(${Math.max(0.8, scale)})`,
                  transition: 'opacity 0.3s ease-out, transform 0.1s ease-out',
                  visibility: opacity > 0 ? 'visible' : 'hidden',
                  pointerEvents: opacity > 0.5 ? 'auto' : 'none',
                }}
              >
                {/* Step number badge */}
                <div 
                  className="mb-6 w-20 h-20 rounded-full flex items-center justify-center"
                  style={{
                    background: 'var(--theme-accent)',
                    boxShadow: '0 0 40px var(--theme-accent), 0 10px 40px rgba(0,0,0,0.4)',
                  }}
                >
                  <span className="text-white text-3xl font-bold">0{step.number}</span>
                </div>

                {/* Icon */}
                <div className="mb-5">
                  <CycleIcon type={step.icon as CycleIconType} size={48} />
                </div>

                {/* Title */}
                <h2 
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 text-center"
                  style={{ 
                    fontFamily: 'var(--font-heading)',
                    textShadow: '0 4px 30px rgba(0,0,0,0.5)',
                  }}
                >
                  {step.label}
                </h2>

                {/* Story */}
                <p 
                  className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-2xl mb-4 leading-relaxed text-center"
                  style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}
                >
                  {step.story}
                </p>

                {/* Description */}
                <p className="text-sm sm:text-base text-white/60 max-w-lg text-center">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Scroll hint */}
        <div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
          style={{
            opacity: activeStep === cycleSteps.length - 1 ? 0.8 : (activeStep === 0 ? 0.8 : 0.5),
            transition: 'opacity 0.3s ease',
          }}
        >
          <div className="flex flex-col items-center gap-2 text-white/60">
            <span className="text-xs uppercase tracking-wider">
              {activeStep === cycleSteps.length - 1 ? 'Keep scrolling' : 'Scroll to explore'}
            </span>
            <div className="w-6 h-10 rounded-full border border-white/30 flex items-start justify-center p-2">
              <div 
                className="w-1 h-2 rounded-full bg-white/60 animate-scroll-hint"
              />
            </div>
          </div>
        </div>
      </div>

      {/* CSS for scroll hint animation */}
      <style jsx>{`
        @keyframes scroll-hint {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(8px); opacity: 0.3; }
        }
        .animate-scroll-hint {
          animation: scroll-hint 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
