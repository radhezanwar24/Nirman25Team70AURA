"use client"

import { useState, useEffect } from "react"
<<<<<<< HEAD
import { ArrowRight, Star, ChevronLeft, ChevronRight, Award, Briefcase, TrendingUp, Clock } from "lucide-react"
import Image from "next/image"
import FutureScopeAnalysis from "./FutureScopeAnalysis"
=======
<<<<<<< HEAD
import { ArrowRight, Star, ChevronLeft, ChevronRight, Award, Briefcase, TrendingUp, Clock } from "lucide-react"
import Image from "next/image"
import FutureScopeAnalysis from "./FutureScopeAnalysis"
=======
import { ArrowRight, Star, ChevronLeft, ChevronRight, Award, Briefcase, TrendingUp } from "lucide-react"
import Image from "next/image"
import FutureScopeAnalysis from "./FutureScopeAnalysis"
import JobAnalytics from './JobAnalytics';
>>>>>>> 1b14ea9998ea7722dd0f5ac506b49d382ad11435
>>>>>>> 0bad6bd6b6cdcb5906b6966559d8e5deda0ed366
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, ExternalLink, Download } from "lucide-react";
<<<<<<< HEAD
import JobRecommender from "@/components/jobs/JobRecommender";
import axios from 'axios';
import { Line } from 'react-chartjs-2';
=======
<<<<<<< HEAD
import JobRecommender from "@/components/jobs/JobRecommender";
=======
>>>>>>> 1b14ea9998ea7722dd0f5ac506b49d382ad11435
>>>>>>> 0bad6bd6b6cdcb5906b6966559d8e5deda0ed366

interface Job {
    title: string;
    company: string;
    location: string;
    link?: string;
    datePosted?: string;
}

