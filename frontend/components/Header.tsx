"use client"
import { deleteCookie, getCookie } from '@/app/utils/cookieHandle'
import { isLoggedIn } from '@/services/authService'
import { userService } from '@/services/userService'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Menu, X } from 'lucide-react' // Import icons for menu

export default function Header() {
  const location = usePathname();
  const router = useRouter();

  const [isUser, setIsUser] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    (async () => {
      const token = getCookie('token');
      if (!token) return;
      const [isUserLoggedIn, user] = await Promise.all([
        isLoggedIn(token as string),
        userService.getProfile()
      ]);
      setUser(user);
      setIsUser(isUserLoggedIn);
    })()
  }, [location]);

  const handleLogout = () => {
    deleteCookie('token');
    deleteCookie('user');
    toast.success('Logout successful!');
    setIsUser(false);
    setUser(null);
    router.push('/login');
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
<>

    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-gradient-to-r from-blue-600/95 via-indigo-600/95 to-purple-600/95 backdrop-blur-sm shadow-lg'
          : 'bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500'
      }`}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-2 md:gap-4"
            onClick={closeMenu}
          >
            <Image 
              src="/logo.png" 
              alt='logo' 
              width={40} 
              height={40} 
              className="w-8 h-8 md:w-10 md:h-10 hover:scale-105 transition-transform" 
            />
            <span className='font-extrabold text-lg md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200 hover:from-blue-200 hover:to-white transition-all duration-300'>
              SilentWords
            </span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {/* <Link href="/" className="text-white hover:text-blue-100 transition-colors font-medium">
              Tutorials
            </Link> */}
            {/* <Link href="/about" className="text-white hover:text-blue-100 transition-colors font-medium">
              About
            </Link> */}
            {/* <Link href="/features" className="text-white hover:text-blue-100 transition-colors font-medium">
              Features
            </Link> */}
            {isUser ? (
              <div className="flex items-center space-x-4">
                <Link 
                  href="/dashboard" 
                  className="text-white hover:text-blue-100 transition-colors font-medium"
                >
                  Dashboard
                </Link>
                <div className="flex items-center gap-3">
                  <span className="text-white flex items-center gap-2 bg-green-500/80 px-3 py-1 rounded-full text-sm">
                  <Image src="/icons/profile.png" alt="user" width={20} height={20} />
                    {user && (user as any)?.fullName}
                  </span>
                  <button 
                    onClick={handleLogout}
                    className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors font-medium"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link 
                href="/login"
                className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors font-medium"
              >
                Login
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 bg-white/10 backdrop-blur-md rounded-lg p-4 space-y-3">
            <Link 
              href="/" 
              className="block text-white hover:bg-white/10 px-4 py-2 rounded-lg transition-colors"
              onClick={closeMenu}
            >
              Tutorials
            </Link>
            <Link 
              href="/about" 
              className="block text-white hover:bg-white/10 px-4 py-2 rounded-lg transition-colors"
              onClick={closeMenu}
            >
              About
            </Link>
            <Link 
              href="/features" 
              className="block text-white hover:bg-white/10 px-4 py-2 rounded-lg transition-colors"
              onClick={closeMenu}
            >
              Features
            </Link>
            {isUser ? (
              <>
                <Link 
                  href="/dashboard" 
                  className="block text-white hover:bg-white/10 px-4 py-2 rounded-lg transition-colors"
                  onClick={closeMenu}
                >
                  Dashboard
                </Link>
                <button 
                  onClick={() => {
                    handleLogout();
                    closeMenu();
                  }}
                  className="w-full text-left text-white hover:bg-white/10 px-4 py-2 rounded-lg transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link 
                href="/login" 
                className="block text-white hover:bg-white/10 px-4 py-2 rounded-lg transition-colors"
                onClick={closeMenu}
              >
                Login
              </Link>
            )}
          </div>
        )}
      </nav>
    </header>
</>

  );
}

