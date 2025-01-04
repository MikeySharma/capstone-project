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
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold flex items-center  gap-4 text-blue-600">
        <Image src="/logo.png" alt='logo' width={40} height={40} />
        SilentWord</Link>
        <div className="space-x-4">
          <Link href="#tutorials" className="text-gray-600 hover:text-blue-600">Tutorials</Link>
          <Link href="#practice" className="text-gray-600 hover:text-blue-600">Practice</Link>
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
      </nav>
    </header>
  )
}

