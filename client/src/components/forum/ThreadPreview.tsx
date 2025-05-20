import { useState } from "react";
import { Link } from "wouter";
import { Thread, Reply, User } from "@/types";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";

interface ThreadPreviewProps {
  thread: Thread;
  replies: Reply[];
}

const ThreadPreview = ({ thread, replies }: ThreadPreviewProps) => {
  const [replyText, setReplyText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const { toast } = useToast();

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
    <section className="py-14 bg-[#1E1E1E]">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-[#2D3748] rounded-xl overflow-hidden">
          <div className="bg-[#E53E3E] text-white p-4 flex justify-between items-center">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
              </svg>
              <h3 className="ml-3 text-xl font-montserrat font-semibold">Featured Thread</h3>
            </div>
            <span className="text-sm">{thread.replyCount} replies</span>
          </div>
          
          <div className="p-6">
            <h4 className="text-2xl font-montserrat font-bold text-white mb-1">{thread.title}</h4>
            <p className="text-sm text-gray-400 mb-4">
              Posted by <Link href={`/profile/${thread.author.username}`} className="text-[#E53E3E]">{thread.author.username}</Link> on {thread.createdAt}
            </p>
            
            <div className="border-l-4 border-[#E53E3E] pl-4 mb-8">
              <p className="text-gray-300">
                {thread.content}
              </p>
            </div>
            
            {/* Replies */}
            <div className="space-y-6">
              {replies.map((reply) => (
                <div key={reply.id} className="bg-[#1E1E1E] p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start">
                      <img 
                        src={reply.author.avatar} 
                        alt={reply.author.username} 
                        className="w-10 h-10 rounded-full object-cover" 
                      />
                      <div className="ml-3">
                        <Link href={`/profile/${reply.author.username}`} className="font-montserrat font-semibold text-white hover:text-[#E53E3E] transition">
                          {reply.author.username}
                        </Link>
                        <span className="ml-2 text-xs text-gray-500">{reply.createdAt}</span>
                        <div className="mt-1 text-gray-300">
                          <p dangerouslySetInnerHTML={{ __html: reply.content }} />
                        </div>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-white" aria-label="More options">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </button>
                  </div>
                  <div className="mt-3 ml-13 pl-10 flex items-center space-x-4 text-sm">
                    <button 
                      className="flex items-center text-gray-400 hover:text-[#E53E3E] transition"
                      onClick={() => handleLike(reply.id)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                      </svg>
                      <span>{reply.likes}</span>
                    </button>
                    <button className="text-gray-400 hover:text-[#E53E3E] transition">Reply</button>
                    <button className="text-gray-400 hover:text-[#E53E3E] transition">Share</button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Reply Form */}
            <div className="mt-8">
              <div className="flex space-x-4">
                <img 
                  src={isAuthenticated ? user?.avatar : "https://images.unsplash.com/photo-1513721032312-6a18a42c8763?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100"} 
                  alt={isAuthenticated ? user?.username : "Guest"} 
                  className="w-10 h-10 rounded-full object-cover" 
                />
                <div className="flex-1">
                  <form onSubmit={handleReplySubmit}>
                    <textarea 
                      className="w-full bg-[#1E1E1E] p-3 rounded-lg text-gray-300 border border-gray-700 focus:border-[#E53E3E] focus:ring-1 focus:ring-[#E53E3E] focus:outline-none" 
                      placeholder="Add your reply..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      disabled={isSubmitting}
                      rows={3}
                    ></textarea>
                    <div className="mt-2 flex justify-end">
                      <button 
                        type="submit"
                        className="bg-[#E53E3E] hover:bg-red-700 text-white px-4 py-2 rounded-md font-montserrat font-semibold transition"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Posting..." : "Post Reply"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-[#1E1E1E] p-4 text-center">
            <Link href={`/forum/${thread.id}`} className="text-[#E53E3E] hover:text-red-400 font-montserrat font-semibold">
              View Full Thread 
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 inline" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThreadPreview;
