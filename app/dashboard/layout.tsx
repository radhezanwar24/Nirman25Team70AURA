import TopNavBar from "@/components/dashboard/TopNavBar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <TopNavBar />
      <div className="flex-1 overflow-y-auto">
        <main className="container mx-auto px-4 py-8">{children}</main>
      </div>
    </div>
  )
}

