import Link from "next/link"

export default function CallToAction() {
  return (
    <section className="py-16 bg-gradient-to-r from-[#B10DC9] to-[#0074D9] text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Your Skill-Building Journey?</h2>
        <p className="text-xl mb-8">Join our community of learners and mentors today!</p>
        <div className="flex justify-center space-x-4">
          <Link
            href="/signup"
            className="bg-white text-[#B10DC9] px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition duration-300"
          >
            Sign Up Now
          </Link>
          <Link
            href="/explore"
            className="bg-transparent border-2 border-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-white hover:text-[#B10DC9] transition duration-300"
          >
            Explore Skills
          </Link>
        </div>
      </div>
    </section>
  )
}

