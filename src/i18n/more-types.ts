/** Text for the Atlassian products page, the documentation page and the support page. Paragraphs marked html may contain <strong>. */
export interface MoreText {
  getStarted: {
    title: string; description: string; crumb: string; h1: string; lead: string;
    cards: { label: string; h3: string; p: string; list: [string, string, string] }[];
    marketplace: string; product: string; ctaH2: string; ctaP: string; email: string; docs: string;
  };
  docs: {
    title: string; description: string; ogDescription: string; crumb: string; h1: string; lead: string;
    tiles: { t: string; d: string }[];
    helpBefore: string; helpAfter: string;
  };
  support: {
    title: string; description: string; ogDescription: string; crumb: string; h1: string; lead: string;
    reachH: string; reachBefore: string; reachAfter: string;
    hoursH: string; weekAria: string; days: string[]; hoursHtml: string;
    responseH: string; responseHtml: string;
    scopeH: string; scopeP: string;
    secBefore: string; secLink1: string; secMid: string; secLink2: string; secAfter: string;
  };
}
