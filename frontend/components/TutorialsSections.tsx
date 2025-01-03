import Image from 'next/image'

const tutorials = [
  { title: 'Beginner Basics', image: '/placeholder.svg?height=200&width=300' },
  { title: 'Everyday Signs', image: '/placeholder.svg?height=200&width=300' },
  { title: 'Advanced Conversations', image: '/placeholder.svg?height=200&width=300' },
]

export default function TutorialSection() {
  return (
    <section id="tutorials" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Learn Sign Language with Our Video Tutorials</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tutorials.map((tutorial, index) => (
            <div key={index} className="bg-gray-100 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300">
              <Image
                src={tutorial.image}
                alt={tutorial.title}
                width={300}
                height={200}
                className="w-full"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{tutorial.title}</h3>
                <p className="text-gray-600">Master the essentials of sign language with our comprehensive video lessons.</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

