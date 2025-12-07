'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { mainNavItems } from '@/data/navigation';
import { useMusicPlayer } from '@/contexts/MusicPlayerContext';

export function Header(): React.ReactElement {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { isPlaying, currentTrack, hasInteracted, playTrack, togglePlayPause } = useMusicPlayer();

  const isMusicPreviewRoute = pathname === '/main-withmusic';

  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300`}
        style={{
          background: isScrolled 
            ? 'color-mix(in srgb, var(--theme-bg-primary, #101F31) 95%, transparent)'
            : 'rgba(16, 31, 49, 0.1)',
          backdropFilter: isScrolled ? 'blur(12px)' : 'blur(4px)',
          borderBottom: isScrolled 
            ? '1px solid rgba(255, 255, 255, 0.1)' 
            : '1px solid rgba(255, 255, 255, 0.05)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-6">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 relative z-50">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo.webp"
                alt="JoePlates"
                width={180}
                height={50}
                className={`h-12 w-auto transition-all duration-300 ${
                  isScrolled ? '' : 'drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]'
                }`}
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {mainNavItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200
                               ${isActive
                                 ? 'text-[var(--color-accent-gold)]'
                                 : isScrolled 
                                   ? 'text-white/80 hover:text-white hover:bg-white/5'
                                   : 'text-white/90 hover:text-white hover:bg-white/10'
                               }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Music Player Control - Only on /main-withmusic, far right */}
            {isMusicPreviewRoute && (
              <button
                type="button"
                onClick={(): void => {
                  if (!currentTrack) {
                    playTrack({ id: 'main-mix', label: 'House mix', startTime: 7 });
                    return;
                  }
                  togglePlayPause();
                }}
                className="hidden lg:block p-2 rounded-md transition-all duration-200 hover:bg-white/5"
                aria-label={!hasInteracted ? 'Play music' : isPlaying ? 'Pause music' : 'Play music'}
              >
                {!hasInteracted ? (
                  // Speaker icon - initial state
                  <svg className="w-5 h-5 text-white/80" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                  </svg>
                ) : isPlaying ? (
                  // Pause icon
                  <svg className="w-5 h-5 text-white/80" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                  </svg>
                ) : (
                  // Play icon
                  <svg className="w-5 h-5 text-white/80" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`lg:hidden relative z-50 p-2 -mr-2 transition-colors duration-200 ${
                isScrolled ? 'text-white' : 'text-white/90'
              }`}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <span
                  className={`w-full h-0.5 bg-current transition-all duration-300 origin-center
                             ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}
                />
                <span
                  className={`w-full h-0.5 bg-current transition-all duration-300
                             ${isMenuOpen ? 'opacity-0 scale-0' : ''}`}
                />
                <span
                  className={`w-full h-0.5 bg-current transition-all duration-300 origin-center
                             ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 lg:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[var(--color-bg-dark)]/95 backdrop-blur-lg"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Menu Content */}
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-[var(--color-primary-navy)] 
                         shadow-2xl flex flex-col pt-24 px-6 pb-8"
            >
              <div className="flex-1 space-y-1">
                {mainNavItems.map((item, index) => {
                  const isActive = pathname === item.href;
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        className={`block px-4 py-3 text-lg font-medium rounded-lg transition-colors
                                   ${isActive
                                     ? 'text-[var(--color-accent-gold)] bg-white/5'
                                     : 'text-white/80 hover:text-white hover:bg-white/5'
                                   }`}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Contact Info */}
              <div className="border-t border-white/10 pt-6 mt-6">
                <p className="text-white/50 text-sm mb-2">Get in touch</p>
                <a
                  href="mailto:info@joeplates.com"
                  className="block text-white hover:text-[var(--color-accent-gold)] transition-colors"
                >
                  info@joeplates.com
                </a>
                <a
                  href="tel:+12165387576"
                  className="block text-white/70 hover:text-white transition-colors text-sm mt-1"
                >
                  (216) 538-7576
                </a>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer for fixed header */}
      <div className="h-20" />
    </>
  );
}

