import { Link } from "wouter";

const HeroSection = () => {
  return (
    <section className="relative h-[500px] sm:h-[600px] overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080" 
          alt="Freshly detailed luxury car" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10 h-full flex flex-col justify-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-montserrat font-bold text-white leading-tight">
          <span className="block">Your Journey To</span>
          <span className="text-[#E53E3E]">Detailing Excellence</span>
        </h1>
        <p className="mt-4 text-lg sm:text-xl md:text-2xl text-gray-300 max-w-2xl">
          Join the premier community for auto detailing enthusiasts and professionals. Learn, shop, and connect.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/auth">
            <button className="bg-[#E53E3E] hover:bg-red-700 text-white py-3 px-6 rounded-md font-montserrat font-semibold transition transform hover:scale-105">
              Join the Nation
            </button>
          </Link>
          <Link href="/shop">
            <button className="border border-white hover:border-[#E53E3E] hover:text-[#E53E3E] text-white py-3 px-6 rounded-md font-montserrat font-semibold transition">
              Explore Shop
            </button>
          </Link>
        </div>
        <div className="mt-10 flex flex-wrap items-center gap-4 sm:gap-6">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#E53E3E]" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
            </svg>
            <span className="ml-2 text-white">10,000+ Members</span>
          </div>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#E53E3E]" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
            </svg>
            <span className="ml-2 text-white">Active Community</span>
          </div>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#E53E3E]" viewBox="0 0 20 20" fill="currentColor">
              <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
              <path fillRule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
            <span className="ml-2 text-white">Premium Products</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