export default function MainContent() {
  const [userSkills, setUserSkills] = useState<string[]>([])
  const [userInterests, setUserInterests] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState('');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState('');
<<<<<<< HEAD
  const [graphData, setGraphData] = useState(null);
=======
>>>>>>> 0bad6bd6b6cdcb5906b6966559d8e5deda0ed366

  useEffect(() => {
    // Simulating fetching user data
    setUserSkills(["JavaScript", "React", "Node.js"])
    setUserInterests(["Web Development", "Machine Learning"])
  }, [])

<<<<<<< HEAD
  useEffect(() => {
    axios.get('http://localhost:5000/api/job-trends')
      .then(response => {
        setGraphData(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the job trends!", error);
      });
  }, []);

=======
>>>>>>> 0bad6bd6b6cdcb5906b6966559d8e5deda0ed366
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setJobs([]);
    setDownloadUrl('');
    
    try {
      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ searchQuery }),
      });

      const data = await response.json();
      
      if (data.success) {
        setJobs(data.data);
        if (data.downloadUrl) {
          setDownloadUrl(data.downloadUrl);
          console.log('Download URL set:', data.downloadUrl);
        }
      } else {
        console.error('Failed to fetch jobs:', data.error);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (downloadUrl) {
      const baseUrl = window.location.origin;
      const fullUrl = `${baseUrl}${downloadUrl}`;
      console.log('Downloading from:', fullUrl);
      window.open(fullUrl, '_blank');
    }
  };

  return (
    <main className="flex-1 overflow-y-auto bg-gray-100 p-6">
      <h1 className="text-3xl font-semibold text-gray-900 mb-6">Welcome back, User!</h1>

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 0bad6bd6b6cdcb5906b6966559d8e5deda0ed366
      {/* Skill Carousel */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Featured Skills
            <span className="block text-sm font-normal text-gray-500 mt-1">
              Discover trending skills to learn and share
            </span>
          </h2>
          <div className="flex gap-2">
            <button 
              className="p-3 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-all duration-300"
              aria-label="Previous skills"
            >
              <ChevronLeft className="h-5 w-5 text-gray-700" />
            </button>
            <button 
              className="p-3 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-all duration-300"
              aria-label="Next skills"
            >
              <ChevronRight className="h-5 w-5 text-gray-700" />
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="flex space-x-6 overflow-x-auto pb-4 -mx-6 px-6">
            {[
              {
                id: 1,
                title: "Web Development",
                image: "/skills/web-dev.jpg",
                rating: 4.8,
                students: 1240,
                description: "Full-stack development with React, Node.js, and modern frameworks",
                tags: ["React", "Node.js", "TypeScript"],
                difficulty: "Intermediate",
                duration: "8 weeks",
                lastUpdated: "Jan 28, 2025",
                gradient: "from-[#4F46E5] to-[#7C3AED]"
              },
              {
                id: 2,
                title: "Digital Photography",
                image: "/skills/photography.jpg",
                rating: 4.9,
                students: 856,
                description: "Master composition, lighting, and post-processing techniques",
                tags: ["Portrait", "Landscape", "Editing"],
                difficulty: "Beginner",
                duration: "6 weeks",
                lastUpdated: "Jan 25, 2025",
                gradient: "from-[#F59E0B] to-[#EF4444]"
              },
              {
                id: 3,
                title: "Music Production",
                image: "/skills/music.jpg",
                rating: 4.7,
                students: 932,
                description: "Learn music production using industry-standard DAWs",
                tags: ["Ableton", "Mixing", "Sound Design"],
                difficulty: "Advanced",
                duration: "12 weeks",
                lastUpdated: "Jan 20, 2025",
                gradient: "from-[#10B981] to-[#3B82F6]"
              },
              {
                id: 4,
                title: "UI/UX Design",
                image: "/skills/uiux.jpg",
                rating: 4.9,
                students: 1456,
                description: "Create beautiful and functional user interfaces",
                tags: ["Figma", "Wireframing", "Prototyping"],
                difficulty: "Intermediate",
                duration: "10 weeks",
                lastUpdated: "Jan 15, 2025",
                gradient: "from-[#8B5CF6] to-[#EC4899]"
              },
              {
                id: 5,
                title: "Data Science",
                image: "/skills/data-science.jpg",
                rating: 4.8,
                students: 1123,
                description: "Master data analysis and machine learning",
                tags: ["Python", "ML", "Statistics"],
                difficulty: "Advanced",
                duration: "16 weeks",
                lastUpdated: "Jan 10, 2025",
                gradient: "from-[#DC2626] to-[#FB923C]"
              }
            ].map((skill) => (
              <div
                key={skill.id}
                className="flex-none w-[340px] group"
              >
                <div className="relative h-[420px] rounded-2xl overflow-hidden bg-white shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${skill.gradient}`} />
                  
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <Image
                      src={skill.image}
                      alt={skill.title}
                      layout="fill"
                      objectFit="cover"
                      className="opacity-20"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="relative h-full z-20 p-6 flex flex-col">
                    {/* Top Content */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-4">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white">
                          {skill.difficulty}
                        </span>
                        <div className="flex items-center bg-white/20 rounded-full px-3 py-1">
                          <Star className="h-4 w-4 text-yellow-300" />
                          <span className="ml-1 text-white text-sm font-medium">{skill.rating}</span>
                        </div>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-white mb-2">{skill.title}</h3>
                      
                      <div className="text-white/90 text-sm mb-3">
                        {skill.students.toLocaleString()} active students
                      </div>

                      <p className="text-white/90 text-sm mb-6 line-clamp-2">{skill.description}</p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {skill.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white hover:bg-white/20 transition-colors"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Content */}
                    <div className="space-y-4 pt-4 border-t border-white/10">
                      <div className="flex items-center justify-between text-sm text-white/80">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {skill.duration}
                        </div>
                        <div className="text-white/60 text-xs">
                          Updated {skill.lastUpdated}
                        </div>
                      </div>

                      <button className="w-full bg-white/10 text-white py-3 px-4 rounded-xl font-medium 
                        hover:bg-white/20 active:bg-white/30 transition-all duration-300 
                        group-hover:bg-white group-hover:text-gray-900 transform group-hover:scale-[1.02]">
                        Explore Skill
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Showcase */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Skills Showcase
            <span className="block text-sm font-normal text-gray-500 mt-1">
              Share your expertise with the community
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              name: "Sarah Chen",
              title: "Web Development Expert",
              skills: ["React", "Next.js"],
              description: "Experienced in React, Next.js, and Node.js. Looking to exchange web development knowledge for photography lessons.",
              gradient: "from-[#4F46E5] to-[#7C3AED]",
              image: "/experts/sarah.jpg"
            },
            {
              name: "Marcus Rodriguez",
              title: "Photography Professional",
              skills: ["Portrait", "Landscape"],
              description: "Professional photographer specializing in portraits and landscapes. Interested in learning web development basics.",
              gradient: "from-[#F59E0B] to-[#EF4444]",
              image: "/experts/marcus.jpg"
            },
            {
              name: "Emma Thompson",
              title: "Digital Marketing Strategist",
              skills: ["SEO", "Content"],
              description: "Digital marketing expert with focus on SEO and content strategy. Looking to learn graphic design skills.",
              gradient: "from-[#10B981] to-[#3B82F6]",
              image: "/experts/emma.jpg"
            }
          ].map((expert, index) => (
            <div key={index} className="group relative h-[300px] rounded-2xl overflow-hidden">
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${expert.gradient}`} />
              
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={expert.image}
                  alt={expert.name}
                  layout="fill"
                  objectFit="cover"
                  className="opacity-20"
                />
              </div>
              
              {/* Content */}
              <div className="relative h-full p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{expert.name}</h3>
                  <p className="text-white/80 text-sm mb-4">{expert.title}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {expert.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  <p className="text-white/90 text-sm line-clamp-2">{expert.description}</p>
                </div>
                
                <button className="w-full bg-white/10 text-white py-3 px-4 rounded-xl font-medium 
                  hover:bg-white/20 active:bg-white/30 transition-all duration-300 
                  group-hover:bg-white group-hover:text-gray-900">
                  Connect
                </button>
              </div>
            </div>
          ))}
<<<<<<< HEAD
=======
=======
      {/* Skill Matches Carousel */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Skill Matches</h2>
        <div className="relative">
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {[
              {
                id: 1,
                name: "Sarah Chen",
                avatar: "/avatars/sarah.jpg",
                role: "Full Stack Developer",
                skills: [
                  { name: "React", color: "#2ECC40" },
                  { name: "Node.js", color: "#0074D9" },
                  { name: "TypeScript", color: "#001f3f" }
                ],
                matchPercentage: 95,
                location: "San Francisco, CA"
              },
              {
                id: 2,
                name: "Michael Rodriguez",
                avatar: "/avatars/michael.jpg",
                role: "UI/UX Designer",
                skills: [
                  { name: "Figma", color: "#FF4136" },
                  { name: "Adobe XD", color: "#B10DC9" },
                  { name: "Sketch", color: "#FF851B" }
                ],
                matchPercentage: 88,
                location: "New York, NY"
              },
              {
                id: 3,
                name: "Emma Watson",
                avatar: "/avatars/emma.jpg",
                role: "Data Scientist",
                skills: [
                  { name: "Python", color: "#2ECC40" },
                  { name: "TensorFlow", color: "#FF4136" },
                  { name: "SQL", color: "#0074D9" }
                ],
                matchPercentage: 92,
                location: "Boston, MA"
              },
              {
                id: 4,
                name: "David Kim",
                avatar: "/avatars/david.jpg",
                role: "Mobile Developer",
                skills: [
                  { name: "Flutter", color: "#0074D9" },
                  { name: "Kotlin", color: "#FF851B" },
                  { name: "Swift", color: "#FF4136" }
                ],
                matchPercentage: 85,
                location: "Seattle, WA"
              },
              {
                id: 5,
                name: "Sophie Turner",
                avatar: "/avatars/sophie.jpg",
                role: "DevOps Engineer",
                skills: [
                  { name: "Docker", color: "#2ECC40" },
                  { name: "Kubernetes", color: "#0074D9" },
                  { name: "AWS", color: "#FF851B" }
                ],
                matchPercentage: 90,
                location: "Austin, TX"
              }
            ].map((match) => (
              <div key={match.id} className="flex-none w-64 bg-white rounded-lg shadow-md p-4">
                <div className="relative">
                  <Image
                    src={match.avatar}
                    alt={match.name}
                    width={100}
                    height={100}
                    className="rounded-full mx-auto mb-4"
                  />
                  <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold rounded-full px-2 py-1">
                    {match.matchPercentage}% Match
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-center mb-1">{match.name}</h3>
                <p className="text-sm text-gray-600 text-center mb-2">{match.role}</p>
                <p className="text-xs text-gray-500 text-center mb-3">{match.location}</p>
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  {match.skills.map((skill, index) => (
                    <span 
                      key={index} 
                      className="px-2 py-1 rounded-full text-xs text-white"
                      style={{ backgroundColor: skill.color }}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
                <button className="w-full bg-[#B10DC9] text-white py-2 rounded-md hover:bg-[#8a0a9b] transition duration-300">
                  Connect
                </button>
              </div>
            ))}
          </div>
          <button className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md">
            <ChevronLeft className="h-6 w-6 text-gray-600" />
          </button>
          <button className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md">
            <ChevronRight className="h-6 w-6 text-gray-600" />
          </button>
>>>>>>> 1b14ea9998ea7722dd0f5ac506b49d382ad11435
>>>>>>> 0bad6bd6b6cdcb5906b6966559d8e5deda0ed366
        </div>
      </section>

      {/* My Videos */}
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 0bad6bd6b6cdcb5906b6966559d8e5deda0ed366
      <section className="mb-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            My Videos
            <span className="block text-sm font-normal text-gray-500 mt-1">
              Share your knowledge through video tutorials
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Introduction to React Hooks",
              views: 1240,
              rating: 4.8,
              date: "Jan 25, 2025",
              duration: "15:30",
              gradient: "from-[#4F46E5] to-[#7C3AED]",
              thumbnail: "/videos/react-hooks.jpg"
            },
            {
              title: "Guitar Basics: Chord Progressions",
              views: 856,
              rating: 4.2,
              date: "Jan 15, 2025",
              duration: "12:45",
              gradient: "from-[#F59E0B] to-[#EF4444]",
              thumbnail: "/videos/guitar.jpg"
            },
            {
              title: "Digital Marketing Strategy",
              views: 932,
              rating: 4.5,
              date: "Dec 28, 2024",
              duration: "20:15",
              gradient: "from-[#10B981] to-[#3B82F6]",
              thumbnail: "/videos/marketing.jpg"
            }
          ].map((video, index) => (
            <div key={index} className="group relative h-[300px] rounded-2xl overflow-hidden">
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${video.gradient}`} />
              
              {/* Background Image */}
              <div className="absolute inset-0">
<<<<<<< HEAD
=======
=======
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">My Videos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              id: 1,
              title: "Introduction to Python Programming",
              thumbnail: "/thumbnails/python-intro.jpg",
              rating: 4.5,
              uploadDate: "2024-12-15"
            },
            {
              id: 2,
              title: "Web Development Fundamentals",
              thumbnail: "/thumbnails/web-dev.jpg",
              rating: 4.8,
              uploadDate: "2025-01-10"
            },
            {
              id: 3,
              title: "Data Structures and Algorithms",
              thumbnail: "/thumbnails/dsa.jpg",
              rating: 4.2,
              uploadDate: "2025-01-25"
            }
          ].map((video) => (
            <div key={video.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-48">
>>>>>>> 1b14ea9998ea7722dd0f5ac506b49d382ad11435
>>>>>>> 0bad6bd6b6cdcb5906b6966559d8e5deda0ed366
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  layout="fill"
                  objectFit="cover"
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 0bad6bd6b6cdcb5906b6966559d8e5deda0ed366
                  className="opacity-20 group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center 
                  group-hover:bg-white/30 transition-all duration-300">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                </div>
              </div>
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">{video.title}</h3>
                
                <div className="flex items-center justify-between text-white/90 text-sm mb-3">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-300 mr-1" />
                    <span>{video.rating}</span>
                    <span className="mx-2">•</span>
                    <span>{video.views.toLocaleString()} views</span>
                  </div>
                  <span className="bg-black/20 px-2 py-1 rounded-md">{video.duration}</span>
                </div>
                
                <div className="flex items-center justify-between text-white/80 text-xs">
                  <span>Uploaded {video.date}</span>
                  <button className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-300">
                    View Details
                  </button>
                </div>
<<<<<<< HEAD
=======
=======
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="h-16 w-16 text-white opacity-75" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{video.title}</h3>
                <div className="flex items-center mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star}
                      className={`h-5 w-5 ${star <= Math.floor(video.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                    />
                  ))}
                  <span className="ml-2 text-gray-600">({video.rating})</span>
                </div>
                <p className="text-gray-600 text-sm mb-4">Uploaded on: {new Date(video.uploadDate).toLocaleDateString()}</p>
                <button className="text-[#B10DC9] font-semibold hover:underline">View Details</button>
>>>>>>> 1b14ea9998ea7722dd0f5ac506b49d382ad11435
>>>>>>> 0bad6bd6b6cdcb5906b6966559d8e5deda0ed366
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Job Search Section */}
      <section className="mb-8 bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Find Jobs on LinkedIn</h2>
        <div className="space-y-4">
          <div className="flex gap-4">
            <Input
              type="text"
              placeholder="Enter job title or keywords (e.g., Software Engineer, Data Scientist)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button 
              onClick={handleSearch}
              disabled={isLoading}
              className="min-w-[120px]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Searching...
                </>
              ) : (
                'Search Jobs'
              )}
            </Button>
          </div>

          {jobs.length > 0 && (
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">Found {jobs.length} jobs</p>
              {downloadUrl && (
                <Button
                  variant="outline"
                  onClick={handleDownload}
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download Results (CSV)
                </Button>
              )}
            </div>
          )}

          <div className="grid gap-4 mt-4">
            {jobs.map((job, index) => (
              <Card key={index} className="p-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h3 className="font-semibold text-lg">{job.title}</h3>
                    <p className="text-sm text-gray-600">{job.company}</p>
                    <p className="text-sm text-gray-500">{job.location}</p>
                    {job.datePosted && (
                      <p className="text-sm text-gray-500">
                        Posted: {new Date(job.datePosted).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  {job.link && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(job.link, '_blank')}
                      className="flex items-center gap-2"
                    >
                      View on LinkedIn <ExternalLink className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 0bad6bd6b6cdcb5906b6966559d8e5deda0ed366
      {/* ML-powered Job Recommendations */}
      <section className="mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="w-6 h-6" />
            AI-Powered Job Recommendations
          </h2>
          <div className="mb-4">
            <p className="text-gray-600">
              Enter your skills to get personalized job recommendations powered by AI
            </p>
          </div>
          <JobRecommender />
        </div>
      </section>

<<<<<<< HEAD
=======
=======
      {/* ML-powered Job Analytics */}
      <JobAnalytics />
  
>>>>>>> 1b14ea9998ea7722dd0f5ac506b49d382ad11435
>>>>>>> 0bad6bd6b6cdcb5906b6966559d8e5deda0ed366
      {/* Future Scope Analysis Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Future Scope Analysis</h2>
        <FutureScopeAnalysis skills={userSkills} interests={userInterests} />
      </section>

      {/* Rewards */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Rewards</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold">Level 5 Mentor</h3>
              <p className="text-gray-600">Keep sharing your skills to level up!</p>
            </div>
            <div className="bg-[#B10DC9] text-white px-4 py-2 rounded-full">500 XP</div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center">
              <Award className="h-8 w-8 text-yellow-400 mr-4" />
              <div>
                <h4 className="font-semibold">Top Contributor</h4>
                <p className="text-sm text-gray-600">Awarded for consistent high-quality contributions</p>
              </div>
            </div>
            <div className="flex items-center">
              <Award className="h-8 w-8 text-blue-400 mr-4" />
              <div>
                <h4 className="font-semibold">Quick Learner</h4>
                <p className="text-sm text-gray-600">Completed 10 courses in record time</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Skills */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Recommended Skills to Learn</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <ul className="space-y-4">
            {["Machine Learning", "UX Design", "Digital Marketing", "Data Analysis", "Blockchain"].map(
              (skill, index) => (
                <li key={index} className="flex items-center justify-between">
                  <span className="text-lg text-gray-800">{skill}</span>
                  <button className="text-[#0074D9] hover:text-[#0056a3] flex items-center">
                    <span className="mr-2">Explore</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </li>
              ),
            )}
          </ul>
        </div>
      </section>
<<<<<<< HEAD

      {/* Job Trends */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Job Trends</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          {graphData && (
            <Line
              data={graphData}
              options={{
                // Chart options
              }}
            />
          )}
        </div>
      </section>
=======
>>>>>>> 0bad6bd6b6cdcb5906b6966559d8e5deda0ed366
    </main>
  )
}
