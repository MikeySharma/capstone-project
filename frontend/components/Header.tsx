"use client"
import { deleteCookie } from '@/app/utils/cookieHandle'
import { isLoggedIn } from '@/services/authService'
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

  useEffect(()=>{
    (async()=>{
      const isUserLoggedIn =  await isLoggedIn();
      setIsUser(isUserLoggedIn);
    })()

  },[location])

  const handleLogout = () => {
    deleteCookie('token');
    deleteCookie('user');
    router.push('/login');
  }

  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold flex items-center gap-4 text-blue-600">
            <Image src="/logo.png" alt='logo' width={40} height={40} />
            SilentWord
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
            <Link href="#tutorials" className="text-gray-600 hover:text-blue-600">Tutorials</Link>
            <Link href="/about" className="text-gray-600 hover:text-blue-600">About</Link>
            {isUser ? (
              <>
                <Link href="/dashboard" className="text-gray-600 hover:text-blue-600">Dashboard</Link>
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

