import { Link } from "wouter";
import { Article } from "@/types";

interface ArticleCardProps {
  article: Article;
}

const ArticleCard = ({ article }: ArticleCardProps) => {
  return (
    <Link href={`/learn/article/${article.slug}`}>
      <div className="block bg-[#121212] rounded-lg overflow-hidden hover:bg-gray-800/30 transition">
        <div className="flex">
          <img 
            src={article.image} 
            alt={article.title} 
            className="w-28 h-28 object-cover" 
          />
          <div className="p-3">
            <h4 className="font-montserrat font-semibold text-white line-clamp-2">{article.title}</h4>
            <p className="text-gray-400 text-sm mt-1 line-clamp-2">{article.excerpt}</p>
            <p className="text-gray-500 text-xs mt-1">{article.date}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
