import { Users, Video, Award, BarChart, Settings } from "lucide-react"
import Link from "next/link"

export default function Sidebar() {
  return (
    <div className="bg-[#111111] text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <nav>
        <Link href="/dashboard" className="flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-[#B10DC9]">
          <BarChart className="h-5 w-5" />
          <span>Dashboard</span>
        </Link>
        <Link href="/dashboard/matches" className="flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-[#B10DC9]">
          <Users className="h-5 w-5" />
          <span>Matches</span>
        </Link>
        <Link href="/dashboard/videos" className="flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-[#B10DC9]">
          <Video className="h-5 w-5" />
          <span>My Videos</span>
        </Link>
        <Link href="/dashboard/rewards" className="flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-[#B10DC9]">
          <Award className="h-5 w-5" />
          <span>Rewards</span>
        </Link>
        <Link
          href="/dashboard/settings"
          className="flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-[#B10DC9]"
        >
          <Settings className="h-5 w-5" />
          <span>Settings</span>
        </Link>
      </nav>
    </div>
  )
}

