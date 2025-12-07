import { ReactNode } from 'react';
import Image from 'next/image';
import { preventWidows } from '@/lib/typography';

interface PageHeroProps {
  title: string | ReactNode;
  eyebrow?: string;
  subtitle?: string;
  children?: ReactNode;
  backgroundImage?: string;
  backgroundGif?: string;
  size?: 'default' | 'large' | 'small';
  layout?: 'centered' | 'left-aligned' | 'split' | 'full-bleed';
  objectPosition?: string;
}

export function PageHero({
  title,
  eyebrow,
  subtitle,
  children,
  backgroundImage,
  backgroundGif,
  size = 'default',
  layout = 'centered',
  objectPosition = 'center 30%',
}: PageHeroProps): React.ReactElement {
  const sizeClasses = {
    small: 'py-16 sm:py-20',
    default: 'py-16 sm:py-32',
    large: 'py-20 sm:py-44',
  };

  const layoutClasses = {
    centered: 'text-center items-center',
    'left-aligned': 'text-left items-start',
    split: 'text-left items-start lg:items-center',
    'full-bleed': 'text-center items-center',
  };

  return (
    <div className="relative" style={{ overflow: 'visible' }}>
      {/* Background GIF - Extends behind nav */}
      {backgroundGif && (
        <div 
          className="absolute left-0 right-0 z-0" 
          style={{ 
            top: '-80px',
            height: 'calc(100% + 80px)',
            backgroundImage: `url(${backgroundGif})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
            backgroundRepeat: 'no-repeat',
            backgroundColor: 'var(--theme-bg-primary, #101F31)',
          }}
        >
          <div className="absolute inset-0" style={{ background: 'var(--theme-bg-primary, #101F31)', opacity: 0.6 }} />
        </div>
      )}
      <section className={`relative ${sizeClasses[size]} overflow-hidden z-10`} style={{ background: backgroundGif ? 'transparent' : 'var(--theme-bg-secondary, #173660)' }}>

      {/* Background Image */}
      {backgroundImage && !backgroundGif && (
        <div className="absolute inset-0">
          <Image
            src={backgroundImage}
            alt=""
            fill
            className="object-cover"
            style={{ objectPosition }}
            priority
          />
          <div className="absolute inset-0" style={{ background: 'var(--theme-bg-primary, #101F31)', opacity: 0.8 }} />
        </div>
      )}

      {/* Background Pattern */}
      {!backgroundImage && !backgroundGif && (
        <div className="absolute inset-0 opacity-5">
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: '32px 32px',
            }}
          />
        </div>
      )}

      {/* Content */}
      <div className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col ${layoutClasses[layout]} pt-12 sm:pt-20`}>
        {eyebrow && (
          <p className="text-sm font-semibold uppercase tracking-wider mb-4 animate-fade-in" style={{ color: 'var(--theme-accent, #7A611D)' }}>
            {preventWidows(eyebrow)}
          </p>
        )}

        <h1 className="hero-title text-white mb-6 animate-slide-up">
          {typeof title === 'string' && title === 'Dine → Travel → Curate → Repeat.' ? (
            <>
              <span className="block lg:inline-block lg:whitespace-nowrap">Dine</span>
              <span className="block lg:inline lg:whitespace-nowrap"> → </span>
              <span className="block lg:inline-block lg:whitespace-nowrap">Travel</span>
              <span className="block lg:inline lg:whitespace-nowrap"> → </span>
              <span className="block lg:inline-block lg:whitespace-nowrap">Curate</span>
              <span className="block"> ← Repeat.</span>
            </>
          ) : typeof title === 'string' ? (
            preventWidows(title)
          ) : (
            title
          )}
        </h1>

        {subtitle && (
          <p className="text-lg sm:text-xl lg:text-2xl text-white/80 max-w-3xl mb-8 animate-slide-up stagger-1">
            {preventWidows(subtitle)}
          </p>
        )}

        {children && (
          <div className="animate-slide-up stagger-2">
            {children}
          </div>
        )}
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-24 z-10" style={{ background: `linear-gradient(to top, var(--theme-bg-primary, #101F31), transparent)` }} />
    </section>
    </div>
  );
}

