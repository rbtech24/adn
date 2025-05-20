import { Link } from "wouter";
import TrendingDiscussions from "./TrendingDiscussions";
import ForumCategories from "./ForumCategories";
import TopContributors from "./TopContributors";
import { Thread, ForumCategory, User, Activity } from "@/types";

interface CommunitySectionProps {
  threads: Thread[];
  categories: ForumCategory[];
  topContributors: User[];
  recentActivity: Activity[];
}

const CommunitySection = ({ threads, categories, topContributors, recentActivity }: CommunitySectionProps) => {
  return (
    <section id="community" className="py-16 bg-[#121212]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-white">
            Join Our <span className="text-[#E53E3E]">Community</span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-3xl mx-auto">
            Connect with thousands of detailing enthusiasts sharing tips, showcasing their work, and discussing the latest products and techniques.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Forums Column */}
          <div className="col-span-1 lg:col-span-2">
            <TrendingDiscussions threads={threads} />
            
            {/* Categories */}
            <div className="mt-8">
              <ForumCategories categories={categories} />
            </div>
          </div>
          
          {/* Featured Users Column */}
          <div>
            <TopContributors contributors={topContributors} recentActivity={recentActivity} />
          </div>
        </div>
        
        {/* CTA Button */}
        <div className="mt-10 text-center">
          <Link href="/forum">
            <button className="inline-block bg-[#E53E3E] hover:bg-red-700 text-white py-3 px-8 rounded-md font-montserrat font-semibold text-lg transition transform hover:scale-105">
              Join the Conversation
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
