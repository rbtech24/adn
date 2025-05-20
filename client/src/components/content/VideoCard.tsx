import { Link } from "wouter";
import { Video } from "@/types";

interface VideoCardProps {
  video: Video;
}

const VideoCard = ({ video }: VideoCardProps) => {
  const handlePlayClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // In a real implementation, this would launch a video player or redirect to YouTube
    window.open(video.url, '_blank');
  };

  return (
    <div className="bg-[#121212] rounded-xl overflow-hidden hover:shadow-lg transition">
      <Link href={`/learn/video/${video.id}`}>
        <div className="relative">
          <img 
            src={video.thumbnail} 
            alt={video.title} 
            className="w-full h-48 object-cover" 
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <button 
              className="w-14 h-14 rounded-full bg-[#E53E3E] text-white flex items-center justify-center transition transform hover:scale-110"
              onClick={handlePlayClick}
              aria-label="Play video"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
            {video.duration}
          </div>
        </div>
        <div className="p-4">
          <h4 className="font-montserrat font-semibold text-white text-lg mb-1">{video.title}</h4>
          <p className="text-gray-400 text-sm mb-3">{video.description}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img 
                src={video.creator.avatar} 
                alt={video.creator.username} 
                className="w-6 h-6 rounded-full object-cover" 
              />
              <span className="ml-2 text-sm text-gray-400">{video.creator.username}</span>
            </div>
            <span className="text-gray-500 text-xs">{video.views} views</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default VideoCard;
