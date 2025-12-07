'use client';

import { ReactNode, CSSProperties } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { preventWidows } from '@/lib/typography';

interface CardProps {
  title: string;
  description?: string;
  href?: string;
  image?: string;
  icon?: ReactNode;
  children?: ReactNode;
  className?: string;
  variant?: 'default' | 'featured' | 'compact';
  isGlobalMusicPlaying?: boolean;
  isActiveTrack?: boolean;
  onHoverPlayIntent?: () => void;
}

export function Card({
  title,
  description,
  href,
  image,
  icon,
  children,
  className = '',
  variant = 'default',
  isGlobalMusicPlaying,
  isActiveTrack,
  onHoverPlayIntent,
}: CardProps): React.ReactElement {
  const sizeClasses = {
    default: 'p-6',
    featured: 'p-8',
    compact: 'p-4',
  };

  const cardStyle: CSSProperties = {
    background: 'var(--theme-bg-secondary, #173660)',
    borderRadius: 'var(--theme-corner-radius, 0.5rem)',
    boxShadow: 'var(--theme-card-shadow, 0 4px 20px rgba(0, 0, 0, 0.3))',
    transition: 'all 0.3s ease',
  };

  const content = (
    <>
      {image && (
        <div 
          className="relative aspect-[16/10] mb-4 overflow-hidden"
          style={{ borderRadius: 'calc(var(--theme-corner-radius, 0.5rem) * 0.75)' }}
        >
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}

      {icon && (
        <div 
          className="w-12 h-12 mb-4 flex items-center justify-center rounded-lg"
          style={{ 
            background: 'color-mix(in srgb, var(--theme-accent, #7A611D) 15%, transparent)',
            color: 'var(--theme-accent, #7A611D)',
          }}
        >
          {icon}
        </div>
      )}

      <div className="flex items-center gap-2 mb-2">
        <h3 className="text-xl font-semibold text-white group-hover:opacity-80 transition-opacity">
          {preventWidows(title)}
        </h3>
        {onHoverPlayIntent && (
          <button
            type="button"
            onClick={(e): void => {
              e.preventDefault();
              e.stopPropagation();
              onHoverPlayIntent();
            }}
            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-white/10 rounded-md flex-shrink-0"
            aria-label={`Play music for ${title}`}
          >
            <svg
              className="w-4 h-4 text-white/70 hover:text-white transition-colors"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        )}
      </div>

      {description && (
        <p className="text-white/70 text-sm leading-relaxed">
          {preventWidows(description)}
        </p>
      )}

      {children}

      {href && (
        <div 
          className="mt-4 flex items-center gap-2 text-sm font-medium"
          style={{ color: 'var(--theme-accent, #7A611D)' }}
        >
          <span>Learn more</span>
          <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      )}
    </>
  );

  if (href) {
    return (
      <Link 
        href={href} 
        className={`section-card ${sizeClasses[variant]} block group hover:-translate-y-1 ${className}`}
        style={cardStyle}
      >
        {content}
      </Link>
    );
  }

  return (
    <div 
      className={`section-card ${sizeClasses[variant]} group hover:-translate-y-1 ${className} ${onHoverPlayIntent ? 'cursor-pointer' : ''}`}
      style={cardStyle}
      onClick={(): void => {
        if (onHoverPlayIntent) {
          onHoverPlayIntent();
        }
      }}
    >
      {content}
    </div>
  );
}
