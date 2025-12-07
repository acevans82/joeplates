export type ThemeId = 
  | 'classic-estate'
  | 'modern-cellar'
  | 'coastal-wanderer'
  | 'midnight-supper'
  | 'bistro-warmth'
  | 'editorial'
  | 'market-morning'
  | 'backstage-vinyl';

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  description: string;
  headingFont: string;
  bodyFont: string;
  layoutStyle: 'centered' | 'asymmetric' | 'magazine' | 'minimal' | 'cozy' | 'editorial';
  heroStyle: 'centered' | 'left-aligned' | 'split' | 'full-bleed';
  cardStyle: 'bordered' | 'shadowed' | 'flat' | 'elevated';
  animationIntensity: 'subtle' | 'moderate' | 'bold';
}

export const themes: Record<ThemeId, ThemeConfig> = {
  'classic-estate': {
    id: 'classic-estate',
    name: 'Classic Estate',
    description: 'Traditional elegance with serif typography and gold accents',
    headingFont: 'Libre Baskerville',
    bodyFont: 'DM Sans',
    layoutStyle: 'centered',
    heroStyle: 'centered',
    cardStyle: 'bordered',
    animationIntensity: 'subtle',
  },
  'modern-cellar': {
    id: 'modern-cellar',
    name: 'Modern Cellar',
    description: 'Contemporary minimal with sharp edges and bold contrast',
    headingFont: 'Outfit',
    bodyFont: 'Inter',
    layoutStyle: 'asymmetric',
    heroStyle: 'left-aligned',
    cardStyle: 'shadowed',
    animationIntensity: 'moderate',
  },
  'coastal-wanderer': {
    id: 'coastal-wanderer',
    name: 'Coastal Wanderer',
    description: 'Deep navy tones with fluid, organic shapes',
    headingFont: 'Lora',
    bodyFont: 'Work Sans',
    layoutStyle: 'magazine',
    heroStyle: 'split',
    cardStyle: 'elevated',
    animationIntensity: 'subtle',
  },
  'midnight-supper': {
    id: 'midnight-supper',
    name: 'Midnight Supper',
    description: 'Dark and dramatic with moody atmosphere',
    headingFont: 'Playfair Display',
    bodyFont: 'Source Sans 3',
    layoutStyle: 'centered',
    heroStyle: 'full-bleed',
    cardStyle: 'shadowed',
    animationIntensity: 'bold',
  },
  'bistro-warmth': {
    id: 'bistro-warmth',
    name: 'Bistro Warmth',
    description: 'Cozy and inviting with warm amber tones',
    headingFont: 'EB Garamond',
    bodyFont: 'Nunito Sans',
    layoutStyle: 'cozy',
    heroStyle: 'centered',
    cardStyle: 'elevated',
    animationIntensity: 'moderate',
  },
  'editorial': {
    id: 'editorial',
    name: 'Editorial',
    description: 'Magazine-style with bold oversized typography',
    headingFont: 'Cormorant Garamond',
    bodyFont: 'Fira Sans',
    layoutStyle: 'editorial',
    heroStyle: 'split',
    cardStyle: 'flat',
    animationIntensity: 'subtle',
  },
  'market-morning': {
    id: 'market-morning',
    name: 'Market Morning',
    description: 'Sunlit markets, fresh produce, and bright, grounded warmth',
    headingFont: 'Lora',
    bodyFont: 'Nunito Sans',
    layoutStyle: 'magazine',
    heroStyle: 'split',
    cardStyle: 'elevated',
    animationIntensity: 'moderate',
  },
  'backstage-vinyl': {
    id: 'backstage-vinyl',
    name: 'Backstage Vinyl',
    description: 'Analog, music-night energy with deep plums and copper notes',
    headingFont: 'Playfair Display',
    bodyFont: 'Inter',
    layoutStyle: 'centered',
    heroStyle: 'full-bleed',
    cardStyle: 'shadowed',
    animationIntensity: 'bold',
  },
};

export const themeIds = Object.keys(themes) as ThemeId[];
export const defaultTheme: ThemeId = 'classic-estate';


