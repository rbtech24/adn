// Netlify build script
// This script copies necessary files to the build output directory

import fs from 'fs';
import path from 'path';

// Create the dist directory if it doesn't exist
const distDir = path.resolve('./dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Copy the _redirects file to the dist directory
fs.copyFile('./public/_redirects', './dist/_redirects', (err) => {
  if (err) {
    console.error('Error copying _redirects file:', err);
  } else {
    console.log('_redirects file copied to dist directory');
  }
});

// Copy the 404.html file to the dist directory
fs.copyFile('./public/404.html', './dist/404.html', (err) => {
  if (err) {
    console.error('Error copying 404.html file:', err);
  } else {
    console.log('404.html file copied to dist directory');
  }
});

console.log('Netlify build script completed');