"use client"

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5; // Set the fixed speed (1.5x in this case)
    }
  }, []);

  return (
    <section className="relative py-16 mt-5">
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
        <motion.div
          className="md:w-1/2 mb-8 md:mb-0"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl text-white md:text-5xl font-bold mb-4">
            Learn Sign Language, Connect Without Barriers
          </h1>
          <p className="text-sm text-white mb-6">
            SilentWords empowers connection through interactive sign language tutorials, video practice, and personalized learning, breaking communication barriers worldwide
          </p>
          <Link
            href="/login"
            className="bg-white text-blu  e-600 px-6 py-3 rounded-full font-semibold text-lg hover:bg-blue-100 transition duration-300"
          >
            Start Learning Now
          </Link>
        </motion.div>
        <motion.div
          className="flex justify-center md:w-1/2"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div>

            <video ref={videoRef} className='rounded-3xl mt-10 shadow-2xl' autoPlay loop muted width="300" height={400}>
              <source src="/handsing.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className=' absolute z-20 rounded-3xl mt-10 shadow-2xl bg-yellow-500 ml-10'>  </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
