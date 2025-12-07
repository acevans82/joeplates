'use client';

import { PageHero } from '@/components/PageHero';
import { Section } from '@/components/Section';
import { SectionHeading } from '@/components/SectionHeading';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { PillarsGrid } from '@/components/PillarsGrid';
import { CycleVersion10 } from '@/components/cycle-concepts';
import { TestimonialCarousel } from '@/components/TestimonialCarousel';
import { getFeaturedThemes } from '@/data/diningThemes';
import Image from 'next/image';

// Map dining themes to appropriate images
const themeImages: Record<string, string> = {
  'night-in-seville': '/images/dining-themes/seville-market.jpeg',
  'tour-de-france': '/images/wine/pontet-canet-vertical.jpg',
  'faces-of-champagne': '/images/dining-themes/champagne-theme.jpeg',
  'island-heat': '/images/food/grilled-octopus.jpg',
  'ode-to-mushrooms': '/images/dining-themes/mushroom-dish.jpg',
};

export default function HomePage(): React.ReactElement {
  const featuredThemes = getFeaturedThemes();

  return (
    <>
      {/* Hero Section */}
      <PageHero
        title="Dine → Travel → Curate → Repeat."
        subtitle="Joe travels the world, curates what he finds, and turns it into intimate private dining and unforgettable journeys for the people he calls Guests and Members."
        size="large"
        backgroundGif="/images/hero/hero-animation.gif"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <Button href="/private-dining" variant="primary" size="lg">
            Request a Private Dining Experience
          </Button>
          <Button href="/members" variant="outline" size="lg">
            BECOME A MEMBER
          </Button>
        </div>
      </PageHero>

      {/* Mission Section */}
      <Section background="primary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-8"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Joe&apos;s Mission
          </h2>
          <p className="text-xl sm:text-2xl text-white/90 mb-4 leading-relaxed">
            To bring the world to your table.
          </p>
          <p className="text-lg sm:text-xl text-white/80 leading-relaxed">
            To elevate life and human connections through unforgettable shared experiences with food, wine and world wandering.
          </p>
        </div>
      </Section>

      {/* The JoePlates Cycle */}
      <Section background="dark" className="!py-0">
        <CycleVersion10 />
      </Section>

      {/* Guests vs Members */}
      <Section background="secondary">
        <SectionHeading
          title="Ways to Experience JoePlates"
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
          {/* Guests Card */}
          <div 
            className="section-card p-8 transition-all duration-300 hover:scale-[1.02] cursor-pointer flex flex-col" 
            style={{ 
              background: 'var(--theme-bg-primary)', 
              borderRadius: 'var(--theme-corner-radius)', 
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
              e.currentTarget.style.boxShadow = '0 8px 40px rgba(0, 0, 0, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
            }}
          >
            <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-6">
              <Image
                src="/images/people/private-dining-group.jpeg"
                alt="Private dining experience"
                fill
                className="object-cover"
              />
            </div>
            <h3 
              className="text-2xl font-semibold text-white mb-4"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Guests
            </h3>
            <p className="text-white/70 mb-6 leading-relaxed flex-grow">
              Guests are always welcome. If you&apos;re planning a celebration or simply want to gather your favorite people around an unforgettable dinner, you can request a private dining date and Joe will help you make it happen. A week&apos;s notice is ideal for special orders and hard-to-find items, but if the calendar lines up, he has a way of pulling off magic on short notice.
            </p>
            <div className="mt-auto">
              <Button href="/private-dining" variant="primary">
                Inquire About a Private Dinner
              </Button>
            </div>
          </div>

          {/* Members Card */}
          <div 
            className="section-card p-8 transition-all duration-300 hover:scale-[1.02] cursor-pointer flex flex-col" 
            style={{ 
              background: 'color-mix(in srgb, var(--theme-accent) 10%, transparent)', 
              borderRadius: 'var(--theme-corner-radius)', 
              border: '1px solid color-mix(in srgb, var(--theme-accent) 30%, transparent)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'color-mix(in srgb, var(--theme-accent) 70%, transparent)';
              e.currentTarget.style.background = 'color-mix(in srgb, var(--theme-accent) 18%, transparent)';
              e.currentTarget.style.boxShadow = '0 8px 40px color-mix(in srgb, var(--theme-accent) 40%, rgba(0, 0, 0, 0.5))';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'color-mix(in srgb, var(--theme-accent) 30%, transparent)';
              e.currentTarget.style.background = 'color-mix(in srgb, var(--theme-accent) 10%, transparent)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
            }}
          >
            <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-6">
              <Image
                src="/images/people/bordeaux-group.jpg"
                alt="Members travel experience"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex items-center gap-2 mb-4">
              <h3 
                className="text-2xl font-semibold text-white"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Members
              </h3>
              <span
                className="px-2 py-0.5 text-xs font-semibold rounded"
                style={{
                  background: 'var(--badge-solid-bg, var(--theme-accent))',
                  color: 'var(--badge-solid-fg, white)',
                }}
              >
                PRIORITY SCHEDULING
              </span>
            </div>
            <div className="flex-grow">
              <p className="text-white/70 mb-6 leading-relaxed">
                For people who entertain, collect, and travel often, there&apos;s a deeper level: <strong className="text-white">Members Only</strong>. Members get priority access to Joe&apos;s calendar, first right of refusal on limited-seat trips, and a front-row seat to the Dine → Travel → Curate → Repeat cycle all year.
              </p>
              <p className="text-white/60 text-sm mb-6">
                Membership is capped and selective, but not impossible—think more &quot;private airport lounge&quot; than velvet rope. Referrals from existing Members go to the top of the list.
              </p>
            </div>
            <div className="mt-auto">
              <Button href="/members" variant="outline">
                Request Membership Info
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Three Pillars */}
      <Section background="primary">
        <SectionHeading
          eyebrow="Private Dining • Travel • Collection & Curation"
          title="Explore the Three Pillars"
          subtitle="Every JoePlates experience lives at the intersection of three pillars. Most of the time, you'll touch all three—even if you only see one."
        />
        <PillarsGrid />
      </Section>

      {/* Signature Dining Themes */}
      <Section background="dark">
        <SectionHeading
          title="Signature Dining Themes"
          subtitle="Each dinner is custom, but these themes give you a taste of what's possible. Every menu is adapted to your tastes, dietary needs, and the stories you want to tell that night."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {featuredThemes.map((theme) => (
            <Card
              key={theme.slug}
              title={theme.name}
              description={theme.shortDescription}
              image={themeImages[theme.slug] || '/images/food/dish-1.jpg'}
            />
          ))}
        </div>
        <div className="text-center mt-10">
          <Button href="/private-dining#themes" variant="ghost">
            See More Dining Themes →
          </Button>
        </div>
      </Section>

      {/* Testimonials */}
      <Section background="primary">
        <SectionHeading
          title="A Word from Guests & Members"
          subtitle="These are real people whose lives Joe has cooked, poured, and wandered alongside."
        />
        <TestimonialCarousel />
      </Section>

      {/* Request a Date CTA */}
      <Section background="secondary" id="request">
        <div className="max-w-2xl mx-auto text-center">
          <SectionHeading
            title="Request a Date"
            subtitle="Ready to start with dinner? Tell us a bit about what you're dreaming up and we'll follow up quickly with availability and next steps."
          />
          <p className="text-white/60 mb-8">
            A week&apos;s notice gives us room for special sourcing, but feel free to reach out even if it&apos;s sooner—we&apos;ll let you know what&apos;s possible.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/private-dining" variant="primary" size="lg">
              Request a Discovery Call
            </Button>
            <Button href="/contact" variant="ghost" size="lg">
              Contact Us
            </Button>
          </div>
        </div>
      </Section>

      {/* About Teaser */}
      <Section background="dark">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeading
              title="About JoePlates"
              centered={false}
            />
            <p className="text-white/70 mb-6 leading-relaxed">
              &quot;Joe has lived at least nine lives: touring musician, tech founder, mentor to entrepreneurs, and, through it all, the guy cooking for everyone after hours. Today, JoePlates is where all of that comes together—a high-touch service for people who want more than just a restaurant, a trip, or a bottle.&quot;
            </p>
            <p className="mb-6" style={{ color: 'var(--theme-accent)', fontWeight: 500 }}>
              10% of all revenue goes to organizations providing food and shelter, because a life built around good meals only makes sense if everyone has a seat at the table.
            </p>
            <div className="flex gap-4">
              <Button href="/about" variant="primary">
                Read Joe&apos;s Story
              </Button>
              <Button href="/about#giving" variant="ghost">
                Our Giving
              </Button>
            </div>
          </div>
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden" style={{ borderRadius: 'var(--theme-corner-radius)' }}>
            <Image
              src="/images/people/joe-cooking.jpg"
              alt="Joe cooking"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </Section>
    </>
  );
}
