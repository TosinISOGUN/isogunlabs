// Client testimonials shown on the home page and on the matching case study.
// Rules: only real words from a real client who agreed to publish them (collect them on /testimonial/),
// and never edit the meaning. While this list is empty, no testimonial section appears anywhere on the site.
//
// To add one, copy a line from a /testimonial/ submission (it arrives on Telegram and by email):
//   { quote: 'Their words here.', name: 'First Last', role: 'Singer and songwriter', rating: 5, caseSlug: 'gloria-may-byron' }
// caseSlug is optional: it also shows the quote on that project's case study page.

export interface Testimonial {
  quote: string;
  name: string;
  role?: string;
  rating?: number;
  caseSlug?: string;
}

export const testimonials: Testimonial[] = [];
