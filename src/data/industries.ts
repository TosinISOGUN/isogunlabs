// One entry per industry (or service) landing page, at /services/<slug>/.
// Copy rules: no prices, no invented results, no claims about regulations we have not been asked to meet.

export interface Industry {
  slug: string;
  /** Short label for links, chips and the footer. */
  name: string;
  /** Keyword-bearing link text for the footer and the services page, such as "Restaurant website design". */
  anchor: string;
  /** The thing being designed, used in questions: "restaurant website". */
  noun: string;
  /** Icon (a file in public/assets/icons/ui) and one line for the Services menu. */
  icon: string;
  menuText: string;
  /** The picture card shown beside the menu while this item is hovered (public/assets/menu/<slug>.webp). */
  preview: { tag: string; title: string };
  /** Section headings that carry the page's search terms. */
  buildTitle: string;
  faqTitle: string;
  /** Search-facing page title and description. */
  metaTitle: string;
  metaDescription: string;
  h1: string;
  lead: string;
  /** What visitors to this kind of site are looking for. */
  needsTitle: string;
  needs: { title: string; text: string }[];
  /** What we build, as a checklist. */
  build: string[];
  /** A project from /work/ that shows this kind of site. */
  proof?: { slug: string; note: string };
  faq: { q: string; a: string }[];
  /** Blog posts to link to (slugs in src/content/blog). */
  reading: string[];
  /** Used for the Service structured data. */
  serviceType: string;
}

