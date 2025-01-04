import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SilentWord",
  description: "SilentWords is an empowering web platform designed to facilitate communication for the deaf and hard-of-hearing community. The platform offers an interactive environment to learn and understand sign language through animated hand signs, helping users connect through silent gestures. With real-time detection and animation of signs, SilentWords makes learning sign language both intuitive and engaging. Whether you're a beginner eager to explore this vital language or someone looking to improve their skills, SilentWords provides a comprehensive and user-friendly solution to enhance communication through the power of silence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        
      <link rel="icon" href="/logo.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-black`}
      >
        <Header />
        {children}
        <ToastContainer position="top-right" autoClose={5000} />
        <Footer />
      </body>
    </html>
  );
}
