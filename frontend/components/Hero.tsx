"use client"

import Link from 'next/link';
import { useEffect, useRef } from 'react';

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5; // Set the fixed speed (1.5x in this case)
    }
  }, []);

  return (
    <section className="relative py-16">
      {/* Background Image with Gradient Overlay */}
      <div
        className="absolute inset-0 bg-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: "url('/handsignimage.png')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-violet-500/100 to-teal-500/90"></div>

      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 flex justify-between flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Learn Sign Language, Connect Without Barriers
          </h1>
          <p className="text-xl mb-6">
            Interactive tutorials and video practice to master sign language at your pace.
          </p>
          <Link
            href="#"
            className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold text-lg hover:bg-blue-100 transition duration-300"
          >
            Start Learning Now
          </Link>
        </div>
        <div className=" flex justify-center  md:w-1/2">
          <video ref={videoRef} className='rounded-3xl shadow-2xl'  autoPlay loop muted width="300"  height={400}>
            <source src="/handsing.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  );
}
