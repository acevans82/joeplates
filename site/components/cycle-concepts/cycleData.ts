// Shared data for all cycle concepts
// Order: Dine → Travel → Curate → Repeat

export interface CycleStep {
  id: string;
  number: number;
  label: string;
  shortLabel: string;
  description: string;
  story: string;
  image: string;
  icon: string;
  guestNote?: string;
  memberNote?: string;
}

export const cycleSteps: CycleStep[] = [
  {
    id: 'dining',
    number: 1,
    label: 'Private Dining',
    shortLabel: 'Dine',
    description: 'Multi-course menus, tailored pairings, and the people you care about around your table.',
    story: 'The "first date" encounter. A dinner becomes a memory, a memory becomes tradition.',
    image: '/images/dining/dinner-group-modern.jpeg',
    icon: 'dining',
    guestNote: 'Your first night at the table',
    memberNote: 'Priority calendar access & custom menus',
  },
  {
    id: 'travel',
    number: 2,
    label: 'Travel',
    shortLabel: 'Travel',
    description: 'Vineyards, markets, distilleries, and late-night kitchens that feed the next chapter.',
    story: 'Every year, Joe ventures to Bordeaux, Andalusia, or wherever the next story lives. Sometimes alone, sometimes with Members.',
    image: '/images/travel/IMG_2974.JPG',
    icon: 'travel',
    guestNote: 'Inspiration for your next dinner',
    memberNote: 'First right of refusal on limited trips',
  },
  {
    id: 'curation',
    number: 3,
    label: 'Collection & Curation',
    shortLabel: 'Curate',
    description: 'Rare bottles and carefully chosen treasures that live with you long after the night ends.',
    story: 'From those travels, treasures return. Rare finds that land in your cellar or on your table next season.',
    image: '/images/wine/joe-bergstrom-magnum.jpg',
    icon: 'curation',
    guestNote: 'Access to special allocations',
    memberNote: 'Personal cellar building & rare finds',
  },
  {
    id: 'repeat',
    number: 4,
    label: 'Repeat',
    shortLabel: 'Repeat',
    description: 'The calendar fills, your collection grows, and the stories keep getting better.',
    story: 'The rhythm continues. Guests become regulars, Regulars become Members. The circle grows and the table gets set again.',
    image: '/images/people/wine-bar-group.jpg',
    icon: 'repeat',
    guestNote: 'Return for the next season',
    memberNote: 'Year-round access to the full cycle',
  },
];

export const cycleTagline = "Dine → Travel → Curate → Repeat";

export const cycleSummary = "Most people first meet Joe at the table. From that table, a rhythm starts. Joe travels, discovers new bottles and ideas, curates them into your cellar or onto your table, and the seasons keep turning.";

export const yearInLifeData = {
  spring: {
    season: 'Spring',
    dining: 'First dinner of the season—fresh produce, new wines from last harvest',
    travel: 'Bordeaux en primeur tastings',
    curation: 'Spring allocations from châteaux',
    repeat: 'Members receive the spring calendar',
  },
  summer: {
    season: 'Summer',
    dining: 'Al fresco dinners, seafood, rosé pairings',
    travel: 'Mediterranean markets—Spain, Portugal, Southern France',
    curation: 'Summer wine club selections',
    repeat: 'Guest waitlist opens for fall',
  },
  fall: {
    season: 'Fall',
    dining: 'Harvest menus—mushrooms, game, aged wines',
    travel: 'Champagne harvest, Burgundy visits',
    curation: 'Vintage reports, cellar recommendations',
    repeat: 'Holiday dinner bookings begin',
  },
  winter: {
    season: 'Winter',
    dining: 'Intimate gatherings, big reds, celebration menus',
    travel: "Planning next year's adventures",
    curation: 'Year-end cellar reviews',
    repeat: 'Membership renewals, new invitations',
  },
};

export interface TravelDestination {
  location: string;
  blurb: string;
}

export interface MonthlyCalendar {
  month: string;
  shortMonth: string;
  destinations: TravelDestination[];
  isRest?: boolean;
}

