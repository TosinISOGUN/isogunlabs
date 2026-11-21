// Short labels for the seven industry pages in each language: the Services menu, the footer and the services page.
// (The full landing-page copy is translated separately.)
import { industries } from '../data/industries';
import type { Locale } from './config';

type Label = { name: string; anchor: string; menuText: string; tag: string; title: string };

const labels: Record<Exclude<Locale, 'en'>, Record<string, Label>> = {
  fr: {
    'restaurant-website-design': { name: 'Restaurants', anchor: 'Création de site pour restaurant', menuText: 'Cartes, commande en ligne et réservation', tag: 'Pour les restaurants', title: 'Carte, commande en ligne et réservation de table' },
    'clinic-website-design': { name: 'Cliniques', anchor: 'Création de site pour dentiste et clinique', menuText: 'Pages de soins et demandes de rendez-vous', tag: 'Pour les cliniques', title: 'Des pages de soins claires et une prise de rendez-vous simple' },
    'realtor-website-design': { name: 'Agents immobiliers', anchor: 'Création de site pour agent immobilier', menuText: 'Recherche de biens, guides de quartier et estimations', tag: 'Pour les agents immobiliers', title: 'Recherche de biens, guides de quartier et demandes d’estimation' },
    'gym-website-design': { name: 'Salles de sport', anchor: 'Création de site pour salle de sport', menuText: 'Plannings de cours, abonnements et essais', tag: 'Pour les salles de sport', title: 'Planning des cours, abonnements et inscription à l’essai gratuit' },
    'beauty-brand-website-design': { name: 'Marques de beauté', anchor: 'Création de site pour marque de beauté', menuText: 'Boutiques en ligne avec produits par teinte', tag: 'Pour les marques de beauté', title: 'Produits par teinte et paiement simple' },
    'startup-website-design': { name: 'Startups', anchor: 'Développement de MVP et sites de startup', menuText: 'Pages de lancement, listes d’attente et premières versions', tag: 'Pour les startups', title: 'Une page de lancement, une liste d’attente et la première version de votre produit' },
    'website-redesign': { name: 'Refonte de site', anchor: 'Services de refonte de site web', menuText: 'Un site lent ou daté, sans perdre votre référencement', tag: 'Refonte', title: 'Un site plus clair et plus rapide qui conserve votre référencement' },
  },
  es: {
    'restaurant-website-design': { name: 'Restaurantes', anchor: 'Diseño web para restaurantes', menuText: 'Cartas, pedidos online y reservas', tag: 'Para restaurantes', title: 'Carta, pedidos online y reserva de mesa' },
    'clinic-website-design': { name: 'Clínicas', anchor: 'Diseño web para dentistas y clínicas', menuText: 'Páginas de tratamientos y solicitudes de cita', tag: 'Para clínicas', title: 'Páginas de tratamientos claras y solicitud de cita sencilla' },
    'realtor-website-design': { name: 'Inmobiliarias', anchor: 'Diseño web para agentes inmobiliarios', menuText: 'Búsqueda de viviendas, guías de zona y valoraciones', tag: 'Para inmobiliarias', title: 'Búsqueda de viviendas, guías de zona y solicitudes de valoración' },
    'gym-website-design': { name: 'Gimnasios', anchor: 'Diseño web para gimnasios y fitness', menuText: 'Horarios de clases, cuotas y pruebas', tag: 'Para gimnasios', title: 'Horario de clases, cuotas y registro de prueba gratuita' },
    'beauty-brand-website-design': { name: 'Marcas de belleza', anchor: 'Diseño web para marcas de belleza', menuText: 'Tiendas online con productos por tono', tag: 'Para marcas de belleza', title: 'Productos por tono y un pago sencillo' },
    'startup-website-design': { name: 'Startups', anchor: 'Desarrollo de MVP y webs para startups', menuText: 'Páginas de lanzamiento, listas de espera y primeras versiones', tag: 'Para startups', title: 'Una página de lanzamiento, una lista de espera y la primera versión de tu producto' },
    'website-redesign': { name: 'Rediseño web', anchor: 'Servicios de rediseño web', menuText: 'Arregla un sitio lento o anticuado sin perder posicionamiento', tag: 'Rediseño', title: 'Un sitio más claro y rápido que conserva tu posicionamiento' },
  },
  de: {
    'restaurant-website-design': { name: 'Restaurants', anchor: 'Website-Design für Restaurants', menuText: 'Speisekarten, Online-Bestellung und Reservierung', tag: 'Für Restaurants', title: 'Speisekarte, Online-Bestellung und Tischreservierung' },
    'clinic-website-design': { name: 'Praxen', anchor: 'Website-Design für Zahnärzte und Praxen', menuText: 'Behandlungsseiten und Terminanfragen', tag: 'Für Praxen', title: 'Klare Behandlungsseiten und einfache Terminanfragen' },
    'realtor-website-design': { name: 'Immobilienmakler', anchor: 'Website-Design für Immobilienmakler', menuText: 'Immobiliensuche, Stadtteilführer und Bewertungen', tag: 'Für Immobilienmakler', title: 'Immobiliensuche, Stadtteilführer und Bewertungsanfragen' },
    'gym-website-design': { name: 'Fitnessstudios', anchor: 'Website-Design für Fitnessstudios', menuText: 'Kursplan, Mitgliedschaften und Probetraining', tag: 'Für Fitnessstudios', title: 'Kursplan, Mitgliedschaften und Anmeldung zum Probetraining' },
    'beauty-brand-website-design': { name: 'Beauty-Marken', anchor: 'Website-Design für Beauty-Marken', menuText: 'Onlineshops mit Produkten nach Farbton', tag: 'Für Beauty-Marken', title: 'Produkte nach Farbton und ein einfacher Checkout' },
    'startup-website-design': { name: 'Startups', anchor: 'MVP-Entwicklung und Startup-Websites', menuText: 'Launch-Seiten, Wartelisten und erste Versionen', tag: 'Für Startups', title: 'Eine Launch-Seite, eine Warteliste und die erste Version Ihres Produkts' },
    'website-redesign': { name: 'Website-Relaunch', anchor: 'Website-Relaunch für Unternehmen', menuText: 'Langsame oder veraltete Website erneuern, Rankings behalten', tag: 'Relaunch', title: 'Eine klarere, schnellere Website, die Ihre Rankings behält' },
  },
  pt: {
    'restaurant-website-design': { name: 'Restaurantes', anchor: 'Design de sites para restaurantes', menuText: 'Ementas, encomendas online e reservas', tag: 'Para restaurantes', title: 'Ementa, encomendas online e reserva de mesa' },
    'clinic-website-design': { name: 'Clínicas', anchor: 'Design de sites para dentistas e clínicas', menuText: 'Páginas de tratamentos e pedidos de consulta', tag: 'Para clínicas', title: 'Páginas de tratamentos claras e pedidos de consulta simples' },
    'realtor-website-design': { name: 'Mediadores imobiliários', anchor: 'Design de sites para mediadores imobiliários', menuText: 'Pesquisa de imóveis, guias de zona e avaliações', tag: 'Para mediadores imobiliários', title: 'Pesquisa de imóveis, guias de zona e pedidos de avaliação' },
    'gym-website-design': { name: 'Ginásios', anchor: 'Design de sites para ginásios e fitness', menuText: 'Horários de aulas, mensalidades e aulas experimentais', tag: 'Para ginásios', title: 'Horário de aulas, mensalidades e inscrição na aula experimental gratuita' },
    'beauty-brand-website-design': { name: 'Marcas de beleza', anchor: 'Design de sites para marcas de beleza', menuText: 'Lojas online com produtos por tom', tag: 'Para marcas de beleza', title: 'Produtos por tom e um pagamento simples' },
    'startup-website-design': { name: 'Startups', anchor: 'Desenvolvimento de MVP e sites para startups', menuText: 'Páginas de lançamento, listas de espera e primeiras versões', tag: 'Para startups', title: 'Uma página de lançamento, uma lista de espera e a primeira versão do seu produto' },
    'website-redesign': { name: 'Remodelação de sites', anchor: 'Serviços de remodelação de sites', menuText: 'Renove um site lento ou desatualizado sem perder posicionamento', tag: 'Remodelação', title: 'Um site mais claro e rápido que mantém o seu posicionamento' },
  },
};

/** The industries with their short labels in the given language (English is the data file itself). */
export function industriesFor(lang: Locale) {
  if (lang === 'en') return industries;
  return industries.map((i) => {
    const t = labels[lang][i.slug];
    return { ...i, name: t.name, anchor: t.anchor, menuText: t.menuText, preview: { tag: t.tag, title: t.title } };
  });
}
