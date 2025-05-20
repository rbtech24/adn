import { Link } from "wouter";

const FeaturedSections = () => {
  return (
    <section className="py-12 bg-[#1E1E1E]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Community Section */}
          <div className="glossy rounded-xl p-6 transition transform hover:scale-[1.02] hover:shadow-2xl">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-[#E53E3E] rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
              </div>
              <h2 className="ml-4 text-2xl font-montserrat font-bold text-white">Community</h2>
            </div>
            <p className="text-gray-300 mb-6">
              Join discussions, share your work, and connect with detailing enthusiasts around the world.
            </p>
            <Link href="/forum" className="inline-flex items-center text-[#E53E3E] hover:text-red-400 font-montserrat font-semibold">
              Browse Forums
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
          
          {/* Shop Section */}
          <div className="glossy rounded-xl p-6 transition transform hover:scale-[1.02] hover:shadow-2xl">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-[#E53E3E] rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="ml-4 text-2xl font-montserrat font-bold text-white">Shop</h2>
            </div>
            <p className="text-gray-300 mb-6">
              Discover premium detailing products, tools, and equipment trusted by professionals.
            </p>
            <Link href="/shop" className="inline-flex items-center text-[#E53E3E] hover:text-red-400 font-montserrat font-semibold">
              View Products
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
          
          {/* Learn Section */}
          <div className="glossy rounded-xl p-6 transition transform hover:scale-[1.02] hover:shadow-2xl">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-[#E53E3E] rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
              </div>
              <h2 className="ml-4 text-2xl font-montserrat font-bold text-white">Learn</h2>
            </div>
            <p className="text-gray-300 mb-6">
              Access guides, tutorials, and resources to master the art of auto detailing.
            </p>
            <Link href="/learn" className="inline-flex items-center text-[#E53E3E] hover:text-red-400 font-montserrat font-semibold">
              Explore Content
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSections;
