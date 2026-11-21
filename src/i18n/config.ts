// Languages, URL helpers and which pages exist in which language.
// English lives at the site root (/about/). Every other language lives under its own prefix (/fr/about/).

export const locales = ['en', 'fr', 'es', 'de', 'pt'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';
export const otherLocales = locales.filter((l) => l !== 'en') as Exclude<Locale, 'en'>[];

export const localeInfo: Record<Locale, { name: string; region: string; short: string; htmlLang: string; ogLocale: string; flag: string | null }> = {
  en: { name: 'English', region: 'Global', short: 'EN', htmlLang: 'en', ogLocale: 'en_US', flag: null },
  fr: { name: 'Français', region: 'France, Canada, Belgique', short: 'FR', htmlLang: 'fr', ogLocale: 'fr_FR', flag: '/assets/flags/fr.svg' },
  es: { name: 'Español', region: 'España, Latinoamérica', short: 'ES', htmlLang: 'es', ogLocale: 'es_ES', flag: '/assets/flags/es.svg' },
  de: { name: 'Deutsch', region: 'Deutschland, Österreich', short: 'DE', htmlLang: 'de', ogLocale: 'de_DE', flag: '/assets/flags/de.svg' },
  pt: { name: 'Português', region: 'Portugal, Brasil', short: 'PT', htmlLang: 'pt', ogLocale: 'pt_PT', flag: '/assets/flags/pt.svg' },
};

export const industrySlugs = [
  'restaurant-website-design',
  'clinic-website-design',
  'realtor-website-design',
  'gym-website-design',
  'beauty-brand-website-design',
  'startup-website-design',
  'website-redesign',
];

/** Pages that exist in every language (paths without a language prefix). */
export const translatedPaths = new Set<string>([
  '/',
  '/services/',
  '/about/',
  '/contact/',
  '/contact/thanks/',
  // The seven industry pages are still English-only; add them here once they are translated:
  // ...industrySlugs.map((s) => `/services/${s}/`),
]);

/** Splits "/fr/about/" into { lang: 'fr', path: '/about/' }. Paths without a prefix are English. */
export function splitLocale(pathname: string): { lang: Locale; path: string } {
  const m = pathname.match(/^\/(fr|es|de|pt)(\/.*)?$/);
  if (!m) return { lang: 'en', path: pathname };
  return { lang: m[1] as Locale, path: m[2] || '/' };
}

export const localePath = (lang: Locale, path: string) => (lang === 'en' ? path : `/${lang}${path === '/' ? '/' : path}`);

/** Link to a page in the visitor's language when it exists, otherwise to the English page. */
export const l = (lang: Locale, path: string) => {
  const [base, hash] = path.split('#');
  return (translatedPaths.has(base) ? localePath(lang, base) : base) + (hash ? `#${hash}` : '');
};

/** The same page in another language: the translated page if there is one, else its nearest translated parent
 *  (an industry page falls back to the services overview), else that language's home page. */
export function switchTarget(currentPath: string, to: Locale) {
  const { path } = splitLocale(currentPath);
  if (to === 'en') return path;
  let p = path;
  while (p !== '/' && !translatedPaths.has(p)) p = p.slice(0, p.slice(0, -1).lastIndexOf('/') + 1);
  return localePath(to, translatedPaths.has(p) ? p : '/');
}

/** hreflang alternates for a page, or none when the page only exists in English. */
export function alternatesFor(currentPath: string) {
  const { path } = splitLocale(currentPath);
  if (!translatedPaths.has(path)) return [];
  return [
    ...locales.map((lang) => ({ hreflang: localeInfo[lang].htmlLang, path: localePath(lang, path) })),
    { hreflang: 'x-default', path },
  ];
}
