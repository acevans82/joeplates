export type DiningCategory = 'europe' | 'americas' | 'oceans-islands' | 'special-concepts';

export interface DiningTheme {
  slug: string;
  name: string;
  category: DiningCategory;
  shortDescription: string;
  longDescription?: string;
  image?: string;
  featured?: boolean;
}

export const diningCategories: { id: DiningCategory; name: string }[] = [
  { id: 'europe', name: 'Europe' },
  { id: 'americas', name: 'Americas' },
  { id: 'oceans-islands', name: 'Oceans & Islands' },
  { id: 'special-concepts', name: 'Special Concepts' },
];

export const diningThemes: DiningTheme[] = [
  // Europe
  {
    slug: 'a-night-in-seville',
    name: 'A Night in Seville',
    category: 'europe',
    shortDescription: 'Late-night tapas, bold flavors, and Spanish wines that feel like a stroll through Seville—without leaving your table.',
    longDescription: 'Spanish tapas and the small plate concept is my eternal rabbit hole and my favorite way to dine. The landscape of flavors and texture found in Spanish nightlife and in the tapas culture are endless and boundless. We\'ll start with some specially sourced Pata Negra Serrano Ham and Spanish Cod Croquetas and keep the flavors coming.',
    image: '/images/dining-themes/a-night-in-seville.jpeg',
    featured: true,
  },
  {
    slug: 'tour-de-france',
    name: 'Tour de France',
    category: 'europe',
    shortDescription: 'From Champagne to Bordeaux and beyond, a multi-course journey through France\'s favorite regions and producers.',
    longDescription: 'Getting lost in French cuisine is as fun as getting lost in France itself. From regional food and wine themes to an unrestrained and broad sampling from Bordeaux to Paris to the Alsace, French food and wine is a bottomless sea of history, flavor and depth.',
    image: '/images/dining-themes/tour-de-france.jpeg',
    featured: true,
  },
  {
    slug: 'lost-in-italy',
    name: 'Lost in Italy',
    category: 'europe',
    shortDescription: 'Coastal villages to classic cities—Italian cuisine that tells the story of each region.',
    longDescription: 'Likewise, Italy is a delightful abyss of food and wine micro-cultures. Across multiple courses, we will dive in recklessly but come out with a spectacular finish. Consider requesting wine pairings for this meal.',
    image: '/images/dining-themes/lost-in-italy.jpeg',
  },
  {
    slug: 'the-faces-of-champagne',
    name: 'The Faces of Champagne',
    category: 'europe',
    shortDescription: 'An entire dinner built around Champagne—from grower bottles to unexpected pairings you\'ll still talk about next year.',
    longDescription: 'It started as a fascination, now it\'s a full-blown obsession. Champagne isn\'t just a celebration drink to me; it\'s a way of seeing food through a more refined lens. Over the years, I\'ve come to admire its incredible versatility — the way a brut rosé can stand up to duck and lamb, or how a vintage blanc de blancs elevates a simple oyster or popcorn to something transcendent. Champagne brings energy, elegance, and unexpected harmony to the table. From caviar to fried chicken, I love how champagne can push the boundaries, and to build entire dinners around these magic bubbles. These aren\'t just meals — they\'re life events. And once you experience Champagne on its own terms, there\'s no going back.',
    image: '/images/dining-themes/the-faces-of-champagne.jpeg',
    featured: true,
  },
  {
    slug: 'the-highlander',
    name: 'The Highlander',
    category: 'europe',
    shortDescription: 'Wild, rugged flavors and Scotch pairings influenced by time in the Highlands and around the fire with locals.',
    longDescription: 'The Scottish Highlands are where I go when I need to feel small again, in the best way. It\'s all wind, mist, and magic. Yet tucked among those remote hills are inns and tables serving salmon pulled from nearby rivers, and oysters kissed by cold seas, and venison that tastes as pristine as the land itself. The wild feeds you, body and soul.',
    image: '/images/dining-themes/the-highlander.jpeg',
  },
  
  // Americas
  {
    slug: 'south-by-southwest',
    name: 'South by Southwest',
    category: 'americas',
    shortDescription: 'Bold Tex-Mex and Southwestern flavors with tequila, mezcal, and wines from unexpected places.',
    longDescription: 'Carolina to Texas, by way of Louisiana. A celebration of American Southern and Southwest cooking from Southern grits to swamp bits to tangy and tasty Texas barbecue.',
    image: '/images/dining-themes/south-by-southwest.jpeg',
  },
  {
    slug: 'new-york-new-york',
    name: 'New York, New York',
    category: 'americas',
    shortDescription: 'Big city energy on your plate—from steakhouse classics to downtown innovation.',
    longDescription: 'Viva Manhattan - Big City Decadence. A five course parade of exquisite courses and pairing that would rival any New York steakhouse.',
    image: '/images/dining-themes/new-york-new-york.jpeg',
  },
  {
    slug: 'the-maine-event',
    name: 'The Maine Event',
    category: 'americas',
    shortDescription: 'Coastal New England at its finest—lobster, oysters, and the freshest catch paired with crisp whites.',
    longDescription: 'A fun and elegant twist on a timeless New England lobster bake tradition.',
    image: '/images/dining-themes/the-maine-event.jpeg',
  },
  {
    slug: 'northwest-passage',
    name: 'Northwest Passage',
    category: 'americas',
    shortDescription: 'Pacific Northwest bounty—salmon, mushrooms, and cool-climate wines from Oregon and Washington.',
    longDescription: 'From world renowned Pinot Noirs and Chardonnays to coastal seafood treasures and coveted black and white truffles, the Pacific Northwest (Oregon/Washington) is a food and wine lover\'s paradise. It is also my second home in the U.S.',
    image: '/images/dining-themes/northwest-passage.jpeg',
  },
  
  // Oceans & Islands
  {
    slug: 'of-the-sea',
    name: 'Of the Sea',
    category: 'oceans-islands',
    shortDescription: 'A celebration of seafood from coasts around the world, paired with wines that complement every catch.',
    longDescription: 'Nine years afloat will change your sense of time — and taste. From king salmon pulled fresh from Alaskan waters to spiny lobsters grilled over beach fires in the Out Islands, the sea has fed me in ways no spit of land ever could. Dodging storms in Bermuda, watching the Atlantic turn indigo, filleting freshly speared grouper — these memories pulse through me everyday. My affection for the sea runs deep, not just for its flavors, but for its wildness, its generosity, its constant motion. A reminder that all things from the sea, even our own survival on stormy days, are a gift.',
    image: '/images/dining-themes/of-the-sea.jpeg',
  },
  {
    slug: 'island-heat',
    name: 'Island Heat',
    category: 'oceans-islands',
    shortDescription: 'Sun-soaked, rum-kissed menus inspired by Caribbean markets, beachside grills, and smoky late-night bars.',
    longDescription: 'I get quickly and blissfully lost here……….and I like it. I like it because of so much life history, so many fond memories of the island, and so many limitless options - and we can pick from any and all of it. From Puerto Rican pork to flying fish from barbados and timeless Cuban black beans and rice. So, we will just go nuts, and plan this together. At some point, something will arrive wrapped in a banana leaf the likelihood of rum and fruit is extremely high. Every time I do this theme, it\'s unbeivably fun, and never completely the same.',
    image: '/images/dining-themes/island-heat.jpeg',
    featured: true,
  },
  
  // Special Concepts
  {
    slug: 'papa-hemingway',
    name: 'Papa Hemingway',
    category: 'special-concepts',
    shortDescription: 'Havana meets Key West—bold flavors, strong drinks, and stories that last all night.',
    longDescription: 'Celebrate the favorite dishes of Ernest Hemingway from his celebrated work, A Moveable Feast and other famous Hemingway moments.',
    image: '/images/dining-themes/papa-hemingway.jpeg',
  },
  {
    slug: 'stew-on-it',
    name: 'Stew On It',
    category: 'special-concepts',
    shortDescription: 'Comfort food elevated—hearty stews and braises from around the world with perfect wine pairings.',
    longDescription: 'I love slow-cooked food, for so many reasons but starting with the fact that almost every global region has something to offer, Alsatian choucroute, 12 hr. short ribs, Cuban pork shoulder - almost everyone has their spin on the slow roast. It\'s intimate, comforting and can be dressed up and down from a side street pop-up food truck to a Michelin-starred experience. Pairing wines with these beautiful dishes is as much fun as preparing the food.',
    image: '/images/dining-themes/stew-on-it.jpeg',
  },
  {
    slug: 'speakeasy-secrets',
    name: 'Speakeasy Secrets',
    category: 'special-concepts',
    shortDescription: 'Prohibition-era cocktails and dishes that would make a 1920s speakeasy proud.',
    longDescription: 'The Prohibition period was full of decadent flavor and rich foods that would mask the smell of alcohol. Enjoy a vast spread of "heavy appetizers" (small bites that will comprise a full meal experience) - from deviled eggs to duck confit, rich flavors await you.',
    image: '/images/dining-themes/speakeasy-secrets.jpeg',
  },
  {
    slug: 'ode-to-mushrooms',
    name: 'Ode to Mushrooms',
    category: 'special-concepts',
    shortDescription: 'Earthy, umami-rich dishes celebrating mushrooms in every form—foraged, cultivated, and treasured.',
    longDescription: 'From the haunting perfume of truffle to the meaty heft of porcini and the honeycomb delicacy of morels, mushrooms carry the forest into the kitchen. They\'re shapeshifters, soaking in umami like sponges, yet also capable of holding their own as vessels for butter, smoke, wine, and stock. A roasted morel filled with cream and herbs, a seared porcini that tastes of both earth and branch . In mushrooms, one finds both memory and mystery. They are nature\'s own flavor architects.',
    image: '/images/dining-themes/ode-to-mushrooms.jpeg',
    featured: true,
  },
  {
    slug: 'vegetarian-vegan',
    name: 'Vegetarian / Vegan',
    category: 'special-concepts',
    shortDescription: 'Plant-forward menus that prove you don\'t need meat to create an unforgettable dining experience.',
    longDescription: 'Vegetarian and/or vegan options and full meal plans available.',
    image: '/images/dining-themes/vegetarian-vegan.jpeg',
  },
  {
    slug: 'cocktail-craft-spirits',
    name: 'Cocktail and Craft Spirit Themes',
    category: 'special-concepts',
    shortDescription: 'When the cocktail is the star—craft spirits, creative mixes, and dishes designed to complement.',
    longDescription: 'Want to build a menu around world class bourbon, scotch, tequila or your favorite craft beers. We love it. Just inquire.',
    image: '/images/dining-themes/cocktail-craft-spirits.jpeg',
  },
];

export function getThemesByCategory(category: DiningCategory): DiningTheme[] {
  return diningThemes.filter(t => t.category === category);
}

export function getFeaturedThemes(): DiningTheme[] {
  return diningThemes.filter(t => t.featured);
}

export function getThemeBySlug(slug: string): DiningTheme | undefined {
  return diningThemes.find(t => t.slug === slug);
}


