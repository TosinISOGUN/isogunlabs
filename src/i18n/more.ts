import type { Locale } from './config';
import type { MoreText } from './more-types';
import { moreEn } from './more-en';
import { moreFr } from './more-fr';
import { moreEs } from './more-es';
import { moreDe } from './more-de';
import { morePt } from './more-pt';

const all: Record<Locale, MoreText> = { en: moreEn, fr: moreFr, es: moreEs, de: moreDe, pt: morePt };
export const moreFor = (lang: Locale) => all[lang];
