import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useRoute, Link } from "wouter";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { User, Thread, Reply } from "@/types";

const Profile = () => {
  const [match, params] = useRoute("/profile/:username");
  const username = params?.username;
  const [user, setUser] = useState<User | null>(null);
  const [threads, setThreads] = useState<Thread[]>([]);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      setIsLoading(true);
      try {
        // In a real app, we would fetch from API
        // For now we'll use sample data
        const sampleUser: User = {
          id: 1,
          username: username || "detailingpro",
          email: "john.doe@example.com",
          password: "", // We wouldn't include this in a real response
          avatar: "https://i.pravatar.cc/150?u=1",
          bio: "Certified detailer with 10+ years of experience. Specializing in ceramic coatings and paint correction.",
          badge: "Expert",
          badgeColor: "red-500",
          joinedAt: new Date("2022-01-15"),
          postCount: 156,
          level: 3,
          isAdmin: false
        };
        
        setUser(sampleUser);
        
        // Sample threads by this user
        const threadsData: Thread[] = [
          {
            id: 1,
            title: "Best DA Polisher for Beginners",
            content: "I'm looking to purchase my first DA polisher and would appreciate some recommendations...",
            authorId: 1,
            categoryId: 2,
            createdAt: new Date("2023-03-15"),
            isHot: true,
            viewCount: 245,
            replyCount: 18
          },
          {
            id: 2,
            title: "Ceramic Coating vs. Traditional Wax",
            content: "I've been using traditional wax for years but I'm considering switching to ceramic coatings...",
            authorId: 1,
            categoryId: 1,
            createdAt: new Date("2023-04-22"),
            isHot: false,
            viewCount: 187,
            replyCount: 12
          },
          {
            id: 3,
            title: "How to Remove Water Spots",
            content: "I recently left my car out in the rain and now I have water spots all over the paint...",
            authorId: 1,
            categoryId: 3,
            createdAt: new Date("2023-05-10"),
            isHot: false,
            viewCount: 132,
            replyCount: 8
          }
        ];
        
        setThreads(threadsData);
        
        // Sample replies by this user
        const repliesData: Reply[] = [
          {
            id: 1,
            content: "I'd recommend starting with a Foam Pad as they're more forgiving for beginners. You can always switch to Microfiber pads as you gain more experience.",
            authorId: 1,
            threadId: 5,
            createdAt: new Date("2023-05-05"),
            likes: 12
          },
          {
            id: 2,
            content: "In my experience, IronX works best for removing embedded iron particles. Just make sure to work in a well-ventilated area as the smell is quite strong.",
            authorId: 1,
            threadId: 8,
            createdAt: new Date("2023-05-12"),
            likes: 8
          },
          {
            id: 3,
            content: "I've found that a 2-bucket method with grit guards is essential for preventing swirl marks during washing.",
            authorId: 1,
            threadId: 12,
            createdAt: new Date("2023-05-18"),
            likes: 15
          },
          {
            id: 4,
            content: "For maintenance washes on a ceramic coated vehicle, I recommend using a pH neutral shampoo without any wax or gloss enhancers. This ensures you're not adding anything that might interfere with the coating's performance.",
            authorId: 1,
            threadId: 15,
            createdAt: new Date("2023-05-25"),
            likes: 20
          }
        ];
        
        setReplies(repliesData);
      } catch (error) {
        console.error("Failed to load user profile", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (username) {
      fetchUserProfile();
    }
  }, [username]);

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }).format(date);
  };

  const formatTimeAgo = (date: Date): string => {
    const now = new Date();
    const diffInMilliseconds = now.getTime() - date.getTime();
    const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
    const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} min${diffInMinutes !== 1 ? 's' : ''} ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
    } else if (diffInDays < 30) {
      return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
    } else {
      return formatDate(date);
    }
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

  if (!user) {
    return (
      <div className="bg-[#121212] py-12 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="text-center py-16">
            <h1 className="text-2xl font-montserrat font-bold text-white mb-4">User Not Found</h1>
            <p className="text-gray-400 mb-8">The user profile you are looking for does not exist or has been removed.</p>
            <Link href="/forum">
              <Button className="bg-[#E53E3E] hover:bg-red-700 text-white">
                Return to Forum
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
        <title>{`${user.username}'s Profile - Auto Detailing Nation`}</title>
        <meta name="description" content={`View ${user.username}'s profile, contributions and activity on Auto Detailing Nation.`} />
      </Helmet>

      <div className="bg-[#121212] py-12 min-h-screen">
        <div className="container mx-auto px-4">
          {/* Profile header */}
          <div className="bg-[#1A1A1A] rounded-xl p-6 mb-10">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <Avatar className="h-24 w-24 border-4 border-[#E53E3E]">
                <AvatarImage src={user.avatar || ""} alt={user.username} />
                <AvatarFallback>{user.username.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h1 className="text-2xl font-montserrat font-bold text-white">{user.username}</h1>
                  {user.badge && (
                    <span className={`bg-${user.badgeColor} text-white px-2 py-1 text-xs rounded-md`}>
                      {user.badge}
                    </span>
                  )}
                  {user.isAdmin && (
                    <span className="bg-blue-600 text-white px-2 py-1 text-xs rounded-md">
                      Staff
                    </span>
                  )}
                </div>
                
                <p className="text-gray-300 mb-4">{user.bio}</p>
                
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-400">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>Joined {formatDate(user.joinedAt)}</span>
                  </div>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                    <span>{user.postCount} posts</span>
                  </div>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                    <span>Level {user.level}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3 mt-4 md:mt-0">
                <Button variant="outline" className="border-gray-700 text-gray-300 hover:text-white hover:bg-[#2D3748]">
                  Message
                </Button>
                <Button variant="outline" className="border-gray-700 text-gray-300 hover:text-white hover:bg-[#2D3748]">
                  Follow
                </Button>
              </div>
            </div>
          </div>

          {/* Profile content */}
          <div className="bg-[#1A1A1A] rounded-xl overflow-hidden">
            <Tabs defaultValue="threads" className="w-full">
              <TabsList className="w-full bg-[#151515] border-b border-gray-800 rounded-none h-auto p-0">
                <div className="container mx-auto px-4">
                  <div className="flex">
                    <TabsTrigger value="threads" className="flex-1 py-4 rounded-none border-b-2 border-transparent data-[state=active]:border-[#E53E3E] text-gray-400 data-[state=active]:text-white">
                      Threads
                    </TabsTrigger>
                    <TabsTrigger value="replies" className="flex-1 py-4 rounded-none border-b-2 border-transparent data-[state=active]:border-[#E53E3E] text-gray-400 data-[state=active]:text-white">
                      Replies
                    </TabsTrigger>
                    <TabsTrigger value="about" className="flex-1 py-4 rounded-none border-b-2 border-transparent data-[state=active]:border-[#E53E3E] text-gray-400 data-[state=active]:text-white">
                      About
                    </TabsTrigger>
                  </div>
                </div>
              </TabsList>
              
              <div className="p-6">
                <TabsContent value="threads" className="mt-0">
                  {threads.length > 0 ? (
                    <div className="space-y-6">
                      {threads.map(thread => (
                        <div key={thread.id} className="border-b border-gray-800 pb-6 last:border-b-0 last:pb-0">
                          <Link href={`/forum/${thread.id}`}>
                            <h2 className="text-xl font-montserrat font-semibold text-white hover:text-[#E53E3E] transition mb-2">
                              {thread.title}
                            </h2>
                          </Link>
                          <p className="text-gray-300 mb-3 line-clamp-2">{thread.content}</p>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-400">
                            <span>{formatTimeAgo(thread.createdAt)}</span>
                            <div className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                              <span>{thread.viewCount} views</span>
                            </div>
                            <div className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                              </svg>
                              <span>{thread.replyCount} replies</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-400">This user hasn't created any threads yet.</p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="replies" className="mt-0">
                  {replies.length > 0 ? (
                    <div className="space-y-6">
                      {replies.map(reply => (
                        <div key={reply.id} className="border-b border-gray-800 pb-6 last:border-b-0 last:pb-0">
                          <Link href={`/forum/${reply.threadId}`}>
                            <p className="text-gray-300 mb-3">{reply.content}</p>
                          </Link>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-400">
                            <span>{formatTimeAgo(reply.createdAt)}</span>
                            <div className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                              </svg>
                              <span>{reply.likes} likes</span>
                            </div>
                            <Link href={`/forum/${reply.threadId}`} className="text-[#E53E3E] hover:underline">
                              View Thread →
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-400">This user hasn't posted any replies yet.</p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="about" className="mt-0">
                  <div className="max-w-2xl mx-auto">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">About {user.username}</h3>
                        <p className="text-gray-300">{user.bio || "This user hasn't added a bio yet."}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">Member Since</h3>
                        <p className="text-gray-300">{formatDate(user.joinedAt)}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">Expertise</h3>
                        <div className="flex flex-wrap gap-2">
                          <span className="bg-[#1E1E1E] text-gray-300 px-3 py-1 rounded-full text-sm">Ceramic Coatings</span>
                          <span className="bg-[#1E1E1E] text-gray-300 px-3 py-1 rounded-full text-sm">Paint Correction</span>
                          <span className="bg-[#1E1E1E] text-gray-300 px-3 py-1 rounded-full text-sm">Interior Detailing</span>
                          <span className="bg-[#1E1E1E] text-gray-300 px-3 py-1 rounded-full text-sm">Show Car Preparation</span>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">Achievements</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                          <div className="bg-[#1E1E1E] p-4 rounded-lg text-center">
                            <div className="h-12 w-12 bg-[#2D3748] rounded-full flex items-center justify-center mx-auto mb-2">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#E53E3E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                              </svg>
                            </div>
                            <h4 className="text-white font-medium">Top Contributor</h4>
                          </div>
                          <div className="bg-[#1E1E1E] p-4 rounded-lg text-center">
                            <div className="h-12 w-12 bg-[#2D3748] rounded-full flex items-center justify-center mx-auto mb-2">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                              </svg>
                            </div>
                            <h4 className="text-white font-medium">100+ Likes</h4>
                          </div>
                          <div className="bg-[#1E1E1E] p-4 rounded-lg text-center">
                            <div className="h-12 w-12 bg-[#2D3748] rounded-full flex items-center justify-center mx-auto mb-2">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                              </svg>
                            </div>
                            <h4 className="text-white font-medium">1 Year Member</h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;