import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Article } from "@/types";

const Learn = () => {
  // Sample articles for demonstration
  const articles: Article[] = [
    {
      id: 1,
      title: "Ultimate Guide to Ceramic Coatings",
      slug: "ultimate-guide-to-ceramic-coatings",
      content: "Ceramic coatings provide the ultimate protection for your vehicle's paint...",
      summary: "Learn everything you need to know about ceramic coatings - from preparation to application and maintenance.",
      image: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      categoryId: 1,
      authorId: 1,
      publishedAt: new Date("2023-04-15"),
      tags: ["ceramic-coating", "paint-protection", "detailing-guide"]
    },
    {
      id: 2,
      title: "How to Properly Polish Your Car",
      slug: "how-to-properly-polish-your-car",
      content: "Polishing is a critical step in the detailing process...",
      summary: "Master the art of paint correction with this comprehensive guide to proper polishing techniques and product selection.",
      image: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      categoryId: 2,
      authorId: 2,
      publishedAt: new Date("2023-05-02"),
      tags: ["polishing", "paint-correction", "detailing-tips"]
    },
    {
      id: 3,
      title: "Interior Detailing: Tips and Tricks",
      slug: "interior-detailing-tips-and-tricks",
      content: "The interior of your vehicle requires special attention...",
      summary: "Discover professional techniques to make your car's interior look and feel like new again.",
      image: "https://images.unsplash.com/photo-1583836631365-49df849bcfb3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      categoryId: 3,
      authorId: 3,
      publishedAt: new Date("2023-05-20"),
      tags: ["interior-detailing", "upholstery-cleaning", "dashboard-care"]
    },
    {
      id: 4,
      title: "Winter Protection Guide for Your Vehicle",
      slug: "winter-protection-guide-for-your-vehicle",
      content: "Winter conditions can wreak havoc on your vehicle's finish...",
      summary: "Prepare your vehicle for winter with these essential protection strategies and maintenance tips.",
      image: "https://images.unsplash.com/photo-1610986603166-f78428624e76?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      categoryId: 4,
      authorId: 1,
      publishedAt: new Date("2023-06-10"),
      tags: ["winter-protection", "salt-damage", "seasonal-detailing"]
    }
  ];

  const categories = [
    { id: 1, name: "Guides", count: 12 },
    { id: 2, name: "Tutorials", count: 24 },
    { id: 3, name: "Reviews", count: 18 },
    { id: 4, name: "Tips & Tricks", count: 16 }
  ];

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }).format(date);
  };

  return (
    <>
      <Helmet>
        <title>Learn - Auto Detailing Nation</title>
        <meta name="description" content="Discover expert guides, tutorials, and resources to master the art and science of auto detailing" />
      </Helmet>

      <div className="bg-[#121212] min-h-screen py-12">
        <div className="container mx-auto px-4">
          {/* Hero section */}
          <div className="relative rounded-2xl overflow-hidden mb-16">
            <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=400&q=80" 
              alt="Auto Detailing Knowledge Base" 
              className="w-full h-[300px] md:h-[400px] object-cover"
            />
            <div className="absolute inset-0 z-20 flex flex-col justify-center px-8 md:px-16">
              <h1 className="text-4xl md:text-5xl font-montserrat font-bold text-white mb-4">
                The Detailing Knowledge Hub
              </h1>
              <p className="text-xl text-gray-200 mb-6 max-w-2xl">
                Explore our comprehensive guides, tutorials, and resources to master the art and science of auto detailing
              </p>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-[#E53E3E] hover:bg-red-700 text-white">
                  Latest Articles
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white/10">
                  Video Tutorials
                </Button>
              </div>
            </div>
          </div>

          {/* Main content area */}
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Articles column */}
            <div className="flex-1">
              <h2 className="text-2xl font-montserrat font-bold text-white mb-6">Latest Articles</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                {articles.map((article) => (
                  <Card key={article.id} className="bg-[#1E1E1E] border-gray-800 hover:border-gray-700 transition overflow-hidden">
                    <div className="relative h-48">
                      <img 
                        src={article.image} 
                        alt={article.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center text-sm text-gray-400 mb-2">
                        <span>{formatDate(article.publishedAt)}</span>
                        <span className="mx-2">•</span>
                        <span>{categories.find(c => c.id === article.categoryId)?.name}</span>
                      </div>
                      <h3 className="text-xl font-montserrat font-bold text-white mb-2 line-clamp-2">
                        <Link href={`/learn/${article.slug}`} className="hover:text-[#E53E3E] transition">
                          {article.title}
                        </Link>
                      </h3>
                      <p className="text-gray-300 mb-4 line-clamp-3">{article.summary}</p>
                      <Link href={`/learn/${article.slug}`}>
                        <Button variant="link" className="text-[#E53E3E] p-0 h-auto hover:text-red-400">
                          Read More →
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="flex justify-center">
                <Button variant="outline" className="border-gray-700 text-gray-300 hover:text-white hover:border-gray-500">
                  Load More Articles
                </Button>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:w-80">
              {/* Categories */}
              <div className="bg-[#1E1E1E] rounded-xl p-6 mb-6">
                <h3 className="text-xl font-montserrat font-bold text-white mb-4">Categories</h3>
                <ul className="space-y-2">
                  {categories.map(category => (
                    <li key={category.id}>
                      <Link href={`/learn/category/${category.id}`} className="flex justify-between items-center text-gray-300 hover:text-[#E53E3E] transition">
                        <span>{category.name}</span>
                        <span className="bg-[#2D2D2D] text-gray-400 text-xs px-2 py-1 rounded-full">
                          {category.count}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Popular articles */}
              <div className="bg-[#1E1E1E] rounded-xl p-6 mb-6">
                <h3 className="text-xl font-montserrat font-bold text-white mb-4">Popular Articles</h3>
                <ul className="space-y-4">
                  {articles.slice(0, 3).map(article => (
                    <li key={article.id} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-16 h-16 rounded overflow-hidden">
                        <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="text-sm font-montserrat font-medium text-white hover:text-[#E53E3E] transition line-clamp-2">
                          <Link href={`/learn/${article.slug}`}>
                            {article.title}
                          </Link>
                        </h4>
                        <span className="text-xs text-gray-400">{formatDate(article.publishedAt)}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Newsletter signup */}
              <div className="bg-gradient-to-r from-[#1A1A1A] to-[#2D2D2D] rounded-xl p-6">
                <h3 className="text-xl font-montserrat font-bold text-white mb-2">Join Our Newsletter</h3>
                <p className="text-gray-300 text-sm mb-4">Get the latest detailing tips and exclusive content delivered to your inbox</p>
                <div className="space-y-3">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="w-full bg-[#1A1A1A] border border-gray-700 rounded-md px-4 py-2 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-[#E53E3E]"
                  />
                  <Button className="w-full bg-[#E53E3E] hover:bg-red-700 text-white">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Learn;