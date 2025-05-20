// This script ensures the _redirects file is copied to the build directory
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define paths
const publicDir = path.join(__dirname, 'public');
const distDir = path.join(__dirname, 'dist');

// Make sure dist directory exists
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
  console.log('Created dist directory');
}

// Copy _redirects file
try {
  const redirectsPath = path.join(publicDir, '_redirects');
  const destPath = path.join(distDir, '_redirects');
  
  if (fs.existsSync(redirectsPath)) {
    fs.copyFileSync(redirectsPath, destPath);
    console.log('Successfully copied _redirects file to dist directory');
  } else {
    // Create the file if it doesn't exist
    fs.writeFileSync(destPath, '/* /index.html 200');
    console.log('Created _redirects file in dist directory');
  }
} catch (error) {
  console.error('Error copying _redirects file:', error);
  process.exit(1);
}

console.log('Netlify build script completed successfully');