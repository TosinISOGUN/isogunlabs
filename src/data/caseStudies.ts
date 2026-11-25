// Case studies at /work/<slug>/. Facts come from the portfolio case studies on portfolio.isogunlabs.com.
// Rules: describe what was built, not results nobody measured, and never invent clients, quotes or numbers.

export interface CaseStudy {
  slug: string;
  name: string;
  type: string;
  status: string;
  role: string;
  url: string;
  /** One line for cards and search results. */
  line: string;
  alt: string;
  brief: string;
  built: string;
  /** Short facts shown beside the screenshot. */
  glance: { label: string; value: string }[];
  decisions: { label: string; value: string }[];
  /** The landing page this project supports. */
  industry?: string;
  /** A longer write-up, shown on the English page only. Describe what was built, never invented results. */
  story?: {
    problem: string;
    approach: { h: string; p: string }[];
    screens: { n: number; alt: string; caption: string }[];
    outcome: string;
  };
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'gloria-may-byron',
    name: 'Gloria May Byron',
    type: 'Artist website',
    status: 'Live site',
    role: 'Design and development',
    url: 'https://gloriamaybyron.com/',
    line: 'Website for an independent singer and songwriter, with music, news, awards and sixteen languages.',
    alt: 'Gloria May Byron website homepage: a singer at a studio microphone with her name in large type.',
    brief:
      'An independent artist needed one place that shows her music, news, photos and awards, and makes it easy for people to book or contact her. Listeners come from many countries, so the site also had to speak their languages.',
    built:
      'We rebuilt her site around full-bleed photography. Each page opens on a large photograph, pages fade into each other, and a floating navigation bar stays in reach as you scroll. It has pages for her story, music, announcements, gallery, awards, contact and a section on how her songs are made, and it is published in sixteen languages, each with its own address so listeners can find and share the right one.',
    glance: [
      { label: 'Type', value: 'Artist website' },
      { label: 'Languages', value: '16' },
      { label: 'Themes', value: 'Light and dark' },
      { label: 'Built with', value: 'React, TypeScript, Tailwind' },
    ],
    decisions: [
      { label: 'Photography first', value: 'Each page opens on a large photograph of her, so visitors meet the artist before they read a word.' },
      { label: 'Her own content', value: 'All copy, credits, awards, videos and links come from her own material, so nothing about her is invented.' },
      { label: 'Every language, its own address', value: 'A page in Swedish, Hindi or Arabic has its own web address and language tags, so it can be found and shared on its own. Arabic and Urdu read right to left.' },
      { label: 'Motion that respects settings', value: 'Scroll animation is done in CSS and shows its finished state for visitors who prefer reduced motion.' },
    ],
    industry: 'website-redesign',
    story: {
      problem:
        "Gloria's listeners are spread across the world and find her on many different platforms. She needed one home for her music, news, photos and awards that looked as professional as her work, spoke her listeners' languages and made it easy to reach her.",
      approach: [
        { h: 'Photography first', p: 'Every page opens on a large photograph of her, so visitors meet the artist before they read a word. Pages fade into each other as you move through the site.' },
        { h: 'Her music in one place', p: 'Featured singles and videos sit beside links to the streaming platforms she is on, so a new listener can hear her in a tap.' },
        { h: 'Sixteen languages, each with its own address', p: 'A page in Swedish, Hindi or Arabic has its own web address and language tags, so it can be found and shared on its own. Arabic and Urdu read right to left.' },
        { h: 'Honest about how the songs are made', p: "A dedicated page explains how each song is written and produced, in Gloria's own words, so listeners can see the work behind it." },
        { h: 'Built around how people browse', p: 'A light and a dark theme, a floating menu that stays in reach, and animation that shows its finished state for visitors who prefer reduced motion.' },
      ],
      screens: [
        { n: 1, alt: 'Gloria May Byron website home page: a singer at a studio microphone with her name in large type.', caption: 'The home page opens on Gloria at the microphone, with a clear way to listen or read her story.' },
        { n: 2, alt: 'The Music page with featured singles and videos.', caption: 'Music: featured singles and videos beside links to the streaming platforms.' },
        { n: 3, alt: 'The Awards page with a row of award badges.', caption: 'Awards and recognition, shown clearly and kept in her own words.' },
        { n: 4, alt: 'The Arabic version of the home page, laid out right to left.', caption: 'The Arabic version reads right to left, with its own address. There are sixteen languages in all.' },
      ],
      outcome:
        'Gloria now has a single site that carries her story in sixteen languages, with a contact page for bookings and collaborations. We built it from her own material, so nothing about her is invented.',
    },
  },
  {
    slug: 'velora-beauty',
    name: 'Velora Beauty',
    type: 'Beauty shop',
    status: 'Live site',
    role: 'Design and development',
    url: 'https://velorabeautyy.vercel.app',
    line: 'Online beauty shop with a routine builder, shade-aware products and a shopping bag.',
    alt: 'Velora Beauty online store homepage with a colourful make-up portrait.',
    brief:
      'A beauty label aimed at adult women of many ages and skin tones needed a shop that feels colour-forward and confident, while keeping the path from browsing to buying short.',
    built:
      'Fifteen pages: home, shop, three collections, six product pages, a routine builder, the brand story, a shopping bag, checkout and contact. Every top-level page opens on a full-bleed photograph, and product packaging is drawn as shaded vector art that takes the colour of the selected shade.',
    glance: [
      { label: 'Type', value: 'Online shop' },
      { label: 'Pages', value: '15' },
      { label: 'Key features', value: 'Routine builder, shopping bag' },
      { label: 'Themes', value: 'Dark and light' },
    ],
    decisions: [
      { label: 'Photography first', value: 'Each page opens on one large photograph and a short line of type, so the mood is clear before the visitor reads anything.' },
      { label: 'Shade-aware products', value: 'Packaging is vector art that changes with the selected shade, so the product on screen matches the choice being made.' },
      { label: 'A routine, not just a product', value: 'The routine builder suggests products that go together, which helps shoppers decide and raises the value of an order.' },
    ],
    industry: 'beauty-brand-website-design',
  },
  {
    slug: 'hearthline-realty',
    name: 'Hearthline Realty',
    type: 'Real estate website',
    status: 'Live site',
    role: 'Design and development',
    url: 'https://hearthlinerealty.vercel.app',
    line: 'Real estate site with home search, a map and showing requests.',
    alt: 'Hearthline Realty website homepage with a house at dusk.',
    brief:
      'A boutique brokerage needed buyers to find a home quickly, and sellers to have a clear way to get in touch.',
    built:
      'Eight pages plus a page for each home. Search filters by place, price, bedrooms, type and features, and keeps its state in the page address. Visitors can switch between a list and a map, open a photo gallery, save homes for the visit, and send a showing, valuation or contact request.',
    glance: [
      { label: 'Type', value: 'Real estate website' },
      { label: 'Key features', value: 'Home search, map view' },
      { label: 'Requests', value: 'Showing, valuation, contact' },
      { label: 'Pages', value: '8 plus a page per home' },
    ],
    decisions: [
      { label: 'Search you can share', value: 'Filters apply instantly and live in the page address, so any search can be sent as a link and still work.' },
      { label: 'Map on request', value: 'The map and its tiles load only when someone opens a map, which keeps the first load light.' },
      { label: 'Clear first step for sellers', value: 'A valuation request sits beside the search, so a seller does not have to look for how to begin.' },
    ],
    industry: 'realtor-website-design',
    story: {
      problem:
        'A boutique brokerage needed buyers to find a home quickly, and sellers to have a clear way to get in touch. This is a design concept with sample listings, built to show how we would approach a real estate site.',
      approach: [
        { h: 'Search you can share', p: 'Filters for place, price, bedrooms, type and features apply instantly and live in the page address, so any search can be sent as a link and still work.' },
        { h: 'A map when you want one', p: 'Visitors can switch between a list and a map. The map and its tiles load only when someone opens it, which keeps the first load light.' },
        { h: 'A clear first step for sellers', p: 'A valuation request sits beside the search, so a seller does not have to look for how to begin.' },
        { h: 'A page for every home', p: 'Each home has its own page with a photo gallery and a way to ask for a showing, and visitors can save homes for the visit.' },
      ],
      screens: [
        { n: 1, alt: 'Hearthline Realty home page: a house at dusk with the headline Your next chapter starts at home.', caption: 'The home page opens on a single strong photograph and a search.' },
        { n: 2, alt: 'The Find your place page with search filters and home listings.', caption: 'Search by place, price, bedrooms, type and features, in a list or on a map.' },
        { n: 3, alt: 'The Sell your home page with a valuation request.', caption: 'Sellers get their own page, with a valuation request from the first screen.' },
        { n: 4, alt: 'A single home page with a photo gallery and showing request.', caption: 'Every home has its own page with photos and a showing request.' },
      ],
      outcome:
        'The result is a complete real estate site that works for both buyers and sellers, with search, a map and clear requests. The listings are samples, and the site says so.',
    },
  },
  {
    slug: 'juniper-ember',
    name: 'Juniper & Ember',
    type: 'Restaurant website',
    status: 'Live site',
    role: 'Design and development',
    url: 'https://juniperandember.vercel.app/',
    line: 'Restaurant site with a menu, pickup ordering and reservations.',
    alt: 'Juniper and Ember restaurant website homepage with a lively dining room.',
    brief:
      'A wood-fired restaurant needed a site that sells the mood on the first screen, and still makes the menu, ordering and booking easy to reach.',
    built:
      'Nine pages: a tabbed menu, pickup ordering with a cart and checkout, reservations, a gallery with a lightbox, and a dark and a cream theme. Every top-level page opens on a full-bleed photograph.',
    glance: [
      { label: 'Type', value: 'Restaurant website' },
      { label: 'Pages', value: '9' },
      { label: 'Key features', value: 'Pickup ordering, reservations' },
      { label: 'Themes', value: 'Dark and cream' },
    ],
    decisions: [
      { label: 'Mood first', value: 'A large photograph and a short headline open each page, so visitors feel the place before they read the details.' },
      { label: 'Booking that follows the hours', value: 'Reservation times only offer what is served that day, so a visitor cannot pick a time the kitchen is closed.' },
      { label: 'Light motion', value: 'Animation uses only movement and fade, and everything shows in its finished state for visitors who prefer reduced motion.' },
    ],
    industry: 'restaurant-website-design',
  },
  {
    slug: 'everwell',
    name: 'Everwell',
    type: 'Clinic website',
    status: 'Live site',
    role: 'Design and development',
    url: 'https://everwelldental.vercel.app',
    line: 'Clinic website with clear service pages and an easy contact form.',
    alt: 'Everwell clinic website homepage with a calm treatment room.',
    brief:
      'People choosing a practice need plain language, clear services and an easy way to get in touch. The site had to reassure a first-time patient and make the next step obvious.',
    built:
      'Ten pages: home, a services overview with a page for each service, the practice, a page for new visitors, contact and a privacy notice. The wording avoids jargon, and the contact form is kept short.',
    glance: [
      { label: 'Type', value: 'Clinic website' },
      { label: 'Pages', value: '10' },
      { label: 'Key features', value: 'A page per service, new visitor page' },
      { label: 'Style', value: 'Calm, plain language' },
    ],
    decisions: [
      { label: 'Plain language', value: 'Services are explained in short, everyday wording, so a visitor can understand each one without looking anything up.' },
      { label: 'One page per service', value: 'Each service has its own page, so people can land on exactly what they searched for.' },
      { label: 'A short, careful form', value: 'The contact form asks for as little as possible and does not ask for health details.' },
    ],
    industry: 'clinic-website-design',
    story: {
      problem:
        'People choosing a dental practice need plain language, clear services and an easy way to get in touch. The site had to reassure a first-time patient and make the next step obvious. This is a design concept for a fictional practice.',
      approach: [
        { h: 'Plain language', p: 'Services are explained in short, everyday wording, so a visitor can understand each one without looking anything up.' },
        { h: 'One page per service', p: 'Each service has its own page, so people can land on exactly what they searched for.' },
        { h: 'A page for new patients', p: 'A dedicated page walks a first-time visitor through what to expect, to reduce uncertainty before they book.' },
        { h: 'A short, careful form', p: 'The appointment form asks for as little as possible and does not ask for health details.' },
      ],
      screens: [
        { n: 1, alt: 'Everwell Dental home page: Care that puts you at ease, beside a dentist and a patient.', caption: 'The first screen says what the practice does and offers one clear next step.' },
        { n: 2, alt: 'The Dental services page, with services explained in plain language.', caption: 'Services explained in short, everyday wording.' },
        { n: 3, alt: 'The New patients page walking through a first visit.', caption: 'A page for first-time visitors that explains what to expect.' },
        { n: 4, alt: 'The Contact and appointment request page.', caption: 'A short appointment request form that asks for no health details.' },
      ],
      outcome:
        'A calm, complete practice site with a page for every service and a short, careful way to ask for an appointment, built for patients who are choosing a practice for the first time.',
    },
  },
  {
    slug: 'weseeu',
    name: 'weSEEu',
    type: 'Marketplace product',
    status: 'In development',
    role: 'Product, design and development',
    url: 'https://weseeu.vercel.app',
    line: 'Therapy and special-needs marketplace with verified provider profiles, accounts and sign-up.',
    alt: 'weSEEu marketplace homepage with the line A place to find the right support.',
    brief:
      'Families looking for therapy or special-needs support often rely on word of mouth. The product has to show who is verified, what a session costs and what happens next, before anyone is asked to pay or share details.',
    built:
      'We are building it in phases. The first phase is the public site and accounts: a landing page that explains booking, verification and the country-by-country launch, sign-up for clients, practitioners and organisations, email confirmation and password reset with branded emails, and a practitioner dashboard with a profile. Booking and payments come in later phases.',
    glance: [
      { label: 'Type', value: 'Marketplace web app' },
      { label: 'Stage', value: 'In development' },
      { label: 'Built so far', value: 'Accounts, sign-up, practitioner dashboard' },
      { label: 'Also', value: 'Installable app' },
    ],
    decisions: [
      { label: 'Trust before payment', value: 'Price, length and terms are shown before a request, and nothing is charged until a provider says yes.' },
      { label: 'Verification built in', value: 'Practitioners follow a checklist of documents for their country, and the plan is that a person reviews them before any listing goes live.' },
      { label: 'Private by default', value: 'The database sits behind the server with row-level security on, and the offline app never stores signed-in pages.' },
    ],
    industry: 'startup-website-design',
  },
];

export const caseStudyBySlug = (slug: string) => caseStudies.find((c) => c.slug === slug)!;
