import { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/hooks/use-auth";
import { ForumCategory, Thread } from "@/types";
import ForumCategories from "@/components/forum/ForumCategories";

const Forum = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("latest");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();

  // Dummy data for demonstration
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
    },
    {
      id: 5,
      name: "Tool Discussion",
      slug: "tool-discussion",
      type: "polishing",
      colorClass: "blue-600",
      threadCount: 112,
      replyCount: 950
    },
    {
      id: 6,
      name: "Beginner's Corner",
      slug: "beginners-corner",
      type: "interior",
      colorClass: "green-600",
      threadCount: 184,
      replyCount: 2350
    }
  ];

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
      categoryId: 3,
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
      categoryId: 3,
      recentParticipants: [
        { username: "user1", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=30&h=30" },
        { username: "user2", avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=30&h=30" },
        { username: "user3", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=30&h=30" }
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
      categoryId: 4,
      recentParticipants: [
        { username: "user1", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=30&h=30" },
        { username: "user2", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=30&h=30" }
      ]
    },
    {
      id: 4,
      title: "How do you clean leather seats with perforations?",
      author: {
        id: 4,
        username: "DetailQueen",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100"
      },
      content: "I'm working on a car with perforated leather seats and I'm wondering what the best approach is for cleaning them thoroughly without damaging them.",
      createdAt: "May 14, 2025",
      replyCount: 32,
      lastReplyTime: "2 days ago",
      isHot: false,
      categoryId: 2,
      recentParticipants: [
        { username: "user1", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=30&h=30" },
        { username: "user2", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=30&h=30" }
      ]
    },
    {
      id: 5,
      title: "One-step vs Two-step Paint Correction - When to use each?",
      author: {
        id: 5,
        username: "DetailingNerd",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100"
      },
      content: "I'm trying to decide when a one-step correction is sufficient and when I should go for a two-step process. What's your approach?",
      createdAt: "May 12, 2025",
      replyCount: 47,
      lastReplyTime: "3 days ago",
      isHot: false,
      categoryId: 1,
      recentParticipants: [
        { username: "user1", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=30&h=30" },
        { username: "user2", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=30&h=30" }
      ]
    }
  ];

  // Filter and sort threads
  const filteredAndSortedThreads = threads
    .filter(thread => 
      (activeCategory ? thread.categoryId === parseInt(activeCategory) : true) &&
      (searchTerm 
        ? thread.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
          thread.content.toLowerCase().includes(searchTerm.toLowerCase())
        : true
      )
    )
    .sort((a, b) => {
      switch (sortOption) {
        case 'latest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'mostReplies':
          return b.replyCount - a.replyCount;
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        default:
          return 0;
      }
    });

  // Map categories for Select component
  const getCategoryNameById = (id: number): string => {
    const category = categories.find(cat => cat.id === id);
    return category ? category.name : "Unknown Category";
  };

  return (
    <>
      <Helmet>
        <title>Community Forum - Auto Detailing Nation</title>
        <meta name="description" content="Join the discussion in our auto detailing forum. Ask questions, share tips, and connect with detailing enthusiasts and professionals." />
      </Helmet>

      <div className="bg-[#121212] py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-montserrat font-bold text-white">
              Community <span className="text-[#E53E3E]">Forum</span>
            </h1>
            <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
              Join the conversation with thousands of detailing enthusiasts. Ask questions, share your experience, and learn from experts.
            </p>
          </div>

          {/* Search and controls */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
            <div className="w-full md:w-auto flex-1 max-w-md">
              <Input
                placeholder="Search discussions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-[#1E1E1E] border-gray-700 text-white"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Select value={activeCategory || ''} onValueChange={setActiveCategory}>
                <SelectTrigger className="bg-[#1E1E1E] border-gray-700 text-white w-full sm:w-[180px]">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent className="bg-[#1E1E1E] border-gray-700 text-white">
                  <SelectItem value="">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id.toString()}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger className="bg-[#1E1E1E] border-gray-700 text-white w-full sm:w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-[#1E1E1E] border-gray-700 text-white">
                  <SelectItem value="latest">Latest Activity</SelectItem>
                  <SelectItem value="mostReplies">Most Replies</SelectItem>
                  <SelectItem value="newest">Newest Threads</SelectItem>
                  <SelectItem value="oldest">Oldest Threads</SelectItem>
                </SelectContent>
              </Select>
              {isAuthenticated && (
                <Link href="/forum/new">
                  <Button className="bg-[#E53E3E] hover:bg-red-700 text-white w-full sm:w-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    New Thread
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* Categories */}
          <div className="mb-10">
            <h2 className="text-xl font-montserrat font-semibold text-white mb-4">Categories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <ForumCategories categories={categories} />
            </div>
          </div>

          {/* Thread list */}
          <div>
            <h2 className="text-xl font-montserrat font-semibold text-white mb-4">
              {activeCategory 
                ? `Threads in ${getCategoryNameById(parseInt(activeCategory))}`
                : "Recent Discussions"}
            </h2>
            
            {filteredAndSortedThreads.length === 0 ? (
              <div className="bg-[#1E1E1E] rounded-xl p-10 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-lg font-montserrat font-semibold text-white mb-2">No threads found</h3>
                <p className="text-gray-400 mb-6">
                  {searchTerm 
                    ? `No threads matching "${searchTerm}"`
                    : "Be the first to start a discussion"}
                </p>
                {isAuthenticated && (
                  <Link href="/forum/new">
                    <Button className="bg-[#E53E3E] hover:bg-red-700 text-white">
                      Start a New Thread
                    </Button>
                  </Link>
                )}
              </div>
            ) : (
              <div className="bg-[#1E1E1E] rounded-xl overflow-hidden">
                {filteredAndSortedThreads.map((thread, idx) => (
                  <div key={thread.id} className={`p-4 hover:bg-gray-800/30 transition ${idx < filteredAndSortedThreads.length - 1 ? 'border-b border-gray-800' : ''}`}>
                    <div className="flex items-start">
                      <div className="hidden sm:block">
                        <img 
                          src={thread.author.avatar} 
                          alt={`${thread.author.username} profile`}
                          className="w-10 h-10 rounded-full object-cover" 
                        />
                      </div>
                      <div className="sm:ml-4 flex-1">
                        <div className="flex justify-between items-start">
                          <Link href={`/forum/${thread.id}`} className="font-montserrat font-semibold text-white hover:text-[#E53E3E] transition">
                            {thread.title}
                          </Link>
                          <div className="flex items-center gap-2">
                            {thread.isHot && (
                              <span className="bg-[#E53E3E] rounded-full px-2 py-1 text-xs text-white">Hot</span>
                            )}
                            <span className="bg-[#2D3748] text-xs text-white px-2 py-1 rounded-full hidden sm:inline-block">
                              {getCategoryNameById(thread.categoryId)}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-400 mt-1">
                          Started by <Link href={`/profile/${thread.author.username}`} className="text-[#E53E3E]">{thread.author.username}</Link> - {thread.replyCount} replies
                        </p>
                        <div className="flex items-center mt-2">
                          <span className="text-xs text-gray-500">Last reply {thread.lastReplyTime}</span>
                          <span className="mx-2 text-gray-600">•</span>
                          <div className="flex -space-x-2">
                            {thread.recentParticipants.slice(0, 3).map((participant, idx) => (
                              <img 
                                key={idx}
                                src={participant.avatar} 
                                alt={participant.username} 
                                className="w-6 h-6 rounded-full border border-gray-800" 
                              />
                            ))}
                            {thread.recentParticipants.length > 3 && (
                              <div className="w-6 h-6 rounded-full bg-[#2D3748] border border-gray-800 flex items-center justify-center text-xs text-white">
                                +{thread.recentParticipants.length - 3}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pagination */}
          <div className="mt-8 flex justify-center">
            <nav className="flex items-center space-x-2">
              <Button variant="outline" className="border-gray-700 text-gray-400 hover:text-white hover:bg-[#2D3748]" disabled>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </Button>
              <Button variant="outline" className="border-gray-700 bg-[#2D3748] text-white">1</Button>
              <Button variant="outline" className="border-gray-700 text-gray-400 hover:text-white hover:bg-[#2D3748]">2</Button>
              <Button variant="outline" className="border-gray-700 text-gray-400 hover:text-white hover:bg-[#2D3748]">3</Button>
              <Button variant="outline" className="border-gray-700 text-gray-400 hover:text-white hover:bg-[#2D3748]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </Button>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Forum;
