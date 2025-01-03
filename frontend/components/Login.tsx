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
      
      Cookies.set('token', response.token, { secure: true, sameSite: 'strict' });
      Cookies.set('user', JSON.stringify({
        name: response.name,
        email: response.email
      }), { secure: true, sameSite: 'strict' });
      toast.success('Login successful!');
      router.push('/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard rightSide={false}>
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
        <p className="text-gray-600 mb-8">Sign in to continue your learning journey</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              placeholder="Email address"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <Image src="/icons/HidePassword.png" alt="Hide Password" width={20} height={20} />
              ) : (
                <Image src="/icons/showPassword.png" alt="Show Password" width={20} height={20} />
              )}
            </button>
          </div>

          <div className="flex justify-end">
            <Link href="/forgot-password" className="text-indigo-600 hover:text-indigo-500 text-sm">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          New to SilentWords?{' '}
          <Link href="/register" className="text-indigo-600 font-semibold hover:text-indigo-500">
            Create an account
          </Link>
        </p>
      </div>
    </AuthCard>
  );
}
