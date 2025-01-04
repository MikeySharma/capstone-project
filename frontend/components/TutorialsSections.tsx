"use client"

import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from 'next/link'

const tutorials = [
  { title: 'Beginner Basics', image: '/alphabests_hand_sign.png', description: 'Learn the basics of sign language with our comprehensive video lessons.' },
  { title: 'Advanced Conversations', image: '/hello.gif', description: 'Master the essentials of sign language with our comprehensive video lessons.' },
  { title: 'Everyday Signs', image: '/ilu.gif', description: 'Master the essentials of sign language with our comprehensive video lessons.' },
]

export default function TutorialsSection() {
  return (
    <section id="tutorials" className="py-20 bg-[url('/90.jpg')] bg-no-repeat bg-cover bg-center min-h-screen w-full relative before:absolute before:inset-0 ">
      <div className="container mx-auto  relative">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-center mb-16   "
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Learn Sign Language with Our Video Tutorials
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {tutorials.map((tutorial, index) => (
            <motion.div 
              key={index} 
              className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition duration-300 flex flex-col h-[600px] border border-gray-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.03,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
              }}
            >
              <div className="relative h-[500px] w-full">
                <Image
                  src={tutorial.image}
                  alt={tutorial.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              <div className="p-2 flex-1 bg-gradient-to-b from-white to-gray-50">
                <h3 className="text-2xl font-bold mb-4 text-gray-800">{tutorial.title}</h3>
                <p className="text-gray-600 leading-relaxed">{tutorial.description}</p>
                <button className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-md hover:shadow-lg">
                 <Link href="/login"> Start Learning</Link>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
