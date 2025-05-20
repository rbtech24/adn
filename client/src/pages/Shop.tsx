import { useState } from "react";
import { Helmet } from "react-helmet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import ProductCard from "@/components/shop/ProductCard";
import { Product, ProductCategory } from "@/types";

const Shop = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("featured");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [ratingFilter, setRatingFilter] = useState(0);

  // Dummy data for demonstration
  const products: Product[] = [
    {
      id: 1,
      name: "Premium Ceramic Coating",
      description: "Professional-grade 9H ceramic coating with up to 5 years of protection and extreme hydrophobic properties.",
      image: "https://pixabay.com/get/g5cb9dbbe8431eec8751b01fee83dae9a7222f95b14ffa3620ab8dcd0d08096ff704725500c296a22f874602552d366d47c420ea59d9e7f6478874bf5839bf308_1280.jpg",
      price: 89.99,
      originalPrice: 89.99,
      discountPrice: 69.99,
      rating: 4.5,
      reviewCount: 128,
      inStock: true,
      badge: {
        text: "Best Seller",
        color: "red-500"
      },
      categoryId: 3
    },
    {
      id: 2,
      name: "Dual Action Polisher",
      description: "Professional 15mm throw polisher with variable speed control and ergonomic design for fatigue-free operation.",
      image: "https://pixabay.com/get/g21ca09028b554919fa02c24dd08157ebe08c26771fad3600d4ca649bfa1ee73cf7e1c546341c3a5fada10058167fc945e5f785bd296684713dc7e750054df9b6_1280.jpg",
      price: 179.99,
      originalPrice: 179.99,
      discountPrice: 149.99,
      rating: 4.0,
      reviewCount: 92,
      inStock: true,
      badge: null,
      categoryId: 1
    },
    {
      id: 3,
      name: "Professional Foam Cannon",
      description: "Adjustable brass nozzle foam cannon that produces thick, clingy foam for effective and safe washing.",
      image: "https://images.unsplash.com/photo-1600880292630-ee8a00403024?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
      price: 49.99,
      originalPrice: 49.99,
      discountPrice: 39.99,
      rating: 5.0,
      reviewCount: 56,
      inStock: true,
      badge: {
        text: "New",
        color: "green-500"
      },
      categoryId: 2
    },
    {
      id: 4,
      name: "Premium Microfiber Towel Set",
      description: "Set of 12 ultra-plush microfiber towels with 70/30 blend and 500 GSM for superior absorption and scratch-free finish.",
      image: "https://images.unsplash.com/photo-1607435097405-db48f377bff6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
      price: 39.99,
      originalPrice: 39.99,
      discountPrice: 29.99,
      rating: 4.5,
      reviewCount: 214,
      inStock: true,
      badge: null,
      categoryId: 2
    },
    {
      id: 5,
      name: "Clay Bar Kit",
      description: "Complete clay bar system to remove embedded contaminants and leave your paint silky smooth before waxing or polishing.",
      image: "https://images.unsplash.com/photo-1526626607369-4f1c8191730d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
      price: 24.99,
      originalPrice: 29.99,
      discountPrice: 24.99,
      rating: 4.3,
      reviewCount: 187,
      inStock: true,
      badge: {
        text: "Sale",
        color: "blue-500"
      },
      categoryId: 1
    },
    {
      id: 6,
      name: "Interior Detailing Brush Set",
      description: "5-piece brushes designed for vents, tight spaces, and delicate surfaces in your vehicle's interior.",
      image: "https://images.unsplash.com/photo-1581245571901-49e03a13f108?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
      price: 19.99,
      originalPrice: 19.99,
      discountPrice: 19.99,
      rating: 4.8,
      reviewCount: 132,
      inStock: true,
      badge: null,
      categoryId: 3
    },
    {
      id: 7,
      name: "Tire Shine Gel",
      description: "Long-lasting, non-sling tire dressing that provides a rich, wet-look shine with UV protection.",
      image: "https://images.unsplash.com/photo-1600661653561-629509216dbf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
      price: 14.99,
      originalPrice: 17.99,
      discountPrice: 14.99,
      rating: 4.2,
      reviewCount: 78,
      inStock: true,
      badge: {
        text: "Sale",
        color: "blue-500"
      },
      categoryId: 4
    },
    {
      id: 8,
      name: "All-In-One Polish",
      description: "One-step product that cleans, polishes, and protects your paint in a single application. Ideal for maintenance details.",
      image: "https://images.unsplash.com/photo-1588732807335-2b551554e3de?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
      price: 34.99,
      originalPrice: 34.99,
      discountPrice: 34.99,
      rating: 4.1,
      reviewCount: 65,
      inStock: false,
      badge: null,
      categoryId: 1
    }
  ];

  const categories: ProductCategory[] = [
    {
      id: 1,
      name: "Polishes & Compounds",
      slug: "polishes-compounds",
      image: "https://pixabay.com/get/g1b5e709af906c20609811a9dc5aaa33aefd0da97ee3bc1b57982ecca221e08f481ec503a64c84f04b0296de9b125b5c1208de5f011a3f0dea46b6b89d10c1ed5_1280.jpg"
    },
    {
      id: 2,
      name: "Tools & Accessories",
      slug: "tools-accessories",
      image: "https://images.unsplash.com/photo-1605152276897-4f618f831968?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250"
    },
    {
      id: 3,
      name: "Interior Care",
      slug: "interior-care",
      image: "https://pixabay.com/get/ga73a6288269013cef66ccbbe7fe8bcfd1bce3ed1981456963bc2f7970af70f3b97173a5b9c2a0e903cb0f0c14225422214a2384c1ee2d9808fe9c0f60b7da9e4_1280.jpg"
    },
    {
      id: 4,
      name: "Wheel & Tire Care",
      slug: "wheel-tire-care",
      image: "https://pixabay.com/get/g3c6dfd5adefdb105cd5b71c2dee7f405ae9c43e9fbb06859e4194f0e1522d6466b4cd3ca85d51d4d755fb77b1c3aade7233386309d3ed111a479d68f9c981700_1280.jpg"
    }
  ];

  // Filter and sort products
  const filteredAndSortedProducts = products
    .filter(product => 
      // Search filter
      (searchTerm 
        ? product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
        : true
      ) &&
      // Category filter
      (categoryFilter !== "all" ? product.categoryId === parseInt(categoryFilter) : true) &&
      // Price range filter
      (product.discountPrice >= priceRange[0] && product.discountPrice <= priceRange[1]) &&
      // Rating filter
      (ratingFilter > 0 ? Math.floor(product.rating) >= ratingFilter : true)
    )
    .sort((a, b) => {
      switch (sortOption) {
        case 'priceLowToHigh':
          return a.discountPrice - b.discountPrice;
        case 'priceHighToLow':
          return b.discountPrice - a.discountPrice;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return 0; // In a real app, this would use date/time
        case 'featured':
        default:
          return (b.badge ? 1 : 0) - (a.badge ? 1 : 0);
      }
    });

  // Helper function to format prices
  const formatPrice = (price: number) => `$${price.toFixed(2)}`;

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
  };

  const getCategoryNameById = (id: number): string => {
    const category = categories.find(cat => cat.id === id);
    return category ? category.name : "Unknown Category";
  };

  return (
    <>
      <Helmet>
        <title>Shop Detailing Products - Auto Detailing Nation</title>
        <meta name="description" content="Shop for premium auto detailing products, tools, and accessories. Trusted by professionals and enthusiasts worldwide." />
      </Helmet>

      <div className="bg-[#121212] py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-montserrat font-bold text-white">
              Detailing <span className="text-[#E53E3E]">Shop</span>
            </h1>
            <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
              Browse our curated selection of professional-grade detailing products, tools, and accessories. All products are tested and approved by our community of experts.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters sidebar */}
            <div className="lg:w-1/4">
              <div className="bg-[#1E1E1E] rounded-xl p-6">
                <h2 className="text-xl font-montserrat font-semibold text-white mb-4">Filters</h2>
                
                <div className="space-y-6">
                  {/* Search */}
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Search</label>
                    <Input
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="bg-[#121212] border-gray-700 text-white"
                    />
                  </div>
                  
                  {/* Category filter */}
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Category</label>
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger className="bg-[#121212] border-gray-700 text-white">
                        <SelectValue placeholder="All Categories" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1E1E1E] border-gray-700 text-white">
                        <SelectItem value="all">All Categories</SelectItem>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id.toString()}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Price range filter */}
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Price Range: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                    </label>
                    <Slider
                      defaultValue={[0, 200]}
                      min={0}
                      max={200}
                      step={5}
                      value={priceRange}
                      onValueChange={handlePriceChange}
                      className="py-4"
                    />
                  </div>
                  
                  {/* Rating filter */}
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Minimum Rating</label>
                    <div className="flex items-center space-x-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          className={`text-2xl ${star <= ratingFilter ? 'text-yellow-500' : 'text-gray-600'}`}
                          onClick={() => setRatingFilter(star === ratingFilter ? 0 : star)}
                        >
                          ★
                        </button>
                      ))}
                      {ratingFilter > 0 && (
                        <button 
                          className="text-sm text-gray-400 hover:text-white ml-2"
                          onClick={() => setRatingFilter(0)}
                        >
                          Clear
                        </button>
                      )}
                    </div>
                  </div>
                  
                  {/* Reset filters */}
                  <div>
                    <Button 
                      variant="outline" 
                      className="w-full border-gray-700 text-gray-300 hover:text-white hover:bg-[#2D3748]"
                      onClick={() => {
                        setSearchTerm("");
                        setCategoryFilter("all");
                        setPriceRange([0, 200]);
                        setRatingFilter(0);
                      }}
                    >
                      Reset Filters
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Product grid */}
            <div className="lg:w-3/4">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <span className="text-gray-400">{filteredAndSortedProducts.length} products</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2 text-gray-400 hidden md:inline">Sort by:</span>
                  <Select value={sortOption} onValueChange={setSortOption}>
                    <SelectTrigger className="bg-[#1E1E1E] border-gray-700 text-white w-[160px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1E1E1E] border-gray-700 text-white">
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="priceLowToHigh">Price: Low to High</SelectItem>
                      <SelectItem value="priceHighToLow">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="newest">Newest Arrivals</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {filteredAndSortedProducts.length === 0 ? (
                <div className="bg-[#1E1E1E] rounded-xl p-10 text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <h3 className="text-lg font-montserrat font-semibold text-white mb-2">No products found</h3>
                  <p className="text-gray-400 mb-6">
                    Try adjusting your filters to find what you're looking for.
                  </p>
                  <Button 
                    variant="outline" 
                    className="border-gray-700 text-gray-300 hover:text-white hover:bg-[#2D3748]"
                    onClick={() => {
                      setSearchTerm("");
                      setCategoryFilter("all");
                      setPriceRange([0, 200]);
                      setRatingFilter(0);
                    }}
                  >
                    Clear All Filters
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredAndSortedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}

              {/* Show category info if filtering by category */}
              {categoryFilter !== "all" && (
                <div className="mt-8 bg-[#1E1E1E] rounded-xl p-6">
                  <h3 className="text-lg font-montserrat font-semibold text-white mb-2">
                    About {getCategoryNameById(parseInt(categoryFilter))}
                  </h3>
                  <p className="text-gray-400">
                    {parseInt(categoryFilter) === 1 && "Our polishes and compounds are professional-grade products designed to correct paint imperfections, remove swirls, and restore your vehicle's finish to a mirror-like shine."}
                    {parseInt(categoryFilter) === 2 && "Browse our selection of high-quality detailing tools and accessories that make your detailing work easier and more efficient, from applicators to specialized brushes."}
                    {parseInt(categoryFilter) === 3 && "Keep your car's interior looking new with our premium interior care products that clean, condition, and protect various surfaces from leather to plastic."}
                    {parseInt(categoryFilter) === 4 && "Give your wheels and tires the attention they deserve with specialized cleaners, dressings, and protectants that enhance appearance and longevity."}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
