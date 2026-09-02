const LINKEDIN_URL =
  'https://www.linkedin.com/in/janio-martinez-bachmann-26040ba1/';

export const site = {
  name: 'Janio Martinez Bachmann',
  shortName: 'JMB',
  role: 'Global Product Owner · Data & BI',
  tagline:
    'Data without ownership is just noise. I take products from vision to scalable adoption, aligning teams, shaping strategy, and building solutions designed to grow with the business.',
  description:
    'Janio Martinez Bachmann: Global Product Owner specializing in Data & BI. 6+ years driving product outcomes at Google, Roche, ECB, and Boehringer Ingelheim.',
  url: 'https://portfolio-website-two-hazel-81.vercel.app',
  /* The only contact channel on the site. No personal email anywhere. */
  linkedin: LINKEDIN_URL,
};

export const socials = [
  { href: LINKEDIN_URL, label: 'LinkedIn' },
  { href: 'https://github.com/alexanderbachmann', label: 'GitHub' },
  { href: 'https://www.kaggle.com/janiobachmann', label: 'Kaggle' },
  {
    href: 'https://www.goodreads.com/user/show/139128464-janio-martinez-bachmann',
    label: 'GoodReads',
  },
];

export const navLinks = [
  { label: 'About', href: '/#about' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Blog', href: '/blog' },
];

/* Single source of truth for headline metrics
   (formerly duplicated in MetricsStrip.jsx and bio-metrics.js) */
export const metrics = [
  {
    value: 6,
    suffix: '+',
    label: 'Years in Data',
    description: 'Building analytics solutions since 2019',
  },
  {
    value: 5,
    suffix: '',
    label: 'Countries',
    description: 'Dominican Republic, Germany, Canada, Ireland, Spain',
  },
  {
    value: 6,
    suffix: '',
    label: 'Companies',
    description: 'Including Google, ECB, Roche',
  },
];

/* Download target for both CV buttons (hero and the bio grid card). */
export const CV_PATH = '/CV.pdf';

export const hero = {
  /* Status pill above the kicker: 'location' | 'availability' | 'none'.
     'location' is built from experiences[0] and is always factual.
     'availability' is a claim: switch it on only while it is true. */
  status: 'none',
  availabilityText: 'Open to new opportunities',
  primaryCta: 'Get in touch',
  cvCta: 'Download CV',
  logoStripLabel: 'Where I’ve worked',
};

/* Section headers. `highlight` is the one gradient word per section and
   must appear verbatim inside `title`. */
export const sections = {
  about: {
    index: '01',
    eyebrow: 'About',
    title: 'Data products, owned end to end',
    highlight: 'owned',
    description: 'A few things about how I work and who I am.',
  },
  skills: {
    index: '02',
    eyebrow: 'Skills',
    title: 'Competencies & toolkit',
    highlight: 'toolkit',
    description:
      'Product leadership capabilities and the tools that enable them',
  },
  experience: {
    index: '03',
    eyebrow: 'Experience',
    title: 'Where I’ve built and shipped',
    highlight: 'shipped',
    description:
      'Six companies, three countries, from growth and finance analytics to global data products.',
  },
  projects: {
    index: '04',
    eyebrow: 'Projects',
    title: 'Apps, dashboards, and data products',
    highlight: 'products',
  },
  accomplishments: {
    index: '05',
    eyebrow: 'Recognition',
    title: 'Career highlights and community impact',
    highlight: 'impact',
  },
  writing: {
    index: '06',
    eyebrow: 'Writing',
    title: 'Latest writing',
    highlight: 'writing',
    pageTitle: 'Writing',
    description:
      'Notes on data products, ownership, and building things that scale.',
    allPosts: 'All posts',
  },
};

export const contact = {
  kicker: 'What’s next?',
  heading: 'Let’s build',
  headingAccent: 'something.',
  description:
    'Have a question, want to collaborate, or just want to connect? I’m always happy to hear from product, data, and analytics leaders. The fastest way to reach me is a message on LinkedIn.',
  cta: 'Message me on LinkedIn',
  basedInLabel: 'Based in',
};
