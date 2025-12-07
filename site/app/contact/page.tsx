import { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { Section } from '@/components/Section';
import { SectionHeading } from '@/components/SectionHeading';
import { contactInfo } from '@/data/navigation';

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

          {/* Contact Form Placeholder */}
          <div className="bg-[var(--color-secondary-navy)] rounded-[var(--theme-corner-radius)] p-8">
            <h3 className="text-xl font-semibold text-white mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
              Send a Note
            </h3>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-white/70 text-sm mb-2">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 bg-[var(--color-primary-navy)] border border-white/20 rounded-[var(--theme-corner-radius)] text-white placeholder:text-white/40 focus:border-[var(--color-accent-gold)] focus:outline-none transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-white/70 text-sm mb-2">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 bg-[var(--color-primary-navy)] border border-white/20 rounded-[var(--theme-corner-radius)] text-white placeholder:text-white/40 focus:border-[var(--color-accent-gold)] focus:outline-none transition-colors"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-white/70 text-sm mb-2">Phone (optional)</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-4 py-3 bg-[var(--color-primary-navy)] border border-white/20 rounded-[var(--theme-corner-radius)] text-white placeholder:text-white/40 focus:border-[var(--color-accent-gold)] focus:outline-none transition-colors"
                  placeholder="(555) 123-4567"
                />
              </div>
              <div>
                <label htmlFor="topic" className="block text-white/70 text-sm mb-2">What are you reaching out about? *</label>
                <select
                  id="topic"
                  name="topic"
                  required
                  className="w-full px-4 py-3 bg-[var(--color-primary-navy)] border border-white/20 rounded-[var(--theme-corner-radius)] text-white focus:border-[var(--color-accent-gold)] focus:outline-none transition-colors"
                >
                  <option value="">Select a topic</option>
                  <option value="private-dining">Private Dining</option>
                  <option value="curation">Collection & Curation</option>
                  <option value="travel">Travel</option>
                  <option value="membership">Membership</option>
                  <option value="other">Something else</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-white/70 text-sm mb-2">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-[var(--color-primary-navy)] border border-white/20 rounded-[var(--theme-corner-radius)] text-white placeholder:text-white/40 focus:border-[var(--color-accent-gold)] focus:outline-none transition-colors resize-none"
                  placeholder="Tell Joe what you're dreaming up..."
                />
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-[var(--color-accent-gold)] text-white font-semibold rounded-[var(--theme-corner-radius)] hover:bg-[var(--color-accent-gold)]/90 transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-gold)]/50 focus:ring-offset-2 focus:ring-offset-[var(--color-secondary-navy)]"
              >
                Send Message
              </button>
              <p className="text-white/40 text-xs text-center">
                We&apos;ll get back to you within 24-48 hours.
              </p>
            </form>
          </div>
        </div>
      </Section>
    </>
  );
}



