/** The translated text of one industry landing page (the English original is in src/data/industries.ts). */
export interface IndustryText {
  /** With its article, for the questions: "un site web de restaurant". */
  noun: string;
  buildTitle: string;
  faqTitle: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  lead: string;
  needsTitle: string;
  needs: { title: string; text: string }[];
  build: string[];
  /** The one-line note under the case study card (empty when the page has no case study). */
  proofNote: string;
  faq: { q: string; a: string }[];
}
