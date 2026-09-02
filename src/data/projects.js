/* `hue` tints each card's cover band (see projects.css); `badge` is an
   optional short pill shown on the cover. */
export const projects = [
  {
    id: 'google-trends',
    title: 'Google Trends Explorer',
    description:
      'Interactive Shiny dashboard for exploring and analyzing Google search trends across regions, time periods, and categories. Enables rapid insight discovery from real-time search interest data.',
    tags: ['R', 'Shiny', 'Google Trends', 'Data Visualization'],
    icon: 'TrendingUp',
    hue: 210,
    link: {
      url: 'https://janiobachmann.shinyapps.io/google_trends/',
      label: 'Live App',
    },
  },
  {
    id: 'ds-jobs',
    title: 'Data Science Jobs Analytics',
    description:
      'Interactive dashboard analyzing data science job market trends: salaries, skills demand, and geographic distribution. Built to help professionals and hiring managers understand the evolving landscape.',
    tags: ['R', 'Shiny', 'Analytics', 'Labor Market'],
    icon: 'BarChart3',
    hue: 160,
    link: {
      url: 'https://janiobachmann.shinyapps.io/data_science_jobs_app/',
      label: 'Live App',
    },
  },
  {
    id: 'credit-fraud',
    title: 'Credit Fraud Detection',
    description:
      'Machine learning notebook tackling class imbalance in credit card fraud detection. Explores undersampling, oversampling (SMOTE), and ensemble techniques to build robust classifiers on highly skewed data.',
    tags: ['Python', 'Machine Learning', 'Scikit-learn', 'Imbalanced Data'],
    icon: 'ShieldAlert',
    hue: 45,
    badge: '10,000+ votes',
    link: {
      url: 'https://www.kaggle.com/code/janiobachmann/credit-fraud-dealing-with-imbalanced-datasets',
      label: 'View on Kaggle',
    },
  },
  {
    id: 'healthcare-data-products',
    title: 'Scalable Data Products in Healthcare',
    description:
      'Led the design and modeling of scalable data products across a global healthcare organization. Focused on building reusable data frameworks that standardize reporting and enable self-service analytics across multiple markets.',
    tags: ['Data Modeling', 'Healthcare', 'Product Strategy', 'Enterprise Scale'],
    icon: 'Building2',
    hue: 262,
  },
];
