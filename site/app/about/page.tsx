import { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/components/PageHero';
import { Section } from '@/components/Section';
import { SectionHeading } from '@/components/SectionHeading';
import { Button } from '@/components/Button';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Cruise ships adventure program pioneer, world-touring rock musician, tech founder, mentor—all connected by a common thread: connecting people and creating unforgettable life experiences.',
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
        subtitle="Cruise ships adventure program pioneer, world-touring rock musician, tech founder, mentor, all connected through a common thread—connecting people and creating unforgettable life experiences."
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
              title="Nine Lives"
              centered={false}
            />
            <p className="text-white/70 text-lg leading-relaxed mb-4">
              Cruise ships adventure program pioneer, world-touring rock musician, tech founder, mentor, all connected through a common thread, connecting people and creating unforgettable life experiences. The JoePlates story reads more like a serendipitous tale than a series of disconnected chapters.
            </p>
            <p className="text-white/70 text-lg leading-relaxed mb-4">
              Each chapter is tied together by world wanderings, late nights swapping stories and recipes with chefs, wine collectors and friends around the world, and a deep passion for connecting people through unforgettable experiences. This is the heart of the JoePlates story, all converged in the place that mattered most, bringing people together and building unforgettable memories.
            </p>
            <p className="text-white/70 text-lg leading-relaxed mb-4">
              Behind each bite, sip, or horizon is a memory of experience made sweeter by sharing with others—a midnight bite of croquetas in Seville, Spain, a stroll through Bordeaux’s oldest vineyards, the wide expanse of the Scottish Highlands.
            </p>
            <p className="text-white/70 text-lg leading-relaxed">
              These moments compelled Rohan to launch Joe Plates, first as a part time pursuit of passion, now as a dedicated calling, to elevate life experience for others through food, wine, exploration, and each other.
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
              There&apos;s a night in Bordeaux that Joe will never forget. He was on a trip with his dear friend Dave (known and beloved to all as &quot;Dr. Dave&quot;), a man battling a brutal kind of cancer with an almost immeasurable amount of generosity, gratitude and appetite for life.
            </p>
            <p className="text-white/70 leading-relaxed mb-4">
              For the last two and a half years Joe had been his private chef, friend, confidante, and adventure co-conspirator.
            </p>
            <blockquote className="border-l-4 border-[var(--color-accent-gold)] pl-6 my-6">
              <p className="text-white text-lg italic">
                &quot;You HAVE to keep doing this. Promise me you will keep doing this — the food, the wine, all of this, this life concierge stuff. Look at what we&apos;ve built around us—the people, the community, the memories, the way we&apos;re celebrating being alive. Promise me!&quot;
              </p>
            </blockquote>
            <p className="text-white/70 leading-relaxed">
              Joe promised.
            </p>
            <p className="text-white/70 leading-relaxed mt-4">
              JoePlates is the continuation of that promise—turning what started as a weekend hobby into an all-consuming passion: cooking, traveling, bringing people together, and giving more people nights that feel like this one.
            </p>
            <p className="text-white/70 leading-relaxed mt-4">
              <Link href="/stories/the-barbaric-yawp-and-beginning" className="text-[var(--color-accent-gold)] underline underline-offset-4">
                Read the full story →
              </Link>
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
            Today, Joe Plates is a high-touch service brand for those who want more than just a meal, a trip, or a bottle. We offer private dining, collector wine and spirits sourcing, bespoke travel experiences, and cultural discovery—all inspired, all personalized, all designed to stir the soul.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4">
              <p className="text-white font-medium">Private dining that feels like it could only happen at your table</p>
            </div>
            <div className="p-4">
              <p className="text-white font-medium">Collector wine and spirits sourcing grounded in real travel and relationships</p>
            </div>
            <div className="p-4">
              <p className="text-white font-medium">Bespoke travel experiences and cultural discovery that trade checklists for connection</p>
            </div>
          </div>
          <p className="text-white/60 mt-8 text-lg leading-relaxed">
            This isn&apos;t about checking boxes. It&apos;s about creating your own. Whether that means a private tasting in your home, a moonlit dinner at your favorite location, or a highly prized and handpicked collectible arriving from halfway around the world, Joe Plates exists to elevate life—one &quot;plate&quot; at a time.
          </p>
          <p className="text-white/60 mt-4">
            From your kitchen to the Scottish Highlands, from your cellar to the sea—Joe is the guy you&apos;d invite anyway, who just happens to be very, very good at this.
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
