'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/authService';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie'
import { AuthCard } from './shared/AuthCard';

export default function OTP() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    otp: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await authService.verifyOtp(formData.email, formData.otp);
      
      Cookies.set('token', response.token, { secure: true, sameSite: 'strict' });
      Cookies.set('user', JSON.stringify({
        name: response.name,
        email: response.email
      }), { secure: true, sameSite: 'strict' });

      toast.success('Email verified successfully!');
      router.push('/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard>
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-2">Verify Your Email</h1>
        <p className="text-gray-600 mb-8">
          We've sent a verification code to your email address
        </p>
        
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
          
          <div>
            <input
              type="text"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              placeholder="Enter verification code"
              value={formData.otp}
              onChange={(e) => setFormData({...formData, otp: e.target.value})}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300"
          >
            {loading ? 'Verifying...' : 'Verify Email'}
          </button>
        </form>
      </div>
    </AuthCard>
  );
}
