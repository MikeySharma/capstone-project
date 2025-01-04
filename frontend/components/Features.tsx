"use client";

import Image from "next/image";

export default function FeaturesPage() {
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
        <h1 className="text-4xl font-bold text-center mb-10 text-blue-600">
          Features of SilentWords
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative w-full h-80">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-2 text-gray-800">
                  {feature.title}
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
