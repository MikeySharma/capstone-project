"use client";

import Image from "next/image";

export default function LearnAnywhere() {
  const features = [
    {
      title: "Learn anywhere",
      description:
        "Our website works on your computer, tablet, and smartphone. You can also download our app for Android or iOS.",
      image: "/learn.png", // Replace with your image path
    },
    {
      title: "Learn on any device",
      description:
        "You can use our website or app on your computer, tablet, or smartphone. We also have an app for Android and iOS.",
      image: "/multiple_device.png", // Replace with your image path
    },
    {
      title: "Learn at your own pace",
      description:
        "You can learn at your own pace. Our lessons are self-paced, so you can learn as fast or as slow as you want.",
      image: "/learn_peac.svg", // Replace with your image path
    },
    {
      title: "Learn with friends",
      description:
        "You can learn with friends. Our website and app include social features that let you connect with other learners.",
      image: "/learnwithfrineds.svg", // Replace with your image path
    },
    {
      title: "Learn in 3D",
      description:
        "You can learn in 3D. We offer virtual reality (VR) lessons that let you practice signing in a realistic 3D environment.",
      image: "/hans3d.png", // Replace with your image path
    },
  ];

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl  font-bold text-center text-gray-800 mb-6">
          Learn sign language anywhere
        </h2>
        <p className="text-center opacity-50 text-sm w-3/5 mx-auto text-gray-600 mb-12">
          SilentWords makes it easy to learn sign language online. You can
          learn from your computer, tablet, or smartphone, or you can use our
          app for Android or iOS. You can also use our website and app on a
          smartwatch or in virtual reality (VR).
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center"
            >
              <div className="relative w-full h-36 mb-4">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-contain rounded-md"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-justify text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
