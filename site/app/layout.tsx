import type { Metadata } from 'next';
import { Libre_Baskerville, DM_Sans, Outfit, Inter, Lora, Work_Sans, Playfair_Display, Source_Sans_3, EB_Garamond, Nunito_Sans, Cormorant_Garamond, Fira_Sans } from 'next/font/google';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { MusicPlayerProvider } from '@/contexts/MusicPlayerContext';
import './globals.css';

// Theme fonts
const libreBaskerville = Libre_Baskerville({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-libre-baskerville',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
});

const workSans = Work_Sans({
  subsets: ['latin'],
  variable: '--font-work-sans',
  display: 'swap',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
  display: 'swap',
});

const sourceSans3 = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-source-sans-3',
  display: 'swap',
});

const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  variable: '--font-eb-garamond',
  display: 'swap',
});

const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  variable: '--font-nunito-sans',
  display: 'swap',
});

const cormorantGaramond = Cormorant_Garamond({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-cormorant-garamond',
  display: 'swap',
});

const firaSans = Fira_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-fira-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'JoePlates | Private Dining, Wine Curation & Bespoke Travel',
    template: '%s | JoePlates',
  },
  description: 'Joe brings the world to your table. Private dining, wine & spirits curation, and bespoke travel experiences for people who entertain, collect, and travel often.',
  keywords: ['private chef', 'private dining', 'wine curation', 'bespoke travel', 'Cleveland chef', 'luxury dining', 'wine experiences'],
  authors: [{ name: 'JoePlates' }],
  creator: 'JoePlates',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://joeplates.com',
    siteName: 'JoePlates',
    title: 'JoePlates | Private Dining, Wine Curation & Bespoke Travel',
    description: 'Joe brings the world to your table. Private dining, wine & spirits curation, and bespoke travel experiences.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JoePlates | Private Dining, Wine Curation & Bespoke Travel',
    description: 'Joe brings the world to your table.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const fontVariables = [
  libreBaskerville.variable,
  dmSans.variable,
  outfit.variable,
  inter.variable,
  lora.variable,
  workSans.variable,
  playfairDisplay.variable,
  sourceSans3.variable,
  ebGaramond.variable,
  nunitoSans.variable,
  cormorantGaramond.variable,
  firaSans.variable,
].join(' ');

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement {
  return (
    <html lang="en" data-theme="classic-estate" suppressHydrationWarning>
      <body className={`${fontVariables} antialiased`}>
        <ThemeProvider>
          <MusicPlayerProvider>
            <Header />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
            <ThemeSwitcher />
          </MusicPlayerProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
