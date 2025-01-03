import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
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
          <iframe
            width="481"
            height="855"
            src="https://www.youtube.com/embed/9suMldWHsGc"
            title="ASL Animation"
            // frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
}
