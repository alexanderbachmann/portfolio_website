#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Get the component name from command line args
const rawName = process.argv[2];

if (!rawName) {
    console.error('❌ Please provide a component name, e.g., navbar');
    process.exit(1);
}

// Capitalize the first letter for component name
const componentName = rawName.charAt(0).toUpperCase() + rawName.slice(1);

// Lowercase for CSS file
const cssFileName = `${rawName.toLowerCase()}.css`;

// Define paths
const baseDir = './src/components';
const componentDir = path.join(baseDir, rawName);
const componentFile = path.join(componentDir, `${componentName}.jsx`);
const indexFile = path.join(componentDir, 'index.jsx');
const cssFile = path.join(componentDir, cssFileName);

// Template for the component file
const componentTemplate = `import React from 'react';
import './${cssFileName}';

const ${componentName} = () => {
  return <div className="${rawName.toLowerCase()}"></div>;
}

export default ${componentName};
`;

// Template for the index file
const indexTemplate = `export * from './${componentName}';
export { default } from './${componentName}';
`;

// Template for the CSS file
const cssTemplate = `.${rawName.toLowerCase()} {
  /* Styles for ${componentName} */
}
`;

// Create the folder (recursively if needed)
fs.mkdirSync(componentDir, { recursive: true });

// Write the files
fs.writeFileSync(componentFile, componentTemplate);
fs.writeFileSync(indexFile, indexTemplate);
fs.writeFileSync(cssFile, cssTemplate);

console.log(`✅ Component ${componentName} created with JSX, index, and CSS at ${componentDir}`);