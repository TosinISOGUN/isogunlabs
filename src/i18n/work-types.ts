/** Translated text for the Work pages: the page chrome and one entry per case study (order of glance and decisions follows the English data). */
export interface CaseText {
  type: string;
  status: string;
  role: string;
  line: string;
  brief: string;
  built: string;
  glance: { label: string; value: string }[];
  decisions: { label: string; value: string }[];
}

export interface WorkUi {
  indexTitle: string;
  indexDesc: string;
  crumb: string;
  h1: string;
  lead: string;
  caseStudy: string;
  visit: string;
  note: [string, string, string, string, string];
  indexCta: string;
  caseTitle: string;
  caseDesc: string;
  caseAria: string;
  visitSite: string;
  wantLike: string;
  statusLabel: string;
  roleLabel: string;
  briefH: string;
  builtH: string;
  decisionsH: string;
  similar: string;
  seeHow: string;
  moreWork: string;
  ctaH2: string;
}

export interface WorkText { ui: WorkUi; cases: Record<string, CaseText> }
