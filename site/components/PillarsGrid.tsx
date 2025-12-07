'use client';

import { Card } from './Card';

const pillars = [
  {
    title: 'Private Dining',
    description: 'Joe designs multi-course menus inspired by his travels and cooks them wherever you are—your home, your office, a rented villa, a cabin in the woods.',
    href: '/private-dining',
    image: '/images/food/glazed-meatballs.jpg',
  },
  {
    title: 'Travel',
    description: 'Joe doesn\'t just travel for himself. He travels for you. Join him on a leg of his itinerary, or bring him along as your chef and guide to your dream destination.',
    href: '/travel',
    image: '/images/travel/seville-cathedral.jpg',
  },
  {
    title: 'Collection & Curation',
    description: 'Whether you\'re just getting into wine or your cellar is older than your kids, Joe helps you find, define, or refine your tastes through real travel and relationships.',
    href: '/collection-curation',
    image: '/images/wine/pontet-canet-vertical.jpg',
  },
];

export function PillarsGrid(): React.ReactElement {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-12">
      {pillars.map((pillar, index) => (
        <Card
          key={pillar.title}
          title={pillar.title}
          description={pillar.description}
          href={pillar.href}
          image={pillar.image}
          variant="featured"
          className={`animate-slide-up stagger-${index + 1}`}
        />
      ))}
    </div>
  );
}
