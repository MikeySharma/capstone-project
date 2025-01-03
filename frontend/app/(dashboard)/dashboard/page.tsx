"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { userService } from '@/services/userService'

interface UserData {
    fullName: string;
    email: string;
}

const Dashboard = () => {
    const [userData, setUserData] = useState<UserData | null>(null)
    const router = useRouter()

    useEffect(() => {
        const token = Cookies.get('token')
        if (!token) {
            router.push('/login')
            return
        }

        // Fetch user data from API
        const fetchUserData = async () => {
            try {
                const data = await userService.getProfile()
                setUserData(data)
            } catch (error) {
                console.error('Failed to fetch user data:', error)
                router.push('/login')
            }
        }

        fetchUserData()
    }, [router])

    return (
        <div className="p-8">
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6">
                <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
                {userData ? (
                    <div className="space-y-4">
                        <p className="text-gray-700">
                            <span className="font-semibold">Name:</span> {userData.fullName}
                        </p>
                        <p className="text-gray-700">
                            <span className="font-semibold">Email:</span> {userData.email}
                        </p>
                    </div>
                ) : (
                    <p>Loading user data...</p>
                )}
            </div>
        </div>
    )
}

export default Dashboard
