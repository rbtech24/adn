import { Link } from "wouter";
import ProductCard from "./ProductCard";
import ProductCategories from "./ProductCategories";
import { Product, ProductCategory } from "@/types";

interface FeaturedProductsProps {
  products: Product[];
  categories: ProductCategory[];
}

const FeaturedProducts = ({ products, categories }: FeaturedProductsProps) => {
  return (
    <section id="shop" className="py-16 bg-[#121212]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-white">
            Featured <span className="text-[#E53E3E]">Products</span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-3xl mx-auto">
            Discover top-rated detailing products trusted by professionals and enthusiasts alike. All products are tested and approved by our community.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {/* Categories */}
        <ProductCategories categories={categories} />
        
        {/* Shop CTA */}
        <div className="mt-10 text-center">
          <Link href="/shop">
            <button className="inline-block bg-[#E53E3E] hover:bg-red-700 text-white py-3 px-8 rounded-md font-montserrat font-semibold text-lg transition transform hover:scale-105">
              Visit the Shop
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
