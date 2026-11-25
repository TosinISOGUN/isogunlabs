export const navLinks: { href: string; label: string; menu?: boolean }[] = [
  { href: '/services/', label: 'Services', menu: true },
  { href: '/work/', label: 'Work' },
  { href: '/about/', label: 'About' },
  { href: '/blog/', label: 'Blog' },
  { href: '/get-started/', label: 'Products' },
];

export const ctaLabel = 'Start a project';
export const ctaHref = '/contact/';

export const contact = {
  // The shared address for project enquiries and app support alike (read by Oluwatomisin and Olayinka).
  projectEmail: 'support@isogunlabs.com',
  supportEmail: 'support@isogunlabs.com',
  // Shown on the About page cards. teamEmails follows the order of the team in the translations (Olayinka, Olaoluwa);
  // an empty string hides the address until the mailbox exists.
  founderEmail: 'tomisin@isogunlabs.com',
  teamEmails: ['', ''],
  booking: 'https://cal.com/oluwatomisin-isogun-disku5/20min',
  whatsapp: 'https://wa.me/2348153357775',
  // Where the enquiry form sends its messages. Paste a form-service address here, for example a Formspree
  // form URL (https://formspree.io/f/xxxxxxxx). While it is empty, the form opens the visitor's email app instead.
  formEndpoint: 'https://formspree.io/f/mjywerob',
  // Backup route: the address of the Worker in /worker (it emails through Resend and pings Telegram).
  // Leave empty until it is deployed. The form then sends to Formspree only.
  backupEndpoint: 'https://isogunlabs-enquiry.isogunlabs.workers.dev',
};

export const socialLinks = [
  { href: 'https://www.linkedin.com/company/isogun-labs', label: 'LinkedIn' },
  { href: 'https://x.com/isogunlabs', label: 'X (Twitter)' },
  { href: 'https://www.instagram.com/isogunlabs/', label: 'Instagram' },
  { href: 'https://www.youtube.com/@isogun_labs', label: 'YouTube' },
];
