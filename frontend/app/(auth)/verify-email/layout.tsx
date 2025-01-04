import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Verify Email - SilentWord',
  description: 'Verify your email address',
};

export default function VerifyEmailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 