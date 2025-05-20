import { Link } from "wouter";
import ArticleCard from "./ArticleCard";
import VideoCard from "./VideoCard";
import ResourceCard from "./ResourceCard";
import { Article, Video, Resource } from "@/types";

interface ContentSectionProps {
  featuredArticle: Article;
  articles: Article[];
  videos: Video[];
  resources: Resource[];
}

const ContentSection = ({ featuredArticle, articles, videos, resources }: ContentSectionProps) => {
  return (
    <section id="learn" className="py-16 bg-[#1E1E1E]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-white">
            Latest <span className="text-[#E53E3E]">Content</span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-3xl mx-auto">
            Expand your detailing knowledge with our latest guides, tutorials, and resources created by industry experts.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Featured Article */}
          <div className="col-span-1 md:col-span-2">
            <Link href={`/learn/article/${featuredArticle.slug}`}>
              <div className="group relative h-80 rounded-xl overflow-hidden">
                <img 
                  src={featuredArticle.image} 
                  alt={featuredArticle.title} 
                  className="w-full h-full object-cover transition group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-6">
                  <span className="text-[#E53E3E] font-montserrat text-sm font-semibold mb-2">FEATURED GUIDE</span>
                  <h3 className="font-montserrat font-bold text-white text-2xl mb-2 group-hover:text-[#E53E3E] transition">
                    {featuredArticle.title}
                  </h3>
                  <p className="text-gray-300 mb-3 line-clamp-2">
                    {featuredArticle.excerpt}
                  </p>
                  <div className="flex items-center">
                    <img 
                      src={featuredArticle.author.avatar} 
                      alt={featuredArticle.author.username} 
                      className="w-8 h-8 rounded-full object-cover" 
                    />
                    <div className="ml-2">
                      <p className="text-white text-sm">By <span className="text-[#E53E3E]">{featuredArticle.author.username}</span></p>
                      <p className="text-gray-400 text-xs">{featuredArticle.date} • {featuredArticle.readTime}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
          
          {/* Latest Articles Column */}
          <div className="space-y-4">
            <h3 className="font-montserrat font-semibold text-white text-xl border-b border-gray-700 pb-2">Latest Articles</h3>
            
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
        
        {/* Video Section */}
        <div className="mt-14">
          <h3 className="font-montserrat font-semibold text-white text-xl border-b border-gray-700 pb-2 mb-6">Latest Videos</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </div>
        
        {/* Resources Section */}
        <div className="mt-14">
          <h3 className="font-montserrat font-semibold text-white text-xl border-b border-gray-700 pb-2 mb-6">Free Resources</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </div>
        
        {/* Content CTA */}
        <div className="mt-12 text-center">
          <Link href="/learn">
            <button className="inline-block bg-[#E53E3E] hover:bg-red-700 text-white py-3 px-8 rounded-md font-montserrat font-semibold text-lg transition transform hover:scale-105">
              Explore All Content
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ContentSection;
