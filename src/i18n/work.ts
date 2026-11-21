import { caseStudies, type CaseStudy } from '../data/caseStudies';
import type { Locale } from './config';
import type { WorkUi, WorkText } from './work-types';
import { workFr } from './work-fr';
import { workEs } from './work-es';
import { workDe } from './work-de';
import { workPt } from './work-pt';

const enUi: WorkUi = {
  indexTitle: 'Web Design Portfolio and Case Studies | Isogun Labs',
  indexDesc: 'Web design case studies: restaurant, clinic, real estate and beauty store websites, an artist site and a startup platform, designed and built from scratch.',
  crumb: 'Work',
  h1: 'Selected web design and development work',
  lead: 'Websites, online stores and web platforms for restaurants, clinics, real estate, beauty brands, artists and startups, each designed and coded from scratch.',
  caseStudy: 'Case study',
  visit: 'Visit site',
  note: ['More websites and platforms, including booking and marketplace builds, are on ', 'portfolio.isogunlabs.com', '. Our three Atlassian Marketplace apps are on the ', 'Atlassian apps', ' page.'],
  indexCta: 'Want something like this?',
  caseTitle: '{name}: {type} Case Study | Isogun Labs',
  caseDesc: '{line} How Isogun Labs designed and built it.',
  caseAria: '{name} case study',
  visitSite: 'Visit the site',
  wantLike: 'Want something like this?',
  statusLabel: 'Status',
  roleLabel: 'Our role',
  briefH: 'The brief',
  builtH: 'What we built',
  decisionsH: 'Decisions that shaped it',
  similar: 'Need something similar?',
  seeHow: 'See how we work with {name}',
  moreWork: 'More work',
  ctaH2: 'Have a project in mind?',
};

const texts: Record<Exclude<Locale, 'en'>, WorkText> = { fr: workFr, es: workEs, de: workDe, pt: workPt };

/** The Work page copy and the case studies in the given language. */
export function workFor(lang: Locale): { ui: WorkUi; cases: CaseStudy[] } {
  if (lang === 'en') return { ui: enUi, cases: caseStudies };
  const t = texts[lang];
  return {
    ui: t.ui,
    cases: caseStudies.map((c) => {
      const x = t.cases[c.slug];
      return { ...c, type: x.type, status: x.status, role: x.role, line: x.line, brief: x.brief, built: x.built, glance: x.glance, decisions: x.decisions, alt: c.name };
    }),
  };
}
