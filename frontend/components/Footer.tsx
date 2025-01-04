import Link from 'next/link'
import { FiFacebook, FiTwitter, FiInstagram, FiGithub, FiLinkedin, FiArrowRight } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white overflow-hidden">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10"></div>
      
      {/* Blur Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full filter blur-[128px]"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full filter blur-[128px]"></div>

      {/* Main Footer Content */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 
                           bg-clip-text text-transparent drop-shadow-sm">
                SilentWords
              </h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Learn Sign Language, Connect Without Barriers. Join our community and make communication accessible for everyone.
            </p>
            {/* Social Links */}
            <div className="flex gap-5 pt-2">
              {[
                { icon: FiFacebook, label: 'Facebook' },
                { icon: FiTwitter, label: 'Twitter' },
                { icon: FiInstagram, label: 'Instagram' },
                { icon: FiLinkedin, label: 'LinkedIn' },
                { icon: FiGithub, label: 'GitHub' }
              ].map((social) => (
                <Link 
                  key={social.label}
                  href="#" 
                  className="text-gray-400 hover:text-white transform hover:scale-110 
                           transition-all duration-300 ease-in-out"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white">
              Quick Links
            </h4>
            <ul className="space-y-4">
              {['Home', 'Tutorials', 'Practice', 'About'].map((item) => (
                <li key={item}>
                  <Link 
                    href={`#${item.toLowerCase()}`} 
                    className="group flex items-center text-gray-400 hover:text-white 
                             transition-colors duration-300"
                  >
                    <span className="relative overflow-hidden">
                      <span className="flex items-center gap-2">
                        <span className="h-px w-4 bg-gray-700 group-hover:w-6 group-hover:bg-blue-400 
                                     transition-all duration-300 ease-out"></span>
                        {item}
                      </span>
                      <span className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r 
                                   from-blue-400 to-indigo-400 transform scale-x-0 group-hover:scale-x-100 
                                   transition-transform duration-300 ease-out"></span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

         
         
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-800/60">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} SilentWords. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                <Link 
                  key={item}
                  href="#" 
                  className="text-gray-400 hover:text-white text-sm transition-colors duration-300
                           relative group"
                >
                  <span>{item}</span>
                  <span className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r 
                               from-blue-400 to-indigo-400 transform scale-x-0 group-hover:scale-x-100 
                               transition-transform duration-300 ease-out"></span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

