# Cursor Planning Mode Prompt – JoePlates

You are an expert full-stack engineer and UX-focused front-end architect working inside Cursor.

We are building a new marketing site for **JoePlates**: a private dining, wine & spirits curation, and bespoke travel brand based in Cleveland, available globally.

---
## Design
- Review Design_brief.md for the details of the design

--- 

## Key Constraints

- Framework: **Next.js 14+ App Router** with **TypeScript**
- Styling: **Tailwind CSS**
- Deployment: **Vercel**
- **No database for v1.** ALL forms should send an email to `info@joeplates.com`.
- Content is mostly static and can be hardcoded in TypeScript data files.
- The site is image-heavy and should feel luxurious but not pretentious.

---

## Navigation / Routes

Use the App Router under `/app` with the following routes:

- `/` → Home  
- `/private-dining`  
- `/collection-curation`  
- `/travel`  
- `/members`  (Members Only)  
- `/about`  
- `/stories`          (stories index)  
- `/stories/[slug]`   (story detail)  
- `/contact`

We will **not** build a standalone gallery page; instead we will use inline, page-specific image sections.

---

## Global Design & Layout

- Create a root layout (`app/layout.tsx`) with:
  - Shared `<Header />` and `<Footer />`
  - Base typography and colors via Tailwind
- Tone: “warm luxury + effortless expertise + approachable host”
- Color palette: deep neutral background, warm off-white sections, subtle accent (e.g., muted gold/copper) via Tailwind config
- Typography:
  - One serif for headings
  - One sans-serif for body text
- Animations: minimal, subtle fade/slide for sections and cards

### Header

- Logo / wordmark on the left (placeholder “JoePlates” text initially)
- Nav links: Home, Private Dining, Collection & Curation, Travel, Members Only, About, Stories, Contact
- On mobile: hamburger menu that reveals a full-screen or slide-in nav

### Footer

- Short brand statement (from About/Home copy)
- Note: “10% of all revenue is donated to provide food and shelter to those in need.”
- Location (Cleveland, OH – available globally)
- Email + phone
- Simple text link to social (e.g., Instagram) placeholder

---

## Components

Create a `components/` folder with, at minimum:

- `Header.tsx` / `Footer.tsx`
- `PageHero.tsx`
  - Props: `title`, `eyebrow?`, `subtitle?`, optional `children` for CTAs
- `Section.tsx`
  - Wraps sections with consistent padding and max-width
- `SectionHeading.tsx`
  - Props: `eyebrow?`, `title`, `subtitle?`
- `Card.tsx`
  - Generic card for services, themes, regions
- `TestimonialCarousel.tsx`
  - Accepts an array of testimonials (name, label, quote, tags)
  - Supports swipe on mobile
- `PillarsGrid.tsx`
  - 3-card layout for Private Dining, Collection & Curation, Travel
- `CycleDiagram.tsx`
  - Visual representation of the “Private Dining → Travel → Collection & Curation → Repeat” loop
- `StoryList.tsx` and `StoryCard.tsx`
- `InlineGallery.tsx`
  - Lightbox-style component taking an array of image sources and alt text

Form-related components:

- `ContactForm.tsx`
- `PrivateDiningForm.tsx`
- `CurationForm.tsx`
- `TravelWaitlistForm.tsx`
- `MembershipInterestForm.tsx`

Each form should:

- Use controlled components with client-side validation
- Call a dedicated API route via `fetch('/api/...')`
- Show an inline success or error message
- Disable the submit button while sending

---

## Data Layer

Create a `data/` folder with TypeScript files exporting typed arrays/objects:

### `data/testimonials.ts`

Fields: `name`, `label?` (Guest/Member), `quote`, `tags` (e.g., ["private-dining", "travel"]).  
Populate from existing JoePlates testimonials (Dr. Dave, Mark, Ali, Tony, AC, Sarah, Kevin, etc.), paraphrased if needed.

### `data/diningThemes.ts`

Fields: `slug`, `name`, `category`, `shortDescription`, `longDescription?`.  
Include themes: A Night in Seville, Tour de France, Lost in Italy, Northwest Passage, New York New York, South by Southwest, The Maine Event, The Highlander, The Faces of Champagne, Papa Hemingway, Of the Sea, Island Heat, Stew On It, Speakeasy Secrets, Ode to Mushrooms, Vegetarian/Vegan, Cocktail & Craft Spirit-themed menus.

### `data/travelRegions.ts`

- `domesticRegions` and `internationalRegions` arrays.
- Fields: `slug`, `name`, `shortDescription`, `type` ("wine", "spirits", "mixed").

### `data/stories.ts`

Type: `slug`, `title`, `excerpt`, `content`, `date`, optional `featured?`.  
For v1:

- “The Barbaric Yawp and Beginning”  
- “Notes from Champagne Harvest”  
- “What I Bring Back in My Suitcase”

### `data/navigation.ts`

Central definition of nav items for header and footer.

All page content (headlines, section subcopy, etc.) should be pulled from this `data/` layer or clearly separated into constants so it’s easy to edit copy without changing logic.

---

## Forms & Email Sending

We are **not** using a database. Instead, create Next.js API routes under `/app/api/` for each form:

- `/api/contact`
- `/api/private-dining`
- `/api/curation`
- `/api/travel-waitlist`
- `/api/membership-interest`

Implementation details:

