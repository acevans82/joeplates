import { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { Section } from '@/components/Section';
import { SectionHeading } from '@/components/SectionHeading';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { diningCategories, getThemesByCategory } from '@/data/diningThemes';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Private Dining',
  description: 'Private dining experiences anywhere you call home. From Cleveland high-rises to rented villas, Joe brings the world to your table.',
};

const experienceTypes = [
  {
    title: 'Private Dining Events',
    description: 'Perfect for birthdays, anniversaries, promotion dinners, holiday gatherings. Typically 3–5 courses with optional pairings for 2-20+ guests.',
    image: '/images/dining/dinner-group-modern.jpeg',
  },
  {
    title: 'Wine Dinners & Tastings',
    description: 'Guided tasting meets dinner party. Joe designs a flight of wines or spirits, pairs each with a focused plate, and walks your group through what you\'re tasting.',
    image: '/images/dining/beef-burgundy.jpeg',
  },
  {
    title: 'Worldwide Dining',
    description: 'Traveling with friends or planning a retreat? Joe can meet you there as your private chef and dining curator, working with local markets and producers.',
    image: '/images/travel/porto-cityscape.jpg',
  },
  {
    title: 'Cooking Classes',
    description: 'Want your guests to get their hands dirty? Joe can turn your kitchen into a playful, hands-on workshop—either as the full event or as a pre-dinner warm-up.',
    image: '/images/dining/kitchen-group.jpeg',
  },
];

const processSteps = [
  { step: 1, title: 'Discovery Call', description: 'We\'ll talk about the occasion, your guests, your tastes, and any non-negotiables.' },
  { step: 2, title: 'Menu & Pairing Design', description: 'Joe sketches a menu and pairing direction, then refines it based on your feedback.' },
  { step: 3, title: 'Sourcing & Curation', description: 'Joe sources ingredients, bottles, and any special items needed to bring the menu to life.' },
  { step: 4, title: 'Night-of Service', description: 'Joe and his team show up early, cook, plate, pour, and clean up so you can enjoy your own party.' },
  { step: 5, title: 'Afterglow & Next Steps', description: 'If you\'re curious about cellars, future trips, or becoming a Member, this is where the next chapter starts.' },
];

const foodGallery = [
  { src: '/images/dining/filet-mignon.jpg', alt: 'Filet mignon with carrots' },
  { src: '/images/dining/beef-wellington.jpg', alt: 'Beef Wellington' },
  { src: '/images/dining/clam-linguine.jpeg', alt: 'Clam linguine pasta' },
  { src: '/images/dining/charcuterie.jpg', alt: 'Charcuterie board' },
  { src: '/images/dining/arancini.jpg', alt: 'Arancini appetizer' },
  { src: '/images/dining/beef-burgundy.jpeg', alt: 'Beef with Burgundy wine' },
];