export const industries: Industry[] = [
  {
    slug: 'restaurant-website-design',
    name: 'Restaurants',
    anchor: 'Restaurant website design',
    icon: 'fork-knife',
    menuText: 'Menus, online ordering and booking',
    preview: { tag: 'For restaurants', title: 'Menu, online ordering and table booking' },
    noun: 'restaurant website',
    buildTitle: 'What your restaurant website includes',
    faqTitle: 'Restaurant website design questions',
    metaTitle: 'Restaurant Website Design Services | Isogun Labs',
    metaDescription:
      'Restaurant web design with online ordering, table booking and a mobile-friendly menu. Custom sites for owners in the USA, Canada, UK, Europe and Nigeria.',
    h1: 'Restaurant website design that gets people to the table',
    lead: 'Most people check a restaurant on their phone before they walk in. We design restaurant websites for restaurants, cafes and bars in the USA, Canada, the UK, Europe and Nigeria: a menu that is easy to read, hours that are always right, and online ordering or table booking that takes a few taps.',
    needsTitle: 'What people look for on a restaurant website',
    needs: [
      { title: 'A menu they can read on a phone', text: 'Real text that loads fast and can be searched, not a photo of a printed menu or a PDF that has to be pinched and zoomed.' },
      { title: 'Hours, address and parking at a glance', text: 'The three things people need before they set off, near the top of the page and always up to date.' },
      { title: 'Booking or ordering in one tap', text: 'A table booking or a pickup order should take a few taps, from the first screen, on any device.' },
      { title: 'Photos that show the room and the food', text: 'People choose where to eat with their eyes. Good photography, set large, tells them what the evening will feel like.' },
      { title: 'Dietary and allergen information', text: 'Vegetarian, vegan, gluten-free and allergen notes that are easy to find, so guests with needs can book with confidence.' },
      { title: 'A way to ask about events and private dining', text: 'A short enquiry form for parties, group bookings and private hire, so those requests do not get lost in a general inbox.' },
    ],
    build: [
      'A menu page with sections you can edit, written as text so it works for search engines and screen readers',
      'Table reservations that only offer the times you are actually open',
      'A pickup or takeaway ordering flow, with payment through an established payment provider',
      'Opening hours, map and directions with search-friendly markup',
      'Events and private dining enquiry form',
      'Links or embeds for the booking or delivery service you already use, where it allows it',
      'Fast, large photography that does not slow the page down',
    ],
    proof: { slug: 'juniper-ember', note: 'A restaurant website with a tabbed menu, pickup ordering and reservations that follow the opening hours.' },
    faq: [
      { q: 'Can you connect the site to the booking system we already use?', a: 'Usually yes, by linking to it or embedding it. Tell us which one on the call and we will say what is possible before you commit to anything.' },
      { q: 'Will we be able to update the menu ourselves?', a: 'We agree how updates will work before we build: either a simple way for you to edit the menu, or we make the changes for you. You should never be stuck waiting on a developer for a price change.' },
      { q: 'Can the website take online orders and payments?', a: 'We can build the ordering flow. For payments we use an established provider, so card details are handled by them and not by your website.' },
    ],
    reading: ['what-local-businesses-should-put-on-their-first-screen', 'how-much-does-a-business-website-cost'],
    serviceType: 'Restaurant website design',
  },
  {
    slug: 'clinic-website-design',
    name: 'Clinics',
    anchor: 'Dental and clinic website design',
    icon: 'tooth',
    menuText: 'Treatment pages and appointment requests',
    preview: { tag: 'For clinics', title: 'Clear treatment pages and easy appointment requests' },
    noun: 'clinic website',
    buildTitle: 'What your clinic website includes',
    faqTitle: 'Dental and clinic website design questions',
    metaTitle: 'Dental, Medical and Clinic Website Design | Isogun Labs',
    metaDescription:
      'Website design for dentists, physiotherapists and medical clinics: clear treatment pages and online appointment requests. USA, Canada, UK, Europe and Nigeria.',
    h1: 'Dental and clinic website design that puts patients at ease',
    lead: 'People choosing a dentist or clinic want to know what you treat, where you are and how to book, in plain words. We build websites for dentists, doctors, physiotherapists, chiropractors and other practices in the USA, Canada, the UK, Europe and Nigeria, with a calm design that helps a first-time patient take the next step.',
    needsTitle: 'What patients look for on a clinic website',
    needs: [
      { title: 'A page for each treatment', text: 'Someone searching for one treatment should land on a page about exactly that, explained in everyday language.' },
      { title: 'Hours, address and how to book', text: 'The practical details near the top of every page, with a phone number that dials when tapped on a phone.' },
      { title: 'Fees, insurance or funding information', text: 'Where your practice shares it, a clear explanation of costs and what is covered. It removes a common reason for people to hesitate.' },
      { title: 'The people they will meet', text: 'Short profiles of the team, so the first visit feels less like walking into the unknown.' },
      { title: 'What to expect at a first visit', text: 'A plain description of the first appointment, how long it takes and what to bring.' },
      { title: 'Urgent and emergency information', text: 'A clear note on what to do if something cannot wait, so a worried visitor does not have to search for it.' },
    ],
    build: [
      'An overview of services with a separate page for each treatment',
      'A page for new patients: what happens at the first visit, how to prepare, what to bring',
      'An appointment request form kept to the minimum, or a link to the booking system you already use',
      'Team page, location map and directions',
      'Privacy notice and cookie settings suited to where your patients live',
      'Accessibility basics: readable contrast, keyboard use, descriptive image text',
      'Wording that avoids jargon and avoids medical claims you have not given us',
    ],
    proof: { slug: 'everwell', note: 'A clinic website with a page for every service, plain wording and an easy contact form.' },
    faq: [
      { q: 'Can the website take appointments?', a: 'It can take appointment requests through a short form, or link to the booking software you already use. We keep forms to the minimum details needed.' },
      { q: 'What about patient privacy and health data?', a: 'A brochure-style website does not need to store patients’ health information, and we keep forms out of that territory. If you need online records or secure messaging, that is a separate system and a different conversation. Take advice on the rules that apply to you, such as HIPAA in the US, PIPEDA in Canada, and UK or EU GDPR.' },
      { q: 'Who writes the treatment pages?', a: 'We write from what you tell us, in plain language, and you check every page before it goes live. We do not add clinical claims you have not approved.' },
    ],
    reading: ['what-local-businesses-should-put-on-their-first-screen', 'website-redesign-checklist-signs-its-time'],
    serviceType: 'Clinic and healthcare practice website design',
  },
  {
    slug: 'realtor-website-design',
    name: 'Realtors',
    anchor: 'Real estate and realtor website design',
    icon: 'house-line',
    menuText: 'Home search, area guides and valuations',
    preview: { tag: 'For realtors', title: 'Home search, area guides and valuation requests' },
    noun: 'real estate website',
    buildTitle: 'What your real estate website includes',
    faqTitle: 'Real estate website design questions',
    metaTitle: 'Real Estate and Realtor Website Design | Isogun Labs',
    metaDescription:
      'Real estate website design for realtors and estate agents: MLS and IDX home search, neighbourhood guides and valuation requests. USA, Canada, UK, Europe and Nigeria.',
    h1: 'Real estate website design that works as hard as you do',
    lead: 'Buyers and sellers look an agent up before they ever call. We build real estate websites for realtors, estate agents and small brokerages in the USA, Canada, the UK, Europe and Nigeria: home search that is easy to use, local guides that show you know the area, and a clear first step for sellers and buyers alike.',
    needsTitle: 'What buyers and sellers look for on an agent’s website',
    needs: [
      { title: 'Home search that is quick to use', text: 'Filters for place, price, bedrooms and type, and a map. The search itself usually comes from your MLS or an IDX provider, and the site is designed around it.' },
      { title: 'Proof that you know the area', text: 'Neighbourhood and relocation guides written by you, which also help people find your site in search.' },
      { title: 'A simple way for sellers to start', text: 'A home valuation or consultation request, with one clear button and a short form.' },
      { title: 'Who you are and how you work', text: 'Your story, your areas, and your process, in your own voice. People hire the person, not the brokerage logo.' },
      { title: 'Recent results and reviews', text: 'Sales, testimonials and reviews that you can document, shown clearly. We do not invent statistics.' },
      { title: 'Easy contact', text: 'Tap-to-call, text and a form on every page, because buyers contact agents at all hours.' },
    ],
    build: [
      'Home search design around your MLS or IDX provider, or a clean showcase of your own listings',
      'Neighbourhood, school and relocation guide pages',
      'Valuation, showing and contact request forms',
      'An About page and a results page built from facts you can stand behind',
      'Map views that load on request, so pages stay fast',
      'Brokerage, licence and fair housing wording in the footer, as you supply it',
      'A blog or news section for market updates',
    ],
    proof: { slug: 'hearthline-realty', note: 'A real estate website with home search by place, price and features, a map, and showing requests.' },
    faq: [
      { q: 'Can you connect to our MLS or IDX feed?', a: 'Search results usually come from your MLS or an IDX provider, which has its own rules and fees. We design the site around it and tell you what your provider supports before you commit.' },
      { q: 'Will you add the licence and compliance wording we need?', a: 'Yes. We carry the brokerage, licence and fair housing wording you give us. You remain responsible for confirming what your local regulator requires.' },
      { q: 'Can the site help us show up when people search for our area?', a: 'Guides to the neighbourhoods and towns you serve are one of the best tools an agent has. We build the structure for them and write them with you. Nobody can promise a ranking, but good local pages are what search engines look for.' },
    ],
    reading: ['what-local-businesses-should-put-on-their-first-screen', 'how-much-does-a-business-website-cost'],
    serviceType: 'Real estate agent website design',
  },
  {
    slug: 'gym-website-design',
    name: 'Gyms',
    anchor: 'Gym and fitness website design',
    icon: 'barbell',
    menuText: 'Class timetables, memberships and trials',
    preview: { tag: 'For gyms', title: 'Class timetable, memberships and free trial sign-up' },
    noun: 'gym website',
    buildTitle: 'What your gym website includes',
    faqTitle: 'Gym website design questions',
    metaTitle: 'Gym and Fitness Studio Website Design | Isogun Labs',
    metaDescription:
      'Gym website design with a class timetable, membership pages and free-trial sign-up, for gyms and personal trainers in the USA, Canada, UK, Europe and Nigeria.',
    h1: 'Gym website design that turns visitors into trial members',
    lead: 'A gym website has one job: get the visitor through the door. We build websites for gyms, fitness studios and personal trainers in the USA, Canada, the UK, Europe and Nigeria, with a timetable that is easy to read, memberships that are easy to understand, and a trial or enquiry button that is always in reach.',
    needsTitle: 'What people look for on a gym website',
    needs: [
      { title: 'A timetable that works on a phone', text: 'Classes by day and time, readable without zooming, with a clear way to book where you take bookings.' },
      { title: 'Memberships explained simply', text: 'What each option includes, what it costs where you share prices, and how to join, without hunting through small print.' },
      { title: 'A free trial or intro offer', text: 'One clear button to claim a first visit. This is the step that turns a browser into a member.' },
      { title: 'The coaches and the community', text: 'Who will train them and what the place feels like. Real photos of your gym and your people, not stock images.' },
      { title: 'Where you are and when you are open', text: 'Address, map, parking and opening hours, easy to find, for each location you run.' },
      { title: 'Answers for first-timers', text: 'What to wear, what to bring, whether it is fine to start as a beginner. Small questions that stop people from joining.' },
    ],
    build: [
      'A class timetable page that is easy to read and easy to update',
      'Membership and pricing page you can edit',
      'Free trial and enquiry forms that reach you by email',
      'Coach and trainer profiles',
      'Location pages with map and hours, one for each site',
      'Links or embeds for the booking and membership software you already use, where it allows it',
      'A FAQ for new members',
    ],
    faq: [
      { q: 'Can the site connect to our booking and membership software?', a: 'Where your provider allows it, we link to it or embed it. Tell us what you use on the call and we will say what is possible.' },
      { q: 'Can we show different locations and different timetables?', a: 'Yes. Each location gets its own page with its hours, map and timetable.' },
      { q: 'Do you handle photography?', a: 'No, but we plan how your photos are used and can tell you which shots to take. Real photos of your own gym are worth far more than stock images.' },
    ],
    reading: ['what-local-businesses-should-put-on-their-first-screen', 'website-redesign-checklist-signs-its-time'],
    serviceType: 'Gym and fitness studio website design',
  },
  {
    slug: 'beauty-brand-website-design',
    name: 'Beauty brands',
    anchor: 'Beauty brand website design',
    icon: 'flower-lotus',
    menuText: 'Online shops with shade-aware products',
    preview: { tag: 'For beauty brands', title: 'Shade-aware products and a simple checkout' },
    noun: 'beauty brand website',
    buildTitle: 'What your beauty brand website includes',
    faqTitle: 'Beauty brand website design questions',
    metaTitle: 'Beauty Brand and Salon Website Design | Isogun Labs',
    metaDescription:
      'Ecommerce website design for beauty brands, skincare labels and salons: shade-aware products and checkout. For the USA, Canada, UK, Europe and Nigeria.',
    h1: 'Beauty brand website design that looks like your brand feels',
    lead: 'In beauty, the look of the site is part of the product. We design websites and online shops for beauty brands, skincare and cosmetics labels and salons in the USA, Canada, the UK, Europe and Nigeria: photography that leads, products that are easy to choose, and a short path from first look to order.',
    needsTitle: 'What shoppers look for on a beauty website',
    needs: [
      { title: 'Photography that sets the mood', text: 'A first screen that shows the brand’s world in one image, before any text is read.' },
      { title: 'Products that are easy to choose', text: 'Shades, sizes and variants that change the picture on screen, so the shopper sees what they are choosing.' },
      { title: 'Help building a routine', text: 'A simple guide that suggests products together, which also raises the size of the order.' },
      { title: 'Ingredients and details', text: 'What is in the product and how to use it, set out clearly. We do not add claims you have not approved.' },
      { title: 'Clear shipping and returns', text: 'Costs, timing and return rules shown before checkout, because unclear delivery is a common reason for abandoned bags.' },
      { title: 'Reviews you have earned', text: 'Real customer reviews, shown honestly. Nothing is invented or placed to look better than it is.' },
    ],
    build: [
      'A custom storefront with collections, product pages and a shopping bag',
      'Shade-aware product pages and a routine builder',
      'A checkout flow with payment through an established payment provider',
      'Photography-led pages designed to keep loading fast',
      'Email sign-up and a link to your social accounts',
      'For salons: services, price list and booking links to the tool you already use',
      'An honest recommendation on a custom build or a platform like Shopify for your catalogue and budget',
    ],
    proof: { slug: 'velora-beauty', note: 'An online beauty shop with fifteen pages, a routine builder, shade-aware products and a shopping bag.' },
    faq: [
      { q: 'Should we build custom, or use a platform like Shopify?', a: 'It depends on the size of your catalogue, how much control you need over the design and what you plan to add. We will give you an honest recommendation on the first call, even if the answer is a platform.' },
      { q: 'Can customers pay on the site?', a: 'Yes. Payments go through an established provider, so card details are handled by them and not by your website.' },
      { q: 'Do you offer photography or product images?', a: 'We design how photography is used and tell you which shots work best. We do not shoot or retouch products.' },
    ],
    reading: ['what-local-businesses-should-put-on-their-first-screen', 'how-much-does-a-business-website-cost'],
    serviceType: 'Beauty brand and online store design',
  },
  {
    slug: 'startup-website-design',
    name: 'Startups',
    anchor: 'MVP development and startup websites',
    icon: 'rocket-launch',
    menuText: 'Launch pages, waitlists and first versions',
    preview: { tag: 'For startups', title: 'A launch page, a waitlist and your first product version' },
    noun: 'startup website or MVP',
    buildTitle: 'What your MVP and startup website include',
    faqTitle: 'MVP development and startup website questions',
    metaTitle: 'MVP Development and Startup Website Design | Isogun Labs',
    metaDescription:
      'MVP development and startup website design: React and TypeScript web apps, SaaS landing pages and waitlists, for founders in the USA, Canada, UK, Europe and Nigeria.',
    h1: 'MVP development and startup website design, from one studio',
    lead: 'Early on, the website and the product have to move together. We build startup websites, SaaS landing pages and MVPs (the first working version of a product) for founders in the USA, Canada, the UK, Europe and Nigeria: a launch page that explains what you do in seconds, and a web app that real users can sign in to.',
    needsTitle: 'What investors and first users look for',
    needs: [
      { title: 'One sentence that says what you do', text: 'A first screen that explains the product and who it is for in a few seconds, with one clear action.' },
      { title: 'The product, shown', text: 'Screens, a short video or a working demo. People trust what they can see more than what they are told.' },
      { title: 'A way to sign up or join the waitlist', text: 'Collect interested people from day one, before the product is ready, and know where they came from.' },
      { title: 'Signs that it is real', text: 'Team, progress and, when you have them, users, press and backers. We never invent any of these.' },
      { title: 'A clear price or plan', text: 'Even a simple pricing section helps buyers decide and helps you learn what they will pay.' },
      { title: 'A site that is fast and easy to find', text: 'A fast, well-structured site with the basics of search set up from the start.' },
    ],
    build: [
      'A marketing site and landing page with a waitlist or sign-up form',
      'The first version of the product as a web app, in React and TypeScript',
      'Accounts, sign-in and role-based access',
      'Dashboards, admin screens and database or API integration',
      'Analytics so you can see where users come from and where they drop off',
      'Deployment and a clear launch plan',
      'Clean, documented code that your next developer can pick up',
    ],
    proof: { slug: 'weseeu', note: 'A therapy and special-needs marketplace we are building in phases, with accounts, sign-up and a practitioner dashboard.' },
    faq: [
      { q: 'Can you build the product and not only the website?', a: 'Yes. We build the marketing site and the first version of the product together, so the design and the code stay consistent. See web apps and MVPs on our services page.' },
      { q: 'How long does a first version take?', a: 'It depends on scope. We plan the smallest first version that real users can try, launch it, and grow from what you learn. We will give you a realistic timeline after the first call.' },
      { q: 'Who owns the code?', a: 'We agree ownership and handover in writing before the work starts, so there are no surprises later.' },
    ],
    reading: ['how-much-does-a-business-website-cost', 'what-to-have-ready-before-you-hire-a-web-designer'],
    serviceType: 'Startup website and MVP development',
  },
  {
    slug: 'website-redesign',
    name: 'Website redesign',
    anchor: 'Website redesign services',
    icon: 'arrows-clockwise',
    menuText: 'Fix a slow or dated site, keep your rankings',
    preview: { tag: 'Redesign', title: 'A clearer, faster site that keeps your rankings' },
    noun: 'website redesign',
    buildTitle: 'What a website redesign includes',
    faqTitle: 'Website redesign questions',
    metaTitle: 'Website Redesign Services for Businesses | Isogun Labs',
    metaDescription:
      'Website redesign for slow or dated sites, with redirects that keep your Google rankings. For businesses in the USA, Canada, UK, Europe and Nigeria.',
    h1: 'Website redesign for a site that no longer works for you',
    lead: 'If your website is slow, hard to use on a phone, or not bringing enquiries, a redesign can fix it without throwing away what is already working. We redesign websites for businesses in the USA, Canada, the UK, Europe and Nigeria, with a plan that protects the pages people already find in search.',
    needsTitle: 'Signs it is time for a redesign',
    needs: [
      { title: 'It looks out of date', text: 'The design no longer matches the business, and visitors judge you on it in the first few seconds.' },
      { title: 'It is slow, or breaks on a phone', text: 'Pages that take a long time to load, or are hard to use on a small screen, lose visitors before they read a word.' },
      { title: 'Visitors do not know what to do next', text: 'There is no clear action, or there are too many. A redesign puts the one step you want in front of them.' },
      { title: 'It is hard to update', text: 'Changing a price or a photo should not need a developer or a long wait.' },
      { title: 'It is hard to find', text: 'The pages are thin, the structure is confusing and search engines cannot tell what the site is about.' },
      { title: 'Nobody trusts it', text: 'Broken links, old information and missing contact details make a business look closed.' },
    ],
    build: [
      'A review of the current site, to decide what to keep, what to rewrite and what to remove',
      'A redirect plan, so every old address leads to the right new page and you do not lose search visibility',
      'A new design that works on phones first',
      'Your content moved over, edited where it helps, with new pages where something is missing',
      'Speed work: optimised images and lean pages',
      'Analytics set up before launch, so you can compare before and after',
      'A launch checklist and handover',
    ],
    proof: { slug: 'gloria-may-byron', note: 'A full redesign of an artist’s website, built from her own content, in sixteen languages.' },
    faq: [
      { q: 'Will I lose my Google rankings?', a: 'Not if the redesign is planned. We map every old address to a new one with redirects and keep the content that already works. No one can promise rankings stay identical, so we measure before and after.' },
      { q: 'Can I keep my domain name?', a: 'Yes. A redesign changes how the site looks and works, not your address.' },
      { q: 'Do we have to start from scratch?', a: 'No. We keep what is working, such as good text, photos and pages that already attract visitors, and rebuild the parts that are holding the site back.' },
    ],
    reading: ['website-redesign-checklist-signs-its-time', 'hidden-cost-of-cheap-websites'],
    serviceType: 'Website redesign',
  },
];

export const industryBySlug = (slug: string) => industries.find((i) => i.slug === slug)!;

/** Where we serve, used by the Service structured data and in page copy. */
export const areaServed = [
  { '@type': 'Country', name: 'United States' },
  { '@type': 'Country', name: 'Canada' },
  { '@type': 'Country', name: 'United Kingdom' },
  { '@type': 'Place', name: 'Europe' },
  { '@type': 'Country', name: 'Nigeria' },
];

/** Steps shown on every landing page. */
export const process = [
  { n: '1', title: 'A free call', text: 'Twenty minutes on the goal, the audience and what you already have. You leave knowing whether we are the right fit.' },
  { n: '2', title: 'A written plan', text: 'The pages, the features and the timeline in writing, with a quote, before any design work begins.' },
  { n: '3', title: 'Design and build', text: 'You see a working preview early and often, and tell us what to change while it is still easy to change.' },
  { n: '4', title: 'Launch and handover', text: 'We launch, check everything on real devices, and show you how to update the site yourself.' },
];
