import Image from "next/image"

const testimonials = [
  {
    name: "Tanish Ahire",
    role: "Web Developer",
    content:
      "SwapUP has been a game-changer for my career. I've learned so much from other developers and even found a mentor!",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Abhishek Bhavsar",
    role: "Graphic Designer",
    content:
      "The micro-mentorship feature on SwapUP is brilliant. I've been able to get quick feedback on my designs and improve rapidly.",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Shlok Nambiar",
    role: "Marketing Specialist",
    content:
      "I love the gamification aspect of SwapUP. It keeps me motivated to learn and share my knowledge with others.",
    avatar: "/placeholder.svg?height=100&width=100",
  },
]

export default function Testimonials() {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <Image
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                  width={50}
                  height={50}
                  className="rounded-full mr-4"
                />
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-700 italic">"{testimonial.content}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

