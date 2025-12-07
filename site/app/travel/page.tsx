import { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { Section } from '@/components/Section';
import { SectionHeading } from '@/components/SectionHeading';
import { Button } from '@/components/Button';
import { domesticRegions, internationalRegions, type TravelRegion } from '@/data/travelRegions';
import Image from 'next/image';
import { CycleVersion08 } from '@/components/cycle-concepts';
import type { ReactElement } from 'react';

export const metadata: Metadata = {
  title: 'Travel',
  description: 'Travel with Joe. Whether you join him on his itinerary or bring him along on yours, travel with Joe feels like visiting a friend who\'s already done the homework.',
};

const travelFormats = [
  {
    title: "Join Joe's Travels (Hosted Trips)",
    description: "A few times a year, Joe opens up a small number of seats on trips he's already planning for sourcing, relationships, and exploration. You can join for a night, a leg, or the entire journey.",
    features: [
      'At least one private dinner cooked by Joe',
      'Curated local restaurants and bars',
      'Tastings and visits specific to the region',
      'Optional collaborations with local chefs',
    ],
    note: 'Seats are strictly limited. Members get first right of refusal.',
    image: '/images/travel/porto-cityscape.jpg',
  },
  {
    title: 'Bespoke Travel',
    description: 'Want the trip to be yours from the ground up? Joe works with trusted partners to design fully bespoke travel for you and your group.',
    features: [
      'Your destination, your people, your vibe',
      'Food and drink roadmap',
      'Reservations that actually make sense',
      'Experiences not on page one of search results',
    ],
    note: 'Joe can stay behind the scenes or join you as your chef and guide.',
    image: '/images/travel/seville-plaza.jpg',
  },
  {
    title: 'Worldwide Dining (Chef & Guide)',
    description: "Already booked the house, flights, and friends? Bring Joe in as your private chef and culinary guide for part—or all—of your trip.",
    features: [
      'Cook in your rental, villa, or cabin',
      'Arrange tastings and key reservations',
      'Introduce you to local producers and markets',
      'Balance exploring out with enjoying "home" nights',
    ],
    note: null,
    image: '/images/travel/edinburgh-architecture.jpeg',
  },
];

const travelGallery = [
  { src: '/images/travel/joe-scotland-castle.jpg', alt: 'Joe at Scottish castle', location: 'Scotland' },
  { src: '/images/travel/porto-cityscape.jpg', alt: 'Porto, Portugal', location: 'Portugal' },
  { src: '/images/travel/seville-plaza.jpg', alt: 'Plaza de España, Seville', location: 'Spain' },
  { src: '/images/travel/tulum-boats.jpeg', alt: 'Tulum fishing boats', location: 'Mexico' },
  { src: '/images/travel/edinburgh-architecture.jpeg', alt: 'Edinburgh architecture', location: 'Scotland' },
  { src: '/images/travel/porto-waterfront.jpg', alt: 'Porto waterfront', location: 'Portugal' },
];

const upcomingJourneys = [
  {
    title: 'Champagne Harvest Week + Paris',
    description: 'Grower visits, cellar tastings, Champagne-paired dinners, and a few days in the city.',
    region: 'France',
    image: '/images/about/joe-bordeaux.jpg',
  },
  {
    title: 'Highlands & Skye Whisky Trail',
    description: 'Distillery visits, coastal drives, fireplace dinners, and plenty of time to wander.',
    region: 'Scotland',
    image: '/images/travel/joe-scotland-castle.jpg',
  },
  {
    title: 'Portugal from Porto to the Algarve',
    description: 'Port houses, Douro valley views, seafood in Lisbon, and sunsets in the south.',
    region: 'Portugal',
    image: '/images/travel/porto-cityscape.jpg',
  },
];

function getRegionIcon(region: TravelRegion): ReactElement {
  const baseProps = {
    className: 'w-5 h-5',
    viewBox: '0 0 24 24',
    'aria-hidden': 'true' as const,
  };

  switch (region.icon) {
    case 'trees':
      return (
        <svg {...baseProps}>
          <path
            d="M8 20h8M12 20v-4M7 16l5-9 5 9H7Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'wine-glass':
      return (
        <svg {...baseProps}>
          <path
            d="M9 3h6v3.5A4 4 0 0 1 11 10a4 4 0 0 1-4-3.5V3h2Zm3 7v7m-3 3h6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'city':
      return (
        <svg {...baseProps}>
          <path
            d="M5 20V9l3-2 3 2v11M5 14h6M15 20V7l2-1 2 1v13M15 11h4M9 11v1M9 15v1M17 15v1"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'palm':
      return (
        <svg {...baseProps}>
          <path
            d="M12 20v-7M9 5c1.5-1.5 3.5-1.5 5 0M7 7c1.5-1 3.5-.5 4.5 1M17 7c-1.5-1-3.5-.5-4.5 1M8 9.5c1.2-.6 2.7-.3 3.5.6M16 9.5c-1.2-.6-2.7-.3-3.5.6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'bourbon':
      return (
        <svg {...baseProps}>
          <path
            d="M10 3h4M11 3l-.5 3M13 3l.5 3M9 6h6l-1 11H10L9 6Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'eiffel':
      return (
        <svg {...baseProps}>
          <path
            d="M9 20h6M10 16h4M9 16l3-9 3 9M11 7h2"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'bridge':
      return (
        <svg {...baseProps}>
          <path
            d="M4 17h16M5 17v-5a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v5M9 17v-3M15 17v-3"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'mountains':
      return (
        <svg {...baseProps}>
          <path
            d="M4 18 10 7l3 5 3-5 4 11H4Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'castle':
      return (
        <svg {...baseProps}>
          <path
            d="M7 11V7l2-1 2 1 2-1 2 1v4M7 11h10v7H7v-7Zm3 0v-2m4 2v-2"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
}

export default function TravelPage(): React.ReactElement {
  return (
    <>
      <PageHero
        title="Wander with Joe"
        eyebrow="Joe doesn't just travel. He wanders for you."
        subtitle="Whether you join him on a leg of his itinerary or bring him along on yours, travel with Joe feels less like a tour and more like visiting a friend who's already done the homework."
        size="large"
        backgroundImage="/images/travel/joe-scotland-castle.jpg"
        objectPosition="center calc(30% - 150px)"
      >
        <Button href="#waitlist" variant="primary" size="lg">
          Join the Travel Waitlist
        </Button>
      </PageHero>

      {/* Travel Gallery */}
      <Section background="dark">
        <SectionHeading
          title="Where We've Wandered"
          subtitle="From the vineyards of Bordeaux to the fishing boats of Tulum—these are real moments from Joe's travels."
        />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {travelGallery.map((item, index) => (
            <div key={index} className="relative aspect-square rounded-lg overflow-hidden group">
              <Image 
                src={item.src} 
                alt={item.alt} 
                fill 
                className="object-cover transition-transform duration-500 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="text-white font-medium">{item.location}</span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Repeat Stops */}
      <Section background="primary">
        <SectionHeading
          title="Repeat Stops"
          subtitle="Joe's calendar shifts season to season, but there are regions he returns to again and again."
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Domestic */}
          <div>
            <h3 className="text-xl font-semibold text-[var(--color-accent-gold)] mb-6">Domestic</h3>
            <div className="space-y-4">
              {domesticRegions.map((region) => (
                <div key={region.slug} className="flex items-start gap-4 p-4 bg-[var(--color-secondary-navy)] rounded-[var(--theme-corner-radius)]">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-accent-gold)]/20 flex items-center justify-center flex-shrink-0 text-[var(--color-accent-gold)]">
                    {getRegionIcon(region)}
                  </div>
                  <div>
                    <h4 className="text-white font-medium">{region.name}</h4>
                    <p className="text-white/60 text-sm">{region.shortDescription}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* International */}
          <div>
            <h3 className="text-xl font-semibold text-[var(--color-accent-gold)] mb-6">International</h3>
            <div className="space-y-4">
              {internationalRegions.map((region) => (
                <div key={region.slug} className="flex items-start gap-4 p-4 bg-[var(--color-secondary-navy)] rounded-[var(--theme-corner-radius)]">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-accent-gold)]/20 flex items-center justify-center flex-shrink-0 text-[var(--color-accent-gold)]">
                    {getRegionIcon(region)}
                  </div>
                  <div>
                    <h4 className="text-white font-medium">{region.name}</h4>
                    <p className="text-white/60 text-sm">{region.shortDescription}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Joe's Upcoming Drips - Year in the Life Timeline */}
      <Section background="secondary">
        <SectionHeading
          title="Joe's Upcoming Trips"
          subtitle="A glimpse into what a year with JoePlates looks like. Each season brings new adventures, tastings, and gatherings."
        />
        <CycleVersion08 />
      </Section>

      {/* Three Ways to Travel */}
      <Section background="primary">
        <SectionHeading
          title="Three Ways to Travel with Joe"
        />
        <div className="space-y-8">
          {travelFormats.map((format, index) => (
            <div key={format.title} className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-[var(--color-secondary-navy)] rounded-[var(--theme-corner-radius)] overflow-hidden">
              <div className={`relative aspect-[16/10] lg:aspect-auto ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <Image src={format.image} alt={format.title} fill className="object-cover" />
              </div>
              <div className={`p-8 flex flex-col justify-center ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <h3 className="text-2xl font-semibold text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                  {format.title}
                </h3>
                <p className="text-white/70 mb-6">{format.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  {format.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-white/80 text-sm">
                      <svg className="w-4 h-4 text-[var(--color-accent-gold)] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                {format.note && (
                  <p className="text-[var(--color-accent-gold)] text-sm font-medium">{format.note}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Upcoming Journeys */}
      <Section background="dark">
        <SectionHeading
          title="Joe's Travels: Upcoming Journeys"
          subtitle="Trips change season to season, but here's a taste of what's possible."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {upcomingJourneys.map((journey) => (
            <div key={journey.title} className="bg-[var(--color-secondary-navy)] rounded-[var(--theme-corner-radius)] overflow-hidden group">
              <div className="relative aspect-[4/3]">
                <Image 
                  src={journey.image} 
                  alt={journey.title} 
                  fill 
                  className="object-cover transition-transform duration-500 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute bottom-4 left-4 px-3 py-1 bg-[var(--color-accent-gold)] text-white text-xs font-medium rounded">
                  {journey.region}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white mb-2">{journey.title}</h3>
                <p className="text-white/60 text-sm">{journey.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Waitlist */}
      <Section background="primary" id="waitlist">
        <div className="max-w-2xl mx-auto text-center">
          <SectionHeading
            title="Join the Travel & Members Waitlist"
            subtitle="Tell us where the world is tugging you. When the right trip comes together, you'll be among the first to know."
          />
          <p className="text-white/60 mb-8">
            Members hear first, then waitlist Guests.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/contact" variant="primary" size="lg">
              Join the Waitlist
            </Button>
            <Button href="/members" variant="outline" size="lg">
              Become a Member
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
