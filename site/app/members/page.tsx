import { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { Section } from '@/components/Section';
import { SectionHeading } from '@/components/SectionHeading';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { CycleVersion10 } from '@/components/cycle-concepts';
import { TestimonialCarousel } from '@/components/TestimonialCarousel';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Members Only',
  description: 'For people who entertain, collect, and travel often. Priority access to Joe\'s calendar, first right of refusal on trips, and inside track on curation.',
};

const memberBenefits = [
  {
    title: "Priority Access to Joe's Calendar",
    description: 'First pick of prime dates and seasons for private dinners. Easier access to short-notice evenings when they pop up.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: "First Right of Refusal on Joe's Travels",
    description: 'Early invitations to limited-seat hosted trips. Access to Members-only meals and tastings on those journeys.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Inside Track on Curation & Surprises',
    description: "Early access to special allocations and small-production bottles. Joe's eye out for special items during his travels.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a4 4 0 00-4-4H6m6 6h4a4 4 0 014 4v0a4 4 0 01-4 4h-4m0-8h4" />
      </svg>
    ),
  },
];

const memberExperiences = [
  { src: '/images/dining/dinner-group-modern.jpeg', alt: 'Private dinner experience' },
  { src: '/images/travel/joe-scotland-castle.jpg', alt: 'Travel adventure' },
  { src: '/images/members/wine-tasting-group.jpeg', alt: 'Wine tasting gathering' },
  { src: '/images/dining/kitchen-group.jpeg', alt: 'Kitchen gathering' },
];

export default function MembersPage(): React.ReactElement {
  return (
    <>
      <PageHero
        title="Members Only"
        eyebrow="For people who entertain, collect, and travel often"
        subtitle="The Members Only circle is for the people Joe sees most often—the ones who like to gather their favorite people, host big nights, and say yes to trips that deserve a bottle (or three)."
        size="large"
        backgroundImage="/images/dining/dinner-group-modern.jpeg"
      >
        <Button href="#apply" variant="primary" size="lg">
          Request Membership Info
        </Button>
      </PageHero>

      {/* What It's About */}
      <Section background="dark">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-xl">
            <p className="text-xl text-white/80 leading-relaxed mb-6">
              Membership isn&apos;t about status. It&apos;s about <strong className="text-[var(--color-accent-gold)]">priority</strong>: access to Joe&apos;s calendar, his suitcase, and the best seats at the table when the next journey appears.
            </p>
            <p className="text-white/60">
              Members are the bedrock of JoePlates—the people whose tables Joe returns to again and again, whose cellars grow alongside his discoveries, and whose stories become part of the larger JoePlates narrative.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {memberExperiences.map((exp, index) => (
              <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                <Image src={exp.src} alt={exp.alt} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Benefits */}
      <Section background="primary">
        <SectionHeading
          title="What Members Receive"
          subtitle="Every membership is built around three promises."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {memberBenefits.map((benefit) => (
            <Card
              key={benefit.title}
              title={benefit.title}
              description={benefit.description}
              icon={benefit.icon}
              variant="featured"
            />
          ))}
        </div>
        <p className="text-center mt-8 text-white/60 max-w-2xl mx-auto">
          Thoughtfulness doesn&apos;t scale, and Joe wouldn&apos;t want it to. Surprises aren&apos;t transactional line items—they&apos;re how he says thank you to the Members who are the bedrock of JoePlates.
        </p>
      </Section>

      {/* Year in the Life */}
      <Section background="secondary" className="!py-0">
        <CycleVersion10 />
        <div className="py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {[
            'Joe travels and curates',
            'You get first look at trips',
            'Cellars get tuned up',
            'Stories keep piling up',
          ].map((item, index) => (
            <div key={item} className="text-center p-4">
              <div className="w-8 h-8 rounded-full bg-[var(--theme-accent)] flex items-center justify-center text-white font-bold mx-auto mb-3">
                {index + 1}
              </div>
              <p className="text-white/80 text-sm">{item}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Member Moments Gallery */}
      <Section background="dark">
        <SectionHeading
          title="Member Moments"
          subtitle="Real experiences from the JoePlates community."
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="relative aspect-[3/4] rounded-lg overflow-hidden md:col-span-2 md:row-span-2">
            <Image src="/images/dining/dinner-group-modern.jpeg" alt="Private dinner" fill className="object-cover" />
          </div>
          <div className="relative aspect-square rounded-lg overflow-hidden">
            <Image src="/images/travel/porto-cityscape.jpg" alt="Porto travel" fill className="object-cover" />
          </div>
          <div className="relative aspect-square rounded-lg overflow-hidden">
            <Image src="/images/dining/filet-mignon.jpg" alt="Fine dining" fill className="object-cover" />
          </div>
          <div className="relative aspect-square rounded-lg overflow-hidden">
            <Image src="/images/members/wine-tasting-group.jpeg" alt="Wine tasting" fill className="object-cover" />
          </div>
          <div className="relative aspect-square rounded-lg overflow-hidden">
            <Image src="/images/travel/joe-scotland-castle.jpg" alt="Scotland adventure" fill className="object-cover" />
          </div>
        </div>
      </Section>

      {/* Testimonials */}
      <Section background="primary">
        <SectionHeading
          title="From the People at the Table"
        />
        <TestimonialCarousel filterTag="member" />
      </Section>

      {/* How It Works */}
      <Section background="secondary">
        <SectionHeading
          title="How Membership Works"
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="bg-[var(--color-secondary-navy)] rounded-[var(--theme-corner-radius)] p-6">
              <h4 className="text-white font-semibold mb-2">Capped & Curated</h4>
              <p className="text-white/70 text-sm">
                Membership is capped and selective, but not impossible—think more &quot;private airport lounge&quot; than velvet rope.
              </p>
            </div>
            <div className="bg-[var(--color-secondary-navy)] rounded-[var(--theme-corner-radius)] p-6">
              <h4 className="text-white font-semibold mb-2">Referrals Welcome</h4>
              <p className="text-white/70 text-sm">
                Referrals from existing Members go to the top of the list. If you know someone who&apos;s a Member, mention them.
              </p>
            </div>
            <div className="bg-[var(--color-secondary-navy)] rounded-[var(--theme-corner-radius)] p-6">
              <h4 className="text-white font-semibold mb-2">Commitment Levels</h4>
              <p className="text-white/70 text-sm">
                Some start with two anchor dinners per year, others with ten. We&apos;ll talk through what makes sense for you.
              </p>
            </div>
          </div>
          <div className="relative aspect-[4/5] rounded-[var(--theme-corner-radius)] overflow-hidden">
            <Image 
              src="/images/about/joe-with-guests.jpeg" 
              alt="Joe with members" 
              fill 
              className="object-cover" 
            />
          </div>
        </div>
      </Section>

      {/* Apply */}
      <Section background="dark" id="apply">
        <div className="max-w-2xl mx-auto text-center">
          <SectionHeading
            title="Interested in Becoming a Member?"
            subtitle="Share a bit about how you'd like to use JoePlates and we'll follow up to see if there's a fit."
          />
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/contact" variant="primary" size="lg">
              Request Membership Info
            </Button>
            <Button href="/private-dining" variant="ghost" size="lg">
              Start with a Dinner
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
