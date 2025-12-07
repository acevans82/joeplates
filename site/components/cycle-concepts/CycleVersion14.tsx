'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { cycleSteps } from './cycleData';
import { CycleIcon, CycleIconType } from './CycleIcon';

// Version 14: Circle Cycle with Full Image
// Circle layout where the photo changes to fill the whole circle
// as each section comes into focus, with floating text explanation

export function CycleVersion14(): React.ReactElement {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Track which section is in view based on scroll
  useEffect(() => {
    const handleScroll = (): void => {
      if (!containerRef.current) return;
      
      const containerRect = containerRef.current.getBoundingClientRect();
      const containerTop = containerRect.top;
      const containerHeight = containerRect.height;
      const viewportHeight = window.innerHeight;
      
      // Calculate scroll progress through the container
      const scrollProgress = Math.max(0, Math.min(1, 
        (viewportHeight / 2 - containerTop) / containerHeight
      ));
      
      // Determine which step we're on (0-3)
      const stepIndex = Math.min(3, Math.floor(scrollProgress * 4));
      
      if (stepIndex !== activeIndex) {
        setIsTransitioning(true);
        setTimeout(() => {
          setActiveIndex(stepIndex);
          setIsTransitioning(false);
        }, 150);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeIndex]);

  const currentStep = cycleSteps[activeIndex];

  return (
    <div ref={containerRef} className="py-12">
      {/* Intro text */}
      <div className="text-center px-4 mb-8">
        <p className="text-white/60 text-lg max-w-2xl mx-auto">
          A year with JoePlates, in motion. Scroll to experience the cycle.
        </p>
      </div>

      {/* Main content - sticky circle with floating text */}
      <div className="relative min-h-[200vh]">
        <div className="sticky top-32 pb-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              
              {/* Circle with full image */}
              <div className="relative aspect-square max-w-lg mx-auto lg:mx-0">
                {/* Outer ring */}
                <div 
                  className="absolute inset-0 rounded-full"
                  style={{
                    border: '2px solid var(--theme-accent)',
                    opacity: 0.3,
                  }}
                />
                
                {/* Animated ring */}
                <svg 
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 100 100"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="48"
                    fill="none"
                    stroke="var(--theme-accent)"
                    strokeWidth="1"
                    strokeDasharray="8 4"
                    opacity="0.5"
                  >
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      from="0 50 50"
                      to="360 50 50"
                      dur="60s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  
                  {/* Progress indicator */}
                  <circle
                    cx="50"
                    cy="50"
                    r="48"
                    fill="none"
                    stroke="var(--theme-accent)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray={`${(activeIndex + 1) * 75.4} 301.6`}
                    transform="rotate(-90 50 50)"
                    className="transition-all duration-700"
                  />
                </svg>

                {/* Main image circle */}
                <div 
                  className={`
                    absolute inset-4 rounded-full overflow-hidden
                    transition-all duration-700
                    ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}
                  `}
                  style={{
                    boxShadow: '0 20px 60px rgba(0,0,0,0.5), inset 0 0 60px rgba(0,0,0,0.3)',
                  }}
                >
                  <Image
                    src={currentStep.image}
                    alt={currentStep.label}
                    fill
                    className="object-cover"
                  />
                  
                  {/* Gradient overlay */}
                  <div 
                    className="absolute inset-0"
                    style={{
                      background: 'radial-gradient(circle, transparent 30%, rgba(0,0,0,0.4) 100%)',
                    }}
                  />
                </div>

                {/* Center icon */}
                <div 
                  className={`
                    absolute inset-0 flex items-center justify-center
                    transition-all duration-500 delay-200
                    ${isTransitioning ? 'opacity-0 scale-75' : 'opacity-100 scale-100'}
                  `}
                >
                  <div 
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center"
                    style={{
                      background: 'var(--theme-accent)',
                      boxShadow: '0 10px 40px rgba(0,0,0,0.5), 0 0 30px var(--theme-accent)',
                    }}
                  >
                    <CycleIcon type={currentStep.icon as CycleIconType} size={36} />
                  </div>
                </div>

                {/* Step indicators around the circle */}
                {cycleSteps.map((step, index) => {
                  const angle = (index * 90 - 90) * (Math.PI / 180);
                  const radius = 52;
                  const x = 50 + radius * Math.cos(angle);
                  const y = 50 + radius * Math.sin(angle);
                  
                  return (
                    <div
                      key={step.id}
                      className={`
                        absolute w-8 h-8 rounded-full flex items-center justify-center
                        transition-all duration-500 cursor-pointer
                        ${index === activeIndex ? 'scale-125' : 'scale-100 opacity-60'}
                      `}
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        transform: 'translate(-50%, -50%)',
                        background: index === activeIndex ? 'var(--theme-accent)' : 'var(--theme-bg-secondary)',
                        border: `2px solid ${index === activeIndex ? 'white' : 'var(--theme-accent)'}`,
                        boxShadow: index === activeIndex ? '0 0 20px var(--theme-accent)' : 'none',
                      }}
                      onClick={() => setActiveIndex(index)}
                    >
                      <span className="text-white text-xs font-bold">{index + 1}</span>
                    </div>
                  );
                })}
              </div>

              {/* Floating text blurb */}
              <div 
                className={`
                  lg:pl-8 transition-all duration-700
                  ${isTransitioning ? 'opacity-0 translate-x-8' : 'opacity-100 translate-x-0'}
                `}
              >
                {/* Step indicator */}
                <div className="flex items-center gap-3 mb-6">
                  <span 
                    className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider"
                    style={{ 
                      background: 'var(--theme-accent)',
                      color: 'white',
                    }}
                  >
                    Step {currentStep.number} of 4
                  </span>
                  <div className="flex gap-1">
                    {cycleSteps.map((_, i) => (
                      <div
                        key={i}
                        className="w-2 h-2 rounded-full transition-all duration-300"
                        style={{
                          background: i === activeIndex ? 'var(--theme-accent)' : 'rgba(255,255,255,0.2)',
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Title */}
                <h3 
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {currentStep.label}
                </h3>

                {/* Story */}
                <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-6">
                  {currentStep.story}
                </p>

                {/* Description */}
                <p className="text-white/60 leading-relaxed mb-8">
                  {currentStep.description}
                </p>

                {/* Navigation hint */}
                <div 
                  className="flex items-center gap-2 text-sm"
                  style={{ color: 'var(--theme-accent)' }}
                >
                  <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                  <span>Scroll to continue the journey</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll sections (invisible, just for triggering) */}
        <div className="absolute inset-0 pointer-events-none">
          {cycleSteps.map((step, index) => (
            <div
              key={step.id}
              ref={(el) => { sectionRefs.current[index] = el; }}
              className="h-1/4"
              data-index={index}
            />
          ))}
        </div>
      </div>

      {/* Caption */}
      <div className="text-center mt-8 px-4">
        <p className="text-white/40 text-sm">
          The cycle continues—each journey leads back to another evening at the table.
        </p>
      </div>

      {/* Mobile: Vertical steps */}
      <div className="lg:hidden px-4 mt-8 space-y-6">
        {cycleSteps.map((step, index) => (
          <div
            key={step.id}
            className={`p-5 rounded-xl transition-all duration-300 ${activeIndex === index ? 'ring-2 ring-[var(--theme-accent)]' : ''}`}
            style={{
              background: activeIndex === index ? 'var(--theme-accent)' : 'var(--theme-bg-secondary)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
            onClick={() => setActiveIndex(index)}
          >
            <div className="flex items-center gap-3 mb-2">
              <CycleIcon type={step.icon as CycleIconType} size={24} />
              <h4 className="font-semibold text-white">{step.label}</h4>
            </div>
            <p className={`text-sm ${activeIndex === index ? 'text-white/90' : 'text-white/60'}`}>
              {activeIndex === index ? step.story : step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
