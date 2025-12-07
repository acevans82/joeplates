## Brand Color Palette (Existing JoePlates Colors)

Joe wants to **keep his existing colors and logo**. The palette below is sampled from the current joeplates.com site and should be treated as the visual source of truth for the new design.

### Core Brand Colors

- **Primary Navy (Header / Brand)**  
  - Token: `--color-primary-navy`  
  - Hex: `#101F31`  
  - Usage: Main header/nav background, key dark sections, some text on light backgrounds.

- **Secondary Navy (Hero Band)**  
  - Token: `--color-secondary-navy`  
  - Hex: `#173660`  
  - Usage: Large hero bands, mid-page feature sections, backgrounds behind gold CTAs.

- **Gold Accent (Buttons / CTAs)**  
  - Token: `--color-accent-gold`  
  - Hex: `#7A611D`  
  - Usage: Primary buttons (e.g., CONTACT / Request a Dinner), key links, subtle lines and highlights.

- **Dark Background (Services / Full-Bleed Dark Sections)**  
  - Token: `--color-bg-dark`  
  - Hex: `#090B0A`  
  - Usage: Very dark full-bleed sections (e.g., services slide), footer or Members-only hero if desired.

- **Main Light Background**  
  - Token: `--color-bg`  
  - Hex: `#FFFFFF`  
  - Usage: Default page background, light content sections.

- **Light Panel / Cookie Bar Background**  
  - Token: `--color-panel-light`  
  - Hex: `#EEEEEE`  
  - Usage: Light cards, FAQ blocks, cookie bar / subtle separators between sections.

### Neutral Text & Utility Colors

- **Ink / Body Text**  
  - Token: `--color-ink`  
  - Hex: `#111111`  
  - Usage: Primary body text on light backgrounds.

- **Neutral 700 (Secondary Text)**  
  - Token: `--color-neutral-700`  
  - Hex: `#4A4A4A`  
  - Usage: Secondary copy, labels, captions.

- **Neutral 500 (Borders / Lines)**  
  - Token: `--color-neutral-500`  
  - Hex: `#999999`  
  - Usage: Hairline dividers, subtle borders.

- **Neutral 100 (Soft Background Tint)**  
  - Token: `--color-neutral-100`  
  - Hex: `#EEEEEE`  
  - Usage: Soft background for cards on light sections, alternating bands.

### State Colors (Subtle, Harmonized with Brand)

- **Success (Form Success Messages)**  
  - Token: `--color-success`  
  - Hex: `#3C7A4A`  
  - Usage: Small success text/icons after form submission.

- **Error (Form Validation)**  
  - Token: `--color-error`  
  - Hex: `#B23A3A`  
  - Usage: Inline error messages, input borders when invalid.

- **Focus / Outline**  
  - Token: `--color-focus`  
  - Hex: `#26466F`  _(a lighter tint derived from the secondary navy)_  
  - Usage: Accessible focus rings around buttons/inputs.

### Usage Guidelines

- **Buttons**
  - Primary: `--color-accent-gold` background, white text, used on both navy and white sections.
  - Secondary: Outline or ghost buttons using `--color-accent-gold` or `--color-primary-navy`.

- **Sections**
  - Alternate between:
    - Light sections: `--color-bg`  
    - Dark sections: `--color-primary-navy` or `--color-bg-dark`  
    - Occasional mid-band: `--color-secondary-navy`
  - Cards and FAQs sit on `--color-panel-light` or `--color-bg`.

- **Text**
  - On light backgrounds: `--color-ink` or `--color-neutral-700`.
  - On dark backgrounds: use white (`#FFFFFF`) or a very light neutral, always with sufficient contrast.

- **Members / Travel Emphasis**
  - Prefer **dark navy / black backgrounds (`#101F31` / `#090B0A`) + gold accents (`#7A611D`)** to signal “inner circle” and “journey” sections (Members Only, Travel hero, Travel → Curate → Dine → Repeat band).