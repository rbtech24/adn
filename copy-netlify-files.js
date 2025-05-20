// ES Module script to copy Netlify configuration files
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Copy _redirects file
try {
  fs.copyFileSync(
    path.join(__dirname, 'public', '_redirects'),
    path.join(__dirname, 'dist', '_redirects')
  );
  console.log('✅ _redirects file copied to dist directory');
} catch (err) {
  console.error('❌ Error copying _redirects file:', err);
}

// Copy 404.html file
try {
  fs.copyFileSync(
    path.join(__dirname, 'public', '404.html'),
    path.join(__dirname, 'dist', '404.html')
  );
  console.log('✅ 404.html file copied to dist directory');
} catch (err) {
  console.error('❌ Error copying 404.html file:', err);
}

console.log('✅ Netlify build files preparation completed');