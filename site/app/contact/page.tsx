import { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { Section } from '@/components/Section';
import { SectionHeading } from '@/components/SectionHeading';
import { contactInfo } from '@/data/navigation';
import { ContactForm } from '@/components/forms/ContactForm';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with JoePlates. Tell Joe what you\'re dreaming up, and we\'ll see where it can go.',
};

export default function ContactPage(): React.ReactElement {
  return (
    <>
      <PageHero
        title="Let's Talk"
        subtitle="Tell Joe what you're dreaming up, and we'll see where it can go."
        size="default"
      />

      <Section background="dark">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <SectionHeading
              title="Get in Touch"
              centered={false}
            />
            <p className="text-white/70 mb-8 leading-relaxed">
              Have a date in mind, a destination on your radar, or a cellar question you&apos;d love a straight answer to? We&apos;re happy to help, even if you&apos;re just in the &quot;thinking about it&quot; stage.
            </p>
            <p className="text-white/60 mb-8">
              We respond quickly and personally—no bots, no ticket numbers.
            </p>

            <div className="space-y-6">
              <div>
                <h4 className="text-[var(--color-accent-gold)] font-semibold mb-2">Location</h4>
                <p className="text-white">{contactInfo.location}</p>
                <p className="text-white/60">{contactInfo.availability}</p>
              </div>
              <div>
                <h4 className="text-[var(--color-accent-gold)] font-semibold mb-2">Email</h4>
                <a 
                  href={`mailto:${contactInfo.email}`} 
                  className="text-white hover:text-[var(--color-accent-gold)] transition-colors"
                >
                  {contactInfo.email}
                </a>
              </div>
              <div>
                <h4 className="text-[var(--color-accent-gold)] font-semibold mb-2">Phone</h4>
                <a 
                  href={`tel:${contactInfo.phone.replace(/[^0-9+]/g, '')}`}
                  className="text-white hover:text-[var(--color-accent-gold)] transition-colors"
                >
                  {contactInfo.phone}
                </a>
              </div>
              <div>
                <h4 className="text-[var(--color-accent-gold)] font-semibold mb-2">Social</h4>
                <a 
                  href={contactInfo.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white hover:text-[var(--color-accent-gold)] transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  Follow on Instagram
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <ContactForm />
        </div>
      </Section>
    </>
  );
}







