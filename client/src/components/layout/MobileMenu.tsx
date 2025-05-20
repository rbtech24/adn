import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { useCart } from "@/hooks/use-cart";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const [location] = useLocation();
  const { user, isAuthenticated } = useAuth();
  const { cartItems } = useCart();

  // Close menu when location changes
  useEffect(() => {
    onClose();
  }, [location, onClose]);

  // Prevent body scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="md:hidden mt-3 pt-3 border-t border-gray-800 animate-in slide-in-from-top">
      <div className="flex flex-col space-y-3 px-4 pb-4">
        <Link href="/" className={`${location === '/' ? 'text-white font-semibold' : 'text-gray-400 hover:text-white'}`}>
          Home
        </Link>
        <Link href="/forum" className={`${location.startsWith('/forum') ? 'text-white font-semibold' : 'text-gray-400 hover:text-white'}`}>
          Community
        </Link>
        <Link href="/shop" className={`${location.startsWith('/shop') ? 'text-white font-semibold' : 'text-gray-400 hover:text-white'}`}>
          Shop
        </Link>
        <Link href="/learn" className={`${location.startsWith('/learn') ? 'text-white font-semibold' : 'text-gray-400 hover:text-white'}`}>
          Learn
        </Link>
        <Link href="/about" className={`${location === '/about' ? 'text-white font-semibold' : 'text-gray-400 hover:text-white'}`}>
          About
        </Link>
        <div className="flex items-center justify-between pt-3 border-t border-gray-800">
          <button className="text-gray-400 hover:text-white" aria-label="Search">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <Link href="/cart" className="text-gray-400 hover:text-white relative" aria-label="Shopping cart">
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
            <Link href={`/profile/${user?.username}`} className="bg-[#E53E3E] hover:bg-red-700 text-white py-2 px-4 rounded-md font-semibold text-sm">
              Profile
            </Link>
          ) : (
            <Link href="/auth" className="bg-[#E53E3E] hover:bg-red-700 text-white py-2 px-4 rounded-md font-semibold text-sm">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
