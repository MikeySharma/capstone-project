"use client";

import Image from "next/image";

export default function LearnAnywhere() {
  const features = [
    {
      title: "Learn anywhere",
      description:
        "Our website works on your computer, tablet, and smartphone. You can also download our app for Android or iOS.",
      image: "/learn.png",
      gradient: "from-blue-500 to-indigo-500",
    },
    {
      title: "Learn on any device",
      description:
        "You can use our website or app on your computer, tablet, or smartphone. We also have an app for Android and iOS.",
      image: "/multiple_device.png",
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      title: "Learn at your own pace",
      description:
        "You can learn at your own pace. Our lessons are self-paced, so you can learn as fast or as slow as you want.",
      image: "/learn_peac.svg",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "Learn with friends",
      description:
        "You can learn with friends. Our website and app include social features that let you connect with other learners.",
      image: "/learnwithfrineds.svg",
      gradient: "from-pink-500 to-rose-500",
    },
    {
      title: "Learn in 3D",
      description:
        "You can learn in 3D. We offer virtual reality (VR) lessons that let you practice signing in a realistic 3D environment.",
      image: "/hans3d.png",
      gradient: "from-rose-500 to-orange-500",
    },
  ];

  return (
    <div className="relative py-20 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/90 to-gray-100/80"></div>
      
      {/* Blur Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200/30 rounded-full filter blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-200/30 rounded-full filter blur-[100px] animate-pulse"></div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 
                       bg-clip-text text-transparent mb-4">
            Learn sign language anywhere
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            SilentWords makes it easy to learn sign language online. Access our platform from any device, 
            anytime, anywhere.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-6 
                       shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]
                       border border-gray-100 hover:border-gray-200
                       transform hover:-translate-y-2 transition-all duration-300"
            >
              {/* Hover Gradient Effect */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient}/5 
                           opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
              
              {/* Content */}
              <div className="relative space-y-4">
                {/* Image Container */}
                <div className="relative h-40 w-full mb-4 overflow-hidden rounded-xl">
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient}/10 
                               group-hover:opacity-75 transition-opacity duration-300 z-10`}></div>
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-contain transform group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Text Content */}
                <h3 className={`text-lg font-semibold bg-gradient-to-r ${feature.gradient} 
                             bg-clip-text text-transparent group-hover:scale-105 
                             transition-transform duration-300`}>
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>

                {/* Decorative Element */}
                <div className={`absolute -bottom-1 -right-1 w-12 h-12 bg-gradient-to-br ${feature.gradient}/20 
                             rounded-full blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 
                             group-hover:opacity-100`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Floating Elements */}
      <div className="absolute top-20 left-10 w-3 h-3 bg-blue-500 rounded-full animate-float opacity-70"></div>
      <div className="absolute top-40 right-10 w-4 h-4 bg-purple-500 rounded-full animate-float animation-delay-200 opacity-70"></div>
      <div className="absolute bottom-20 left-1/4 w-3 h-3 bg-indigo-500 rounded-full animate-float animation-delay-500 opacity-70"></div>
    </div>
  );
}
