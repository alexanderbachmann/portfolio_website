export const metrics = [
  { label: 'Years in Data & Analytics', value: 6, icon: 'TrendingUp' },
  { label: 'Countries Worked In', value: 4, icon: 'Globe' },
  { label: 'World-Class Companies', value: 6, icon: 'Building2' },
  { label: 'Tools & Platforms Mastered', value: 10, suffix: '+', icon: 'Wrench' },
];

export const sqlQuery = {
  code: `SELECT name, role, passion
FROM data_professionals
WHERE creativity = 'HIGH'
  AND location = 'Barcelona';`,
  result: {
    columns: ['name', 'role', 'passion'],
    row: ['Janio', 'Global Product Owner', 'Turning complexity into decisions'],
    executionTime: '0.03s',
  },
};

export const countries = [
  { name: 'Dominican Republic', city: 'Santo Domingo', years: 'Born & raised', flag: 'DO', coordinates: [-69.9, 18.5] },
  { name: 'Germany', city: 'Frankfurt', years: '2019 - 2021', flag: 'DE', coordinates: [8.7, 50.1] },
  { name: 'Ireland', city: 'Dublin', years: '2021 - 2022', flag: 'IE', coordinates: [-6.3, 53.3] },
  { name: 'Spain', city: 'Barcelona', years: '2022 - Present', flag: 'ES', coordinates: [2.2, 41.4] },
];

export const catStats = {
  name: 'Himalayan Cat',
  metrics: [
    { label: 'Nap Hours / Day', value: 16, max: 24 },
    { label: 'Play Hours / Day', value: 3, max: 24 },
    { label: 'Judging Hours / Day', value: 5, max: 24 },
  ],
  countriesLived: 3,
  mood: 'Regal',
};

export const currentBook = {
  title: 'Inspired: How to Create Tech Products Customers Love',
  author: 'Marty Cagan',
  review: 'The definitive guide to product management — reshaping how I think about building data products.',
  booksThisYear: 12,
  goodreadsUrl: 'https://www.goodreads.com/user/show/139128464-janio-martinez-bachmann',
};

export const achievementMetrics = [
  { value: 6, label: 'Years in Data', description: 'Building analytics solutions since 2019' },
  { value: 4, label: 'Countries', description: 'Dominican Republic, Germany, Ireland, Spain' },
  { value: 5, suffix: 'days', prefix: '', label: 'to 0.5 Days', description: 'Reporting automation at Roche' },
  { value: 6, label: 'Global Companies', description: 'Including Google, ECB, Roche, Boehringer Ingelheim' },
];
