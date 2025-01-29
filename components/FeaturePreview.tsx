import { Users, Trophy, Clock, Star, Globe, BookOpen } from "lucide-react"

const features = [
  {
    icon: Users,
    title: "Skill Matching",
    description: "Find the perfect partner to exchange skills with.",
    color: "bg-secondary",
  },
  {
    icon: Trophy,
    title: "Gamification",
    description: "Earn points and badges as you learn and teach.",
    color: "bg-[#FF4136]",
  },
  {
    icon: Clock,
    title: "Micro-Mentorships",
    description: "Quick, focused sessions to boost your skills.",
    color: "bg-[#2ECC40]",
  },
]

const additionalFeatures = [
  {
    icon: Star,
    title: "Personalized Learning Paths",
    description: "Tailored recommendations based on your interests and goals.",
  },
  {
    icon: Globe,
    title: "Global Community",
    description: "Connect with learners and mentors from around the world.",
  },
  {
    icon: BookOpen,
    title: "Diverse Skill Library",
    description: "Explore a wide range of skills from various disciplines.",
  },
]

export default function FeaturePreview() {
  return (
    <section className="py-24 bg-white">
      <div className="container">
        <div className="text-center">
          <h2 className="text-3xl font-bold">How SwapUP Works</h2>
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className={`${feature.color} rounded-2xl p-4`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="mt-6 text-xl font-semibold">{feature.title}</h3>
                <p className="mt-2 text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-24 text-center">
          <h2 className="text-3xl font-bold">More Great Features</h2>
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {additionalFeatures.map((feature, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="bg-primary rounded-2xl p-4">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="mt-6 text-xl font-semibold">{feature.title}</h3>
                <p className="mt-2 text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

