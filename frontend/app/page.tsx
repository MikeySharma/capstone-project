import Hero from "@/components/Hero";
import PracticeSection from "@/components/PracticeSection";
import TestimonialsSection from "@/components/Testimonials";
import TutorialSection from "@/components/TutorialsSections";

export default function Home() {
  return (
    <main>
      <Hero />
      <TutorialSection />
      <PracticeSection />
      
      <TestimonialsSection />
    </main>
  )
}

