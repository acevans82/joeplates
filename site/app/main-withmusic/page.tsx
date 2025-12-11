'use client';

import { PageHero } from '@/components/PageHero';
import { Section } from '@/components/Section';
import { SectionHeading } from '@/components/SectionHeading';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { getFeaturedThemes } from '@/data/diningThemes';
import { useMusicPlayer } from '@/contexts/MusicPlayerContext';

const themeImages: Record<string, string> = {
  'a-night-in-seville': '/images/dining-themes/a-night-in-seville.jpeg',
  'tour-de-france': '/images/dining-themes/tour-de-france.jpeg',
  'the-faces-of-champagne': '/images/dining-themes/the-faces-of-champagne.jpeg',
  'island-heat': '/images/dining-themes/island-heat.jpeg',
  'ode-to-mushrooms': '/images/dining-themes/ode-to-mushrooms.jpeg',
};

export default function MainWithMusicPage(): React.ReactElement {
  const { isPlaying, currentTrack, playTrack } = useMusicPlayer();
  const featuredThemes = getFeaturedThemes();

  return (
    <>
      <PageHero
        title={
          <>
            <span className="block lg:inline-block lg:whitespace-nowrap">Dine</span>
            <span className="block lg:inline lg:whitespace-nowrap"> → </span>
            <span className="block lg:inline-block lg:whitespace-nowrap">Travel</span>
            <span className="block lg:inline lg:whitespace-nowrap"> → </span>
            <span className="block lg:inline-block lg:whitespace-nowrap">Curate</span>
            <span className="block"> ← Repeat.</span>
            <span className="block mt-2 font-light opacity-70">(With a soundtrack.)</span>
          </>
        }
        subtitle="Prototype view: a minimal music layer that lives in the nav and lets dining themes subtly switch the vibe when music is already playing."
        size="large"
        backgroundGif="/images/hero/hero-animation.gif"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <Button href="/" variant="outline" size="lg">
            Back to main homepage
          </Button>
          <Button href="/private-dining" variant="primary" size="lg">
            Request a Private Dining Experience
          </Button>
        </div>
      </PageHero>

      <Section background="primary">
        <div className="max-w-4xl mx-auto space-y-6">
          <SectionHeading
            title="How the music concept works"
            subtitle="This page is just for exploration. Nothing here changes the main JoePlates experience."
          />
          <ol className="list-decimal list-inside space-y-3 text-white/80 text-sm sm:text-base">
            <li>
              A tiny speaker icon appears in the top-right nav on this page only. Click it to start the JoePlates mix;
              it switches to a pause button when playing, then toggles between play/pause from there.
            </li>
            <li>
              Each dining theme card shows a small play icon next to the title when you hover over the card. Click the 
              play icon or anywhere on the card to start that theme&apos;s music (or switch to it if music is already playing).
            </li>
            <li>
              Nothing auto-plays. Guests have to choose to turn music on, and they can turn it off at any time.
            </li>
          </ol>
          <div className="mt-4 rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-xs sm:text-sm text-white/70">
            <p>
              <span className="font-semibold text-white">Current state:&nbsp;</span>
              {isPlaying && currentTrack
                ? `“${currentTrack.label}” is marked as playing. In a full build, this is where we would hook in actual audio.`
                : 'Music is off. Turn it on in the nav to see how the theme cards respond.'}
            </p>
          </div>
        </div>
      </Section>

      <Section background="dark">
        <SectionHeading
          title="Preview: dining themes that shift the soundtrack"
          subtitle="Hover over a card to reveal the play button next to the title. Click to start that theme's music."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {featuredThemes.map((theme) => (
            <Card
              key={theme.slug}
              title={theme.name}
              description={theme.shortDescription}
              image={themeImages[theme.slug] || theme.image || '/images/food/dish-1.jpg'}
              isGlobalMusicPlaying={isPlaying}
              isActiveTrack={currentTrack?.id === theme.slug}
              onHoverPlayIntent={(): void => {
                playTrack({ id: theme.slug, label: theme.name });
              }}
            />
          ))}
        </div>
      </Section>
    </>
  );
}


