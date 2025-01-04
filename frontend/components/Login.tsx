'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authService } from '@/services/authService';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie'
import { AuthCard } from './shared/AuthCard';
import Image from 'next/image';

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await authService.login(formData);
      
      if (response && response.token) {
        Cookies.set('token', response.token, { 
          secure: true, 
          sameSite: 'strict',
          expires: 7 // Set cookie to expire in 7 days
        });

        if (response.name && response.email) {
          Cookies.set('user', JSON.stringify({
            name: response.name,
            email: response.email
          }), { 
            secure: true, 
            sameSite: 'strict',
            expires: 7
          });
        }

        toast.success('Login successful!');
        router.push('/dashboard');
      } else {
        throw new Error('Invalid login response');
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard rightSide={false}>
      <div className="w-full max-w-sm mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-black mb-2">Welcome Back</h1>
        <p className="text-gray-600 text-sm sm:text-base mb-6">Sign in to continue your learning journey</p>
        
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <input
              type="email"
              required
              className="w-full px-3 py-2 rounded-lg text-black border border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm"
              placeholder="Email address"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              required
              className="w-full px-3 py-2 rounded-lg text-black border border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
            >
              <Image 
                src={showPassword ? "/icons/HidePassword.png" : "/icons/showPassword.png"} 
                alt={showPassword ? "Hide Password" : "Show Password"} 
                width={16} 
                height={16} 
              />
            </button>
          </div>

          <div className="flex justify-end">
            <Link 
              href="/forgot-password" 
              className="text-indigo-600 hover:text-indigo-500 text-xs sm:text-sm"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300 text-sm"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <p className="text-center mt-4 text-gray-600 text-sm">
          New to SilentWords?{' '}
          <Link 
            href="/register" 
            className="text-indigo-600 font-semibold hover:text-indigo-500"
          >
            Create an account
          </Link>
        </p>
      </div>
    </AuthCard>
  );
}
