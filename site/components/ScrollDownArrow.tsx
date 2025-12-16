'use client';

type ScrollDownArrowProps = {
  targetId?: string;
  targetRef?: React.RefObject<HTMLElement | null>;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
};

const sizeClasses = {
  sm: 'w-5 h-5',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
};

export function ScrollDownArrow({
  targetId,
  targetRef,
  className,
  size = 'md',
}: ScrollDownArrowProps): React.ReactElement {
  function handleClick(): void {
    if (targetRef?.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else if (targetId) {
      const element = document.getElementById(targetId);
      element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`group cursor-pointer transition-transform hover:scale-110 active:scale-95 ${className ?? ''}`}
      aria-label="Scroll to next section"
    >
      <svg
        className={`${sizeClasses[size]} text-[var(--theme-accent)] animate-bounce group-hover:animate-none`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 14l-7 7m0 0l-7-7m7 7V3"
        />
      </svg>
    </button>
  );
}

