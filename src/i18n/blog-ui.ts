import type { Locale } from './config';

export interface BlogUi {
  dateLocale: string;
  indexTitle: string;
  indexDesc: string;
  h1: string;
  lead: string;
  crumb: string;
  minRead: string;
  readNext: string;
  pageTitle: string; // appended to the title on page 2 and later, {n} is the page number
  pagerNav: string;
  newer: string;
  older: string;
  pageLabel: string; // aria-label for a page number, {n}
  filterAria: string;
  all: string;
  share: { label: string; x: string; linkedin: string; instagram: string; copy: string; copiedIg: string; copied: string };
  sidebar: { qH: string; qP: string; qLink: string; whatH: string; whatP: string };
  cta: { h2: string; before: string; l1: string; m1: string; l2: string; m2: string; l3: string; end: string };
  categories: Record<'fields' | 'report' | 'market' | 'trust' | 'web', string>;
}

export const blogUi: Record<Locale, BlogUi> = {
  en: {
    dateLocale: 'en-US',
    indexTitle: 'Blog: Websites, Web Design and Atlassian Apps | Isogun Labs',
    indexDesc: 'Practical writing from Isogun Labs on building websites and web apps, working with Atlassian Jira, and shipping apps to the Atlassian Marketplace.',
    h1: 'Notes from the studio',
    lead: 'Practical writing on building websites and web apps, working with Jira, and shipping apps to the Atlassian Marketplace.',
    crumb: 'Blog',
    minRead: 'min read',
    readNext: 'Read next',
    pageTitle: 'Page {n}',
    pagerNav: 'Blog pages',
    newer: 'Newer posts',
    older: 'Older posts',
    pageLabel: 'Page {n}',
    filterAria: 'Filter posts by category',
    all: 'All',
    share: { label: 'Share this post', x: 'Share on X', linkedin: 'Share on LinkedIn', instagram: 'Copy link to share on Instagram', copy: 'Copy link', copiedIg: 'Link copied. Paste it into your bio or story.', copied: 'Link copied' },
    sidebar: { qH: 'Got a question?', qP: 'We read every email ourselves. There is no support queue and no bot. Ask us anything about websites, Jira admin, our apps or what we are building next.', qLink: 'Start a project', whatH: 'What we write about', whatP: 'Practical notes on building websites and web apps, Jira admin, status reporting and shipping focused apps on Atlassian Forge. No filler, no listicles.' },
    cta: { h2: 'Need a website or app built?', before: 'Isogun Labs designs and builds websites, web apps and Atlassian Marketplace apps. See ', l1: 'what we build', m1: ', browse ', l2: 'recent work', m2: ', or ', l3: 'start a project', end: '.' },
    categories: { fields: 'Field Hygiene', report: 'Status Reports', market: 'Marketplace', trust: 'Trust & Security', web: 'Websites' },
  },
  fr: {
    dateLocale: 'fr-FR',
    indexTitle: 'Blog : sites web, design web et applications Atlassian | Isogun Labs',
    indexDesc: 'Des articles pratiques d’Isogun Labs sur la création de sites web et d’applications web, le travail avec Atlassian Jira et la publication d’applications sur l’Atlassian Marketplace.',
    h1: 'Notes du studio',
    lead: 'Des articles pratiques sur la création de sites web et d’applications web, le travail avec Jira et la publication d’applications sur l’Atlassian Marketplace.',
    crumb: 'Blog',
    minRead: 'min de lecture',
    readNext: 'À lire ensuite',
    pageTitle: 'Page {n}',
    pagerNav: 'Pages du blog',
    newer: 'Articles plus récents',
    older: 'Articles plus anciens',
    pageLabel: 'Page {n}',
    filterAria: 'Filtrer les articles par catégorie',
    all: 'Tous',
    share: { label: 'Partager cet article', x: 'Partager sur X', linkedin: 'Partager sur LinkedIn', instagram: 'Copier le lien pour le partager sur Instagram', copy: 'Copier le lien', copiedIg: 'Lien copié. Collez-le dans votre bio ou votre story.', copied: 'Lien copié' },
    sidebar: { qH: 'Une question ?', qP: 'Nous lisons chaque e-mail nous-mêmes. Il n’y a ni file d’attente de support ni robot. Posez-nous toutes vos questions sur les sites web, l’administration de Jira, nos applications ou ce que nous construisons ensuite.', qLink: 'Démarrer un projet', whatH: 'De quoi nous parlons', whatP: 'Des notes pratiques sur la création de sites et d’applications web, l’administration de Jira, les rapports d’avancement et la publication d’applications ciblées sur Atlassian Forge. Pas de remplissage, pas de listes pour le plaisir.' },
    cta: { h2: 'Besoin d’un site ou d’une application ?', before: 'Isogun Labs conçoit et construit des sites web, des applications web et des applications Atlassian Marketplace. Découvrez ', l1: 'ce que nous construisons', m1: ', parcourez ', l2: 'nos réalisations récentes', m2: ' ou ', l3: 'démarrez un projet', end: '.' },
    categories: { fields: 'Field Hygiene', report: 'Rapports d’avancement', market: 'Marketplace', trust: 'Confiance et sécurité', web: 'Sites web' },
  },
  es: {
    dateLocale: 'es-ES',
    indexTitle: 'Blog: sitios web, diseño web y aplicaciones de Atlassian | Isogun Labs',
    indexDesc: 'Artículos prácticos de Isogun Labs sobre cómo crear sitios web y aplicaciones web, trabajar con Atlassian Jira y publicar aplicaciones en Atlassian Marketplace.',
    h1: 'Notas desde el estudio',
    lead: 'Artículos prácticos sobre cómo crear sitios web y aplicaciones web, trabajar con Jira y publicar aplicaciones en Atlassian Marketplace.',
    crumb: 'Blog',
    minRead: 'min de lectura',
    readNext: 'Sigue leyendo',
    pageTitle: 'Página {n}',
    pagerNav: 'Páginas del blog',
    newer: 'Artículos más recientes',
    older: 'Artículos más antiguos',
    pageLabel: 'Página {n}',
    filterAria: 'Filtrar artículos por categoría',
    all: 'Todos',
    share: { label: 'Comparte este artículo', x: 'Compartir en X', linkedin: 'Compartir en LinkedIn', instagram: 'Copiar el enlace para compartirlo en Instagram', copy: 'Copiar enlace', copiedIg: 'Enlace copiado. Pégalo en tu biografía o en tu historia.', copied: 'Enlace copiado' },
    sidebar: { qH: '¿Tienes una pregunta?', qP: 'Leemos cada correo nosotros mismos. No hay cola de soporte ni bot. Pregúntanos lo que quieras sobre sitios web, administración de Jira, nuestras aplicaciones o lo que construiremos a continuación.', qLink: 'Empezar un proyecto', whatH: 'De qué escribimos', whatP: 'Notas prácticas sobre cómo crear sitios y aplicaciones web, administración de Jira, informes de estado y publicación de aplicaciones concretas en Atlassian Forge. Sin relleno ni listas porque sí.' },
    cta: { h2: '¿Necesitas un sitio web o una aplicación?', before: 'Isogun Labs diseña y construye sitios web, aplicaciones web y aplicaciones de Atlassian Marketplace. Mira ', l1: 'lo que construimos', m1: ', recorre ', l2: 'nuestros proyectos recientes', m2: ' o ', l3: 'empieza un proyecto', end: '.' },
    categories: { fields: 'Field Hygiene', report: 'Informes de estado', market: 'Marketplace', trust: 'Confianza y seguridad', web: 'Sitios web' },
  },
  de: {
    dateLocale: 'de-DE',
    indexTitle: 'Blog: Websites, Webdesign und Atlassian-Apps | Isogun Labs',
    indexDesc: 'Praxisnahe Beiträge von Isogun Labs über den Bau von Websites und Web-Apps, die Arbeit mit Atlassian Jira und die Veröffentlichung von Apps im Atlassian Marketplace.',
    h1: 'Notizen aus dem Studio',
    lead: 'Praxisnahe Beiträge über den Bau von Websites und Web-Apps, die Arbeit mit Jira und die Veröffentlichung von Apps im Atlassian Marketplace.',
    crumb: 'Blog',
    minRead: 'Min. Lesezeit',
    readNext: 'Als Nächstes lesen',
    pageTitle: 'Seite {n}',
    pagerNav: 'Blogseiten',
    newer: 'Neuere Beiträge',
    older: 'Ältere Beiträge',
    pageLabel: 'Seite {n}',
    filterAria: 'Beiträge nach Kategorie filtern',
    all: 'Alle',
    share: { label: 'Diesen Beitrag teilen', x: 'Auf X teilen', linkedin: 'Auf LinkedIn teilen', instagram: 'Link kopieren, um ihn auf Instagram zu teilen', copy: 'Link kopieren', copiedIg: 'Link kopiert. Fügen Sie ihn in Ihre Bio oder Story ein.', copied: 'Link kopiert' },
    sidebar: { qH: 'Haben Sie eine Frage?', qP: 'Wir lesen jede E-Mail selbst. Es gibt keine Support-Warteschlange und keinen Bot. Fragen Sie uns alles zu Websites, Jira-Administration, unseren Apps oder dazu, was wir als Nächstes bauen.', qLink: 'Projekt starten', whatH: 'Worüber wir schreiben', whatP: 'Praxisnahe Notizen zum Bau von Websites und Web-Apps, zur Jira-Administration, zu Statusberichten und zur Veröffentlichung fokussierter Apps auf Atlassian Forge. Kein Füllstoff, keine Listen um der Listen willen.' },
    cta: { h2: 'Sie brauchen eine Website oder App?', before: 'Isogun Labs gestaltet und baut Websites, Web-Apps und Atlassian-Marketplace-Apps. Sehen Sie, ', l1: 'was wir bauen', m1: ', stöbern Sie in ', l2: 'aktuellen Projekten', m2: ' oder ', l3: 'starten Sie ein Projekt', end: '.' },
    categories: { fields: 'Field Hygiene', report: 'Statusberichte', market: 'Marketplace', trust: 'Vertrauen und Sicherheit', web: 'Websites' },
  },
  pt: {
    dateLocale: 'pt-PT',
    indexTitle: 'Blogue: sites, design web e aplicações Atlassian | Isogun Labs',
    indexDesc: 'Artigos práticos da Isogun Labs sobre como criar sites e aplicações web, trabalhar com o Atlassian Jira e publicar aplicações no Atlassian Marketplace.',
    h1: 'Notas do estúdio',
    lead: 'Artigos práticos sobre como criar sites e aplicações web, trabalhar com o Jira e publicar aplicações no Atlassian Marketplace.',
    crumb: 'Blogue',
    minRead: 'min de leitura',
    readNext: 'Ler a seguir',
    pageTitle: 'Página {n}',
    pagerNav: 'Páginas do blogue',
    newer: 'Artigos mais recentes',
    older: 'Artigos mais antigos',
    pageLabel: 'Página {n}',
    filterAria: 'Filtrar artigos por categoria',
    all: 'Todos',
    share: { label: 'Partilhe este artigo', x: 'Partilhar no X', linkedin: 'Partilhar no LinkedIn', instagram: 'Copiar a ligação para partilhar no Instagram', copy: 'Copiar ligação', copiedIg: 'Ligação copiada. Cole-a na sua bio ou no seu story.', copied: 'Ligação copiada' },
    sidebar: { qH: 'Tem uma pergunta?', qP: 'Lemos cada e-mail nós próprios. Não há fila de suporte nem bot. Pergunte-nos o que quiser sobre sites, administração do Jira, as nossas aplicações ou o que vamos construir a seguir.', qLink: 'Iniciar um projeto', whatH: 'Sobre o que escrevemos', whatP: 'Notas práticas sobre como criar sites e aplicações web, administração do Jira, relatórios de estado e publicação de aplicações focadas no Atlassian Forge. Sem enchimento nem listas por listar.' },
    cta: { h2: 'Precisa de um site ou de uma aplicação?', before: 'A Isogun Labs desenha e constrói sites, aplicações web e aplicações do Atlassian Marketplace. Veja ', l1: 'o que construímos', m1: ', explore ', l2: 'os projetos recentes', m2: ' ou ', l3: 'inicie um projeto', end: '.' },
    categories: { fields: 'Field Hygiene', report: 'Relatórios de estado', market: 'Marketplace', trust: 'Confiança e segurança', web: 'Sites' },
  },
};
