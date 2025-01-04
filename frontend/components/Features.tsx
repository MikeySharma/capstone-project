"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FeaturesPage() {
  const [selectedFeature, setSelectedFeature] = useState(0);

  const features = [
    {
      title: "Interactive Sign Language Tutorials",
      description:
        "Learn sign language effortlessly with step-by-step animated hand signs, catering to beginners and advanced learners alike.",
      image: "/happy.avif",
    },
    {
      title: "Real-Time Sign Detection",
      description:
        "Utilize advanced AI technology to detect and interpret sign language gestures in real-time, with instant feedback on your gestures.",
      image: "/raal_time_detection.jpg",
    },
    {
      title: "Comprehensive Vocabulary Library",
      description:
        "Access an extensive library of commonly used words and phrases with their corresponding hand signs, complete with audio pronunciation.",
      image: "/images/vocabulary-library.png",
    },
    {
      title: "Personalized Learning Experience",
      description:
        "Track your progress, receive tailored lessons, and enjoy suggestions based on your learning pace and history.",
      image: "/images/personalized-learning.png",
    },
    {
      title: "Multimedia Support",
      description:
        "Enhance your learning with videos, animations, and images that illustrate each sign in detail.",
      image: "/images/multimedia-support.png",
    },
    {
      title: "Voice-to-Sign Conversion",
      description:
        "Convert text or speech into animated sign language, making conversations seamless between hearing and non-hearing individuals.",
      image: "/images/voice-to-sign.png",
    },
    {
      title: "Accessible and Responsive Design",
      description:
        "Enjoy a fully responsive platform designed for seamless use on desktops, tablets, and smartphones.",
      image: "/images/responsive-design.png",
    },
    {
      title: "Community Engagement",
      description:
        "Join forums and groups to connect with others learning or using sign language, and share experiences.",
      image: "/images/community-engagement.png",
    },
    {
      title: "Gamified Learning",
      description:
        "Stay motivated with quizzes, challenges, and rewards that reinforce your learning journey.",
      image: "/images/gamified-learning.png",
    },
    {
      title: "Offline Learning Mode",
      description:
        "Download tutorials and resources for offline access, ensuring uninterrupted learning anytime, anywhere.",
      image: "/images/offline-learning.png",
    },
  ];

  return (
    <div className="p-6 bg-gray-100">
      <div className="max-w-7xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-10 text-blue-600"
        >
          Features of SilentWords
        </motion.h1>

        <div className="flex gap-6">
          {/* Sidebar with titles */}
          <div className="w-1/3">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-lg shadow-lg p-4"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-3 cursor-pointer mb-2 rounded-md transition-all ${
                    selectedFeature === index
                      ? "bg-blue-600 text-white"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => setSelectedFeature(index)}
                >
                  <h2 className="font-semibold">{feature.title}</h2>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Content area */}
          <div className="w-2/3">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedFeature}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white shadow-lg rounded-lg overflow-hidden"
              >
                <div className="relative w-full h-[400px]">
                  <Image
                    src={features[selectedFeature].image}
                    alt={features[selectedFeature].title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                  />
                </div>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="p-6"
                >
                  <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                    {features[selectedFeature].title}
                  </h2>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {features[selectedFeature].description}
                  </p>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
