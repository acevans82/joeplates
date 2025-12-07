'use client';

import React, { type SVGProps, type ReactElement } from 'react';

export type CycleIconType = 'dining' | 'travel' | 'curation' | 'repeat';

interface CycleIconProps {
  type: CycleIconType;
  className?: string;
  size?: number;
}

const icons: Record<CycleIconType, ReactElement<SVGProps<SVGSVGElement>>> = {
  dining: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Fork */}
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2" />
      <path d="M7 2v20" />
      {/* Knife */}
      <path d="M21 15V2a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3" />
      <path d="M18 22v-7" />
    </svg>
  ),
  travel: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
    </svg>
  ),
  curation: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 22h8" />
      <path d="M7 10h10" />
      <path d="M12 15v7" />
      <path d="M12 15a5 5 0 005-5c0-2-.5-4-2-8H9c-1.5 4-2 6-2 8a5 5 0 005 5z" />
    </svg>
  ),
  repeat: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12a9 9 0 11-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
    </svg>
  ),
};

export function CycleIcon({ type, className, size }: CycleIconProps): ReactElement {
  const sizeValue = size ?? 24;
  
  return (
    <span 
      className={className}
      style={{ 
        display: 'inline-flex',
        width: sizeValue,
        height: sizeValue,
      }}
    >
      {React.cloneElement(icons[type], {
        width: sizeValue,
        height: sizeValue,
      })}
    </span>
  );
}

// Helper to render icon from step.icon string
export function renderCycleIcon(iconId: string, className?: string, size?: number): ReactElement {
  return <CycleIcon type={iconId as CycleIconType} className={className} size={size} />;
}

