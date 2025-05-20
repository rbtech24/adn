import { Link } from "wouter";
import { Thread } from "@/types";

interface TrendingDiscussionsProps {
  threads: Thread[];
}

const TrendingDiscussions = ({ threads }: TrendingDiscussionsProps) => {
  return (
    <div className="bg-[#1E1E1E] rounded-xl overflow-hidden">
      <div className="bg-[#2D3748] p-4 flex justify-between items-center">
        <h3 className="text-xl font-montserrat font-semibold text-white">Trending Discussions</h3>
        <Link href="/forum" className="text-sm text-[#E53E3E] hover:text-red-400 font-montserrat">View All</Link>
      </div>
      
      {threads.map((thread) => (
        <div key={thread.id} className="border-b border-gray-800 p-4 hover:bg-gray-800/30 transition">
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
                {thread.isHot && (
                  <span className="bg-[#E53E3E] rounded-full px-2 py-1 text-xs text-white">Hot</span>
                )}
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
  );
};

export default TrendingDiscussions;
