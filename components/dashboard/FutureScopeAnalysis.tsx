import { useState, useEffect } from "react"
import { TrendingUp, Award } from "lucide-react"
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface FutureScopeAnalysisProps {
  skills: string[]
  interests: string[]
}

export default function FutureScopeAnalysis({ skills, interests }: FutureScopeAnalysisProps) {
  const [trendingTopics, setTrendingTopics] = useState<string[]>([])
  const [jobGrowthData, setJobGrowthData] = useState<any>(null)

  useEffect(() => {
    // Simulating API call to job market data
    const fetchJobMarketData = async () => {
      // In a real application, you would make an API call here
      const mockTrendingTopics = ["Artificial Intelligence", "Blockchain", "Cybersecurity"]
      setTrendingTopics(mockTrendingTopics)

      const mockJobGrowthData = {
        labels: ["Web Development", "Data Science", "Cloud Computing"],
        datasets: [
          {
            label: "Projected Growth (%)",
            data: [15, 25, 20],
            backgroundColor: "rgba(75, 192, 192, 0.6)",
          },
        ],
      }
      setJobGrowthData(mockJobGrowthData)
    }

    fetchJobMarketData()
  }, [])

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Trending Topics</h3>
        <ul>
          {trendingTopics.map((topic, index) => (
            <li key={index} className="flex items-center mb-2">
              <TrendingUp className="mr-2 text-green-500" size={16} />
              {topic}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Job Growth Projections</h3>
        {jobGrowthData && (
          <Bar
            data={jobGrowthData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top" as const,
                },
                title: {
                  display: true,
                  text: "Projected Job Growth by Field",
                },
              },
            }}
          />
        )}
      </div>

      <div className="mt-6">
        <p className="flex items-center text-gray-700">
          <Award className="mr-2 text-yellow-500" size={16} />
          The demand for Data Scientists is expected to grow by 25% over the next 5 years.
        </p>
      </div>
    </div>
  )
}

