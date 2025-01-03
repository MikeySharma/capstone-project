import Image from 'next/image'

export default function About() {
  return (
    <section id="about" className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <Image
              src="/logo.png"
              alt="Communication and inclusivity"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2 md:pl-12">
            <h2 className="text-3xl font-bold mb-6">About SilentWord</h2>
            <p className="text-gray-700 mb-6">
              At SilentWord, our mission is to make sign language accessible to everyone. We believe that communication should have no barriers, and we're committed to providing the tools and resources needed to learn and master sign language.
            </p>
            <p className="text-gray-700 mb-6">
              Our platform combines cutting-edge technology with expert-designed curricula to create an engaging and effective learning experience. Whether you're a beginner or looking to advance your skills, SilentWord is here to support your journey in bridging the communication gap.
            </p>
            <p className="text-gray-700">
              Join us in our mission to create a more inclusive world through the power of sign language.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

