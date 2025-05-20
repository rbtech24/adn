import MetaTags from "@/components/seo/MetaTags";
import HeroSection from "@/components/home/HeroSection";
import FeaturedSections from "@/components/home/FeaturedSections";
import CommunitySection from "@/components/forum/CommunitySection";
import ThreadPreview from "@/components/forum/ThreadPreview";
import FeaturedProducts from "@/components/shop/FeaturedProducts";
import ContentSection from "@/components/content/ContentSection";
import BeforeAfterShowcase from "@/components/home/BeforeAfterShowcase";
import NewsletterSection from "@/components/home/NewsletterSection";
import { Thread, Reply, User, ForumCategory, Activity, Product, ProductCategory, Article, Video, Resource } from "@/types";

const Home = () => {
  // Sample data would typically come from API calls via React Query
  const threads: Thread[] = [
    {
      id: 1,
      title: "Best Budget Wax for Beginners",
      author: {
        id: 1,
        username: "JohnDetailer",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100"
      },
      content: "I'm new to detailing and looking for a wax under $20 that's easy to apply. Any recommendations? I drive a black sedan, if that matters.",
      createdAt: "May 20, 2025",
      replyCount: 42,
      lastReplyTime: "2 hours ago",
      isHot: true,
      recentParticipants: [
        { username: "user1", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=30&h=30" },
        { username: "user2", avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=30&h=30" },
        { username: "user3", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=30&h=30" }
      ]
    },
    {
      id: 2,
      title: "Ceramic Coating vs. Traditional Wax - Which is Better for Daily Drivers?",
      author: {
        id: 2,
        username: "ProShine",
        avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100"
      },
      content: "Let's discuss the pros and cons of ceramic coatings compared to traditional waxes for daily drivers.",
      createdAt: "May 17, 2025",
      replyCount: 78,
      lastReplyTime: "5 hours ago",
      isHot: false,
      recentParticipants: [
        { username: "user1", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=30&h=30" },
        { username: "user2", avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=30&h=30" },
        { username: "user3", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=30&h=30" },
        { username: "user4", avatar: "" },
        { username: "user5", avatar: "" },
        { username: "user6", avatar: "" },
        { username: "user7", avatar: "" },
        { username: "user8", avatar: "" },
        { username: "user9", avatar: "" },
        { username: "user10", avatar: "" },
        { username: "user11", avatar: "" },
        { username: "user12", avatar: "" },
        { username: "user13", avatar: "" },
        { username: "user14", avatar: "" },
        { username: "user15", avatar: "" }
      ]
    },
    {
      id: 3,
      title: "Show Off Your Mobile Detailing Setup!",
      author: {
        id: 3,
        username: "DetailingPro",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100"
      },
      content: "Let's see your mobile detailing setups! Post pictures and details of your rigs, equipment, and organization.",
      createdAt: "May 15, 2025",
      replyCount: 65,
      lastReplyTime: "1 day ago",
      isHot: false,
      recentParticipants: [
        { username: "user1", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=30&h=30" },
        { username: "user2", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=30&h=30" },
        { username: "user3", avatar: "" },
        { username: "user4", avatar: "" },
        { username: "user5", avatar: "" },
        { username: "user6", avatar: "" },
        { username: "user7", avatar: "" },
        { username: "user8", avatar: "" }
      ]
    }
  ];

  const categories: ForumCategory[] = [
    {
      id: 1,
      name: "Polishing & Correction",
      slug: "polishing-correction",
      type: "polishing",
      colorClass: "blue-600",
      threadCount: 128,
      replyCount: 1200
    },
    {
      id: 2,
      name: "Interior Detailing",
      slug: "interior-detailing",
      type: "interior",
      colorClass: "green-600",
      threadCount: 96,
      replyCount: 845
    },
    {
      id: 3,
      name: "Coatings & Sealants",
      slug: "coatings-sealants",
      type: "coatings",
      colorClass: "yellow-600",
      threadCount: 152,
      replyCount: 1800
    },
    {
      id: 4,
      name: "Business Talk",
      slug: "business-talk",
      type: "business",
      colorClass: "purple-600",
      threadCount: 87,
      replyCount: 642
    }
  ];

  const topContributors: User[] = [
    {
      id: 2,
      username: "ProShine",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100",
      badge: "Elite Detailer",
      badgeColor: "blue-500",
      joined: "January 2023",
      posts: 584,
      level: 42
    },
    {
      id: 4,
      username: "DetailQueen",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100",
      badge: "Ceramic Pro",
      badgeColor: "purple-500",
      joined: "March 2023",
      posts: 472,
      level: 38
    },
    {
      id: 5,
      username: "DetailingNerd",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100",
      badge: "Product Expert",
      badgeColor: "green-500",
      joined: "June 2023",
      posts: 368,
      level: 35
    },
    {
      id: 6,
      username: "GlossGuru",
      avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100",
      badge: "Workshop Owner",
      badgeColor: "yellow-500",
      joined: "February 2024",
      posts: 256,
      level: 28
    }
  ];

  const recentActivity: Activity[] = [
    {
      user: {
        username: "ProShine",
        avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=50&h=50"
      },
      action: "replied to",
      targetName: "Ceramic Coating Review",
      targetUrl: "/forum/ceramic-coating-review",
      timeAgo: "20 minutes ago"
    },
    {
      user: {
        username: "DetailQueen",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=50&h=50"
      },
      action: "posted",
      targetName: "Ferrari 458 Full Detail",
      targetUrl: "/forum/ferrari-458-detail",
      timeAgo: "1 hour ago"
    },
    {
      user: {
        username: "DetailingNerd",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=50&h=50"
      },
      action: "reviewed",
      targetName: "New Foam Cannon XL",
      targetUrl: "/shop/foam-cannon-xl",
      timeAgo: "3 hours ago"
    }
  ];

  const featuredThread: Thread = threads[0];

  const featuredReplies: Reply[] = [
    {
      id: 1,
      author: {
        id: 2,
        username: "ProShine",
        avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=50&h=50"
      },
      content: "Try Meguiar's Ultimate Liquid Wax. It's $15 on <a href='/shop/meguiars-wax' class='text-[#E53E3E]'>our store</a>, super easy to apply, and great for dark cars. Buffs off cleanly with a microfiber towel.",
      createdAt: "May 20, 2025",
      likes: 12
    },
    {
      id: 2,
      author: {
        id: 5,
        username: "DetailingNerd",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=50&h=50"
      },
      content: "I'd go with Turtle Wax ICE. It's $12, beginner-friendly, and adds decent gloss. Check the <a href='/learn/wax-guide' class='text-[#E53E3E]'>wax guide</a> for tips on applying it.",
      createdAt: "May 21, 2025",
      likes: 8
    }
  ];

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
      }
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
      badge: null
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
      }
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
      badge: null
    }
  ];

  const productCategories: ProductCategory[] = [
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

  const featuredArticle: Article = {
    id: 1,
    title: "The Ultimate Guide to Paint Correction: From Swirls to Perfection",
    slug: "ultimate-guide-paint-correction",
    excerpt: "Learn the step-by-step process professionals use to transform swirled, scratched paint into a mirror-like finish.",
    image: "https://images.unsplash.com/photo-1507136566006-cfc505b114fc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
    content: "",
    author: {
      id: 2,
      username: "ProShine",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=50&h=50"
    },
    date: "May 15, 2025",
    readTime: "15 min read",
    category: "Guides"
  };

  const articles: Article[] = [
    {
      id: 2,
      title: "Ceramic Coating vs. Wax: Which is Right for You?",
      slug: "ceramic-coating-vs-wax",
      excerpt: "Compare durability, application, cost, and results to make the right choice.",
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=120&h=120",
      content: "",
      author: {
        id: 2,
        username: "ProShine",
        avatar: ""
      },
      date: "May 18, 2025",
      readTime: "10 min read",
      category: "Comparisons"
    },
    {
      id: 3,
      title: "The Complete Guide to Wheel Cleaning & Protection",
      slug: "wheel-cleaning-protection-guide",
      excerpt: "Master the techniques for removing brake dust and protecting your wheels.",
      image: "https://pixabay.com/get/g859b93ea47df1960f8450a33d0a9d138d61839fa8f5756072c6a054fe56d661d24698dff9a7b074be6c25bd63b681738f0e50906fe1af31994b459377a4111c4_1280.jpg",
      content: "",
      author: {
        id: 5,
        username: "DetailingNerd",
        avatar: ""
      },
      date: "May 12, 2025",
      readTime: "8 min read",
      category: "Guides"
    },
    {
      id: 4,
      title: "How to Start a Profitable Mobile Detailing Business",
      slug: "start-mobile-detailing-business",
      excerpt: "From equipment to pricing, learn how to launch your detailing business.",
      image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=120&h=120",
      content: "",
      author: {
        id: 6,
        username: "GlossGuru",
        avatar: ""
      },
      date: "May 5, 2025",
      readTime: "12 min read",
      category: "Business"
    }
  ];

  const videos: Video[] = [
    {
      id: 1,
      title: "5-Minute Clay Bar Tutorial",
      description: "Learn the quick and effective way to clay bar your car for a smooth-as-glass finish.",
      thumbnail: "https://images.unsplash.com/photo-1506719040632-7d586470c936?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=225",
      url: "#",
      duration: "5:32",
      views: "12.5K",
      creator: {
        id: 2,
        username: "ProShine",
        avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=50&h=50"
      }
    },
    {
      id: 2,
      title: "How to Use a Foam Cannon",
      description: "Master the art of creating thick, clingy foam for the safest wash possible.",
      thumbnail: "https://pixabay.com/get/g9cdd39d9b32d224cf10abc240501b6c1f1d18efe9370242e889ce07433df53f9bbdfbd09a7d5ce2ad973297794f4521450ceb44bdda9e083c0b2cdaa3ab970e0_1280.jpg",
      url: "#",
      duration: "8:17",
      views: "9.8K",
      creator: {
        id: 5,
        username: "DetailingNerd",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=50&h=50"
      }
    },
    {
      id: 3,
      title: "Interior Detailing Secrets",
      description: "Pro tips for cleaning and protecting leather, plastic, and fabric surfaces like a professional.",
      thumbnail: "https://pixabay.com/get/g82e22ac6a0701e03239aa1343ba6068817f855c491e36a9ec6de1ff0f1d1ae7ec228e1d7a5b25784278ef4edc65cc65396f96e1ee8409b780c1122c6bb282723_1280.jpg",
      url: "#",
      duration: "12:45",
      views: "15.3K",
      creator: {
        id: 4,
        username: "DetailQueen",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=50&h=50"
      }
    }
  ];

  const resources: Resource[] = [
    {
      id: 1,
      name: "Beginner's Detailing Checklist",
      description: "A comprehensive checklist for beginners covering all the essential steps for a complete detail.",
      type: "pdf",
      downloadUrl: "#"
    },
    {
      id: 2,
      name: "Detailing Business Invoice Template",
      description: "Professional invoice template for detailing businesses with customizable fields and automatic calculations.",
      type: "excel",
      downloadUrl: "#"
    },
    {
      id: 3,
      name: "Product Dilution Chart",
      description: "Quick reference guide for common detailing product dilution ratios to achieve optimal performance.",
      type: "text",
      downloadUrl: "#"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Auto Detailing Nation - The Premier Community for Detailing Enthusiasts</title>
        <meta name="description" content="Join the premier online community for auto detailing enthusiasts and professionals. Learn, shop, and connect with thousands of car care experts." />
        <meta property="og:title" content="Auto Detailing Nation - The Premier Community for Detailing Enthusiasts" />
        <meta property="og:description" content="Join the premier online community for auto detailing enthusiasts and professionals. Learn, shop, and connect with thousands of car care experts." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://autodetailingnation.com" />
        <meta property="og:image" content="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=630" />
      </Helmet>

      <HeroSection />
      <FeaturedSections />
      <CommunitySection 
        threads={threads} 
        categories={categories} 
        topContributors={topContributors} 
        recentActivity={recentActivity} 
      />
      <ThreadPreview thread={featuredThread} replies={featuredReplies} />
      <FeaturedProducts products={products} categories={productCategories} />
      <ContentSection 
        featuredArticle={featuredArticle} 
        articles={articles} 
        videos={videos} 
        resources={resources} 
      />
      <BeforeAfterShowcase />
      <NewsletterSection />
    </>
  );
};

export default Home;
