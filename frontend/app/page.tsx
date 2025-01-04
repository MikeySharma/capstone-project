import Hero from "@/components/Hero";
import LearnAnywhere from "@/components/LearnAnyWhere";
import PracticeSection from "@/components/PracticeSection";
import TestimonialsSection from "@/components/Testimonials";
import TutorialSection from "@/components/TutorialsSections";

export default function Home() {
  return (
    <main>
      <Hero />
      <TutorialSection />
      <PracticeSection />
      <LearnAnywhere /> 
      <TestimonialsSection />
    </main>
  )
}

