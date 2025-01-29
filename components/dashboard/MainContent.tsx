"use client"

import { useState, useEffect } from "react"
import { ArrowRight, Star, ChevronLeft, ChevronRight, Award, Briefcase, TrendingUp } from "lucide-react"
import Image from "next/image"
import FutureScopeAnalysis from "./FutureScopeAnalysis"
import JobAnalytics from './JobAnalytics';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, ExternalLink, Download } from "lucide-react";

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

  useEffect(() => {
    // Simulating fetching user data
    setUserSkills(["JavaScript", "React", "Node.js"])
    setUserInterests(["Web Development", "Machine Learning"])
  }, [])

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
        </div>
      </section>

      {/* My Videos */}
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
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  layout="fill"
                  objectFit="cover"
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

      {/* ML-powered Job Analytics */}
      <JobAnalytics />
  
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
    </main>
  )
}
