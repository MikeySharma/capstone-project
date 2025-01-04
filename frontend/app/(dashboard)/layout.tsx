'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();

    useEffect(() => {
        const token = Cookies.get('token');
        if (!token) {
            router.push('/login');
            return;
        }
    }, [router]);

    return (
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {/* <Header /> */}
            {children}
        </main>
    );
};

export default DashboardLayout;
