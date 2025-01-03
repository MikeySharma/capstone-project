import Login from '@/components/Login';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login - SilentWord',
  description: 'Sign in to your SilentWord account',
};

export default function LoginPage() {
  return <Login />;
}
