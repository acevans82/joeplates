export type RegionType = 'wine' | 'spirits' | 'mixed';

export type RegionIconKey =
  | 'trees'
  | 'wine-glass'
  | 'city'
  | 'palm'
  | 'bourbon'
  | 'eiffel'
  | 'bridge'
  | 'mountains'
  | 'castle';

export interface TravelRegion {
  slug: string;
  name: string;
  shortDescription: string;
  type: RegionType;
  icon: RegionIconKey;
}

export const domesticRegions: TravelRegion[] = [
  {
    slug: 'oregon',
    name: 'Oregon',
    shortDescription: 'Willamette Valley Pinot, coastal markets, and misty vineyard mornings',
    type: 'wine',
    icon: 'trees',
  },
  {
    slug: 'washington',
    name: 'Washington',
    shortDescription: 'Walla Walla reds, Columbia Gorge views, and oyster shacks on the Sound',
    type: 'wine',
    icon: 'mountains',
  },
  {
    slug: 'napa',
    name: 'Napa',
    shortDescription: 'Iconic Cabernet, cellar tastings, and long lunches that run into dinner',
    type: 'wine',
    icon: 'wine-glass',
  },
  {
    slug: 'sonoma',
    name: 'Sonoma',
    shortDescription: 'Russian River Pinot, farmstand produce, and slower, countryside nights',
    type: 'wine',
    icon: 'wine-glass',
  },
  {
    slug: 'new-york-city',
    name: 'New York City',
    shortDescription: 'Restaurants, rooftop moments, and big city energy',
    type: 'mixed',
    icon: 'city',
  },
  {
    slug: 'miami',
    name: 'Miami',
    shortDescription: 'Latin and Caribbean flavors, cocktails, and late nights',
    type: 'mixed',
    icon: 'palm',
  },
  {
    slug: 'kentucky-bourbon-trail',
    name: 'Kentucky Bourbon Trail',
    shortDescription: 'Barrels, tastings, and stories straight from the source',
    type: 'spirits',
    icon: 'bourbon',
  },
];

export const internationalRegions: TravelRegion[] = [
  {
    slug: 'france',
    name: 'France',
    shortDescription: 'Champagne, Bordeaux, Burgundy, and beyond',
    type: 'wine',
    icon: 'eiffel',
  },
  {
    slug: 'portugal',
    name: 'Portugal',
    shortDescription: 'Porto, Douro, Lisbon, Algarve, surf towns and seafood',
    type: 'wine',
    icon: 'bridge',
  },
  {
    slug: 'spain',
    name: 'Spain',
    shortDescription: 'Seville, Barcelona, San Sebastián, tapas and pintxos',
    type: 'mixed',
    icon: 'city',
  },
  {
    slug: 'italy',
    name: 'Italy',
    shortDescription: 'From coastal villages to classic cities',
    type: 'wine',
    icon: 'wine-glass',
  },
  {
    slug: 'germany-austria',
    name: 'Germany & Austria',
    shortDescription: 'Rivers, Riesling, and winter markets',
    type: 'wine',
    icon: 'mountains',
  },
  {
    slug: 'england-scotland',
    name: 'England & Scotland',
    shortDescription: 'London energy, Highland distilleries, island coastlines, and fireplace drams',
    type: 'spirits',
    icon: 'castle',
  },
  {
    slug: 'mexico',
    name: 'Mexico',
    shortDescription: 'Agave fields, small-batch tequila, birria, and coastal ceviche',
    type: 'spirits',
    icon: 'city',
  },
];

export const allRegions: TravelRegion[] = [...domesticRegions, ...internationalRegions];

export function getRegionBySlug(slug: string): TravelRegion | undefined {
  return allRegions.find(r => r.slug === slug);
}


