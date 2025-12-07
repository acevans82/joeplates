import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { PageHero } from '@/components/PageHero';
import { Section } from '@/components/Section';
import { stories } from '@/data/stories';

export const metadata: Metadata = {
  title: 'Stories',
  description: 'Stories from the road and the table. Not every night needs a write-up, but some stories ask to be written down.',
};

export default function StoriesPage(): React.ReactElement {
  return (
    <>
      <PageHero
        title="Stories from the Road & the Table"
        subtitle="Not every night needs a write-up, and Joe has no interest in living life just to post about it. But some stories ask to be written down—because they explain why JoePlates exists, or they capture something worth remembering."
        size="default"
      />

      <Section background="dark">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story) => (
            <Link
              key={story.slug}
              href={`/stories/${story.slug}`}
              className="group block bg-[var(--color-secondary-navy)] rounded-[var(--theme-corner-radius)] overflow-hidden hover:ring-2 hover:ring-[var(--color-accent-gold)]/50 transition-all"
            >
              {/* Story image */}
              <div className="aspect-[16/10] bg-[var(--color-primary-navy)] relative overflow-hidden">
                {story.image ? (
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-white/20">
                    <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15" />
                    </svg>
                  </div>
                )}
                {story.featured && (
                  <span className="absolute top-3 left-3 px-2 py-1 bg-[var(--color-accent-gold)] text-white text-xs font-semibold rounded z-10">
                    Featured
                  </span>
                )}
              </div>

              <div className="p-6">
                <p className="text-white/50 text-sm mb-2">
                  {new Date(story.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
                <h2 
                  className="text-xl font-semibold text-white mb-3 group-hover:text-[var(--color-accent-gold)] transition-colors"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {story.title}
                </h2>
                <p className="text-white/70 text-sm leading-relaxed mb-4">
                  {story.excerpt}
                </p>
                <span className="inline-flex items-center gap-2 text-[var(--color-accent-gold)] text-sm font-medium">
                  Read Story
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}


