import { preventWidows } from '@/lib/typography';

interface SectionHeadingProps {
  title: string;
  eyebrow?: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export function SectionHeading({
  title,
  eyebrow,
  subtitle,
  centered = true,
  light = true,
}: SectionHeadingProps): React.ReactElement {
  const textColor = light ? 'text-white' : 'text-[var(--color-ink)]';
  const eyebrowColor = 'text-[var(--color-accent-gold)]';
  const subtitleColor = light ? 'text-white/70' : 'text-[var(--color-neutral-700)]';

  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
      {eyebrow && (
        <p className={`${eyebrowColor} text-sm font-semibold uppercase tracking-wider mb-2`}>
          {preventWidows(eyebrow)}
        </p>
      )}
      <h2 
        className={`text-3xl sm:text-4xl lg:text-5xl font-bold ${textColor}`}
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        {preventWidows(title)}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-lg sm:text-xl ${subtitleColor} max-w-3xl ${centered ? 'mx-auto' : ''}`}>
          {preventWidows(subtitle)}
        </p>
      )}
    </div>
  );
}


