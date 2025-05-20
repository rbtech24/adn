import { Link } from "wouter";
import { ProductCategory } from "@/types";

interface ProductCategoriesProps {
  categories: ProductCategory[];
}

const ProductCategories = ({ categories }: ProductCategoriesProps) => {
  return (
    <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
      {categories.map((category) => (
        <Link key={category.id} href={`/shop/category/${category.slug}`}>
          <div className="group relative rounded-xl overflow-hidden h-40">
            <img 
              src={category.image} 
              alt={category.name} 
              className="w-full h-full object-cover transition group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
              <h3 className="font-montserrat font-semibold text-white text-lg">{category.name}</h3>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductCategories;
