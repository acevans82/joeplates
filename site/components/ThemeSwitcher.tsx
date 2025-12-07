'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { themes, themeIds, ThemeId } from '@/lib/themes';

// Visual styling data for each theme
const themeVisuals: Record<ThemeId, {
  bgPrimary: string;
  bgSecondary: string;
  accent: string;
  cornerRadius: string;
  buttonClip?: string;
  headingStyle: React.CSSProperties;
  cardBorder: string;
  cardBg: string;
  buttonStyle: React.CSSProperties;
}> = {
  'classic-estate': {
    bgPrimary: '#101F31',
    bgSecondary: '#173660',
    accent: '#7A611D',
    cornerRadius: '4px',
    headingStyle: { fontFamily: 'Georgia, serif', fontStyle: 'italic', letterSpacing: '0.02em', fontWeight: 400 },
    cardBorder: '1px solid rgba(255,255,255,0.15)',
    cardBg: 'transparent',
    buttonStyle: { borderRadius: '4px' },
  },
  'modern-cellar': {
    bgPrimary: '#0a0f14',
    bgSecondary: '#141c26',
    accent: '#c9a227',
    cornerRadius: '999px',
    headingStyle: { fontFamily: 'system-ui, sans-serif', fontWeight: 700, letterSpacing: '-0.02em', textTransform: 'uppercase' as const },
    cardBorder: 'none',
    cardBg: 'linear-gradient(135deg, rgba(201,162,39,0.08) 0%, transparent 50%)',
    buttonStyle: { borderRadius: '999px' },
  },
  'coastal-wanderer': {
    bgPrimary: '#0d1a26',
    bgSecondary: '#15283d',
    accent: '#4a90a4',
    cornerRadius: '1.5rem',
    headingStyle: { fontFamily: 'Georgia, serif', fontWeight: 500, fontStyle: 'italic' },
    cardBorder: 'none',
    cardBg: 'linear-gradient(180deg, rgba(74, 144, 164, 0.15) 0%, transparent 100%)',
    buttonStyle: { borderRadius: '1.5rem' },
  },
  'midnight-supper': {
    bgPrimary: '#050505',
    bgSecondary: '#0a0a0a',
    accent: '#d4af37',
    cornerRadius: '0.75rem',
    headingStyle: { fontFamily: 'Georgia, serif', fontWeight: 700, letterSpacing: '0.05em' },
    cardBorder: '1px solid rgba(212, 175, 55, 0.2)',
    cardBg: 'rgba(212, 175, 55, 0.05)',
    buttonStyle: { borderRadius: '0.75rem', boxShadow: '0 4px 20px rgba(212, 175, 55, 0.3)' },
  },
  'bistro-warmth': {
    bgPrimary: '#1a150f',
    bgSecondary: '#251d14',
    accent: '#c47d2c',
    cornerRadius: '1.5rem',
    headingStyle: { fontFamily: 'Georgia, serif', fontWeight: 500 },
    cardBorder: '1px solid rgba(196, 125, 44, 0.2)',
    cardBg: 'linear-gradient(135deg, rgba(196, 125, 44, 0.1) 0%, rgba(196, 125, 44, 0.03) 100%)',
    buttonStyle: { borderRadius: '1.5rem' },
  },
  'editorial': {
    bgPrimary: '#0f0f0f',
    bgSecondary: '#1a1a1a',
    accent: '#ffffff',
    cornerRadius: '0',
    headingStyle: { fontFamily: 'Georgia, serif', fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 1 },
    cardBorder: 'none',
    cardBg: 'transparent',
    buttonStyle: { borderRadius: '0', background: '#ffffff', color: '#000000', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.1em' },
  },
  'market-morning': {
    bgPrimary: '#14161a',
    bgSecondary: '#1f2227',
    accent: '#e29b3f',
    cornerRadius: '1rem',
    headingStyle: { fontFamily: 'Georgia, serif', fontWeight: 500, fontStyle: 'italic' },
    cardBorder: '1px solid rgba(226, 155, 63, 0.2)',
    cardBg: 'linear-gradient(135deg, rgba(226,155,63,0.16) 0%, rgba(226,155,63,0.04) 100%)',
    buttonStyle: { borderRadius: '999px' },
  },
  'backstage-vinyl': {
    bgPrimary: '#140c18',
    bgSecondary: '#1e1322',
    accent: '#e16a5f',
    cornerRadius: '0.75rem',
    headingStyle: { fontFamily: 'Georgia, serif', fontWeight: 700, letterSpacing: '-0.01em' },
    cardBorder: '1px solid rgba(225, 106, 95, 0.3)',
    cardBg: 'linear-gradient(145deg, rgba(225,106,95,0.14) 0%, rgba(20,12,24,1) 55%, rgba(225,106,95,0.06) 100%)',
    buttonStyle: { borderRadius: '0.75rem', boxShadow: '0 6px 24px rgba(0,0,0,0.7)' },
  },
};

export function ThemeSwitcher(): React.ReactElement | null {
  const { theme, setTheme, mounted } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const handleThemeSelect = (themeId: ThemeId): void => {
    setTheme(themeId);
    setIsOpen(false);
  };

  // Don't render anything until mounted (client-side)
  if (!mounted) {
    return null;
  }

  // Get current theme's visual styling
  const currentVisuals = themeVisuals[theme];

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 
                   text-white shadow-lg transition-all duration-200
                   hover:scale-105 active:scale-95"
        style={{
          background: currentVisuals.accent,
          borderRadius: currentVisuals.buttonStyle.borderRadius || currentVisuals.cornerRadius,
          boxShadow: currentVisuals.buttonStyle.boxShadow || '0 10px 25px rgba(0,0,0,0.3)',
          color: theme === 'editorial' ? '#000000' : '#ffffff',
        }}
        aria-label="Switch theme"
      >
        <svg 
          className="w-5 h-5" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" 
          />
        </svg>
        <span className="font-medium text-sm" style={theme === 'editorial' ? { textTransform: 'uppercase', letterSpacing: '0.1em' } : {}}>
          Themes
        </span>
      </button>

      {/* Theme Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />

            {/* Panel */}
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-[#0a0a0a]
                         rounded-t-3xl p-6 pb-10 max-h-[85vh] overflow-y-auto"
            >
              {/* Handle */}
              <div className="w-12 h-1 bg-white/30 rounded-full mx-auto mb-6" />

              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white">Choose a Design Theme</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                  aria-label="Close panel"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <p className="text-white/60 mb-6 text-sm">
                Preview different design styles. Your selection will be saved and applied across the site.
              </p>

              {/* Theme Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {themeIds.map((themeId) => {
                  const themeConfig = themes[themeId];
                  const visuals = themeVisuals[themeId];
                  const isSelected = theme === themeId;

                  return (
                    <button
                      key={themeId}
                      onClick={() => handleThemeSelect(themeId)}
                      className={`relative text-left transition-all duration-200 rounded-xl overflow-hidden
                                  ${isSelected 
                                    ? 'ring-2 ring-white ring-offset-2 ring-offset-[#0a0a0a]' 
                                    : 'hover:scale-[1.02]'
                                  }`}
                    >
                      {/* Mini Preview Card */}
                      <div 
                        className="p-4 min-h-[200px] flex flex-col"
                        style={{ background: visuals.bgPrimary }}
                      >
                        {/* Selected Badge */}
                        {isSelected && (
                          <div className="absolute top-3 right-3 w-6 h-6 bg-white rounded-full flex items-center justify-center z-10">
                            <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}

                        {/* Theme Name as Hero Title */}
                        <h3 
                          className="text-xl text-white mb-1"
                          style={visuals.headingStyle}
                        >
                          {themeConfig.name}
                        </h3>
                        <p className="text-xs text-white/50 mb-4">{themeConfig.description}</p>

                        {/* Sample Card */}
                        <div 
                          className="p-3 mb-4 flex-1"
                          style={{ 
                            background: visuals.cardBg,
                            border: visuals.cardBorder,
                            borderRadius: visuals.cornerRadius,
                            borderLeft: themeId === 'modern-cellar' ? `3px solid ${visuals.accent}` : undefined,
                            borderTop: themeId === 'editorial' ? '1px solid rgba(255,255,255,0.1)' : undefined,
                          }}
                        >
                          <div 
                            className="text-sm text-white/90 mb-1"
                            style={visuals.headingStyle}
                          >
                            Sample Heading
                          </div>
                          <div className="text-xs text-white/50">
                            Body text sample with {themeConfig.bodyFont}
                          </div>
                        </div>

                        {/* Bottom Row: Button + Colors + Border Preview */}
                        <div className="flex items-center gap-3">
                          {/* Sample Button */}
                          <div 
                            className="px-3 py-1.5 text-xs font-medium shrink-0"
                            style={{ 
                              background: themeId === 'editorial' ? '#ffffff' : visuals.accent,
                              color: themeId === 'editorial' ? '#000000' : '#ffffff',
                              ...visuals.buttonStyle,
                            }}
                          >
                            Button
                          </div>

                          {/* Outline Button */}
                          <div 
                            className="px-3 py-1.5 text-xs font-medium shrink-0"
                            style={{ 
                              background: 'transparent',
                              color: visuals.accent,
                              border: `2px solid ${visuals.accent}`,
                              borderRadius: visuals.cornerRadius,
                            }}
                          >
                            Outline
                          </div>

                          {/* Color Swatches */}
                          <div className="flex gap-1 ml-auto">
                            <div 
                              className="w-5 h-5 rounded-sm" 
                              style={{ background: visuals.bgSecondary }}
                              title="Secondary BG"
                            />
                            <div 
                              className="w-5 h-5 rounded-sm" 
                              style={{ background: visuals.accent }}
                              title="Accent"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Font & Style Tags */}
                      <div 
                        className="px-4 py-3 flex flex-wrap gap-1.5"
                        style={{ background: visuals.bgSecondary }}
                      >
                        <span 
                          className="px-2 py-0.5 text-[10px] text-white/70"
                          style={{ 
                            background: 'rgba(255,255,255,0.08)',
                            borderRadius: visuals.cornerRadius || '4px',
                          }}
                        >
                          {themeConfig.headingFont}
                        </span>
                        <span 
                          className="px-2 py-0.5 text-[10px] text-white/70"
                          style={{ 
                            background: 'rgba(255,255,255,0.08)',
                            borderRadius: visuals.cornerRadius || '4px',
                          }}
                        >
                          {themeConfig.layoutStyle}
                        </span>
                        <span 
                          className="px-2 py-0.5 text-[10px] text-white/70"
                          style={{ 
                            background: 'rgba(255,255,255,0.08)',
                            borderRadius: visuals.cornerRadius || '4px',
                          }}
                        >
                          {themeConfig.cardStyle}
                        </span>
                        <span 
                          className="px-2 py-0.5 text-[10px]"
                          style={{ 
                            background: visuals.accent,
                            color: themeId === 'editorial' ? '#000000' : '#ffffff',
                            borderRadius: visuals.cornerRadius || '4px',
                          }}
                        >
                          {themeConfig.animationIntensity}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Note */}
              <p className="mt-6 text-center text-white/40 text-xs">
                This theme switcher will be removed once a final design is selected.
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
