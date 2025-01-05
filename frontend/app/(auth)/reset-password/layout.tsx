import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reset Password - SilentWords',
  description: 'Reset Password Page',
};

export default function VerifyEmailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 