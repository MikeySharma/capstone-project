"use client"
import { deleteCookie, getCookie } from '@/app/utils/cookieHandle'
import { isLoggedIn } from '@/services/authService'
import { userService } from '@/services/userService'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
// import { useState } from 'react'

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
      if(!token) return;
      const [isUserLoggedIn, user] = await Promise.all([
        isLoggedIn(token as string),
        userService.getProfile()
      ]);
      setUser(user);
      setIsUser(isUserLoggedIn);
    })()

  }, [location])

  const handleLogout = () => {
    deleteCookie('token');
    deleteCookie('user');
    router.push('/login');
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-sm shadow-md' : 'bg-white'
      }`}>
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold flex items-center gap-4 text-blue-600">
            <Image src="/logo.png" alt='logo' width={40} height={40} />
            SilentWords
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Desktop Menu */}
          <div className="hidden lg:flex space-x-4 items-center">
            <Link href="/" className="text-gray-600 hover:text-blue-600">Tutorials</Link>
            <Link href="/about" className="text-gray-600 hover:text-blue-600">About</Link>
            <Link href="/features" className="text-gray-600 hover:text-blue-600">Features</Link>
            {isUser ? (
              <>
                <Link href="/dashboard" className="text-gray-600 hover:text-blue-600">Dashboard</Link>
                <Link href="#" className="text-gray-600 bg-green-500 text-md rounded-full py-2 px-3 hover:text-blue-600">{user && (user as any)?.fullName[0]}</Link>
                <button onClick={handleLogout} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Logout</button>
              </>
            ) : (
              <Link href="/login" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Login</Link>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden ${isMenuOpen ? 'block' : 'hidden'} mt-4 space-y-2`}>
          <Link href="#tutorials" className="block text-gray-600 hover:text-blue-600 py-2">Tutorials</Link>
          <Link href="#practice" className="block text-gray-600 hover:text-blue-600 py-2">Practice</Link>
          <Link href="/about" className="block text-gray-600 hover:text-blue-600 py-2">About</Link>
          {isUser ? (
            <>
              <Link href="/dashboard" className="block text-gray-600 hover:text-blue-600 py-2">Dashboard</Link>
              <button onClick={handleLogout} className="block w-full text-left bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Logout</button>
            </>
          ) : (
            <Link href="/login" className="block w-full text-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Login</Link>
          )}
        </div>
      </nav>
    </header>
  )
}

