import React from 'react';
import { motion } from 'framer-motion';

export default function TutorialsSection() {
  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-grid-black/[0.02] bg-[size:20px_20px]"></div>
      
      {/* Enhanced Blur Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200/30 rounded-full filter blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-200/30 rounded-full filter blur-[100px] animate-pulse"></div>

      <div className="relative container mx-auto px-4">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 
                   bg-clip-text text-transparent"
          // ... existing motion props ...
        >
          Learn Sign Language with Our Video Tutorials
        </motion.h2>

        // ... rest of the existing code ...
      </div>
    </section>
  )
} 