export default function PrivateDiningPage(): React.ReactElement {
  return (
    <>
      <PageHero
        title="Private Dining, Anywhere You Call Home"
        subtitle="From Cleveland high-rises to rented villas and cabins in the woods, Joe brings the world to your table with multi-course menus and pairings inspired by his travels."
        size="large"
        backgroundImage="/images/dining/dinner-group-modern.jpeg"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <Button href="#inquiry" variant="primary" size="lg">
            Inquire About a Private Dinner
          </Button>
          <Button href="/members" variant="outline" size="lg">
            Talk About Membership
          </Button>
        </div>
      </PageHero>

      {/* More Than a Meal */}
      <Section background="dark">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeading
              title="More Than a Meal"
              subtitle="We don't just plan great dining events. We curate memorable life moments."
              centered={false}
            />
            <p className="text-white/70">
              Every dinner begins with a discovery call where Joe gets to know your story, your tastes, and the people around your table. From there, he designs a menu and pairing experience that could only exist for one group on one night—yours.
            </p>
            <p className="text-white/60 mt-4">
              Vegetarian, vegan, non-alcoholic? Easy. Intolerances and allergies? Taken seriously. Want to lean into a region or a theme? That&apos;s where Joe lives.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <Image src="/images/dining/filet-mignon.jpg" alt="Elegant plated dish" fill className="object-cover" />
            </div>
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <Image src="/images/dining/beef-wellington.jpg" alt="Beef Wellington" fill className="object-cover" />
            </div>
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <Image src="/images/dining/charcuterie.jpg" alt="Charcuterie" fill className="object-cover" />
            </div>
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <Image src="/images/dining/arancini.jpg" alt="Arancini" fill className="object-cover" />
            </div>
          </div>
        </div>
      </Section>

      {/* How You Can Dine */}
      <Section background="primary">
        <SectionHeading
          title="How You Can Dine with Joe"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {experienceTypes.map((type) => (
            <div key={type.title} className="bg-[var(--color-secondary-navy)] rounded-[var(--theme-corner-radius)] overflow-hidden">
              <div className="relative aspect-[16/9]">
                <Image src={type.image} alt={type.title} fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                  {type.title}
                </h3>
                <p className="text-white/70 text-sm">{type.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Food Gallery */}
      <Section background="dark">
        <SectionHeading
          title="A Taste of What's Possible"
          subtitle="Every dish tells a story. These are just a few moments from Joe's table."
        />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {foodGallery.map((item, index) => (
            <div key={index} className="relative aspect-square rounded-lg overflow-hidden group">
              <Image 
                src={item.src} 
                alt={item.alt} 
                fill 
                className="object-cover transition-transform duration-500 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </Section>

      {/* Dining Themes */}
      <Section background="secondary" id="themes">
        <SectionHeading
          title="Dining Themes & Inspiration"
          subtitle="Below are some of Joe's most requested themes. Use them as-is or as a starting point."
        />
        
        {diningCategories.map((category) => {
          const themes = getThemesByCategory(category.id);
          return (
            <div key={category.id} className="mb-16 last:mb-0">
              <h3 className="text-2xl font-semibold text-[var(--color-accent-gold)] mb-8" style={{ fontFamily: 'var(--font-heading)' }}>
                {category.name}
              </h3>
              <div className="space-y-8">
                {themes.map((theme) => (
                  <div
                    key={theme.slug}
                    id={theme.slug}
                    className="bg-[var(--color-primary-navy)] rounded-[var(--theme-corner-radius)] overflow-hidden"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                      {theme.image && (
                        <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[300px]">
                          <Image 
                            src={theme.image} 
                            alt={theme.name} 
                            fill 
                            className="object-cover" 
                          />
                        </div>
                      )}
                      <div className="p-6 md:p-8 flex flex-col justify-center">
                        <h4 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                          {theme.name}
                        </h4>
                        <p className="text-white/80 leading-relaxed">
                          {theme.longDescription || theme.shortDescription}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        <div className="mt-12 p-8 bg-[var(--color-primary-navy)] rounded-[var(--theme-corner-radius)] text-center">
          <p className="text-white/70 text-lg">
            Not seeing what you&apos;re looking for? These are just a handful of the dinners Joe has done.
            <br />
            <strong className="text-white">Tell us your story and we&apos;ll build something around you.</strong>
          </p>
        </div>
      </Section>

      {/* Process */}
      <Section background="dark">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <SectionHeading
              title="What It's Like to Work with Joe"
              centered={false}
            />
            <div className="space-y-6">
              {processSteps.map((step, index) => (
                <div key={step.step} className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[var(--color-accent-gold)] flex items-center justify-center text-white font-bold">
                    {step.step}
                  </div>
                  <div className="flex-1 pt-2">
                    <h4 className="text-white font-semibold text-lg mb-1">{step.title}</h4>
                    <p className="text-white/60">{step.description}</p>
                    {index < processSteps.length - 1 && (
                      <div className="w-0.5 h-8 bg-[var(--color-accent-gold)]/30 ml-6 mt-4" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-[4/5] rounded-[var(--theme-corner-radius)] overflow-hidden sticky top-24">
            <Image 
              src="/images/about/joe-chef-portrait.jpg" 
              alt="Joe ready to serve" 
              fill 
              className="object-cover" 
            />
          </div>
        </div>
      </Section>

      {/* Perfect For */}
      <Section background="primary">
        <SectionHeading title="Perfect For" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {[
            'Milestone birthdays and anniversaries',
            'Executive retreats and offsites',
            'Small brand or philanthropic events',
            'Holiday gatherings',
            'Traveling groups renting a home together',
            '"We\'ve been meaning to do this for years" nights',
          ].map((item) => (
            <div key={item} className="flex items-start gap-3 text-white/80">
              <svg className="w-5 h-5 text-[var(--color-accent-gold)] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section background="secondary" id="inquiry">
        <div className="max-w-2xl mx-auto text-center">
          <SectionHeading
            title="Start with a Conversation"
            subtitle="Tell us a little bit about your dinner and we'll get in touch with timing, options, and next steps."
          />
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/contact" variant="primary" size="lg">
              Request a Discovery Call
            </Button>
            <Button href="/members" variant="ghost" size="lg">
              Learn About Membership
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
