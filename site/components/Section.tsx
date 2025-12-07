import { ReactNode, CSSProperties } from 'react';

type BackgroundVariant = 'primary' | 'secondary' | 'dark' | 'light';

interface SectionProps {
  children: ReactNode;
  className?: string;
  background?: BackgroundVariant;
  id?: string;
  fullWidth?: boolean;
}

const backgroundStyles: Record<BackgroundVariant, CSSProperties> = {
  primary: { background: 'var(--theme-bg-primary, #101F31)' },
  secondary: { background: 'var(--theme-bg-secondary, #173660)' },
  dark: { background: 'var(--theme-bg-primary, #090B0A)', filter: 'brightness(0.7)' },
  light: { background: 'var(--color-panel-light)', color: 'var(--color-ink)' },
};

export function Section({
  children,
  className = '',
  background = 'primary',
  id,
  fullWidth = false,
}: SectionProps): React.ReactElement {
  const isDark = background === 'dark';
  
  return (
    <section
      id={id}
      className={`${className}`}
      style={{
        paddingTop: 'var(--theme-section-spacing, 5rem)',
        paddingBottom: 'var(--theme-section-spacing, 5rem)',
        ...(isDark 
          ? { background: 'color-mix(in srgb, var(--theme-bg-primary, #101F31) 100%, black 20%)' }
          : backgroundStyles[background]
        ),
      }}
    >
      {fullWidth ? (
        children
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      )}
    </section>
  );
}
