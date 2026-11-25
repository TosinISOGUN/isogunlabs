// One-off helper: creates the route files for pages that exist in every language.
//   node scripts/make-routes.mjs how-we-work:HowWePage pricing:PricingPage care-plans:CarePage
import { mkdirSync, writeFileSync } from 'node:fs';

for (const arg of process.argv.slice(2)) {
  const [slug, comp] = arg.split(':');
  mkdirSync(`src/pages/${slug}`, { recursive: true });
  mkdirSync(`src/pages/[lang]/${slug}`, { recursive: true });
  writeFileSync(`src/pages/${slug}/index.astro`, `---\nimport ${comp} from '../../components/pages/${comp}.astro';\n---\n<${comp} lang="en" />\n`);
  writeFileSync(
    `src/pages/[lang]/${slug}/index.astro`,
    `---\nimport ${comp} from '../../../components/pages/${comp}.astro';\nimport { otherLocales } from '../../../i18n/config';\n\nexport function getStaticPaths() {\n  return otherLocales.map((lang) => ({ params: { lang } }));\n}\nconst { lang } = Astro.params;\n---\n<${comp} lang={lang as any} />\n`,
  );
  console.log('routes for', slug);
}
