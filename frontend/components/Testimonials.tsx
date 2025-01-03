import Image from 'next/image'
import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Student',
    content: 'SilentWord has been a game-changer for me. The interactive tutorials and practice sessions have significantly improved my sign language skills.',
    avatar: '/placeholder.svg?height=100&width=100',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    role: 'Teacher',
    content: 'As an educator, I\'ve found SilentWord to be an invaluable resource for my students. The AI feedback feature is particularly impressive.',
    avatar: '/placeholder.svg?height=100&width=100',
    rating: 5,
  },
  {
    name: 'Emily Rodriguez',
    role: 'Interpreter',
    content: 'SilentWord has helped me refine my interpreting skills. The advanced conversation tutorials are especially helpful for professional development.',
    avatar: '/placeholder.svg?height=100&width=100',
    rating: 4,
  },
]

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-100 rounded-lg p-6 shadow-md">
              <div className="flex items-center mb-4">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  width={50}
                  height={50}
                  className="rounded-full mr-4"
                />
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">{testimonial.content}</p>
              <div className="flex">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

