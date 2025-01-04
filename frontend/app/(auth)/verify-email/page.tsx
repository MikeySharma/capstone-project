'use client'
import dynamic from 'next/dynamic';

const DynamicOTP = dynamic(() => import('@/components/OTP'), { ssr: false });

export default function OTPVerificationPage() {
  return <DynamicOTP />;
}
