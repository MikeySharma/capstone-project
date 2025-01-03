import Image from 'next/image'
import { Camera, Zap, TrendingUp } from 'lucide-react'

const features = [
  { title: 'Record Your Practice', description: 'Use your camera to record and review your signing skills.', icon: Camera },
  { title: 'AI Feedback', description: 'Get instant feedback on your signing technique from our AI.', icon: Zap },
  { title: 'Track Your Progress', description: 'Monitor your improvement over time with detailed analytics.', icon: TrendingUp },
]

export default function PracticeSection() {
  return (
    <section id="practice" className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Practice and Improve Your Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <feature.icon className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 md:mt-0">
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="Video interaction demonstration"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

