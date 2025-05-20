// Netlify build script for Single Page Applications (SPA)
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define paths
const distDir = path.join(__dirname, 'dist');
const publicDir = path.join(__dirname, 'public');

console.log('Starting Netlify build process...');

// Create the redirects file
try {
  // Make sure dist directory exists
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
    console.log('Created dist directory');
  }

  // Write the redirects file directly to dist folder
  const redirectsContent = `# Netlify SPA routing configuration
# Handle routes for the React SPA
/*    /index.html   200
`;

  fs.writeFileSync(path.join(distDir, '_redirects'), redirectsContent);
  console.log('Created _redirects file with SPA routing rules');

  // Copy any files from public directory to dist
  if (fs.existsSync(publicDir)) {
    const files = fs.readdirSync(publicDir);
    for (const file of files) {
      // Skip the redirects file as we've already created it
      if (file === '_redirects') continue;
      
      const srcPath = path.join(publicDir, file);
      const destPath = path.join(distDir, file);
      
      if (fs.statSync(srcPath).isFile()) {
        fs.copyFileSync(srcPath, destPath);
        console.log(`Copied ${file} to dist directory`);
      }
    }
  }

  console.log('Netlify build process completed successfully');
} catch (error) {
  console.error('Error during Netlify build process:', error);
  process.exit(1);
}