export interface NavItem {
  label: string;
  href: string;
  description?: string;
}

export const mainNavItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Private Dining', href: '/private-dining' },
  { label: 'Travel', href: '/travel' },
  { label: 'Collection & Curation', href: '/collection-curation' },
  { label: 'Members Only', href: '/members' },
  { label: 'About', href: '/about' },
  { label: 'Stories', href: '/stories' },
  { label: 'Contact', href: '/contact' },
];

export const footerNavItems: NavItem[] = [
  { label: 'Private Dining', href: '/private-dining' },
  { label: 'Travel', href: '/travel' },
  { label: 'Collection & Curation', href: '/collection-curation' },
  { label: 'Members Only', href: '/members' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export const contactInfo = {
  email: 'info@joeplates.com',
  phone: '(216) 538-7576',
  location: 'Cleveland, OH',
  availability: 'Available globally',
  instagram: 'https://www.instagram.com/joeplatesinc/',
};

export const brandStatement = 
  'Joe brings the world to your table—and sometimes brings you to the world.';

export const givingStatement = 
  '10% of all revenue is donated to provide food and shelter to those in need.';



