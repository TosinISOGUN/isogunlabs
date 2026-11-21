import { en } from './en';
import { fr } from './fr';
import { es } from './es';
import { de } from './de';
import { pt } from './pt';
import { splitLocale, type Locale } from './config';

export const dict = { en, fr, es, de, pt };

/** Language and copy for the page being rendered, from its URL. */
export function pageLang(pathname: string) {
  const { lang, path } = splitLocale(pathname);
  return { lang, path, t: dict[lang] };
}

export const fill = (s: string, vars: Record<string, string>) => s.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? '');
export type { Locale };
