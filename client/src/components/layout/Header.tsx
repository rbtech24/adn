import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { useCart } from "@/hooks/use-cart";
import MobileMenu from "./MobileMenu";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { user, isAuthenticated } = useAuth();
  const { cartItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className={`sticky top-0 z-50 bg-[#121212]/90 backdrop-blur-md border-b border-gray-800 transition-all duration-300 ${isScrolled ? 'shadow-md' : ''}`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-[#E53E3E] font-montserrat font-bold text-2xl tracking-tighter">ADN</span>
              <span className="ml-2 text-white font-montserrat font-bold hidden sm:inline-block">Auto Detailing Nation</span>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <button 
            type="button" 
            className="md:hidden text-gray-400 hover:text-white focus:outline-none"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className={`font-montserrat font-semibold transition ${location === '/' ? 'text-white' : 'text-gray-400 hover:text-white'}`}>
              Home
            </Link>
            <Link href="/forum" className={`font-montserrat transition ${location.startsWith('/forum') ? 'text-white' : 'text-gray-400 hover:text-white'}`}>
              Community
            </Link>
            <Link href="/shop" className={`font-montserrat transition ${location.startsWith('/shop') ? 'text-white' : 'text-gray-400 hover:text-white'}`}>
              Shop
            </Link>
            <Link href="/learn" className={`font-montserrat transition ${location.startsWith('/learn') ? 'text-white' : 'text-gray-400 hover:text-white'}`}>
              Learn
            </Link>
            <Link href="/about" className={`font-montserrat transition ${location === '/about' ? 'text-white' : 'text-gray-400 hover:text-white'}`}>
              About
            </Link>
          </nav>
          
          {/* User actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-gray-400 hover:text-white transition" aria-label="Search">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <Link href="/cart" className="text-gray-400 hover:text-white relative transition" aria-label="Shopping cart">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#E53E3E] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>
            {isAuthenticated ? (
              <Link href={`/profile/${user?.username}`} className="bg-[#E53E3E] hover:bg-red-700 text-white py-2 px-4 rounded-md font-montserrat font-semibold text-sm transition">
                Profile
              </Link>
            ) : (
              <Link href="/auth" className="bg-[#E53E3E] hover:bg-red-700 text-white py-2 px-4 rounded-md font-montserrat font-semibold text-sm transition">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </header>
  );
};

export default Header;
