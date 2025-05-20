import React from "react";
import MetaTags from "@/components/seo/MetaTags";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const About = () => {
  const teamMembers = [
    {
      id: 1,
      name: "John Smith",
      role: "Founder & CEO",
      bio: "Professional detailer with over 15 years of experience and a passion for sharing knowledge with the community.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      role: "Content Director",
      bio: "Automotive journalist with a specialization in detailing products and techniques.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3"
    },
    {
      id: 3,
      name: "Michael Chen",
      role: "Technical Expert",
      bio: "Certified detailer and paint correction specialist with experience working on exotic and luxury vehicles.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3"
    },
    {
      id: 4,
      name: "Jessica Williams",
      role: "Community Manager",
      bio: "Former auto show coordinator who now manages our thriving detailing community and events.",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3"
    }
  ];

  const milestones = [
    {
      year: "2018",
      title: "Humble Beginnings",
      description: "Auto Detailing Nation started as a small forum with just 50 members passionate about car care."
    },
    {
      year: "2020",
      title: "Community Growth",
      description: "Reached 10,000 active members and launched our first line of curated detailing products."
    },
    {
      year: "2022",
      title: "Content Expansion",
      description: "Established a comprehensive learning center with over 500 guides, tutorials, and videos."
    },
    {
      year: "2023",
      title: "Industry Recognition",
      description: "Recognized as one of the top detailing resources by Auto Care Magazine."
    },
    {
      year: "2024",
      title: "Global Reach",
      description: "Expanded to serve detailing enthusiasts in over 30 countries with localized content."
    }
  ];

  return (
    <>
      <MetaTags
        title="About Us - Auto Detailing Nation"
        description="Learn about Auto Detailing Nation's mission to empower detailing enthusiasts and professionals with knowledge, community, and quality products."
        keywords="auto detailing community, car care experts, detailing history, about auto detailing nation"
        ogType="website"
        ogImage="https://images.unsplash.com/photo-1621963289287-afb2c9b849a5?ixlib=rb-4.0.3"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Auto Detailing Nation",
          "url": "https://autodetailingnation.com",
          "logo": "https://autodetailingnation.com/logo.png",
          "foundingDate": "2018",
          "founders": [
            {
              "@type": "Person",
              "name": "John Smith"
            }
          ],
          "description": "The premier online community for auto detailing enthusiasts and professionals.",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Los Angeles",
            "addressRegion": "CA",
            "postalCode": "90001",
            "addressCountry": "US"
          },
          "sameAs": [
            "https://facebook.com/autodetailingnation",
            "https://twitter.com/autodetailnation",
            "https://instagram.com/autodetailingnation",
            "https://youtube.com/autodetailingnation"
          ]
        }}
      />

      <div className="bg-[#121212] min-h-screen">
        {/* Hero section */}
        <div className="relative h-[400px] md:h-[500px]">
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1621963289287-afb2c9b849a5?ixlib=rb-4.0.3" 
            alt="Auto Detailing Nation Team" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center px-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-montserrat font-bold text-white mb-6">
              About <span className="text-[#E53E3E]">Us</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl">
              Empowering detailing enthusiasts and professionals with knowledge, community, and quality products since 2018.
            </p>
          </div>
        </div>

        {/* Mission section */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-white mb-6">
              Our <span className="text-[#E53E3E]">Mission</span>
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              At Auto Detailing Nation, we believe that everyone deserves access to professional-level detailing knowledge. 
              Our mission is to create the most comprehensive and accessible platform for auto detailing enthusiasts 
              and professionals to learn, connect, and grow their skills.
            </p>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-[#1E1E1E] p-6 rounded-xl">
                <div className="w-16 h-16 mx-auto bg-red-900/30 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#E53E3E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="font-montserrat font-bold text-white text-xl mb-2">Education</h3>
                <p className="text-gray-400">Providing accurate, comprehensive, and accessible detailing knowledge</p>
              </div>
              <div className="bg-[#1E1E1E] p-6 rounded-xl">
                <div className="w-16 h-16 mx-auto bg-red-900/30 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#E53E3E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="font-montserrat font-bold text-white text-xl mb-2">Community</h3>
                <p className="text-gray-400">Building a supportive network of passionate detailing enthusiasts</p>
              </div>
              <div className="bg-[#1E1E1E] p-6 rounded-xl">
                <div className="w-16 h-16 mx-auto bg-red-900/30 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#E53E3E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="font-montserrat font-bold text-white text-xl mb-2">Quality Products</h3>
                <p className="text-gray-400">Curating and providing access to the best detailing products and tools</p>
              </div>
            </div>
          </div>

          {/* Our Story / Timeline section */}
          <div className="mb-16">
            <h2 className="text-3xl font-montserrat font-bold text-white text-center mb-12">
              Our <span className="text-[#E53E3E]">Journey</span>
            </h2>
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-gray-700"></div>
              
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div key={index} className={`relative flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                    <div className="md:w-1/2 md:flex md:justify-center">
                      <div className={`bg-[#1E1E1E] p-6 rounded-xl w-full md:w-4/5 relative ${index % 2 === 0 ? 'md:ml-6' : 'md:mr-6'}`}>
                        <span className="absolute top-6 left-0 transform -translate-x-1/2 w-6 h-6 rounded-full bg-[#E53E3E] z-10 hidden md:block"></span>
                        <h3 className="font-montserrat font-bold text-white text-2xl mb-1">{milestone.title}</h3>
                        <span className="text-[#E53E3E] font-bold block mb-3">{milestone.year}</span>
                        <p className="text-gray-300">{milestone.description}</p>
                      </div>
                    </div>
                    <div className="hidden md:block md:w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Team section */}
          <div>
            <h2 className="text-3xl font-montserrat font-bold text-white text-center mb-12">
              Meet Our <span className="text-[#E53E3E]">Team</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map(member => (
                <div key={member.id} className="bg-[#1E1E1E] rounded-xl overflow-hidden">
                  <div className="p-6">
                    <div className="flex flex-col items-center text-center mb-4">
                      <Avatar className="h-24 w-24 mb-4">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <h3 className="font-montserrat font-bold text-white text-xl">{member.name}</h3>
                      <span className="text-[#E53E3E] text-sm">{member.role}</span>
                    </div>
                    <p className="text-gray-400 text-center">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA section */}
          <div className="mt-20 bg-gradient-to-r from-[#2D2D2D] to-[#1A1A1A] rounded-xl p-8 text-center">
            <h3 className="text-2xl md:text-3xl font-montserrat font-bold text-white mb-4">
              Join Our Growing Community
            </h3>
            <p className="text-gray-300 mb-8 max-w-3xl mx-auto">
              Become part of Auto Detailing Nation today and connect with thousands of detailing enthusiasts and professionals. 
              Share your knowledge, learn new techniques, and elevate your detailing skills.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/auth">
                <Button className="bg-[#E53E3E] hover:bg-red-700 text-white text-lg px-8 py-6">
                  Join Now
                </Button>
              </Link>
              <Link href="/forum">
                <Button variant="outline" className="border-gray-600 text-white hover:bg-white/10 text-lg px-8 py-6">
                  Visit Forum
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;