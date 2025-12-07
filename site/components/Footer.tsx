import Link from 'next/link';
import { footerNavItems, contactInfo, brandStatement, givingStatement } from '@/data/navigation';

export function Footer(): React.ReactElement {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--color-bg-dark)] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <p className="text-white/70 mb-4 max-w-md leading-relaxed">
              {brandStatement}
            </p>
            <p className="text-[var(--color-accent-gold)] text-sm font-medium">
              {givingStatement}
            </p>
          </div>

          {/* Navigation Column */}
          <div>
            <h4 className="text-white font-semibold mb-4">Explore</h4>
            <nav className="space-y-2">
              {footerNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block text-white/60 hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <div>
                <p className="text-white/40 text-sm">Location</p>
                <p className="text-white/70">{contactInfo.location}</p>
                <p className="text-white/50 text-sm">{contactInfo.availability}</p>
              </div>
              <div>
                <p className="text-white/40 text-sm">Email</p>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-white/70 hover:text-[var(--color-accent-gold)] transition-colors"
                >
                  {contactInfo.email}
                </a>
              </div>
              <div>
                <p className="text-white/40 text-sm">Phone</p>
                <a
                  href={`tel:${contactInfo.phone.replace(/[^0-9+]/g, '')}`}
                  className="text-white/70 hover:text-[var(--color-accent-gold)] transition-colors"
                >
                  {contactInfo.phone}
                </a>
              </div>
              <div className="pt-2">
                <a
                  href={contactInfo.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span>Follow on Instagram</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © {currentYear} JoePlates, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-white/40">
            <Link href="/contact" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

