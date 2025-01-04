import Link from 'next/link'
import { FiFacebook, FiTwitter, FiInstagram, FiGithub, FiLinkedin, FiArrowRight } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white overflow-hidden">
      {/* Enhanced Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-indigo-500/5 to-purple-500/5"></div>
      
      {/* Improved Blur Effects */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full filter blur-[150px] animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full filter blur-[150px] animate-pulse"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/5 rounded-full filter blur-[150px]"></div>

      {/* Main Footer Content */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="space-y-6 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 
                           bg-clip-text text-transparent drop-shadow-sm">
                SilentWords
              </h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Learn Sign Language, Connect Without Barriers. Join our community and make communication accessible for everyone.
            </p>
            {/* Enhanced Social Links */}
            <div className="flex gap-5 pt-2">
              {[
                { icon: FiFacebook, label: 'Facebook', color: 'hover:text-blue-400' },
                { icon: FiTwitter, label: 'Twitter', color: 'hover:text-sky-400' },
                { icon: FiInstagram, label: 'Instagram', color: 'hover:text-pink-400' },
                { icon: FiLinkedin, label: 'LinkedIn', color: 'hover:text-blue-500' },
                { icon: FiGithub, label: 'GitHub', color: 'hover:text-purple-400' }
              ].map((social) => (
                <Link 
                  key={social.label}
                  href="#" 
                  className={`text-gray-400 ${social.color} transform hover:scale-110 
                           transition-all duration-300 ease-in-out hover:shadow-lg`}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links - Enhanced */}
          <div className="space-y-6 backdrop-blur-sm">
            <h4 className="text-lg font-semibold text-white inline-flex items-center gap-2">
              Quick Links
              <span className="h-px w-8 bg-gradient-to-r from-blue-400 to-indigo-400"></span>
            </h4>
            <ul className="space-y-4">
              {['Home',  'About'].map((item) => (
                <li key={item}>
                  <Link 
                    href={`/${item.toLowerCase()}`} 
                    className="group flex items-center text-gray-400 hover:text-white 
                             transition-all duration-300"
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

          {/* Newsletter - Enhanced */}
          <div className="space-y-6 backdrop-blur-sm">
            <h4 className="text-lg font-semibold text-white inline-flex items-center gap-2">
              Stay Updated
              <span className="h-px w-8 bg-gradient-to-r from-blue-400 to-indigo-400"></span>
            </h4>
            <p className="text-gray-400 text-sm">
              Subscribe to our newsletter for the latest updates.
            </p>
            <form className="space-y-3">
              <div className="relative group">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full px-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 
                           rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/40 
                           focus:border-blue-500/40 text-gray-300 placeholder-gray-500
                           transition-all duration-300 group-hover:border-gray-600"
                />
                <button 
                  type="submit" 
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 
                           bg-gradient-to-r from-blue-500 to-indigo-500 text-white 
                           rounded-md hover:from-blue-600 hover:to-indigo-600 
                           transition-all duration-300 text-sm font-medium
                           flex items-center gap-2 group-hover:gap-3 shadow-lg"
                >
                  Subscribe
                  <FiArrowRight className="w-4 h-4 animate-pulse" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Bar - Enhanced */}
        <div className="mt-16 pt-8 border-t border-gray-800/40 backdrop-blur-sm">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} SilentWords. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                <Link 
                  key={item}
                  href="#" 
                  className="text-gray-400 hover:text-white text-sm transition-all duration-300
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

