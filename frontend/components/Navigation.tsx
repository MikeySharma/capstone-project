'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/authService';
import { Menu, X, User, LogOut, Settings } from 'lucide-react';
import Image from 'next/image';

export default function Navigation() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = () => {
    authService.logout();
    router.push('/login');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/dashboard" className="flex items-center">
              <Image src="/logo.png" alt="Logo" width={40} height={40} />
              <span className="ml-2 text-xl font-bold text-gray-800">SilentWord</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md">
              Dashboard
            </Link>
            <Link href="/practice" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md">
              Practice
            </Link>
            <Link href="/tutorials" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md">
              Tutorials
            </Link>
            
            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <User className="h-6 w-6" />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                  <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Profile Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/dashboard" className="block text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md">
              Dashboard
            </Link>
            <Link href="/practice" className="block text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md">
              Practice
            </Link>
            <Link href="/tutorials" className="block text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md">
              Tutorials
            </Link>
            <Link href="/profile" className="block text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md">
              Profile Settings
            </Link>
            <button
              onClick={handleLogout}
              className="block w-full text-left text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md"
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </nav>
  );
} 