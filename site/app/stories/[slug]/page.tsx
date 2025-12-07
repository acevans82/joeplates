import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Section } from '@/components/Section';
import { Button } from '@/components/Button';
import { stories, getStoryBySlug } from '@/data/stories';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return stories.map((story) => ({
    slug: story.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = getStoryBySlug(slug);
  
  if (!story) {
    return {
      title: 'Story Not Found',
    };
  }

  return {
    title: story.title,
    description: story.excerpt,
  };
}

export default async function StoryPage({ params }: PageProps): Promise<React.ReactElement> {
  const { slug } = await params;
  const story = getStoryBySlug(slug);

  if (!story) {
    notFound();
  }

  return (
    <>
      {/* Hero Image */}
      {story.image && (
        <section className="relative h-[40vh] min-h-[320px] max-h-[480px] bg-[var(--color-primary-navy)]">
          <Image
            src={story.image}
            alt={story.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--color-secondary-navy)]" />
        </section>
      )}

      {/* Header */}
      <section className={`bg-[var(--color-secondary-navy)] ${story.image ? 'pt-8' : 'pt-12'} pb-16`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href="/stories"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Stories
          </Link>

          <p className="text-[var(--color-accent-gold)] text-sm mb-4">
            {new Date(story.date).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>

          <h1 
            className="text-4xl sm:text-5xl font-bold text-white mb-6"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {story.title}
          </h1>

          <p className="text-xl text-white/70 leading-relaxed">
            {story.excerpt}
          </p>
        </div>
      </section>

      {/* Content */}
      <Section background="dark">
        <article className="max-w-3xl mx-auto">
          <div className="prose prose-invert prose-lg max-w-none">
            {story.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-white/80 leading-relaxed mb-6">
                {paragraph}
              </p>
            ))}
          </div>
        </article>
      </Section>

      {/* CTA */}
      <Section background="secondary">
        <div className="max-w-2xl mx-auto text-center">
          <h2 
            className="text-2xl font-semibold text-white mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Ready to Create Your Own Story?
          </h2>
          <p className="text-white/70 mb-8">
            Every JoePlates experience has the potential to become a story worth telling.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/private-dining" variant="primary">
              Request a Private Dinner
            </Button>
            <Button href="/stories" variant="ghost">
              Read More Stories
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}


