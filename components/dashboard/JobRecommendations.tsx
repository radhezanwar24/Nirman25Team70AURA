import { useState, useEffect } from "react"
import { Briefcase } from "lucide-react"

interface Job {
  id: string
  title: string
  company: string
  location: string
  url: string
}

interface JobRecommendationsProps {
  skills: string[]
  interests: string[]
}

export default function JobRecommendations({ skills, interests }: JobRecommendationsProps) {
  const [jobs, setJobs] = useState<Job[]>([])

  useEffect(() => {
    // Simulating API call to LinkedIn or job database
    const fetchJobs = async () => {
      // In a real application, you would make an API call here
      const mockJobs: Job[] = [
        { id: "1", title: "Frontend Developer", company: "TechCorp", location: "Remote", url: "#" },
        { id: "2", title: "Machine Learning Engineer", company: "AI Innovations", location: "New York", url: "#" },
        { id: "3", title: "Full Stack Developer", company: "WebSolutions", location: "San Francisco", url: "#" },
      ]

      // Basic content-based filtering
      const filteredJobs = mockJobs.filter(
        (job) =>
          skills.some((skill) => job.title.toLowerCase().includes(skill.toLowerCase())) ||
          interests.some((interest) => job.title.toLowerCase().includes(interest.toLowerCase())),
      )

      setJobs(filteredJobs)
    }

    fetchJobs()
  }, [skills, interests])

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {jobs.map((job) => (
        <div key={job.id} className="mb-4 p-4 border border-gray-200 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
          <p className="text-gray-600 mb-2">
            {job.company} - {job.location}
          </p>
          <a href={job.url} className="text-blue-500 hover:underline flex items-center">
            <Briefcase className="mr-2" size={16} />
            View Job on LinkedIn
          </a>
        </div>
      ))}
    </div>
  )
}

