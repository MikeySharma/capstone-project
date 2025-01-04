'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authService } from '@/services/authService';
import { toast } from 'react-toastify';
import { AuthCard } from './shared/AuthCard';
import Image from 'next/image';

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: ''
  });
  const [loading, setLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    password: false,
    confirmPassword: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    setLoading(true);

    try {
      await authService.register(formData);
      toast.success('Registration successful! Please verify your email.');
      router.push(`/verify-email?email=${formData.email}`);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard>
      <div className="w-full max-w-sm mx-auto ">
        <h1 className="text-2xl sm:text-3xl font-bold text-black mb-2">Register</h1>
        <p className="text-gray-600 text-sm sm:text-base mb-6">Create your account to get started</p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <input
              type="text"
              required
              className="w-full px-3 py-2 rounded-lg text-black border border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            />
          </div>

          <div>
            <input
              type="email"
              required
              className="w-full px-3 py-2 rounded-lg text-black border border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm"
              placeholder="Email address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="relative">
            <input
              type={showPasswords.password ? "text" : "password"}
              required
              className="w-full px-3 py-2 rounded-lg text-black border border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowPasswords({ ...showPasswords, password: !showPasswords.password })}
            >
              <Image src={showPasswords.password ? "/icons/HidePassword.png" : "/icons/showPassword.png"} 
                     alt={showPasswords.password ? "Hide Password" : "Show Password"} 
                     width={16} 
                     height={16} />
            </button>
          </div>

          <div className="relative">
            <input
              type={showPasswords.confirmPassword ? "text" : "password"}
              required
              className="w-full px-3 py-2 rounded-lg text-black border border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowPasswords({ ...showPasswords, confirmPassword: !showPasswords.confirmPassword })}
            >
              <Image src={showPasswords.confirmPassword ? "/icons/HidePassword.png" : "/icons/showPassword.png"} 
                     alt={showPasswords.confirmPassword ? "Hide Password" : "Show Password"} 
                     width={16} 
                     height={16} />
            </button>
          </div>

          <div>
            <input
              type="tel"
              className="w-full px-3 py-2 rounded-lg text-black border border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm"
              placeholder="Phone Number (optional)"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300 text-sm"
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center mt-4 text-gray-600 text-sm">
          Already have an account?{' '}
          <Link href="/login" className="text-indigo-600 font-semibold hover:text-indigo-500">
            Login
          </Link>
        </p>
      </div>
    </AuthCard>
  );
}
