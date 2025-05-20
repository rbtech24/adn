import { useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { Thread, Reply, User } from "@/types";

const ThreadView = () => {
  const [_, params] = useRoute("/forum/:id");
  const threadId = params?.id ? parseInt(params.id) : 0;
  const [replyText, setReplyText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();

  // Dummy data for demonstration
  const thread: Thread = {
    id: threadId,
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
    recentParticipants: []
  };

  const replies: Reply[] = [
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
    },
    {
      id: 3,
      author: {
        id: 4,
        username: "DetailQueen",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=50&h=50"
      },
      content: "I'm a big fan of Collinite 845. It's a bit more at around $18-20 but lasts much longer than other options. It's technically an insulator wax, but works beautifully on paint and the durability is exceptional.",
      createdAt: "May 21, 2025",
      likes: 15
    },
    {
      id: 4,
      author: {
        id: 6,
        username: "GlossGuru",
        avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=50&h=50"
      },
      content: "For black cars specifically, I'd recommend Chemical Guys Black Light. It's a bit more work but the results are worth it. Follow it up with their BlackWax for an amazing result. There's a combo pack on <a href='/shop/black-light-kit' class='text-[#E53E3E]'>sale right now</a>.",
      createdAt: "May 22, 2025",
      likes: 10
    }
  ];

  const relatedThreads: Thread[] = [
    {
      id: 2,
      title: "Ceramic Coating vs. Traditional Wax - Which is Better for Daily Drivers?",
      author: {
        id: 2,
        username: "ProShine",
        avatar: ""
      },
      content: "",
      createdAt: "May 17, 2025",
      replyCount: 78,
      lastReplyTime: "",
      isHot: false,
      categoryId: 3,
      recentParticipants: []
    },
    {
      id: 5,
      title: "How long does your favorite wax typically last?",
      author: {
        id: 5,
        username: "DetailingNerd",
        avatar: ""
      },
      content: "",
      createdAt: "May 10, 2025",
      replyCount: 42,
      lastReplyTime: "",
      isHot: false,
      categoryId: 3,
      recentParticipants: []
    },
    {
      id: 6,
      title: "Best wax application methods - applicator pads vs microfiber",
      author: {
        id: 1,
        username: "JohnDetailer",
        avatar: ""
      },
      content: "",
      createdAt: "April 28, 2025",
      replyCount: 24,
      lastReplyTime: "",
      isHot: false,
      categoryId: 3,
      recentParticipants: []
    }
  ];

  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please sign in to post a reply",
        variant: "destructive",
      });
      return;
    }
    
    if (!replyText.trim()) {
      toast({
        title: "Empty reply",
        description: "Please enter a reply",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Reply posted",
        description: "Your reply has been posted successfully",
      });
      
      setReplyText("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to post reply. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLike = async (replyId: number) => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please sign in to like replies",
        variant: "destructive",
      });
      return;
    }
    
    // Simulate API call
    toast({
      title: "Success",
      description: "Reply liked successfully",
    });
  };

  return (
    <>
      <Helmet>
        <title>{`${thread.title} - Auto Detailing Nation Forum`}</title>
        <meta name="description" content={`${thread.content.substring(0, 150)}...`} />
      </Helmet>

      <div className="bg-[#121212] py-12">
        <div className="container mx-auto px-4">
          {/* Breadcrumbs */}
          <div className="flex mb-6 text-sm">
            <Link href="/forum" className="text-gray-400 hover:text-white">
              Forum
            </Link>
            <span className="mx-2 text-gray-600">/</span>
            <span className="text-gray-300">Thread</span>
          </div>

          {/* Thread */}
          <div className="bg-[#1E1E1E] rounded-xl overflow-hidden mb-8">
            <div className="p-6">
              <h1 className="text-2xl font-montserrat font-bold text-white mb-4">{thread.title}</h1>
              
              <div className="flex items-start mb-6">
                <img 
                  src={thread.author.avatar} 
                  alt={thread.author.username} 
                  className="w-12 h-12 rounded-full object-cover" 
                />
                <div className="ml-4">
                  <Link href={`/profile/${thread.author.username}`} className="font-montserrat font-semibold text-white hover:text-[#E53E3E] transition">
                    {thread.author.username}
                  </Link>
                  <div className="text-sm text-gray-400 mt-1">
                    <span>{thread.createdAt}</span>
                    <span className="mx-2">•</span>
                    <span>Thread Starter</span>
                  </div>
                </div>
              </div>
              
              <div className="border-l-4 border-[#E53E3E] pl-4 mb-6">
                <p className="text-gray-300">{thread.content}</p>
              </div>
              
              <div className="flex justify-between items-center text-sm">
                <div className="flex space-x-4">
                  <button className="text-gray-400 hover:text-[#E53E3E] transition flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                    </svg>
                    Share
                  </button>
                  <button className="text-gray-400 hover:text-[#E53E3E] transition flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                    Favorite
                  </button>
                  <button className="text-gray-400 hover:text-[#E53E3E] transition flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                    Report
                  </button>
                </div>
                <div className="text-gray-400">
                  {thread.replyCount} replies
                </div>
              </div>
            </div>
          </div>

          {/* Replies */}
          <div className="mb-8">
            <h2 className="text-xl font-montserrat font-semibold text-white mb-4">Replies</h2>
            
            <div className="space-y-4">
              {replies.map((reply) => (
                <div key={reply.id} className="bg-[#1E1E1E] p-6 rounded-xl">
                  <div className="flex items-start mb-4">
                    <img 
                      src={reply.author.avatar} 
                      alt={reply.author.username} 
                      className="w-12 h-12 rounded-full object-cover" 
                    />
                    <div className="ml-4">
                      <Link href={`/profile/${reply.author.username}`} className="font-montserrat font-semibold text-white hover:text-[#E53E3E] transition">
                        {reply.author.username}
                      </Link>
                      <div className="text-sm text-gray-400 mt-1">
                        {reply.createdAt}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-gray-300 mb-4">
                    <p dangerouslySetInnerHTML={{ __html: reply.content }} />
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm">
                    <button 
                      className="flex items-center text-gray-400 hover:text-[#E53E3E] transition"
                      onClick={() => handleLike(reply.id)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                      </svg>
                      <span>{reply.likes}</span>
                    </button>
                    <button className="text-gray-400 hover:text-[#E53E3E] transition">
                      Quote
                    </button>
                    <button className="text-gray-400 hover:text-[#E53E3E] transition">
                      Reply
                    </button>
                    <button className="text-gray-400 hover:text-[#E53E3E] transition">
                      Report
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reply form */}
          <div className="bg-[#1E1E1E] p-6 rounded-xl mb-8">
            <h2 className="text-xl font-montserrat font-semibold text-white mb-4">Post a Reply</h2>
            
            {!isAuthenticated ? (
              <div className="text-center py-6">
                <p className="text-gray-400 mb-4">You need to be signed in to post a reply.</p>
                <Link href="/auth">
                  <Button className="bg-[#E53E3E] hover:bg-red-700 text-white">
                    Sign In to Reply
                  </Button>
                </Link>
              </div>
            ) : (
              <form onSubmit={handleReplySubmit}>
                <div className="mb-4">
                  <Textarea 
                    placeholder="Share your thoughts..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="bg-[#121212] border-gray-700 text-white min-h-[150px]"
                    disabled={isSubmitting}
                  />
                </div>
                <div className="flex justify-end">
                  <Button 
                    type="submit" 
                    className="bg-[#E53E3E] hover:bg-red-700 text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Posting..." : "Post Reply"}
                  </Button>
                </div>
              </form>
            )}
          </div>

          {/* Related threads */}
          <div>
            <h2 className="text-xl font-montserrat font-semibold text-white mb-4">Related Threads</h2>
            
            <div className="bg-[#1E1E1E] rounded-xl overflow-hidden">
              {relatedThreads.map((relatedThread, idx) => (
                <Link key={relatedThread.id} href={`/forum/${relatedThread.id}`}>
                  <div className={`p-4 hover:bg-gray-800/30 transition ${idx < relatedThreads.length - 1 ? 'border-b border-gray-800' : ''}`}>
                    <div className="flex justify-between">
                      <h3 className="font-montserrat font-semibold text-white hover:text-[#E53E3E]">
                        {relatedThread.title}
                      </h3>
                      <span className="text-sm text-gray-400">{relatedThread.replyCount} replies</span>
                    </div>
                    <p className="text-sm text-gray-400 mt-1">
                      Started by {relatedThread.author.username} on {relatedThread.createdAt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ThreadView;
