import { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { Section } from '@/components/Section';
import { SectionHeading } from '@/components/SectionHeading';
import { Button } from '@/components/Button';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Collection & Curation',
  description: 'Fanatical curation from someone who actually travels for this. Joe helps you find the bottles and treasures that belong in your life.',
};

export default function CollectionCurationPage(): React.ReactElement {
  return (
    <>
      <PageHero
        title="Collection & Curation"
        eyebrow="Fanatical curation from someone who actually travels for this"
        subtitle="Joe helps you find the bottles, producers, and one-of-a-kind pieces that belong in your life—not just in your feed."
        size="large"
        backgroundImage="/images/curation/mouton-rothschild.jpg"
      >
        <Button href="#contact" variant="primary" size="lg">
          Start Your Cellar Journey
        </Button>
      </PageHero>

      {/* Fanatical Curators */}
      <Section background="dark">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeading
              title={`"Fanatical Curators," in Joe's Words`}
              centered={false}
            />
            <p className="text-white/70 text-lg leading-relaxed mb-6">
              We like to say we&apos;re fanatical curators. Translation: we care as much about what <em>doesn&apos;t</em> make it into your collection as what does.
            </p>
            <p className="text-white/60 leading-relaxed">
              Joe listens for what you actually enjoy—styles, producers, regions, moods—then puts his network and travel schedule to work. You end up with bottles you&apos;re excited to open, not just labels you felt pressured to buy.
            </p>
          </div>
          <div className="relative aspect-square rounded-[var(--theme-corner-radius)] overflow-hidden">
            <Image 
              src="/images/curation/mouton-rothschild.jpg" 
              alt="Fine wine from the collection" 
              fill 
              className="object-cover" 
            />
          </div>
        </div>
      </Section>

      {/* Wine & Spirits Cellar */}
      <Section background="primary">
        <SectionHeading
          title="Wine & Spirits Cellar Curation"
          subtitle="Building a cellar is part art, part logistics. Joe handles both."
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="grid grid-cols-2 gap-4">
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
              <Image src="/images/dining/beef-burgundy.jpeg" alt="Wine paired with fine dining" fill className="object-cover" />
            </div>
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden mt-8">
              <Image src="/images/curation/mouton-rothschild.jpg" alt="Premium wine selection" fill className="object-cover" />
            </div>
          </div>
          <div>
            <div className="space-y-6">
              {[
                'Helps you define your taste or refine what you already like',
                'Designs a cellar tailored to your style, palate, and goals',
                'Taps relationships with small-production, high-demand producers',
                'Sources directly from the right partners so you avoid guesswork',
              ].map((item) => (
                <div key={item} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[var(--color-accent-gold)]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-[var(--color-accent-gold)]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-white/80">{item}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-[var(--color-accent-gold)] font-medium">
              We don&apos;t promise &quot;discounts.&quot; We promise <strong>access and alignment</strong>—to the right bottles, from the right places, at the right moments.
            </p>
          </div>
        </div>
      </Section>

      {/* Executive Curation */}
      <Section background="secondary">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="grid grid-cols-3 gap-4">
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image src="/images/travel/porto-cityscape.jpg" alt="Porto discovery" fill className="object-cover" />
              </div>
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image src="/images/travel/seville-lamppost.jpg" alt="Seville treasures" fill className="object-cover" />
              </div>
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image src="/images/travel/edinburgh-architecture.jpeg" alt="Scottish finds" fill className="object-cover" />
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <SectionHeading
              title="Executive Curation"
              subtitle="Sometimes the most memorable gifts aren't on a website."
              centered={false}
            />
            <p className="text-white/70 mb-6">
              For select Members, Joe keeps an eye out during his travels for one-of-a-kind pieces: locally crafted jewelry, art and objects with a real story, specialty foods that need to be hand-carried home.
            </p>
            <p className="text-white/60">
              Think of it as having a little space in his suitcase reserved for you, when the right thing appears.
            </p>
          </div>
        </div>
      </Section>

      {/* From Trip to Cellar */}
      <Section background="dark">
        <SectionHeading
          title="From Trip to Cellar"
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="bg-[var(--color-secondary-navy)] rounded-[var(--theme-corner-radius)] p-8">
            <p className="text-white/70 leading-relaxed mb-4">A simple example:</p>
            <ul className="space-y-3 text-white/80">
              <li className="flex items-start gap-3">
                <span className="text-[var(--color-accent-gold)]">→</span>
                Joe spends a week in Champagne and Bordeaux, visiting growers and small producers.
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[var(--color-accent-gold)]">→</span>
                He tastes, talks, and listens.
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[var(--color-accent-gold)]">→</span>
                A handful of bottles and relationships make the cut.
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[var(--color-accent-gold)]">→</span>
                Those show up as curated allocations in your cellar and on your table at future dinners.
              </li>
            </ul>
          </div>
          <div className="relative aspect-square rounded-[var(--theme-corner-radius)] overflow-hidden">
            <Image 
              src="/images/about/joe-bordeaux.jpg" 
              alt="Joe in Bordeaux" 
              fill 
              className="object-cover" 
            />
          </div>
        </div>
      </Section>

      {/* Who This Is For */}
      <Section background="primary">
        <SectionHeading title="Who This Is For" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {[
            'New collectors who want to skip the noise and start strong',
            'Established collectors ready for a fresh perspective',
            'Executives and family offices who entertain often',
            'Members who want their cellars to feel as intentional as their dinners',
          ].map((item) => (
            <div key={item} className="flex items-center gap-3 p-4 bg-[var(--color-secondary-navy)] rounded-[var(--theme-corner-radius)]">
              <svg className="w-5 h-5 text-[var(--color-accent-gold)] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-white/80 text-sm">{item}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section background="secondary" id="contact">
        <div className="max-w-2xl mx-auto text-center">
          <SectionHeading
            title="Start or Refine Your Cellar"
            subtitle="Answer a few questions and Joe will suggest a starting point—whether that's a tasting at home, an audit of what you own, or a roadmap for where your collection could go."
          />
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/contact" variant="primary" size="lg">
              Start a Conversation
            </Button>
            <Button href="/members" variant="ghost" size="lg">
              Explore Membership
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
