import OTP from '@/components/OTP';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Verify Email - SilentWord',
  description: 'Verify your email address',
};

export default function OTPVerificationPage() {
  return <OTP />;
}
