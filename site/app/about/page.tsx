import { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { Section } from '@/components/Section';
import { SectionHeading } from '@/components/SectionHeading';
import { Button } from '@/components/Button';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'About',
  description: 'Nine lives, one calling. Joe has been a touring musician, tech founder, and mentor—and through it all, the guy cooking for everyone after hours.',
};

const values = [
  { name: 'Generosity', description: 'Giving more than expected, always.' },
  { name: 'Curiosity', description: 'Constantly learning, tasting, wandering.' },
  { name: 'Craftsmanship', description: 'Attention to detail in every dish and bottle.' },
  { name: 'Connection', description: 'People and stories matter most.' },
  { name: 'Gratitude', description: 'Thankful for every seat at the table.' },
];

export default function AboutPage(): React.ReactElement {
  return (
    <>
      <PageHero
        title="Nine Lives. One Calling."
        subtitle="Joe's mission is simple: bring the world to your table."
        size="large"
        backgroundImage="/images/about/joe-bordeaux.jpg"
      />

      {/* Nine Lives Story */}
      <Section background="dark">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[3/4] rounded-[var(--theme-corner-radius)] overflow-hidden">
            <Image
              src="/images/about/joe-chef-portrait.jpg"
              alt="Joe in his chef coat"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <SectionHeading
              title="Nine Lives, All Pointing Here"
              centered={false}
            />
            <p className="text-white/70 text-lg leading-relaxed mb-6">
              Joe has done a lot of things that don&apos;t obviously go together—until you&apos;re sitting at his table.
            </p>
            <div className="space-y-4 text-white/80">
              <p className="flex items-start gap-4">
                <span className="text-[var(--color-accent-gold)]">→</span>
                He&apos;s been a touring guitarist in rock bands, learning how to read a room and build a setlist.
              </p>
              <p className="flex items-start gap-4">
                <span className="text-[var(--color-accent-gold)]">→</span>
                He&apos;s built companies and mentored entrepreneurs, obsessed with helping people design lives they actually want.
              </p>
              <p className="flex items-start gap-4">
                <span className="text-[var(--color-accent-gold)]">→</span>
                He&apos;s wandered through vineyards, markets, and kitchens around the world, cooking for friends, clients, and strangers who quickly stopped feeling like strangers.
              </p>
            </div>
            <p className="text-white/70 mt-6">
              Through every chapter, a pattern kept surfacing: late nights around a table, bottles open, food disappearing, people exhaling and actually connecting. JoePlates is simply what happens when you decide that&apos;s the main thing—and you build a life around it.
            </p>
          </div>
        </div>
      </Section>

      {/* The Barbaric Yawp */}
      <Section background="secondary">
        <SectionHeading
          title="The Moment It Became Non-Negotiable"
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-3xl bg-[var(--color-primary-navy)] rounded-[var(--theme-corner-radius)] p-8">
            <p className="text-white/70 leading-relaxed mb-4">
              There&apos;s a night in Bordeaux that Joe will never forget.
            </p>
            <p className="text-white/70 leading-relaxed mb-4">
              He was on a trip with his friend and client Dr. Dave, a man battling a brutal kind of cancer with an almost ridiculous amount of gratitude and appetite. Joe had been his private chef, friend, confidante, and adventure co-conspirator.
            </p>
            <blockquote className="border-l-4 border-[var(--color-accent-gold)] pl-6 my-6">
              <p className="text-white text-lg italic">
                &quot;Keep doing this. Doing this for people. Food, wine, all of this life concierge stuff. Look at what we&apos;ve built—the people, the memories, the way we&apos;re celebrating being alive. Promise me you&apos;ll keep doing it.&quot;
              </p>
            </blockquote>
            <p className="text-white/70 leading-relaxed">
              Joe promised.
            </p>
            <p className="text-white/70 leading-relaxed mt-4">
              JoePlates is him keeping that promise—turning what started as a weekend hobby into an all-consuming passion: cooking, traveling, bringing people together, and giving more people nights that feel like that.
            </p>
          </div>
          <div className="relative aspect-square rounded-[var(--theme-corner-radius)] overflow-hidden">
            <Image
              src="/images/about/joe-bordeaux.jpg"
              alt="Joe in Bordeaux with Armagnac"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </Section>

      {/* What JoePlates Is Today */}
      <Section background="dark">
        <SectionHeading
          title="What JoePlates Is Today"
        />
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-white/70 text-lg leading-relaxed mb-6">
            Today, JoePlates is a high-touch service brand for people who want experiences, not transactions.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4">
              <p className="text-white font-medium">Private dining that feels like it could only happen at your table</p>
            </div>
            <div className="p-4">
              <p className="text-white font-medium">Wine and spirits curation grounded in real travel and relationships</p>
            </div>
            <div className="p-4">
              <p className="text-white font-medium">Travel that trades checklists for connection</p>
            </div>
          </div>
          <p className="text-white/60 mt-8">
            From your kitchen to the Highlands, from your cellar to the sea—Joe shows up as the guy you&apos;d invite anyway, who just happens to be very, very good at this.
          </p>
        </div>
        
        {/* Image Gallery Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          <div className="relative aspect-square rounded-lg overflow-hidden">
            <Image src="/images/dining/filet-mignon.jpg" alt="Plated filet mignon" fill className="object-cover" />
          </div>
          <div className="relative aspect-square rounded-lg overflow-hidden">
            <Image src="/images/travel/porto-cityscape.jpg" alt="Porto, Portugal" fill className="object-cover" />
          </div>
          <div className="relative aspect-square rounded-lg overflow-hidden">
            <Image src="/images/curation/mouton-rothschild.jpg" alt="Fine wine collection" fill className="object-cover" />
          </div>
          <div className="relative aspect-square rounded-lg overflow-hidden">
            <Image src="/images/about/joe-with-guests.jpeg" alt="Joe with guests" fill className="object-cover" />
          </div>
        </div>
      </Section>

      {/* Giving & Values */}
      <Section background="primary" id="giving">
        <SectionHeading
          title="Giving & Values"
        />
        <div className="max-w-4xl mx-auto">
          <div className="bg-[var(--color-accent-gold)]/10 border border-[var(--color-accent-gold)]/30 rounded-[var(--theme-corner-radius)] p-8 mb-12 text-center">
            <p className="text-xl text-white font-medium mb-4">
              10% of all revenue goes to organizations providing food and shelter.
            </p>
            <p className="text-white/70">
              A life built around good food and good fortune only makes sense if everyone has a seat at the table.
            </p>
          </div>

          <h3 className="text-xl font-semibold text-[var(--color-accent-gold)] mb-6 text-center">Our Values</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {values.map((value) => (
              <div key={value.name} className="bg-[var(--color-secondary-navy)] rounded-[var(--theme-corner-radius)] p-4 text-center">
                <h4 className="text-white font-semibold mb-1">{value.name}</h4>
                <p className="text-white/60 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section background="secondary">
        <div className="max-w-2xl mx-auto text-center">
          <SectionHeading
            title="Ready to Experience JoePlates?"
          />
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/private-dining" variant="primary" size="lg">
              Request a Private Dinner
            </Button>
            <Button href="/contact" variant="ghost" size="lg">
              Get in Touch
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
