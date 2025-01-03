import Register from '@/components/Register';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Register - SilentWord',
  description: 'Create your SilentWord account',
};

export default function RegisterPage() {
  return <Register />;
}
