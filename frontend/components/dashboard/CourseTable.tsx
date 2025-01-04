"use client";

import { useEffect, useState } from "react";
import { FiSearch } from 'react-icons/fi';
import { getCookie } from '@/app/utils/cookieHandle';
import { useRouter } from 'next/navigation';
import Loader from "../Loader";
import Link from "next/link";

interface WordData {
    word: string;
    description: string;
    videoName: string;
}

export default function CoursesTable() {
    const router = useRouter();
    const [courseData, setCourseData] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedWord, setSelectedWord] = useState<WordData | null>(null);
    const [isVideoLoading, setIsVideoLoading] = useState(true);

    useEffect(() => {
        const initializeData = async () => {
            await fetchWords();
            // If we have words in courseData, fetch details for the first word
            if (courseData.length > 0) {
                await fetchSingleWord(courseData[0]);
            }
        };
        
        initializeData();
    }, []);

    const fetchWords = async () => {
        try {
            const token = getCookie('token');
            if (!token) {
                router.push('/login');
                return;
            }

            const response = await fetch("https://semicolon.tryasp.net/api/SignLearn/words", {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            
            if (!response.ok) {
                if (response.status === 401) {
                    router.push('/login');
                    return;
                }
                throw new Error("Failed to fetch words");
            }

            const data = await response.json();
            const wordsArray = Array.isArray(data) ? data : [];
            setCourseData(wordsArray);
            
            // If we have words, fetch the first word's details
            if (wordsArray.length > 0) {
                await fetchSingleWord(wordsArray[0]);
            }
        } catch (error) {
            console.error("Error fetching words:", error);
            setCourseData([]);
        } finally {
            setLoading(false);
        }
    };

    const filteredData = courseData?.filter(item =>
        item.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    const fetchSingleWord = async (word: string) => {
        try {
            const token = getCookie('token');
            if (!token) {
                router.push('/login');
                return;
            }
            setSelectedWord(null);

            const response = await fetch(`https://semicolon.tryasp.net/api/SignLearn/${word}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                if (response.status === 401) {
                    router.push('/login');
                    return;
                }
                throw new Error("Failed to fetch word details");
            }

            const data = await response.json();
            console.log(data);
            setSelectedWord(data);
            return data;
        } catch (error) {
            console.error("Error fetching word details:", error);
            return null;
        }
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="space-y-6 h-screen">
            {/* Search Section */}
            <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
                <div className="relative w-full max-w-md">
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search words..."
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div >
                    <Link href="/dashboard/practice-video">  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Live translator</button>  </Link>
                </div>
            </div>

            {/* Words List and Details */}
            <div className="grid grid-cols-12 gap-6">
                {/* Words Column */}
                <div className="col-span-4 bg-white rounded-lg shadow-sm p-4">
                    <h2 className="text-xl font-semibold mb-4">Words</h2>
                    <div className="max-h-[60vh] overflow-y-auto border rounded-lg">
                        {filteredData.map((item, index) => (
                            <div
                                key={index}
                                className={`p-3 cursor-pointer transition-colors border-b last:border-b-0 ${
                                    selectedWord?.word === item
                                        ? 'bg-blue-50 text-blue-600'
                                        : 'hover:bg-gray-50'
                                }`}
                                onClick={() => fetchSingleWord(item)}
                            >
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Word Details Column */}
                <div className="col-span-8 bg-white rounded-lg shadow-sm p-4">
                    {selectedWord ? (
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-semibold">{selectedWord.word}</h2>
                                <button
                                    onClick={() => {
                                        const utterance = new SpeechSynthesisUtterance(selectedWord.word);
                                        window.speechSynthesis.speak(utterance);
                                    }}
                                    className="p-2 rounded-full hover:bg-gray-100"
                                    title="Listen to pronunciation"
                                >
                                    🔊
                                </button>
                            </div>
                            <p className="text-gray-700">
                                <strong>Description:</strong> {selectedWord.description}
                            </p>
                            <div>
                                <strong>Hand Sign Demonstration:</strong>
                                {isVideoLoading && selectedWord && <Loader />}
                                <video
                                    src={`https://semicolon.tryasp.net/videos/${selectedWord.videoName}`}
                                    // controls
                                    loop
                                    muted
                                    autoPlay
                                    className={`mt-2 w-full max-w-md rounded-lg ${isVideoLoading ? 'hidden' : ''}`}
                                    onLoadStart={() => setIsVideoLoading(true)}
                                    onLoadedData={() => setIsVideoLoading(false)}
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="text-center text-gray-500 py-10">
                            Select a word to view details
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
