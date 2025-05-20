// ES Module script to copy Netlify configuration files
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create the dist directory if it doesn't exist
try {
  if (!fs.existsSync(path.join(__dirname, 'dist'))) {
    fs.mkdirSync(path.join(__dirname, 'dist'), { recursive: true });
  }
  console.log('✅ Ensured dist directory exists');
} catch (err) {
  console.error('❌ Error creating dist directory:', err);
}

// Create _redirects file directly - essential for SPA routing in Netlify
try {
  const redirectsContent = `# Netlify redirects for SPA routing
/api/*  /.netlify/functions/:splat  200
/*      /index.html                 200
`;
  
  fs.writeFileSync(
    path.join(__dirname, 'dist', '_redirects'),
    redirectsContent
  );
  console.log('✅ Created _redirects file in dist directory');
} catch (err) {
  console.error('❌ Error creating _redirects file:', err);
}

// Create a netlify.toml file in the build output
try {
  const netlifyTomlContent = `# Netlify configuration
[build]
  publish = "dist"
  functions = "netlify/functions"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
  
[[headers]]
  for = "/*"
    [headers.values]
    Cache-Control = "public, max-age=0, must-revalidate"
`;
  
  fs.writeFileSync(
    path.join(__dirname, 'dist', 'netlify.toml'),
    netlifyTomlContent
  );
  console.log('✅ Created netlify.toml file in dist directory');
} catch (err) {
  console.error('❌ Error creating netlify.toml file:', err);
}

// Create 404.html file directly
try {
  const notFoundHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Not Found - Auto Detailing Nation</title>
  <meta name="description" content="The page you're looking for doesn't exist or has been moved. Return to Auto Detailing Nation." />
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background-color: #121212;
      color: #ffffff;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      text-align: center;
    }
    .container {
      max-width: 600px;
      padding: 40px 20px;
    }
    h1 {
      font-size: 36px;
      margin-bottom: 16px;
      font-weight: 700;
    }
    h1 span {
      color: #E53E3E;
    }
    p {
      font-size: 18px;
      line-height: 1.6;
      color: #a0a0a0;
      margin-bottom: 32px;
    }
    .btn {
      display: inline-block;
      background-color: #E53E3E;
      color: white;
      font-weight: 600;
      padding: 12px 24px;
      border-radius: 6px;
      text-decoration: none;
      transition: background-color 0.3s;
    }
    .btn:hover {
      background-color: #c53030;
    }
    .logo {
      margin-bottom: 32px;
      font-size: 24px;
      font-weight: bold;
    }
  </style>
  <!-- Important: Base URL for SPA navigation -->
  <base href="/" />
</head>
<body>
  <div class="container">
    <div class="logo">Auto Detailing Nation</div>
    <h1>Page <span>Not Found</span></h1>
    <p>The page you're looking for doesn't exist or has been moved. Let's get you back on track.</p>
    <a href="/" class="btn">Return to Homepage</a>
  </div>
  <script>
    // Redirect to the homepage with client-side routing
    document.querySelector('.btn').addEventListener('click', function(e) {
      e.preventDefault();
      window.location.href = '/';
    });
  </script>
</body>
</html>`;

  fs.writeFileSync(
    path.join(__dirname, 'dist', '404.html'),
    notFoundHtml
  );
  console.log('✅ Created 404.html file in dist directory');
} catch (err) {
  console.error('❌ Error creating 404.html file:', err);
}

console.log('✅ Netlify build files preparation completed');