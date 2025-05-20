import { useState } from "react";
import { Resource } from "@/types";
import { useToast } from "@/hooks/use-toast";

interface ResourceCardProps {
  resource: Resource;
}

const ResourceCard = ({ resource }: ResourceCardProps) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const { toast } = useToast();

  const handleDownload = async () => {
    setIsDownloading(true);
    
    try {
      // Simulate download process
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Download started",
        description: `${resource.name} is being downloaded.`,
      });
      
      // In a real app, this would initiate a file download
      window.open(resource.downloadUrl, '_blank');
    } catch (error) {
      toast({
        title: "Download failed",
        description: "There was an error downloading the resource. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  // Render appropriate icon based on resource type
  const renderIcon = () => {
    switch (resource.type) {
      case 'pdf':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#E53E3E]" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
          </svg>
        );
      case 'excel':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 10a1 1 0 10-2 0v3a1 1 0 102 0v-3zm5-1a1 1 0 00-1 1v3a1 1 0 102 0v-3a1 1 0 00-1-1zm-2-7a1 1 0 10-2 0v1h2V4z" clipRule="evenodd" />
          </svg>
        );
      case 'text':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm3 1h6v4H7V5zm-2 6a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm0 3a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  return (
    <div className="bg-[#121212] rounded-xl overflow-hidden hover:shadow-lg transition transform hover:scale-[1.02]">
      <div className="bg-[#2D3748] p-4">
        <div className="flex items-center justify-between">
          <h4 className="font-montserrat font-semibold text-white">{resource.name}</h4>
          {renderIcon()}
        </div>
      </div>
      <div className="p-4">
        <p className="text-gray-400 text-sm mb-4">{resource.description}</p>
        <div className="text-center">
          <button 
            className="w-full bg-[#1E1E1E] hover:bg-gray-800 text-white border border-gray-700 py-2 px-4 rounded-md font-montserrat font-semibold text-sm transition"
            onClick={handleDownload}
            disabled={isDownloading}
          >
            {isDownloading ? 'Downloading...' : `Download ${resource.type.toUpperCase()}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;
