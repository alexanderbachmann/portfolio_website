/* Headline metrics live in src/data/site.js */

export const sqlQuery = {
  code: `SELECT name, role, passion
FROM data_professionals
WHERE creativity = 'HIGH'
  AND role = 'Global Product Owner';`,
  result: {
    columns: ['name', 'role', 'passion'],
    row: ['Janio', 'Global Product Owner', 'Turning complexity into decisions'],
    executionTime: '0.03s',
  },
};

export const countries = [
  { name: 'Dominican Republic', city: 'Santo Domingo', years: 'Born & raised', flag: 'DO', coordinates: [-69.9, 18.5] },
  { name: 'Germany', city: 'Munich', years: "Bachelor's degree", flag: 'DE', coordinates: [11.6, 48.1] },
  { name: 'Canada', city: 'Toronto', years: 'Postgrad studies', flag: 'CA', coordinates: [-79.4, 43.7] },
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
  mood: 'Pampered',
};

export const currentBook = {
  title: 'Inspired: How to Create Tech Products Customers Love',
  author: 'Marty Cagan',
  review: 'The definitive guide to product management, reshaping how I think about building data products.',
  booksThisYear: 12,
  goodreadsUrl: 'https://www.goodreads.com/user/show/139128464-janio-martinez-bachmann',
};
