import { Link } from "wouter";

const BeforeAfterShowcase = () => {
  return (
    <section className="py-16 bg-[#121212]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-white">
            Before & <span className="text-[#E53E3E]">After</span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-3xl mx-auto">
            See the dramatic transformations achieved by our community members using techniques and products discussed on Auto Detailing Nation.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Transformation 1 */}
          <div className="glossy rounded-xl overflow-hidden">
            <div className="grid grid-cols-2 gap-0">
              <img 
                src="https://images.unsplash.com/photo-1550355291-bbee04a92027?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300" 
                alt="Before: Swirled black paint" 
                className="w-full h-60 object-cover" 
              />
              <img 
                src="https://pixabay.com/get/g925fbc7525df0ff8962309518c525684a36eecb889f1949e32792b7aa78184dd1f3eaf779a6716a45e9ee02cd6987af04ad3b934c2be7d3b4cd9db34442e018e_1280.jpg" 
                alt="After: Restored glossy finish" 
                className="w-full h-60 object-cover" 
              />
            </div>
            <div className="p-4">
              <h3 className="font-montserrat font-semibold text-white text-lg mb-1">Black BMW Paint Correction</h3>
              <p className="text-sm text-gray-400">
                Severe swirl marks and light scratches corrected with a two-stage polish using a dual action polisher and finished with ceramic coating.
              </p>
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center">
                  <img 
                    src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=50&h=50" 
                    alt="ProShine" 
                    className="w-8 h-8 rounded-full object-cover" 
                  />
                  <span className="ml-2 text-sm text-gray-400">By <Link href="/profile/proshine" className="text-[#E53E3E]">ProShine</Link></span>
                </div>
                <Link href="/forum/transformation-bmw" className="text-[#E53E3E] hover:text-red-400 text-sm flex items-center">
                  View Details
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Transformation 2 */}
          <div className="glossy rounded-xl overflow-hidden">
            <div className="grid grid-cols-2 gap-0">
              <img 
                src="https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300" 
                alt="Before: Neglected interior" 
                className="w-full h-60 object-cover" 
              />
              <img 
                src="https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300" 
                alt="After: Restored interior" 
                className="w-full h-60 object-cover" 
              />
            </div>
            <div className="p-4">
              <h3 className="font-montserrat font-semibold text-white text-lg mb-1">Leather Interior Restoration</h3>
              <p className="text-sm text-gray-400">
                Neglected leather seats deep cleaned, conditioned, and protected with premium leather care products for a soft, rejuvenated finish.
              </p>
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=50&h=50" 
                    alt="DetailQueen" 
                    className="w-8 h-8 rounded-full object-cover" 
                  />
                  <span className="ml-2 text-sm text-gray-400">By <Link href="/profile/detailqueen" className="text-[#E53E3E]">DetailQueen</Link></span>
                </div>
                <Link href="/forum/leather-restoration" className="text-[#E53E3E] hover:text-red-400 text-sm flex items-center">
                  View Details
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* More Transformations Button */}
        <div className="mt-8 text-center">
          <Link href="/forum/transformations" className="inline-block text-[#E53E3E] hover:text-red-400 font-montserrat font-semibold">
            View More Transformations
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 inline" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterShowcase;
