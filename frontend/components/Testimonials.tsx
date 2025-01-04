import Image from 'next/image'
import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Student',
    content: 'SilentWord has been a game-changer for me. The interactive tutorials and practice sessions have significantly improved my sign language skills.',
    avatar: '/5677.jpg',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    role: 'Teacher',
    content: 'As an educator, I\'ve found SilentWord to be an invaluable resource for my students. The AI feedback feature is particularly impressive.',
    avatar: '/19591.jpg',
    rating: 5,
  },
  {
    name: 'Emily Rodriguez',
    role: 'Interpreter',
    content: 'SilentWord has helped me refine my interpreting skills. The advanced conversation tutorials are especially helpful for professional development.',
    avatar: '/59329.jpg',
    rating: 4,
  },
]

export default function TestimonialsSection() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/90 to-gray-100/80"></div>
      
      {/* Blur Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200/30 rounded-full filter blur-[100px]"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-200/30 rounded-full filter blur-[100px]"></div>

      <div className="relative container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 
                       bg-clip-text text-transparent mb-4">
            What Our Users Say
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="group relative bg-white rounded-2xl p-6 
                       shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] 
                       border border-gray-100 hover:border-gray-200
                       transform hover:-translate-y-1 transition-all duration-300"
            >
              {/* Hover Gradient Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 via-indigo-500/5 to-purple-500/5 
                           opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Content */}
              <div className="relative">
                <div className="flex items-center mb-6">
                  <div className="relative">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      width={56}
                      height={56}
                      className="rounded-full ring-4 ring-white shadow-md"
                    />
                    {/* Decorative dot */}
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-r from-blue-500 to-indigo-500 
                                  rounded-full ring-2 ring-white"></div>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 
                                 transition-colors duration-300">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  {testimonial.content}
                </p>

                <div className="flex items-center gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="w-5 h-5 text-yellow-400 fill-current 
                               transform group-hover:scale-110 transition-transform duration-300 
                               group-hover:rotate-[360deg]" 
                      style={{ transitionDelay: `${i * 50}ms` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

