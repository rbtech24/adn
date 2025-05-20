import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Article } from "@/types";

const ArticleView = () => {
  const [match, params] = useRoute("/learn/:slug");
  const slug = params?.slug;
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchArticle = async () => {
      setIsLoading(true);
      try {
        // In a real app, we would fetch from API
        // For now we'll use sample data
        const sampleArticle: Article = {
          id: 1,
          title: "Ultimate Guide to Ceramic Coatings",
          slug: "ultimate-guide-to-ceramic-coatings",
          content: `
# The Ultimate Guide to Ceramic Coatings

Ceramic coatings have revolutionized the way we protect and maintain vehicles. This comprehensive guide covers everything you need to know about ceramic coatings, from preparation to application and long-term maintenance.

## What is a Ceramic Coating?

A ceramic coating is a liquid polymer that chemically bonds with a vehicle's factory paint, creating a layer of protection that can last for years with proper maintenance. Unlike traditional waxes or sealants, ceramic coatings form a permanent or semi-permanent bond with the paint, providing superior protection against environmental contaminants, UV rays, and minor scratches.

## Benefits of Ceramic Coatings

- **Superior Protection**: Creates a hydrophobic surface that repels water, dirt, and contaminants
- **Enhanced Gloss**: Significantly enhances the depth and shine of your vehicle's paint
- **Long-Lasting Results**: Can provide protection for 2-5 years, depending on the product and maintenance
- **Chemical Resistance**: Protects against bird droppings, tree sap, and other acidic contaminants
- **UV Protection**: Prevents paint oxidation and fading caused by sun exposure
- **Easier Maintenance**: Makes regular washing easier and reduces the need for frequent detailing

## Preparation Before Application

Proper preparation is crucial for a successful ceramic coating application. This includes:

1. **Thorough Washing**: Using a pH-neutral shampoo to remove surface contaminants
2. **Clay Bar Treatment**: To remove embedded contaminants that washing can't remove
3. **Paint Correction**: Polishing and removing imperfections, swirl marks, and scratches
4. **Panel Wipe**: Using an IPA or dedicated panel wipe solution to remove any oils or residues

## Application Process

While professional application is recommended for best results, DIY applications can also be successful with careful preparation and attention to detail:

1. Ensure the vehicle is in a controlled environment, free from dust and direct sunlight
2. Work in small sections, typically 2x2 feet at a time
3. Apply a few drops of the coating to an applicator pad
4. Spread the coating in a crosshatch pattern
5. Allow it to flash (begin to haze) according to the manufacturer's instructions
6. Buff off with a clean, high-quality microfiber towel
7. Allow proper curing time, typically 24-48 hours depending on the product

## Maintenance Tips

To get the most out of your ceramic coating:

- Wait at least 7 days before washing the vehicle after application
- Use pH-neutral shampoos designed for coated vehicles
- Avoid automatic car washes with harsh brushes
- Apply a ceramic boost spray every 3-4 months to enhance hydrophobic properties
- Avoid parking under trees or in areas with high contamination when possible

## Professional vs. DIY Application

While DIY ceramic coating products have improved significantly, professional-grade coatings still offer advantages:

- Professional coatings contain higher percentages of SiO2, the main ingredient in ceramic coatings
- Professionals have controlled environments and specialized equipment
- Professional preparation typically includes multi-stage paint correction
- Certified installers offer warranties that DIY applications can't match

## Common Myths and Misconceptions

- **Myth**: Ceramic coatings make your car bulletproof to scratches and rock chips
- **Reality**: While they provide some protection against minor scratches, they won't prevent damage from rocks, keys, or other physical impacts

- **Myth**: Once applied, you never need to wash your car again
- **Reality**: Regular maintenance is still required; the coating just makes cleaning easier

## Conclusion

Ceramic coatings represent the pinnacle of paint protection technology available today. Whether you choose a professional application or a DIY approach, the benefits of ceramic coatings are undeniable for those looking to maintain their vehicle's appearance and value over the long term.

Just remember that preparation is key, and maintenance is still required even with the most advanced coating. With proper care, a ceramic coating can keep your vehicle looking showroom-fresh for years to come.
          `,
          summary: "Learn everything you need to know about ceramic coatings - from preparation to application and maintenance.",
          excerpt: "Learn everything you need to know about ceramic coatings - from preparation to application and maintenance.",
          readTime: "10 min",
          image: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
          categoryId: 1,
          authorId: 1,
          publishedAt: new Date("2023-04-15"),
          tags: ["ceramic-coating", "paint-protection", "detailing-guide"]
        };
        
        setArticle(sampleArticle);
        
        // Sample related articles
        const relatedArticlesData: Article[] = [
          {
            id: 2,
            title: "How to Properly Polish Your Car",
            slug: "how-to-properly-polish-your-car",
            content: "Polishing is a critical step in the detailing process...",
            summary: "Master the art of paint correction with this comprehensive guide to proper polishing techniques and product selection.",
            excerpt: "Master the art of paint correction with this comprehensive guide to proper polishing techniques and product selection.",
            readTime: "8 min",
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
            excerpt: "Discover professional techniques to make your car's interior look and feel like new again.",
            readTime: "7 min",
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
            excerpt: "Prepare your vehicle for winter with these essential protection strategies and maintenance tips.",
            readTime: "6 min",
            image: "https://images.unsplash.com/photo-1610986603166-f78428624e76?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
            categoryId: 4,
            authorId: 1,
            publishedAt: new Date("2023-06-10"),
            tags: ["winter-protection", "salt-damage", "seasonal-detailing"]
          }
        ];
        
        setRelatedArticles(relatedArticlesData);
      } catch (error) {
        console.error("Failed to load article", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchArticle();
    }
  }, [slug]);

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }).format(date);
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

  if (!article) {
    return (
      <div className="bg-[#121212] py-12 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="text-center py-16">
            <h1 className="text-2xl font-montserrat font-bold text-white mb-4">Article Not Found</h1>
            <p className="text-gray-400 mb-8">The article you are looking for does not exist or has been removed.</p>
            <Link href="/learn">
              <Button className="bg-[#E53E3E] hover:bg-red-700 text-white">
                Return to Learn
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
        <title>{`${article.title} - Auto Detailing Nation`}</title>
        <meta name="description" content={article.summary} />
      </Helmet>

      <div className="bg-[#121212] py-12 min-h-screen">
        <div className="container mx-auto px-4">
          {/* Breadcrumbs */}
          <div className="flex mb-6 text-sm">
            <Link href="/learn" className="text-gray-400 hover:text-white">
              Learn
            </Link>
            <span className="mx-2 text-gray-600">/</span>
            <span className="text-gray-300">{article.title}</span>
          </div>

          {/* Article header */}
          <div className="max-w-4xl mx-auto mb-10">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-montserrat font-bold text-white mb-6">
              {article.title}
            </h1>
            
            <div className="flex flex-wrap items-center mb-8 gap-y-4">
              <div className="flex items-center mr-6">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src="https://i.pravatar.cc/150?u=1" alt="Author" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-white font-medium">John Doe</div>
                  <div className="text-sm text-gray-400">Detailing Expert</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{formatDate(article.publishedAt)}</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>10 min read</span>
                </div>
              </div>
            </div>
          </div>

          {/* Featured image */}
          <div className="max-w-5xl mx-auto mb-10 rounded-xl overflow-hidden">
            <img 
              src={article.image} 
              alt={article.title} 
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Article content */}
          <div className="flex flex-col lg:flex-row gap-10 max-w-6xl mx-auto">
            {/* Main content */}
            <div className="flex-1">
              <div className="prose prose-invert prose-lg max-w-none">
                <div dangerouslySetInnerHTML={{ __html: article.content.replace(/^#\s(.+)$/gm, '<h1>$1</h1>')
                  .replace(/^##\s(.+)$/gm, '<h2>$1</h2>')
                  .replace(/^###\s(.+)$/gm, '<h3>$1</h3>')
                  .replace(/^\*\*(.+)\*\*$/gm, '<strong>$1</strong>')
                  .replace(/^\*\s(.+)$/gm, '<li>$1</li>')
                  .replace(/\n\n/g, '</p><p>')
                  .replace(/\n/g, '<br />')
                }} />
              </div>

              {/* Author bio and article tags */}
              <div className="mt-12 border-t border-gray-800 pt-8">
                <div className="flex flex-col md:flex-row gap-8 mb-8">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="https://i.pravatar.cc/150?u=1" alt="Author" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-montserrat font-bold text-white mb-2">John Doe</h3>
                    <p className="text-gray-300 mb-4">
                      John is a certified detailer with over 10 years of experience in the industry. 
                      He specializes in ceramic coatings and paint correction techniques.
                    </p>
                    <div className="flex space-x-3">
                      <Button variant="outline" size="sm" className="border-gray-700 text-gray-300 hover:text-white hover:bg-[#2D3748]">
                        View Profile
                      </Button>
                      <Button variant="outline" size="sm" className="border-gray-700 text-gray-300 hover:text-white hover:bg-[#2D3748]">
                        Follow
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-6">
                  {article.tags.map((tag, index) => (
                    <Link key={index} href={`/learn/tag/${tag}`}>
                      <span className="bg-[#1E1E1E] text-gray-300 hover:bg-[#2D3748] px-3 py-1 rounded-full text-sm transition">
                        #{tag}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:w-80">
              <div className="sticky top-24">
                <div className="bg-[#1E1E1E] rounded-xl p-6 mb-6">
                  <h3 className="text-xl font-montserrat font-bold text-white mb-4">Related Articles</h3>
                  <ul className="space-y-4">
                    {relatedArticles.map(related => (
                      <li key={related.id} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-16 h-16 rounded overflow-hidden">
                          <img src={related.image} alt={related.title} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h4 className="text-sm font-montserrat font-medium text-white hover:text-[#E53E3E] transition line-clamp-2">
                            <Link href={`/learn/${related.slug}`}>
                              {related.title}
                            </Link>
                          </h4>
                          <span className="text-xs text-gray-400">{formatDate(related.publishedAt)}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-gradient-to-r from-[#1A1A1A] to-[#2D2D2D] rounded-xl p-6">
                  <h3 className="text-xl font-montserrat font-bold text-white mb-4">Subscribe for Updates</h3>
                  <p className="text-gray-300 text-sm mb-4">Get notified about new articles and exclusive content</p>
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
      </div>
    </>
  );
};

export default ArticleView;