import { ReactNode } from 'react';
import { preventWidows } from '@/lib/typography';

interface TextProps {
  children: string;
  as?: 'p' | 'span' | 'div' | 'li';
  className?: string;
}

/**
 * Text component that automatically prevents widow words.
 * Use this for any text blocks where you want guaranteed widow prevention.
 * 
 * Note: Most components already have widow prevention built-in.
 * Use this for custom paragraph text that doesn't go through 
 * PageHero, SectionHeading, Card, or other standard components.
 */
export function Text({ 
  children, 
  as: Component = 'p', 
  className = '' 
}: TextProps): ReactNode {
  return (
    <Component className={className}>
      {preventWidows(children)}
    </Component>
  );
}


