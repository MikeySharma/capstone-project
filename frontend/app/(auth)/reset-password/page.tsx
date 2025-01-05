'use client'
import dynamic from 'next/dynamic';

const DynamicOTP = dynamic(() => import('@/components/ResetPassword'), { ssr: false });

export default function ResetPasswordPage() {
  return <DynamicOTP />;
}