- Use `POST` only.
- Body: JSON payload including all form fields.
- Validate basic required fields server-side.
- Use `nodemailer` or a similar library to send an email to `process.env.FORM_TARGET_EMAIL` (set to `info@joeplates.com` in Vercel env).
- Email subject should indicate source: e.g., `[JoePlates] Private Dining Inquiry`, `[JoePlates] Membership Interest`, etc.
- Return JSON `{ ok: true }` or `{ ok: false, error: string }`.

On the client side:

- Show inline success message: “Thank you—your [form type] has been sent to JoePlates. We’ll be in touch soon.”
- Clear the form on success.

---

## Page-by-Page Implementation Notes

Use `01_site_copy.md` as the content source and map it into components as follows.

### `/` Home

Sections:

1. **Hero**
   - Title: “Travel → Curate → Dine → Repeat.”
   - Subcopy and two CTA buttons (Private Dining inquiry and Travel & Members waitlist).

2. **JoePlates Cycle**
   - Use `CycleDiagram` with labels:
     - Private Dining (top of loop, visually emphasized)
     - Travel
     - Collection & Curation
     - Repeat
   - Include explanatory text.

3. **Guests vs Members**
   - Two columns/cards explaining each, plus CTAs.

4. **Pillars Preview**
   - `PillarsGrid` with three cards linking to `/private-dining`, `/collection-curation`, `/travel`.

5. **Signature Experiences**
   - Use a subset of `diningThemes` as spotlight cards with “See more” link.

6. **Testimonials**
   - `TestimonialCarousel` with a mix of Guest and Member quotes.

7. **Request a Date Section**
   - Use a simplified `PrivateDiningForm` inline on the home page.
   - POST to `/api/private-dining`.

8. **About Teaser**
   - Short blurb and links to `/about` and giving section.

### `/private-dining`

- Hero with copy about private dinners, anywhere.  
- Section: “More Than a Meal” – text intro.  
- Section: “How You Can Dine with Joe” – cards for Private Dining Events, Wine Dinners & Tastings, Worldwide Dining, Cooking Classes.  
- Section: “Dining Themes & Inspiration” – grid of all `diningThemes` with filters.  
- Section: “What It’s Like to Work with Joe” – 5-step process component.  
- Section: “Perfect For” – bullet list.  
- Final CTA section using `PrivateDiningForm`.

### `/collection-curation`

- Hero: “Collection & Curation”  
- Section: “Fanatical Curators” intro.  
- Section: Wine & Spirits Cellar Curation – bullet-based layout.  
- Section: Executive Curation – smaller section, Member-leaning.  
- Section: “From Trip to Cellar” – story-style visual.  
- Section: “Who This Is For” – targeted bullets.  
- Final CTA: `CurationForm` → `/api/curation`.

### `/travel`

- Hero: “Travel with Joe”  
- Section: Where We Wander – map or card grid using `travelRegions`.  
- Section: “Three Ways to Travel with Joe”
  - Join Joe’s Travels (Hosted Trips)
  - Bespoke Travel
  - Worldwide Dining
- Section: “Joe’s Travels: Upcoming Journeys” – static cards for now.  
- Section: Travel & Members Waitlist – `TravelWaitlistForm`.

### `/members`

- Hero: “Members Only”  
- Section: What Members Receive – benefits cards.  
- Section: “A Year in the Life of a Member” – diagram overlaying Travel → Curate → Dine → Repeat with Member in the center.  
- Section: Member Testimonials – `TestimonialCarousel` filtered to member quotes.  
- Final CTA: `MembershipInterestForm` → `/api/membership-interest`.

### `/about`

- Hero: “Nine Lives. One Calling.”  
- Section: Nine Lives story – timeline component.  
- Section: “The Moment It Became Non-Negotiable” – Dr. Dave / Barbaric Yawp story.  
- Section: “What JoePlates Is Today” – summary of the brand.  
- Section: “Giving & Values” – values list and giving details.

### `/stories`

- Use `StoryList` and `StoryCard` pulling from `data/stories.ts`.  
- Cards with title, excerpt, and `Read Story` CTA.

### `/stories/[slug]`

- Use `generateStaticParams` and `generateMetadata` with `stories` data.  
- Render story title, date, and content (basic HTML or MDX-like rendering).

### `/contact`

- Hero: “Let’s Talk”  
- Contact info block (location, email, phone).  
- `ContactForm` → `/api/contact`, with a topic selector (Private Dining, Collection & Curation, Travel, Membership, Other).

---

## Images & Media

- Use local static images in `/public/` with meaningful filenames (e.g., `joe-cooking.jpg`, `bordeaux-trip.jpg`, `private-dining-table.jpg`).  
- Use `next/image` everywhere.  
- For each page, add at least one inline gallery:
  - `/private-dining`: dishes, table setups, Joe cooking.
  - `/collection-curation`: bottle shots, cellar shots, detail images.
  - `/travel`: landscapes, markets, vineyards.
- Abstract image sets into data constants so they can be swapped later.

---

## Implementation Order

1. Scaffold project (Next.js, TS, Tailwind).  
2. Implement layout, Header, Footer.  
3. Build data layer under `data/`.  
4. Build basic page routes with placeholder content.  
5. Implement components (Section, Hero, Cards, CycleDiagram, Testimonials).  
6. Wire in final copy from `01_site_copy.md`.  
7. Implement API routes and forms with email sending.  
8. Add inline galleries and polish responsive behavior.  
9. Final accessibility pass (semantic HTML, keyboard navigation, focus states).

Start by creating the project structure, adding Tailwind, and stubbing out the `/app` routes with placeholder components and the shared layout. Then move on to the data layer and global components, followed by each page and form with email APIs.
