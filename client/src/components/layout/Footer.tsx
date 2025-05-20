import { Link } from "wouter";

const Footer = () => {
  return (
    <footer className="bg-[#121212] pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div>
            <Link href="/" className="flex items-center">
              <span className="text-[#E53E3E] font-montserrat font-bold text-2xl tracking-tighter">ADN</span>
              <span className="ml-2 text-white font-montserrat font-bold">Auto Detailing Nation</span>
            </Link>
            <p className="text-gray-400 mt-3">
              The premier online community for auto detailing enthusiasts and professionals. Learn, shop, connect.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-[#E53E3E] transition" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-[#E53E3E] transition" aria-label="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-[#E53E3E] transition" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-[#E53E3E] transition" aria-label="YouTube">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-[#E53E3E] transition" aria-label="TikTok">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                </svg>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-white font-montserrat font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-[#E53E3E] transition">Home</Link></li>
              <li><Link href="/forum" className="text-gray-400 hover:text-[#E53E3E] transition">Community</Link></li>
              <li><Link href="/shop" className="text-gray-400 hover:text-[#E53E3E] transition">Shop</Link></li>
              <li><Link href="/learn" className="text-gray-400 hover:text-[#E53E3E] transition">Learn</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-[#E53E3E] transition">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-[#E53E3E] transition">Contact</Link></li>
            </ul>
          </div>
          
          {/* Community */}
          <div>
            <h3 className="text-white font-montserrat font-semibold text-lg mb-4">Community</h3>
            <ul className="space-y-2">
              <li><Link href="/forum" className="text-gray-400 hover:text-[#E53E3E] transition">Forums</Link></li>
              <li><Link href="/members" className="text-gray-400 hover:text-[#E53E3E] transition">Member Spotlights</Link></li>
              <li><Link href="/events" className="text-gray-400 hover:text-[#E53E3E] transition">Events</Link></li>
              <li><Link href="/contests" className="text-gray-400 hover:text-[#E53E3E] transition">Contests</Link></li>
              <li><Link href="/guidelines" className="text-gray-400 hover:text-[#E53E3E] transition">Community Guidelines</Link></li>
            </ul>
          </div>
          
          {/* Help & Support */}
          <div>
            <h3 className="text-white font-montserrat font-semibold text-lg mb-4">Help & Support</h3>
            <ul className="space-y-2">
              <li><Link href="/faq" className="text-gray-400 hover:text-[#E53E3E] transition">FAQ</Link></li>
              <li><Link href="/shipping" className="text-gray-400 hover:text-[#E53E3E] transition">Shipping Policy</Link></li>
              <li><Link href="/returns" className="text-gray-400 hover:text-[#E53E3E] transition">Returns & Refunds</Link></li>
              <li><Link href="/privacy" className="text-gray-400 hover:text-[#E53E3E] transition">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-gray-400 hover:text-[#E53E3E] transition">Terms of Service</Link></li>
              <li><Link href="/support" className="text-gray-400 hover:text-[#E53E3E] transition">Contact Support</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Auto Detailing Nation. All rights reserved.
          </p>
          <div className="mt-4 sm:mt-0 flex space-x-4">
            <svg className="h-8 w-auto" viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="36" height="24" rx="3" fill="#252525" />
              <path d="M10 16.5H8V7.5H10V16.5Z" fill="#fff" />
              <path d="M14 16.5H12V7.5H14V16.5Z" fill="#fff" />
              <path d="M21 16.5C19.3 16.5 18 15.2 18 13.5V10.5C18 8.8 19.3 7.5 21 7.5H24V9.5H21C20.4 9.5 20 9.9 20 10.5V13.5C20 14.1 20.4 14.5 21 14.5H24V16.5H21Z" fill="#fff" />
              <path d="M28 16.5H26V7.5H28V16.5Z" fill="#fff" />
            </svg>
            <svg className="h-8 w-auto" viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="36" height="24" rx="3" fill="#252525" />
              <path d="M26.5 9.5C26.5 7.6 24.9 6 23 6H11C9.1 6 7.5 7.6 7.5 9.5V14.5C7.5 16.4 9.1 18 11 18H23C24.9 18 26.5 16.4 26.5 14.5V9.5Z" fill="#FFB600" />
              <path d="M17 15C18.7 15 20 13.7 20 12C20 10.3 18.7 9 17 9C15.3 9 14 10.3 14 12C14 13.7 15.3 15 17 15Z" fill="#fff" />
            </svg>
            <svg className="h-8 w-auto" viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="36" height="24" rx="3" fill="#252525" />
              <path d="M28 12C28 8.7 25.3 6 22 6H11C7.7 6 5 8.7 5 12C5 15.3 7.7 18 11 18H22C25.3 18 28 15.3 28 12Z" fill="#3D73DD" />
              <path d="M11 15C12.7 15 14 13.7 14 12C14 10.3 12.7 9 11 9C9.3 9 8 10.3 8 12C8 13.7 9.3 15 11 15Z" fill="#fff" />
              <path d="M27 12C27 13.7 25.7 15 24 15C22.3 15 21 13.7 21 12C21 10.3 22.3 9 24 9C25.7 9 27 10.3 27 12Z" fill="#fff" />
            </svg>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
