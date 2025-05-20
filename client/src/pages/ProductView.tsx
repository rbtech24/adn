import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useRoute, Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/hooks/use-cart";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductCard from "@/components/shop/ProductCard";

const ProductView = () => {
  const [match, params] = useRoute("/shop/:id");
  const productId = params?.id ? parseInt(params.id) : 0;
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { toast } = useToast();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        // In a real app, we would fetch from API
        // For now we'll use sample data
        const sampleProduct: Product = {
          id: productId,
          name: "Premium Ceramic Coating",
          description: "Professional-grade 9H ceramic coating with up to 5 years of protection and extreme hydrophobic properties. This coating forms a permanent bond with your vehicle's paint, providing unmatched protection against environmental contaminants, UV rays, and minor scratches. The intense hydrophobic effect makes maintenance easier as water, dirt, and grime slide right off the surface.",
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
        };
        
        setProduct(sampleProduct);
        
        // Sample related products
        const relatedProductsData: Product[] = [
          {
            id: 2,
            name: "Microfiber Applicator Pads",
            description: "Set of 8 ultra-soft microfiber applicator pads for applying coatings, waxes, and sealants.",
            image: "https://images.unsplash.com/photo-1607435097405-db48f377bff6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
            price: 12.99,
            originalPrice: 14.99,
            discountPrice: 12.99,
            rating: 4.8,
            reviewCount: 94,
            inStock: true,
            badge: null
          },
          {
            id: 3,
            name: "Surface Prep Spray",
            description: "Removes oils, waxes, and residues to ensure proper coating adhesion.",
            image: "https://images.unsplash.com/photo-1600880292630-ee8a00403024?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
            price: 19.99,
            originalPrice: 19.99,
            discountPrice: 19.99,
            rating: 4.7,
            reviewCount: 72,
            inStock: true,
            badge: null
          },
          {
            id: 4,
            name: "Coating Maintenance Shampoo",
            description: "pH-neutral formula specially designed to clean ceramic coated surfaces without degrading protection.",
            image: "https://pixabay.com/get/g9cdd39d9b32d224cf10abc240501b6c1f1d18efe9370242e889ce07433df53f9bbdfbd09a7d5ce2ad973297794f4521450ceb44bdda9e083c0b2cdaa3ab970e0_1280.jpg",
            price: 16.99,
            originalPrice: 16.99,
            discountPrice: 16.99,
            rating: 4.6,
            reviewCount: 58,
            inStock: true,
            badge: null
          }
        ];
        
        setRelatedProducts(relatedProductsData);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load product details",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId, toast]);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = async () => {
    if (!product) return;
    
    setIsAddingToCart(true);
    
    try {
      await addToCart(product, quantity);
      
      toast({
        title: "Added to cart",
        description: `${quantity} x ${product.name} has been added to your cart.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add product to cart",
        variant: "destructive",
      });
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    
    toast({
      title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      description: `${product?.name} has been ${isWishlisted ? "removed from" : "added to"} your wishlist.`,
    });
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      } else {
        stars.push(
          <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        );
      }
    }
    
    return stars;
  };

  if (isLoading) {
    return (
      <div className="bg-[#121212] py-12 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#E53E3E]"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-[#121212] py-12 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="text-center py-16">
            <h1 className="text-2xl font-montserrat font-bold text-white mb-4">Product Not Found</h1>
            <p className="text-gray-400 mb-8">The product you are looking for does not exist or has been removed.</p>
            <Link href="/shop">
              <Button className="bg-[#E53E3E] hover:bg-red-700 text-white">
                Return to Shop
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`${product.name} - Auto Detailing Nation Shop`}</title>
        <meta name="description" content={product.description.substring(0, 150)} />
      </Helmet>

      <div className="bg-[#121212] py-12">
        <div className="container mx-auto px-4">
          {/* Breadcrumbs */}
          <div className="flex mb-6 text-sm">
            <Link href="/shop" className="text-gray-400 hover:text-white">
              Shop
            </Link>
            <span className="mx-2 text-gray-600">/</span>
            <span className="text-gray-300">{product.name}</span>
          </div>

          {/* Product details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
            {/* Product image */}
            <div className="rounded-xl overflow-hidden">
              <div className="relative h-[400px] md:h-[500px]">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover" 
                />
                {product.badge && (
                  <div className="absolute top-4 left-4">
                    <span className={`bg-${product.badge.color} text-white px-3 py-1 rounded-md font-montserrat font-semibold text-sm`}>
                      {product.badge.text}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Product info */}
            <div>
              <h1 className="text-3xl font-montserrat font-bold text-white mb-2">{product.name}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {renderStars(product.rating)}
                </div>
                <span className="ml-2 text-gray-400">({product.reviewCount} reviews)</span>
              </div>
              
              <div className="mb-6">
                <span className="text-3xl font-montserrat font-bold text-[#E53E3E]">${product.discountPrice.toFixed(2)}</span>
                {product.originalPrice > product.discountPrice && (
                  <span className="ml-3 text-xl text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
                )}
                {product.originalPrice > product.discountPrice && (
                  <span className="ml-3 bg-[#E53E3E]/20 text-[#E53E3E] px-2 py-1 rounded text-sm font-semibold">
                    Save ${(product.originalPrice - product.discountPrice).toFixed(2)}
                  </span>
                )}
              </div>
              
              <p className="text-gray-300 mb-8">{product.description}</p>
              
              <div className="mb-8">
                <div className="flex items-center space-x-4 mb-2">
                  <span className="text-gray-400">Availability:</span>
                  {product.inStock ? (
                    <span className="text-green-500 font-semibold">In Stock</span>
                  ) : (
                    <span className="text-red-500 font-semibold">Out of Stock</span>
                  )}
                </div>
                
                {product.inStock && (
                  <>
                    <div className="flex items-center space-x-4 mb-6">
                      <span className="text-gray-400">Quantity:</span>
                      <div className="flex items-center">
                        <button 
                          className="bg-[#1E1E1E] hover:bg-[#2D3748] text-white w-8 h-8 flex items-center justify-center rounded-l-md"
                          onClick={() => handleQuantityChange(quantity - 1)}
                          disabled={quantity <= 1}
                        >
                          -
                        </button>
                        <div className="bg-[#1E1E1E] text-white w-12 h-8 flex items-center justify-center">
                          {quantity}
                        </div>
                        <button 
                          className="bg-[#1E1E1E] hover:bg-[#2D3748] text-white w-8 h-8 flex items-center justify-center rounded-r-md"
                          onClick={() => handleQuantityChange(quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex space-x-4">
                      <Button
                        className="bg-[#E53E3E] hover:bg-red-700 text-white py-2 px-6 font-montserrat font-semibold transition flex-1 md:flex-none"
                        onClick={handleAddToCart}
                        disabled={isAddingToCart}
                      >
                        {isAddingToCart ? 'Adding...' : 'Add to Cart'}
                      </Button>
                      <Button
                        variant="outline"
                        className="border-gray-700 text-gray-300 hover:text-white hover:bg-[#2D3748]"
                        onClick={handleWishlist}
                      >
                        {isWishlisted ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#E53E3E]" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        )}
                      </Button>
                    </div>
                  </>
                )}
              </div>
              
              <div className="border-t border-gray-800 pt-6">
                <div className="flex items-center space-x-4 mb-2">
                  <span className="text-gray-400">SKU:</span>
                  <span className="text-gray-300">ADN-{productId.toString().padStart(4, '0')}</span>
                </div>
                <div className="flex items-center space-x-4 mb-2">
                  <span className="text-gray-400">Categories:</span>
                  <span className="text-gray-300">Coatings, Paint Protection</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-gray-400">Tags:</span>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-[#1E1E1E] text-gray-300 px-2 py-1 rounded text-xs">Ceramic</span>
                    <span className="bg-[#1E1E1E] text-gray-300 px-2 py-1 rounded text-xs">Hydrophobic</span>
                    <span className="bg-[#1E1E1E] text-gray-300 px-2 py-1 rounded text-xs">Long Lasting</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product tabs */}
          <div className="mb-16">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-[#1E1E1E]">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="reviews">Reviews ({product.reviewCount})</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="bg-[#1E1E1E] rounded-b-xl p-6">
                <div className="text-gray-300 space-y-4">
                  <p>
                    Our Premium Ceramic Coating is a professional-grade 9H ceramic coating that provides up to 5 years of protection and extreme hydrophobic properties. This coating forms a permanent bond with your vehicle's paint, providing unmatched protection against environmental contaminants, UV rays, and minor scratches.
                  </p>
                  <p>
                    The intense hydrophobic effect makes maintenance easier as water, dirt, and grime slide right off the surface. This means fewer washes and a cleaner car for longer periods. The glossy finish enhances your vehicle's appearance, giving it a wet, showroom shine that lasts for years.
                  </p>
                  <h3 className="text-lg font-montserrat font-semibold text-white mt-6 mb-2">Key Benefits:</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>9H hardness rating for superior scratch resistance</li>
                    <li>Extreme hydrophobic properties that repel water, dirt, and contaminants</li>
                    <li>UV protection to prevent paint oxidation and fading</li>
                    <li>Enhanced gloss and depth of color</li>
                    <li>Up to 5 years of protection with proper maintenance</li>
                    <li>Chemical resistance against bird droppings, tree sap, and road salt</li>
                  </ul>
                </div>
              </TabsContent>
              <TabsContent value="specifications" className="bg-[#1E1E1E] rounded-b-xl p-6">
                <div className="text-gray-300">
                  <table className="w-full border-collapse">
                    <tbody>
                      <tr className="border-b border-gray-800">
                        <td className="py-3 text-gray-400">Volume</td>
                        <td className="py-3">30ml / 1 fl oz</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-3 text-gray-400">Hardness</td>
                        <td className="py-3">9H (Pencil Hardness Scale)</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-3 text-gray-400">Duration</td>
                        <td className="py-3">Up to 5 years with proper maintenance</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-3 text-gray-400">Coverage</td>
                        <td className="py-3">One 30ml bottle covers a mid-sized vehicle</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-3 text-gray-400">Application</td>
                        <td className="py-3">Professional application recommended</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-3 text-gray-400">Cure Time</td>
                        <td className="py-3">24 hours initial cure, 7 days full cure</td>
                      </tr>
                      <tr>
                        <td className="py-3 text-gray-400">Water Contact Angle</td>
                        <td className="py-3">Above 110° (Extremely Hydrophobic)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </TabsContent>
              <TabsContent value="reviews" className="bg-[#1E1E1E] rounded-b-xl p-6">
                <div className="text-gray-300 mb-6">
                  <div className="flex items-center mb-4">
                    <div className="flex items-center mr-4">
                      {renderStars(product.rating)}
                    </div>
                    <span className="text-white font-semibold">{product.rating} out of 5</span>
                  </div>
                  <p>Based on {product.reviewCount} reviews</p>
                </div>
                
                <div className="space-y-6">
                  <div className="border-b border-gray-800 pb-6">
                    <div className="flex items-start">
                      <img 
                        src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=50&h=50" 
                        alt="ProShine" 
                        className="w-10 h-10 rounded-full object-cover" 
                      />
                      <div className="ml-4">
                        <div className="flex items-center">
                          <h4 className="font-montserrat font-semibold text-white">ProShine</h4>
                          <span className="ml-2 text-xs text-gray-500">Verified Purchase</span>
                        </div>
                        <div className="flex items-center my-1">
                          {renderStars(5)}
                          <span className="ml-2 text-sm text-gray-400">5.0</span>
                        </div>
                        <p className="text-sm text-gray-300 mb-2">
                          I've been a professional detailer for 15 years and this is hands down the best ceramic coating I've used. The durability is incredible and the water beading effect is even better than coatings that cost twice as much. Highly recommended!
                        </p>
                        <span className="text-xs text-gray-500">March 15, 2025</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-b border-gray-800 pb-6">
                    <div className="flex items-start">
                      <img 
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=50&h=50" 
                        alt="DetailQueen" 
                        className="w-10 h-10 rounded-full object-cover" 
                      />
                      <div className="ml-4">
                        <div className="flex items-center">
                          <h4 className="font-montserrat font-semibold text-white">DetailQueen</h4>
                          <span className="ml-2 text-xs text-gray-500">Verified Purchase</span>
                        </div>
                        <div className="flex items-center my-1">
                          {renderStars(4)}
                          <span className="ml-2 text-sm text-gray-400">4.0</span>
                        </div>
                        <p className="text-sm text-gray-300 mb-2">
                          Great product overall. The finish is amazing and extremely glossy. The only downside is that application can be tricky if you don't have experience. Make sure to follow the instructions carefully.
                        </p>
                        <span className="text-xs text-gray-500">February 28, 2025</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-start">
                      <img 
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=50&h=50" 
                        alt="DetailingNerd" 
                        className="w-10 h-10 rounded-full object-cover" 
                      />
                      <div className="ml-4">
                        <div className="flex items-center">
                          <h4 className="font-montserrat font-semibold text-white">DetailingNerd</h4>
                          <span className="ml-2 text-xs text-gray-500">Verified Purchase</span>
                        </div>
                        <div className="flex items-center my-1">
                          {renderStars(5)}
                          <span className="ml-2 text-sm text-gray-400">5.0</span>
                        </div>
                        <p className="text-sm text-gray-300 mb-2">
                          I applied this to my black BMW and the results are spectacular. The depth and gloss are better than any other coating I've tried. After 6 months, it's still beading water like day one. Worth every penny!
                        </p>
                        <span className="text-xs text-gray-500">January 17, 2025</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 text-center">
                  <Button variant="outline" className="border-gray-700 text-gray-300 hover:text-white hover:bg-[#2D3748]">
                    View All Reviews
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Related products */}
          <div>
            <h2 className="text-2xl font-montserrat font-bold text-white mb-6">Related Products</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductView;
