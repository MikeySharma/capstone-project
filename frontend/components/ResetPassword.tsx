'use client';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { AuthCard } from './shared/AuthCard';
import Image from 'next/image';
import { authService } from '@/services/authService';

export default function ResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const urlOtp = searchParams.get('code') || '';

  const [formData, setFormData] = useState({
    code: urlOtp,
    newPassword: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    if (!formData.code) {
      toast.error('Please enter the verification code');
      return;
    }

    setLoading(true);

    try {
      await authService.resetPassword(email, formData.code, formData.newPassword);
      toast.success('Password has been reset successfully');
      router.push('/login');
    } catch (error: any) {
      toast.error(error.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard rightSide={false}>
      <div className="w-full max-w-sm mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
          Reset Password
        </h1>
        <p className="text-gray-600 text-base sm:text-lg mb-8">
          Enter the verification code sent to your email and create a new password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
              Verification Code
            </label>
            <input
              id="code"
              type="text"
              required
              className="w-full px-4 py-3 rounded-lg text-gray-900 border border-gray-200 
                focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 
                transition-all duration-200 text-base"
              placeholder="Enter verification code"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              id="newPassword"
              type="password"
              required
              className="w-full px-4 py-3 rounded-lg text-gray-900 border border-gray-200 
                focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 
                transition-all duration-200 text-base"
              placeholder="Enter new password"
              value={formData.newPassword}
              onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
            />
          </div>

          <div className="relative">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm New Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              required
              className="w-full px-4 py-3 rounded-lg text-gray-900 border border-gray-200 
                focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 
                transition-all duration-200 text-base"
              placeholder="Confirm new password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold
              hover:bg-indigo-700 transition duration-300 text-base
              disabled:bg-indigo-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Resetting Password...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </AuthCard>
  );
} 