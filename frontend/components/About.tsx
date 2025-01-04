"use client"

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Card, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Heart, Users, Brain, Target, Lightbulb, HandMetal } from 'lucide-react'
import Image from "next/image"

export default function About() {
  const { ref: visionRef, inView: visionInView } = useInView({ triggerOnce: true })
  const { ref: missionRef, inView: missionInView } = useInView({ triggerOnce: true })
  const { ref: problemRef, inView: problemInView } = useInView({ triggerOnce: true })
  const { ref: audienceRef, inView: audienceInView } = useInView({ triggerOnce: true })
  const { ref: featuresRef, inView: featuresInView } = useInView({ triggerOnce: true })
  const { ref: solutionRef, inView: solutionInView } = useInView({ triggerOnce: true })

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  const staggerChildren = {
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  return (
    <div className="relative min-h-screen bg-background/50 antialiased">
      {/* Subtle Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-gray-50"></div>
      <div className="absolute inset-0 bg-grid-black/[0.02] bg-[size:20px_20px]"></div>

      {/* Hero Section - Enhanced */}
      <motion.section 
        className="relative h-[50vh] min-h-[400px] w-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Image
          src="/handsignimage.png"
          alt="Diverse group of people using sign language"
          width={1200}
          height={400}
          className="object-cover w-full h-full brightness-90 transform hover:scale-105 transition-transform duration-700"
          priority
        />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]"></div>
          <div className="text-center text-white space-y-8 p-6 max-w-3xl absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold tracking-tight font-display drop-shadow-lg"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              About SilentWords
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl font-light tracking-wide"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              Empowering communication through sign language
            </motion.p>
          </div>
        </motion.div>
      </motion.section>

      <main className="relative container mx-auto px-4 py-24 space-y-40">
        {/* Vision & Mission Section - Enhanced */}
        <div className="grid md:grid-cols-2 gap-12">
          <motion.section
            ref={visionRef}
            initial="hidden"
            animate={visionInView ? "visible" : "hidden"}
            variants={fadeInUp}
            transition={{ duration: 0.5 }}
          >
            <Card className="h-full bg-white/80 backdrop-blur-sm border-2 border-primary/10 
                           hover:border-primary/20 transition-all duration-300 
                           hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)]
                           transform hover:-translate-y-1">
              <CardContent className="p-8 space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-border/50">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5">
                    <Heart className="h-6 w-6 text-primary animate-pulse" />
                  </div>
                  <h2 className="text-2xl font-display font-semibold text-primary tracking-tight">
                    Our Vision
                  </h2>
                </div>
                <p className="text-muted-foreground leading-relaxed font-light">
                  We envision a world where communication knows no barriers—where sign language 
                  is universally understood and appreciated. SilentWords stands as a bridge, 
                  connecting communities through the power of visual language, fostering 
                  inclusivity, and celebrating the rich expressiveness of sign language.
                </p>
              </CardContent>
            </Card>
          </motion.section>

          <motion.section
            ref={missionRef}
            initial="hidden"
            animate={missionInView ? "visible" : "hidden"}
            variants={fadeInUp}
            transition={{ duration: 0.5 }}
          >
            <Card className="h-full border-2 border-blue-200/20 hover:border-blue-200/30 transition-all dark:border-blue-500/20 dark:hover:border-blue-500/30">
              <CardContent className="p-8 space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-border">
                  <div className="p-2 rounded-md border border-blue-200/30 bg-blue-50/50 dark:border-blue-500/30 dark:bg-blue-950/50">
                    <Target className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h2 className="text-2xl font-display font-semibold text-blue-600 dark:text-blue-400 tracking-tight">Our Mission</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed font-light tracking-wide">
                  Our mission is to revolutionize sign language learning through innovative 
                  technology and accessible education. We're committed to providing intuitive, 
                  engaging tools that make learning sign language an enriching journey for 
                  everyone, regardless of their background or experience level.
                </p>
              </CardContent>
            </Card>
          </motion.section>
        </div>

        {/* Problem Statement Section - Enhanced */}
        <motion.section
          ref={problemRef}
          initial="hidden"
          animate={problemInView ? "visible" : "hidden"}
          variants={fadeInUp}
          transition={{ duration: 0.5 }}
          className="space-y-12"
        >
          <div className="flex items-center gap-3 pb-6 border-b border-border">
            <div className="p-2 rounded-md border border-rose-200/30 bg-rose-50/50 dark:border-rose-500/30 dark:bg-rose-950/50">
              <Lightbulb className="h-5 w-5 text-rose-600 dark:text-rose-400" />
            </div>
            <h2 className="text-2xl font-display font-semibold text-rose-600 dark:text-rose-400 tracking-tight">The Challenge</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-2 border-rose-200/20 hover:border-rose-200/30 transition-all dark:border-rose-500/20 dark:hover:border-rose-500/30">
              <CardContent className="p-8 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-display font-medium text-rose-600/90 dark:text-rose-400/90">Communication Barriers</h3>
                  <div className="text-5xl font-display font-bold text-rose-600 dark:text-rose-400 tracking-tight">466M+</div>
                  <p className="text-muted-foreground font-light leading-relaxed tracking-wide">
                    Over 466 million people worldwide have disabling hearing loss, 
                    yet less than 2% of the global population understands sign language, 
                    creating significant communication barriers in daily life.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-2 border-rose-200/20 hover:border-rose-200/30 transition-all dark:border-rose-500/20 dark:hover:border-rose-500/30">
              <CardContent className="p-8 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-display font-medium text-rose-600/90 dark:text-rose-400/90">Social Isolation</h3>
                  <div className="text-5xl font-display font-bold text-rose-600 dark:text-rose-400 tracking-tight">70%</div>
                  <p className="text-muted-foreground font-light leading-relaxed tracking-wide">
                    70% of deaf individuals report feeling isolated in social situations, 
                    with limited access to inclusive communication tools and widespread 
                    understanding of sign language.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* Target Audience Section - Enhanced */}
        <motion.section
          ref={audienceRef}
          initial="hidden"
          animate={audienceInView ? "visible" : "hidden"}
          variants={fadeInUp}
          transition={{ duration: 0.5 }}
          className="space-y-12"
        >
          <div className="flex items-center gap-3 pb-6 border-b border-border">
            <div className="p-2 rounded-md border border-emerald-200/30 bg-emerald-50/50 dark:border-emerald-500/30 dark:bg-emerald-950/50">
              <Users className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h2 className="text-2xl font-display font-semibold text-emerald-600 dark:text-emerald-400 tracking-tight">Who We Serve</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "Deaf and Hard-of-Hearing Individuals",
              "Sign Language Learners",
              "Families & Friends",
              "Educators & Institutions",
              "Healthcare Professionals",
              "Accessibility Advocates"
            ].map((audience) => (
              <Badge
                key={audience}
                variant="secondary"
                className="p-4 text-center text-sm font-medium tracking-wide border border-emerald-200/20 hover:border-emerald-200/30 hover:bg-emerald-50/50 transition-all dark:border-emerald-500/20 dark:hover:border-emerald-500/30 dark:hover:bg-emerald-950/50"
              >
                {audience}
              </Badge>
            ))}
          </div>
        </motion.section>

        {/* Features Section - Enhanced */}
        <motion.section
          ref={featuresRef}
          initial="hidden"
          animate={featuresInView ? "visible" : "hidden"}
          variants={staggerChildren}
          className="space-y-12"
        >
          <motion.div variants={fadeInUp} className="flex items-center gap-3 pb-6 border-b border-border">
            <div className="p-2 rounded-md border border-violet-200/30 bg-violet-50/50 dark:border-violet-500/30 dark:bg-violet-950/50">
              <Brain className="h-5 w-5 text-violet-600 dark:text-violet-400" />
            </div>
            <h2 className="text-2xl font-display font-semibold text-violet-600 dark:text-violet-400 tracking-tight">Our Features</h2>
          </motion.div>
          <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Interactive Learning",
                description: "Animated hand signs and real-time feedback for intuitive learning"
              },
              {
                title: "Sign Detection",
                description: "Advanced AI technology for real-time sign language recognition"
              },
              {
                title: "Progress Tracking",
                description: "Personalized learning paths and achievement milestones"
              },
              {
                title: "Community Hub",
                description: "Connect with other learners and native signers"
              },
              {
                title: "Resource Library",
                description: "Comprehensive collection of learning materials and guides"
              },
              {
                title: "Accessibility First",
                description: "Designed with and for the deaf and hard-of-hearing community"
              }
            ].map((feature) => (
              <motion.div
                key={feature.title}
                variants={fadeInUp}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                <Card className="h-full border-2 border-violet-200/20 hover:border-violet-200/30 transition-all dark:border-violet-500/20 dark:hover:border-violet-500/30">
                  <CardContent className="p-6 space-y-3">
                    <h3 className="text-lg font-display font-medium text-violet-600/90 dark:text-violet-400/90">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground font-light leading-relaxed tracking-wide">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Impact Section - Enhanced */}
        <motion.section
          ref={solutionRef}
          initial="hidden"
          animate={solutionInView ? "visible" : "hidden"}
          variants={fadeInUp}
          transition={{ duration: 0.5 }}
          className="space-y-12"
        >
          <div className="flex items-center gap-3 pb-6 border-b border-border">
            <div className="p-2 rounded-md border border-amber-200/30 bg-amber-50/50 dark:border-amber-500/30 dark:bg-amber-950/50">
              <HandMetal className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
            <h2 className="text-2xl font-display font-semibold text-amber-600 dark:text-amber-400 tracking-tight">Our Impact</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-2 border-amber-200/20 hover:border-amber-200/30 transition-all dark:border-amber-500/20 dark:hover:border-amber-500/30">
              <CardContent className="p-8 space-y-4">
                <h3 className="text-xl font-display font-medium text-amber-600/90 dark:text-amber-400/90">Breaking Barriers</h3>
                <p className="text-muted-foreground font-light leading-relaxed tracking-wide">
                  SilentWords transforms the way people learn and understand sign 
                  language. Our platform breaks down traditional barriers to learning, 
                  making sign language education accessible to everyone, anywhere, 
                  at any time.
                </p>
              </CardContent>
            </Card>
            <Card className="border-2 border-amber-200/20 hover:border-amber-200/30 transition-all dark:border-amber-500/20 dark:hover:border-amber-500/30">
              <CardContent className="p-8 space-y-4">
                <h3 className="text-xl font-display font-medium text-amber-600/90 dark:text-amber-400/90">Building Bridges</h3>
                <p className="text-muted-foreground font-light leading-relaxed tracking-wide">
                  Through technology and community engagement, we're creating a more 
                  inclusive world where sign language is recognized and celebrated as 
                  a vital form of communication, connecting people across different 
                  abilities and backgrounds.
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.section>
      </main>
    </div>
  )
}

