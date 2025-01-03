import type { Metadata } from "next";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import 'react-toastify/dist/ReactToastify.css';


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
    <>
      <Header />
      {children}
      <Footer />
    </>

  );
}
