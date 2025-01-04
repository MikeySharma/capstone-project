'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { AuthCard } from './shared/AuthCard';
import { authService } from '@/services/authService';

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setLoading(true);

    try {
      await authService.forgotPassword(email);
      toast.success('Password reset instructions have been sent to your email');
      // Redirect to OTP verification page with email parameter
      router.push(`/reset-password?email=${encodeURIComponent(email)}`);
    } catch (error: any) {
      toast.error(error.message || 'Failed to process request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard rightSide={false}>
      <div className="w-full max-w-sm mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
          Forgot Password?
        </h1>
        <p className="text-gray-600 text-base sm:text-lg mb-8">
          Enter your email address and we'll send you instructions to reset your password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="email"
              required
              className="w-full px-3 py-2 rounded-lg text-black border border-gray-200 
                     focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold 
                   hover:bg-indigo-700 transition duration-300 disabled:bg-indigo-400"
          >
            {loading ? 'Sending...' : 'Reset Password'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link 
            href="/login" 
            className="text-indigo-600 hover:text-indigo-500 font-medium text-base"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </AuthCard>
  );
} 