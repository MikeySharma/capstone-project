import Image from 'next/image'
import { Camera, Zap, TrendingUp } from 'lucide-react'

const features = [
  { 
    title: 'Record Your Practice', 
    description: 'Use your camera to record and review your signing skills.',
    icon: Camera,
    gradient: 'from-blue-500 to-indigo-500'
  },
  { 
    title: 'AI Feedback', 
    description: 'Get instant feedback on your signing technique from our AI.',
    icon: Zap,
    gradient: 'from-indigo-500 to-purple-500'
  },
  { 
    title: 'Track Your Progress', 
    description: 'Monitor your improvement over time with detailed analytics.',
    icon: TrendingUp,
    gradient: 'from-purple-500 to-pink-500'
  },
]

export default function PracticeSection() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-gray-100/90 to-white"></div>
      
      {/* Blur Effects */}
      <div className="absolute top-40 left-0 w-96 h-96 bg-blue-200/30 rounded-full filter blur-[100px]"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200/30 rounded-full filter blur-[100px]"></div>

      <div className="relative container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 
                       bg-clip-text text-transparent mb-4">
            Practice and Improve Your Skills
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Features List */}
          <div className="space-y-8">
            {features.map((feature, index) => (
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
                
                <div className="relative flex items-start">
                  {/* Icon Container */}
                  <div className={`flex-shrink-0 p-3 rounded-xl bg-gradient-to-br ${feature.gradient} 
                                shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Content */}
                  <div className="ml-6">
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-indigo-600 
                                 mb-2 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Image Section */}
          <div className="relative group">
            {/* Image Container */}
            <div className="relative rounded-2xl overflow-hidden 
                         transform group-hover:-translate-y-2 transition-transform duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-purple-500/10 
                           opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
              <Image
                src="/ai.png"
                alt="Video interaction demonstration"
                width={600}
                height={400}
                className="rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] 
                         group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)]
                         transition-all duration-300"
              />
              
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 
                           rounded-full filter blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-to-br from-purple-500/20 to-pink-500/20 
                           rounded-full filter blur-xl group-hover:blur-2xl transition-all duration-300"></div>
            </div>

            {/* Floating Dots */}
            <div className="absolute -top-6 left-6 w-3 h-3 bg-blue-500 rounded-full 
                         animate-float opacity-70"></div>
            <div className="absolute top-6 -right-6 w-4 h-4 bg-purple-500 rounded-full 
                         animate-float animation-delay-200 opacity-70"></div>
            <div className="absolute -bottom-6 left-12 w-3 h-3 bg-indigo-500 rounded-full 
                         animate-float animation-delay-500 opacity-70"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

