'use client';

import { useState, useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { Testimonial, testimonials } from '@/data/testimonials';
import { preventWidows } from '@/lib/typography';

interface TestimonialCarouselProps {
  filterTag?: 'private-dining' | 'travel' | 'curation' | 'member';
  maxItems?: number;
}

export function TestimonialCarousel({ 
  filterTag, 
  maxItems 
}: TestimonialCarouselProps): React.ReactElement {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'start',
    skipSnaps: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  let items: Testimonial[] = testimonials;
  if (filterTag) {
    items = items.filter(t => t.tags.includes(filterTag));
  }
  if (maxItems) {
    items = items.slice(0, maxItems);
  }

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="relative">
      {/* Carousel */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {items.map((testimonial) => (
            <div
              key={testimonial.id}
              className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-3"
            >
              <div className="h-full bg-[var(--color-secondary-navy)] rounded-[var(--theme-corner-radius)] p-6 flex flex-col">
                {/* Quote */}
                <blockquote className="flex-1 text-white/90 text-base leading-relaxed mb-6">
                  &ldquo;{preventWidows(testimonial.quote)}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-3">
                  {testimonial.image ? (
                    <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-[var(--color-accent-gold)]/20 flex items-center justify-center text-[var(--color-accent-gold)] font-semibold flex-shrink-0">
                      {testimonial.name.charAt(0)}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium text-sm truncate">
                      {testimonial.name}
                    </p>
                    <p className="text-white/50 text-xs truncate">
                      {testimonial.title}
                    </p>
                  </div>
                  <span className={`
                    px-2 py-0.5 text-xs font-medium rounded
                    ${testimonial.label === 'Member' 
                      ? 'bg-[var(--color-accent-gold)]/20 text-[var(--color-accent-gold)]'
                      : 'bg-white/10 text-white/60'
                    }
                  `}>
                    {testimonial.label}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          onClick={scrollPrev}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          aria-label="Previous testimonial"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Dots */}
        <div className="flex gap-2">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === selectedIndex
                  ? 'w-6 bg-[var(--color-accent-gold)]'
                  : 'bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={scrollNext}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          aria-label="Next testimonial"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}


