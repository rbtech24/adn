# Auto Detailing Nation

Auto Detailing Nation is the premier online hub for auto detailing enthusiasts and professionals. The platform serves as a comprehensive ecosystem featuring a forum for community discussions, a content hub with articles and videos, an e-commerce shop for detailing products, and user reputation/membership systems.

## Features

- Community Forum for discussions and sharing tips
- Content Hub with articles, videos, and resources
- E-commerce Shop for detailing products
- User Authentication and Profile Management
- SEO Optimization for better search visibility

## Technology Stack

- Frontend: React + TypeScript
- Styling: TailwindCSS + ShadCN UI
- Routing: Wouter
- State Management: React Query
- Form Handling: React Hook Form + Zod

## Deployment to Netlify

This project is configured for deployment on Netlify. Follow these steps to deploy:

1. **Create a Netlify account** at [netlify.com](https://www.netlify.com/) if you don't have one already.

2. **Connect your GitHub repository**:
   - Go to [Netlify](https://app.netlify.com/) and log in
   - Click "New site from Git"
   - Choose GitHub and authorize Netlify
   - Select your repository

3. **Configure build settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Advanced build settings: Add the following environment variables if needed:
     - `NODE_VERSION`: `18`

4. **Deploy**:
   - Click "Deploy site"
   - Netlify will build and deploy your site

5. **Set up custom domain** (optional):
   - Go to Site settings > Domain management
   - Add custom domain

## Local Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Environment Variables

For local development, create a `.env` file with the following variables:

```
NODE_ENV=development
```

## Netlify Functions

This project includes serverless functions for backend operations. These are located in the `/netlify/functions` directory and are automatically deployed with your site.

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Submit a pull request