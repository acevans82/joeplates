export type TestimonialTag = 'private-dining' | 'travel' | 'curation' | 'member';
export type TestimonialLabel = 'Guest' | 'Member';

export interface Testimonial {
  id: string;
  name: string;
  title: string;
  quote: string;
  label: TestimonialLabel;
  tags: TestimonialTag[];
  image?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 'dr-dave',
    name: 'Dr. Dave McConoughey',
    title: 'ICU Medical Director at St. John Medical Center',
    quote: 'Having Joe as our chef and guide in Champagne and Bordeaux was a stellar experience. We discovered so much more of each of these areas because of it and his meals were just amazing. His ability to sample and then quickly master regional dishes is uncanny.',
    label: 'Member',
    tags: ['travel', 'private-dining'],
    image: '/images/testimonials/dr-dave-mcconoughey.jpg',
  },
  {
    id: 'mark-loder',
    name: 'Mark Loder',
    title: 'Financial Advisor at Wells Fargo',
    quote: 'Joe wields his knowledge of wine, skillet and the travel world with equal prowess. It brought my recent trip to Spain to life at an entirely different level. Honestly, the best octopus dish I\'ve ever had was the one he served at my own AirBnB. He also stopped in Portugal on his way over and picked up some treats. He just loves to go the extra mile. Amazing talent and top executive level service. Great picks for my wine cellar too.',
    label: 'Member',
    tags: ['travel', 'private-dining', 'curation'],
    image: '/images/testimonials/mark-loder.jpg',
  },
  {
    id: 'ali-king',
    name: 'Ali King',
    title: 'Director, Burton D Morgan Mentoring Programs at Jumpstart',
    quote: 'It\'s always exciting right before a Joe Plates event, wondering what new wines I will try, and what new flavors I will add to my memory. It\'s just so much more than a regular dinner gathering or event. Joe Plates has become an anchor for staying connected with my closest friends and family.',
    label: 'Member',
    tags: ['private-dining', 'member'],
    image: '/images/testimonials/ali-king.jpg',
  },
  {
    id: 'tony-guerra',
    name: 'Tony Guerra',
    title: 'Owner at FINCA, LTD.',
    quote: 'Super high-end with an industrial edge, that\'s how I would describe the Joe Plates experience. Whether it\'s caviar or a huge tomahawk steak over fire, he just conjures up the most amazing food and pairings - and experiences. And I love the "customer group" idea. It enabled my friends and I to participate affordably and still experience the full value of service.',
    label: 'Guest',
    tags: ['private-dining'],
    image: '/images/testimonials/tony-guerra.jpg',
  },
  {
    id: 'ac-evans',
    name: 'Aaron Christopher "AC" Evans',
    title: 'CEO at Drips.com',
    quote: 'I have used Joe for multiple events for my clients as well as personal guests. He always contributes something to the menu that becomes a showstopper. He knows his wines too and knows where to find them. As a starting collector and frequent event host I value this greatly.',
    label: 'Member',
    tags: ['private-dining', 'curation', 'member'],
    image: '/images/testimonials/ac-evans.png',
  },
  {
    id: 'sarah-cargill',
    name: 'Sarah Cargill',
    title: 'Founder at Statement Co.',
    quote: 'If you entertain a few times a year, travel at least once a year, and collect anything that\'s fun or precious to you at all, Joe Plates is a no-brainer. It\'s like an annual guarantee for fun and quality of life experience!',
    label: 'Member',
    tags: ['private-dining', 'travel', 'curation', 'member'],
    image: '/images/testimonials/sarah-cargill.png',
  },
  {
    id: 'kevin-mcnulty',
    name: 'Kevin McNulty',
    title: 'Retired',
    quote: 'In the world of "I know a guy," I feel like I know THE guy!',
    label: 'Guest',
    tags: ['private-dining'],
  },
];

export function getTestimonialsByTag(tag: TestimonialTag): Testimonial[] {
  return testimonials.filter(t => t.tags.includes(tag));
}

export function getMemberTestimonials(): Testimonial[] {
  return testimonials.filter(t => t.label === 'Member');
}


