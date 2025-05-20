import { Link } from "wouter";
import { User, Activity } from "@/types";

interface TopContributorsProps {
  contributors: User[];
  recentActivity: Activity[];
}

const TopContributors = ({ contributors, recentActivity }: TopContributorsProps) => {
  return (
    <div className="bg-[#1E1E1E] rounded-xl overflow-hidden">
      <div className="bg-[#2D3748] p-4">
        <h3 className="text-xl font-montserrat font-semibold text-white">Top Contributors</h3>
      </div>
      
      <div className="p-4">
        {/* Contributors list */}
        {contributors.map((contributor) => (
          <div key={contributor.id} className="flex items-center justify-between mb-6 last:mb-0">
            <div className="flex items-center">
              <img 
                src={contributor.avatar} 
                alt={contributor.username} 
                className="w-12 h-12 rounded-full object-cover" 
              />
              <div className="ml-3">
                <Link href={`/profile/${contributor.username}`} className="font-montserrat font-semibold text-white hover:text-[#E53E3E] transition">
                  {contributor.username}
                </Link>
                <div className="flex items-center mt-1">
                  <span className={`bg-${contributor.badgeColor} text-xs text-white px-2 py-0.5 rounded-full`}>
                    {contributor.badge}
                  </span>
                </div>
              </div>
            </div>
            <button className="text-xs text-[#E53E3E] hover:text-red-400 border border-[#E53E3E] hover:border-red-400 rounded px-2 py-1 transition">
              Follow
            </button>
          </div>
        ))}
      </div>
      
      <div className="bg-[#2D3748]/50 p-4 mt-4">
        <h4 className="text-md font-montserrat font-semibold text-white mb-4">Latest Activity</h4>
        
        <div className="space-y-3">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-start">
              <img 
                src={activity.user.avatar} 
                alt={activity.user.username} 
                className="w-8 h-8 rounded-full object-cover" 
              />
              <div className="ml-2 flex-1">
                <p className="text-sm text-gray-300">
                  <Link href={`/profile/${activity.user.username}`} className="text-[#E53E3E]">{activity.user.username}</Link> {activity.action} <Link href={activity.targetUrl} className="text-[#E53E3E]">{activity.targetName}</Link>
                </p>
                <span className="text-xs text-gray-500">{activity.timeAgo}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopContributors;
