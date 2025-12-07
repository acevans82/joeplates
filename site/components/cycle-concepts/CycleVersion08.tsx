'use client';

import { useEffect, useRef, useState } from 'react';
import { travelCalendar, type MonthlyCalendar } from './cycleData';

// Version 08: Year-in-the-Life Timeline
// Vertical timeline showing Joe's travel calendar month by month

export function CycleVersion08(): React.ReactElement {
  const [visibleMonths, setVisibleMonths] = useState<Set<string>>(new Set());
  const monthRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const monthColors: Record<string, string> = {
    JAN: '#60a5fa', // Winter blue
    FEB: '#94a3b8', // Rest gray
    MAR: '#4ade80', // Spring green
    APR: '#4ade80', // Spring green
    JUL: '#facc15', // Summer gold
    AUG: '#f97316', // Late summer orange
    SEP: '#f97316', // Fall orange
    OCT: '#dc2626', // Harvest red
    NOV: '#9333ea', // Late fall purple
    DEC: '#06b6d4', // Tropical cyan
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const month = entry.target.getAttribute('data-month');
          if (month && entry.isIntersecting) {
            setVisibleMonths((prev) => new Set([...prev, month]));
          }
        });
      },
      { threshold: 0.3 }
    );

    Object.values(monthRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span 
            className="inline-block px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-4"
            style={{ background: 'var(--theme-accent)', color: 'white' }}
          >
            2025 Travel Calendar
          </span>
          <h3 
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Where Joe Wanders This Year
          </h3>
          <p className="text-white/60 max-w-2xl mx-auto">
            From Sicilian blood oranges to Kentucky bourbon barrels—every trip feeds the next dinner at your table.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div 
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5"
            style={{ background: 'rgba(255,255,255,0.1)' }}
          />

          {/* Months */}
          <div className="space-y-12">
            {travelCalendar.map((monthData: MonthlyCalendar, index: number) => {
              const isVisible = visibleMonths.has(monthData.shortMonth);
              const isEven = index % 2 === 0;
              const color = monthColors[monthData.shortMonth] || '#ffffff';

              return (
                <div
                  key={monthData.shortMonth}
                  ref={(el) => { monthRefs.current[monthData.shortMonth] = el; }}
                  data-month={monthData.shortMonth}
                  className={`
                    relative grid grid-cols-1 md:grid-cols-2 gap-8
                    transition-all duration-700
                    ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                  `}
                  style={{ transitionDelay: `${index * 75}ms` }}
                >
                  {/* Month marker */}
                  <div 
                    className="absolute left-6 md:left-1/2 -translate-x-1/2 w-14 h-14 rounded-full flex items-center justify-center z-10"
                    style={{
                      background: monthData.isRest 
                        ? 'linear-gradient(135deg, #475569 0%, #1e293b 100%)'
                        : `linear-gradient(135deg, ${color} 0%, color-mix(in srgb, ${color} 60%, black) 100%)`,
                      boxShadow: `0 0 30px ${color}40`,
                    }}
                  >
                    <span className="text-xs font-bold text-white">{monthData.shortMonth}</span>
                  </div>

                  {/* Content - alternating sides on desktop */}
                  <div className={`
                    pl-24 md:pl-0 
                    ${isEven ? 'md:pr-16 md:text-right' : 'md:col-start-2 md:pl-16'}
                  `}>
                    <h4 
                      className="text-2xl font-bold text-white mb-4"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {monthData.month}
                    </h4>
                    
                    {/* Destination cards */}
                    <div className={`space-y-4 ${isEven ? 'md:flex md:flex-col md:items-end' : ''}`}>
                      {monthData.destinations.map((dest, destIndex) => (
                        <div 
                          key={destIndex}
                          className={`
                            p-4 rounded-xl
                            ${monthData.isRest ? 'border border-white/10' : ''}
                          `}
                          style={{ 
                            background: monthData.isRest 
                              ? 'rgba(255,255,255,0.03)'
                              : 'var(--theme-bg-secondary)',
                            border: monthData.isRest ? undefined : '1px solid rgba(255,255,255,0.1)',
                            maxWidth: '360px',
                          }}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            {monthData.isRest ? (
                              <svg className="w-5 h-5" style={{ color }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                              </svg>
                            ) : (
                              <svg className="w-5 h-5" style={{ color }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                            )}
                            <span 
                              className="font-semibold text-white"
                              style={{ fontFamily: 'var(--font-heading)' }}
                            >
                              {dest.location}
                            </span>
                          </div>
                          <p className={`text-sm leading-relaxed ${monthData.isRest ? 'text-white/40 italic' : 'text-white/60'}`}>
                            {dest.blurb}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Empty column for alternating layout */}
                  {isEven && <div className="hidden md:block" />}
                </div>
              );
            })}
          </div>

          {/* Year wraps indicator */}
          <div className="relative mt-16">
            <div 
              className="absolute left-6 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center"
              style={{
                background: 'var(--theme-accent)',
                boxShadow: '0 0 20px var(--theme-accent)',
              }}
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <div className="pl-24 md:pl-24 pt-2">
              <p className="text-white/50 text-sm italic">
                And then it starts again...
              </p>
            </div>
          </div>
        </div>

        {/* CTA callout */}
        <div 
          className="mt-16 p-8 rounded-xl text-center"
          style={{ 
            background: 'linear-gradient(135deg, var(--theme-bg-secondary) 0%, rgba(0,0,0,0.4) 100%)', 
            border: '1px solid rgba(255,255,255,0.1)' 
          }}
        >
          <p className="text-white/70 mb-2">
            Members get first right of refusal on all hosted trips.
          </p>
          <p className="text-[var(--theme-accent)] font-semibold">
            Want to join a leg? Get on the waitlist.
          </p>
        </div>
      </div>
    </div>
  );
}