export const travelCalendar: MonthlyCalendar[] = [
  {
    month: 'January',
    shortMonth: 'JAN',
    destinations: [
      {
        location: 'Sicily & Florence',
        blurb: 'Blood oranges at their peak, fresh ricotta in the morning markets, and Super Tuscans by the fire.',
      },
      {
        location: 'Oregon',
        blurb: 'Winter Pinot releases, Dungeness crab season, and cozy winery dinners in the Willamette Valley.',
      },
    ],
  },
  {
    month: 'February',
    shortMonth: 'FEB',
    destinations: [
      {
        location: 'Fasting February',
        blurb: 'A month to reset, reflect, and prep the palate for the year ahead. The kitchen rests.',
      },
    ],
    isRest: true,
  },
  {
    month: 'March',
    shortMonth: 'MAR',
    destinations: [
      {
        location: 'Jalisco, Mexico',
        blurb: 'Agave fields at sunrise, small-batch tequila tastings, and birria that makes you weep.',
      },
      {
        location: 'Puerto Vallarta',
        blurb: 'Ceviche by the water, fresh-caught mahi-mahi, and mezcal sunsets on the Malecón.',
      },
    ],
  },
  {
    month: 'April',
    shortMonth: 'APR',
    destinations: [
      {
        location: 'Oregon',
        blurb: 'Spring releases, morel mushroom foraging, and lamb season at its finest.',
      },
      {
        location: 'Minnesota',
        blurb: 'Walleye opening weekend, ramps emerging, and hometown comfort done right.',
      },
    ],
  },
  {
    month: 'August',
    shortMonth: 'AUG',
    destinations: [
      {
        location: 'Bourbon, Kentucky',
        blurb: 'Barrel picks, rickhouse tastings, and hot chicken that\'ll make you understand the South.',
      },
      {
        location: 'Oregon',
        blurb: 'Harvest season begins, wild blackberries everywhere, and late-summer Pinot perfection.',
      },
    ],
  },
  {
    month: 'September',
    shortMonth: 'SEP',
    destinations: [
      {
        location: 'London & Scotland',
        blurb: 'Borough Market mornings, Highland distillery trails, and haggis that converts skeptics.',
      },
    ],
  },
  {
    month: 'October',
    shortMonth: 'OCT',
    destinations: [
      {
        location: 'Spain, Portugal & France',
        blurb: 'Ibérico in Andalucía, port in Porto, Bordeaux at crush—the grand European trifecta.',
      },
      {
        location: 'Oregon',
        blurb: 'Harvest wrap parties, chanterelle season, and the year\'s best new vintages.',
      },
    ],
  },
  {
    month: 'November',
    shortMonth: 'NOV',
    destinations: [
      {
        location: 'Minnesota',
        blurb: 'Wild rice season, duck hunting traditions, and the kind of Thanksgiving you remember.',
      },
    ],
  },
  {
    month: 'December',
    shortMonth: 'DEC',
    destinations: [
      {
        location: 'Caribbean (Maybe)',
        blurb: 'Jerk chicken on the beach, rum flights, and letting the year end somewhere warm.',
      },
    ],
  },
];

export const storybookChapters = [
  {
    chapter: 1,
    title: 'The First Night',
    subtitle: 'Private Dining',
    narrative: "It starts with an invitation—perhaps a birthday, an anniversary, or simply a desire to gather. Joe arrives, the kitchen comes alive, and by dessert, you're already asking about the next one.",
  },
  {
    chapter: 2,
    title: 'The Trip That Follows',
    subtitle: 'Travel',
    narrative: "Weeks later, Joe is in Andalusia, wandering through a morning market or tasting from a barrel in a bodega. These moments become next season's menus.",
  },
  {
    chapter: 3,
    title: 'The Bottles That Stay',
    subtitle: 'Collection & Curation',
    narrative: 'A case arrives at your door. Inside: bottles from that trip, stories attached to each label. Your cellar grows with meaning, not just inventory.',
  },
  {
    chapter: 4,
    title: 'The Next Season',
    subtitle: 'Repeat',
    narrative: 'The calendar turns. Your table is set again. The people change, the wine evolves, but the rhythm holds—Dine, Travel, Curate, Repeat.',
  },
];

