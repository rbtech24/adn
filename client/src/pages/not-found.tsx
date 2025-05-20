import { AlertCircle, Home, ChevronLeft } from "lucide-react";
import { Link } from "wouter";
import { Helmet } from "react-helmet";

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Page Not Found | Auto Detailing Nation</title>
        <meta name="description" content="The page you're looking for doesn't exist or has been moved. Please return to the Auto Detailing Nation homepage." />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
        <div className="w-full max-w-lg bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 text-center">
          <div className="flex flex-col items-center mb-6">
            <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Page Not Found</h1>
          </div>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            Let's get you back on track. Check out our homepage, shop for products, or join our community discussions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <a className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                <Home className="mr-2 h-5 w-5" />
                Return to Homepage
              </a>
            </Link>
            
            <Link href="/shop">
              <a className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                <ChevronLeft className="mr-2 h-5 w-5" />
                Browse Products
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
