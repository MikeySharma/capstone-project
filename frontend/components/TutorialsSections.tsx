"use client"

import Image from 'next/image'
import { motion } from 'framer-motion'

const tutorials = [
  { title: 'Beginner Basics', image: '/alphabests_hand_sign.png', description: 'Learn the basics of sign language with our comprehensive video lessons.' },
  { title: 'Advanced Conversations', image: '/hello.gif', description: 'Master the essentials of sign language with our comprehensive video lessons.' },
  { title: 'Everyday Signs', image: '/ilu.gif', description: 'Master the essentials of sign language with our comprehensive video lessons.' },
]

export default function TutorialsSection() {
  return (
    <section id="tutorials" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Learn Sign Language with Our Video Tutorials
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tutorials.map((tutorial, index) => (
            <motion.div 
              key={index} 
              className="bg-gray-100 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 flex flex-col h-[500px]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
            >
              <div className="relative h-[650px] w-full">
                <Image
                  src={tutorial.image}
                  alt={tutorial.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 flex-1">
                <h3 className="text-xl font-semibold mb-2">{tutorial.title}</h3>
                <p className="text-gray-600">{tutorial.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
