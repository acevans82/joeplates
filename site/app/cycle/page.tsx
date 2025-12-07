'use client';

import { useState, useEffect } from 'react';
import {
  CycleVersion02,
  CycleVersion03,
  CycleVersion10,
} from '@/components/cycle-concepts';

interface VersionConfig {
  id: string;
  number: number;
  title: string;
  description: string;
  Component: React.ComponentType;
}

const versions: VersionConfig[] = [
  {
    id: 'cycle-version-02',
    number: 1,
    title: 'Sticky Scroll Stepper',
    description: 'Scroll through each step with sticky positioning - page stays fixed while content changes',
    Component: CycleVersion02,
  },
  {
    id: 'cycle-version-03',
    number: 2,
    title: 'Checkered Process Layout',
    description: 'Alternating image left/right rows with focus highlighting as you scroll',
    Component: CycleVersion03,
  },
  {
    id: 'cycle-version-10',
    number: 3,
    title: 'Stepper with Sticky Side Panel',
    description: 'Sticky heading on left, scrolling step cards on right',
    Component: CycleVersion10,
  },
];

export default function CyclePage(): React.ReactElement {
  const [activeVersion, setActiveVersion] = useState<string | null>(null);

  // Track which version is currently in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            setActiveVersion(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    versions.forEach((v) => {
      const element = document.getElementById(v.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToVersion = (id: string): void => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--theme-bg-primary)' }}>
      {/* Fixed Version Selector */}
      <div 
        className="fixed top-20 left-0 right-0 z-30 py-3 px-4"
        style={{ 
          background: 'color-mix(in srgb, var(--theme-bg-primary) 95%, transparent)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <span className="text-white/40 text-xs font-medium uppercase tracking-wider flex-shrink-0 mr-2">
              Jump to:
            </span>
            {versions.map((v) => (
              <button
                key={v.id}
                onClick={() => scrollToVersion(v.id)}
                className={`
                  flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-medium
                  transition-all duration-300
                `}
                style={{
                  background: activeVersion === v.id 
                    ? 'var(--theme-accent)' 
                    : 'rgba(255,255,255,0.05)',
                  color: activeVersion === v.id 
                    ? 'white' 
                    : 'rgba(255,255,255,0.5)',
                  border: activeVersion === v.id 
                    ? '1px solid var(--theme-accent)' 
                    : '1px solid rgba(255,255,255,0.1)',
                }}
              >
                V{v.number}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Page Header */}
      <div className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span 
            className="inline-block px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-6"
            style={{ background: 'var(--theme-accent)', color: 'white' }}
          >
            Design Exploration
          </span>
          <h1 
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Dine → Travel → Curate → Repeat
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto mb-8">
            {versions.length} different approaches to visualizing the JoePlates cycle. Scroll through to compare, 
            then pick the one that best tells the story.
          </p>
          <div 
            className="inline-flex items-center gap-4 px-6 py-3 rounded-xl"
            style={{ 
              background: 'var(--theme-bg-secondary)', 
              border: '1px solid rgba(255,255,255,0.1)' 
            }}
          >
            <span className="text-white/40 text-sm">Viewing:</span>
            <span className="text-white font-medium">{versions.length} Concepts</span>
            <span className="text-white/20">|</span>
            <span className="text-white/60 text-sm">Click a version button above to jump</span>
          </div>
        </div>
      </div>

      {/* Version Sections */}
      <div className="space-y-0">
        {versions.map((v, index) => (
          <section
            key={v.id}
            id={v.id}
            className="scroll-mt-32"
          >
            {/* Version Header */}
            <div 
              className="py-8 px-4"
              style={{ 
                background: index % 2 === 0 
                  ? 'var(--theme-bg-primary)' 
                  : 'var(--theme-bg-secondary)',
              }}
            >
              <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-4 mb-2">
                  <span 
                    className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold"
                    style={{ 
                      background: 'var(--theme-accent)',
                      color: 'white',
                    }}
                  >
                    {v.number}
                  </span>
                  <div>
                    <h2 
                      className="text-2xl font-bold text-white"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      Version {String(v.number).padStart(2, '0')} — {v.title}
                    </h2>
                    <p className="text-white/50 text-sm">{v.description}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Version Content */}
            <div 
              style={{ 
                background: index % 2 === 0 
                  ? 'var(--theme-bg-primary)' 
                  : 'color-mix(in srgb, var(--theme-bg-secondary) 50%, var(--theme-bg-primary))',
                borderTop: '1px solid rgba(255,255,255,0.05)',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              <v.Component />
            </div>

            {/* Divider */}
            <div 
              className="h-px"
              style={{ 
                background: 'linear-gradient(90deg, transparent, var(--theme-accent), transparent)',
                opacity: 0.3,
              }}
            />
          </section>
        ))}
      </div>

      {/* Footer */}
      <div 
        className="py-16 px-4 text-center"
        style={{ background: 'var(--theme-bg-primary)' }}
      >
        <p className="text-white/40 text-sm mb-4">
          End of cycle design exploration.
        </p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all hover:-translate-y-1"
          style={{ 
            background: 'var(--theme-accent)',
            color: 'white',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
          }}
        >
          <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
          Back to Top
        </button>
      </div>

      {/* Scrollbar hide styles */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
