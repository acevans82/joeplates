'use client';

import Image from 'next/image';
import { preventWidows } from '@/lib/typography';

const cycleSteps = [
  {
    id: 'dining',
    label: 'Private Dining',
    description: 'Multi-course menus, tailored pairings, and the people you care about around your table.',
    position: 'top',
  },
  {
    id: 'travel',
    label: 'Travel',
    description: 'Vineyards, markets, distilleries, and late-night kitchens that feed the next chapter.',
    position: 'right',
  },
  {
    id: 'curation',
    label: 'Collection & Curation',
    description: 'Rare bottles and carefully chosen treasures that live with you long after the night ends.',
    position: 'bottom',
  },
  {
    id: 'repeat',
    label: 'Repeat',
    description: 'The calendar fills, your collection grows, and the stories keep getting better.',
    position: 'left',
  },
];

interface CycleDiagramProps {
  variant?: 'circular' | 'minimal';
}

export function CycleDiagram({ variant = 'circular' }: CycleDiagramProps): React.ReactElement {
  if (variant === 'minimal') {
    return <MinimalCycleDiagram />;
  }

  return <CircularCycleDiagram />;
}

function CircularCycleDiagram(): React.ReactElement {
  return (
    <div className="relative max-w-4xl mx-auto py-8">
      {/* Central Circle with Image */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-44 sm:h-44 rounded-full overflow-hidden z-10" style={{ border: '3px solid var(--theme-accent)' }}>
        <Image
          src="/images/food/grilled-octopus.jpg"
          alt="JoePlates dining"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center pb-2">
          <span className="font-semibold text-center text-xs sm:text-sm px-2 text-white">
            JoePlates<br />Cycle
          </span>
        </div>
      </div>

      {/* Connecting Lines (SVG) */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400" fill="none">
        <circle
          cx="200"
          cy="200"
          r="140"
          stroke="var(--color-accent-gold)"
          strokeWidth="2"
          strokeDasharray="8 4"
          opacity="0.3"
        />
        {/* Arrows */}
        <path
          d="M200 60 L210 75 L190 75 Z"
          fill="var(--color-accent-gold)"
          opacity="0.6"
        />
        <path
          d="M340 200 L325 210 L325 190 Z"
          fill="var(--color-accent-gold)"
          opacity="0.6"
        />
        <path
          d="M200 340 L190 325 L210 325 Z"
          fill="var(--color-accent-gold)"
          opacity="0.6"
        />
        <path
          d="M60 200 L75 190 L75 210 Z"
          fill="var(--color-accent-gold)"
          opacity="0.6"
        />
      </svg>

      {/* Grid Layout for Steps */}
      <div className="grid grid-cols-3 gap-4 sm:gap-8 relative z-0 min-h-[400px] sm:min-h-[500px]">
        {/* Top - Private Dining */}
        <div className="col-start-2 row-start-1 flex justify-center">
          <StepCard step={cycleSteps[0]} highlight />
        </div>

        {/* Left - Repeat */}
        <div className="col-start-1 row-start-2 flex items-center justify-end pr-4">
          <StepCard step={cycleSteps[3]} />
        </div>

        {/* Empty center */}
        <div className="col-start-2 row-start-2" />

        {/* Right - Travel */}
        <div className="col-start-3 row-start-2 flex items-center justify-start pl-4">
          <StepCard step={cycleSteps[1]} />
        </div>

        {/* Bottom - Collection & Curation */}
        <div className="col-start-2 row-start-3 flex justify-center">
          <StepCard step={cycleSteps[2]} />
        </div>
      </div>
    </div>
  );
}

function MinimalCycleDiagram(): React.ReactElement {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Horizontal flow for minimal theme */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-2">
        {cycleSteps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className={`
              text-center px-4 py-3 
              ${step.id === 'dining' 
                ? 'bg-[var(--color-accent-gold)] text-white rounded-lg' 
                : ''
              }
            `}>
              <p className={`font-semibold ${step.id === 'dining' ? '' : 'text-white'}`}>
                {step.label}
              </p>
            </div>
            {index < cycleSteps.length - 1 && (
              <svg className="w-8 h-8 text-[var(--color-accent-gold)] hidden sm:block mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
          </div>
        ))}
        {/* Return arrow */}
        <svg className="w-8 h-8 text-[var(--color-accent-gold)] hidden sm:block mx-2 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>

      {/* Descriptions below */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mt-8">
        {cycleSteps.map((step) => (
          <div key={step.id} className="text-center">
            <h4 className="text-[var(--color-accent-gold)] font-medium mb-2">{preventWidows(step.label)}</h4>
            <p className="text-white/60 text-sm">{preventWidows(step.description)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

interface StepCardProps {
  step: typeof cycleSteps[0];
  highlight?: boolean;
}

function StepCard({ step, highlight = false }: StepCardProps): React.ReactElement {
  return (
    <div className={`
      max-w-[160px] sm:max-w-[180px] text-center p-4 rounded-[var(--theme-corner-radius)]
      transition-all duration-300
      ${highlight 
        ? 'bg-[var(--color-accent-gold)] text-white scale-105' 
        : 'bg-[var(--color-secondary-navy)] text-white hover:bg-[var(--color-secondary-navy)]/80'
      }
    `}>
      <h4 className="font-semibold text-sm sm:text-base mb-1">{preventWidows(step.label)}</h4>
      <p className={`text-xs leading-relaxed ${highlight ? 'text-white/90' : 'text-white/60'}`}>
        {preventWidows(step.description)}
      </p>
    </div>
  );
}

