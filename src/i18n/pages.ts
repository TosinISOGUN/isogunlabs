import type { Locale } from './config';
import { pagesEn, type PagesText } from './pages-en';
import { pagesFr } from './pages-fr';
import { pagesEs } from './pages-es';
import { pagesDe } from './pages-de';
import { pagesPt } from './pages-pt';

const all: Record<Locale, PagesText> = { en: pagesEn, fr: pagesFr, es: pagesEs, de: pagesDe, pt: pagesPt };
/** Copy for the How we work, Pricing and Care plans pages, and the footer links to them. */
export const pagesFor = (lang: Locale) => all[lang];
