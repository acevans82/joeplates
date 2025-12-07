export interface Story {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  featured?: boolean;
  image?: string;
}

export const stories: Story[] = [
  {
    slug: 'the-barbaric-yawp-and-beginning',
    title: 'The Barbaric Yawp and Beginning',
    excerpt: 'There\'s a night in Bordeaux that Joe will never forget. Over Armagnac, a promise was made that would change everything.',
    date: '2024-01-15',
    featured: true,
    image: '/images/about/joe-bordeaux.jpg',
    content: `
There's a night in Bordeaux that Joe will never forget.

He was on a trip with his friend and client Dr. Dave, a man battling a brutal kind of cancer with an almost ridiculous amount of gratitude and appetite. Joe had been his private chef, friend, confidante, and adventure co-conspirator.

Over Armagnac, Dave looked at him and said: "Keep doing this. Doing this for people. Food, wine, all of this life concierge stuff. Look at what we've built—the people, the memories, the way we're celebrating being alive. Promise me you'll keep doing it."

Joe promised.

JoePlates is him keeping that promise—turning what started as a weekend hobby into an all-consuming passion: cooking, traveling, bringing people together, and giving more people nights that feel like that.

The name comes from what Dave would shout at the end of particularly memorable evenings, arms raised to the sky in gratitude and defiance: his "barbaric yawp" to the universe. A declaration that this life is meant to be lived fully, savored deeply, and shared generously.

Every JoePlates experience carries a piece of that night in Bordeaux. Every table set, every bottle opened, every journey planned is an echo of that promise between friends.
    `.trim(),
  },
  {
    slug: 'notes-from-champagne-harvest',
    title: 'Notes from Champagne Harvest',
    excerpt: 'Walking between the rows during vendange, watching the dance of tradition and precision that turns grapes into celebration.',
    date: '2024-03-22',
    featured: false,
    image: '/images/wine/pierre-peters-champagne.jpeg',
    content: `
The alarm goes off at 5 AM, but you're already awake. The cool morning air of Champagne carries something electric—harvest energy that's been building for months.

By the time the sun crests the hills, the pickers are already moving through the rows. These aren't industrial harvesters or seasonal temps rushed through training. These are families who've been doing this for generations, hands that know exactly when a cluster is ready to become something extraordinary.

I spent a week during vendange visiting three grower-producers I've come to know over years of visits. Each one has a philosophy, a signature, a way of coaxing magic from these chalky soils.

At Pierre Péters, Rodolphe walked me through the same parcels his grandfather tended. The Chétillons vineyard, source of one of the most profound Champagnes I've ever tasted. Standing there, watching the careful selection of each cluster, you understand why these bottles are worth seeking out.

The days blur together: morning pickings, afternoon pressings, evening tastings of base wines that won't become drinkable Champagne for years. Lunches are long and wine-soaked, conversations spanning generations of technique and terroir.

What strikes me most is the patience. Everyone here is working on a timeline measured in years, sometimes decades. The grapes picked this morning won't be ready to drink until long after the picker's grandchildren are born.

There's a lesson in that patience. The best things—wines, meals, relationships—can't be rushed. They require care, attention, and the wisdom to know that some things are worth waiting for.

I brought back three cases of grower Champagne, each bottle a piece of that week. When I open them at dinners, I share these stories. The wine always tastes better when you know the hands that made it.
    `.trim(),
  },
  {
    slug: 'what-i-bring-back-in-my-suitcase',
    title: 'What I Bring Back in My Suitcase',
    excerpt: 'It\'s never just bottles. Every trip home includes pieces of place, taste, and story that become the next chapter of JoePlates.',
    date: '2024-05-10',
    featured: false,
    image: '/images/travel/spain-market.jpeg',
    content: `
People always ask what I bring back from trips. They expect me to say wine, and yes, there's always wine. But the suitcase holds more than bottles.

From Portugal, there's always salt. Not just any salt—flor de sal from the Algarve, hand-harvested crystals that dissolve on the tongue like a memory of the ocean. I use it to finish dishes, and guests always notice. "What is that?" they ask. It's a story, I tell them. It's a guy named João who's been working the same salt flats his family has tended for four generations.

From Spain, olive oil. The good stuff, the kind that makes you wonder what you've been putting on salads your whole life. It arrives wrapped in clothes to survive the journey, and I dole it out like liquid gold because that's exactly what it is.

From Scotland, there's usually a bottle or two of whisky you can't find anywhere else—single casks, distillery exclusives, the kind of bottles that require showing up in person and knowing someone who knows someone. But there's also shortbread from a tiny bakery in Edinburgh that makes everything else taste like cardboard.

The strangest cargo? Probably the massive wheel of cheese I once transported from a mountain cave in the Pyrenees. Or the hand-thrown ceramics from a village in Portugal that now serve every dinner I cook. Or the copper pan from a market in Seville that's become my go-to for paella.

Each object is a portal. When I pull out that salt, I'm back on the coast watching João work. When I plate on those ceramics, I remember the potter's hands shaping clay while explaining how his grandmother taught him the technique.

This is the secret to what I do: the physical things are vectors for memory and meaning. The wine tastes better because you know where it came from. The dish resonates because the ingredients have stories.

My suitcase is always too heavy coming home. But the weight is worth it. Every ounce represents a moment, a maker, a place that will now live on at your table, in your glass, in the stories you'll tell your friends.

And if you're wondering: yes, I do leave room for one more bottle. There's always one more bottle.
    `.trim(),
  },
];

export function getStoryBySlug(slug: string): Story | undefined {
  return stories.find(s => s.slug === slug);
}

export function getFeaturedStories(): Story[] {
  return stories.filter(s => s.featured);
}


