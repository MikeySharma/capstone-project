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
        <div className="space-y-6 min-h-screen p-4 bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* Search Section */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-white/20">
                <div className="relative w-full sm:max-w-md">
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search words..."
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/90"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="w-full sm:w-auto">
                    <Link href="/dashboard/practice-video" className="block">  
                        <button className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2.5 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg">
                            Live translator
                        </button>  
                    </Link>
                </div>
            </div>

            {/* Words List and Details */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Words Column */}
                <div className="lg:col-span-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg border border-white/20 p-4">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Words</h2>
                    <div className="max-h-[40vh] lg:max-h-[60vh] overflow-y-auto rounded-lg bg-white/50">
                        {filteredData.map((item, index) => (
                            <div
                                key={index}
                                className={`p-3 cursor-pointer transition-all duration-200 border-b last:border-b-0 ${
                                    selectedWord?.word === item
                                        ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-600 shadow-sm'
                                        : 'hover:bg-blue-50/50'
                                }`}
                                onClick={() => fetchSingleWord(item)}
                            >
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Word Details Column */}
                <div className="lg:col-span-8 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg border border-white/20 p-6">
                    {selectedWord ? (
                        <div className="space-y-6">
                            <div className="flex justify-between items-center pb-4 border-b">
                                <h2 className="text-2xl font-semibold break-words bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    {selectedWord.word}
                                </h2>
                                <button
                                    onClick={() => {
                                        const utterance = new SpeechSynthesisUtterance(selectedWord.word);
                                        window.speechSynthesis.speak(utterance);
                                    }}
                                    className="p-2.5 rounded-full hover:bg-blue-50 transition-colors duration-200 flex-shrink-0"
                                    title="Listen to pronunciation"
                                >
                                    🔊
                                </button>
                            </div>
                            <div className="bg-blue-50/50 rounded-lg p-4">
                                <p className="text-gray-700 leading-relaxed">
                                    <strong className="text-blue-700">Description:</strong> {selectedWord.description}
                                </p>
                            </div>
                            <div className="space-y-3">
                                <strong className="text-blue-700 block">Hand Sign Demonstration:</strong>
                                {isVideoLoading && selectedWord && <Loader />}
                                <div className="rounded-lg overflow-hidden shadow-lg">
                                    <video
                                        src={`https://semicolon.tryasp.net/videos/${selectedWord.videoName}`}
                                        loop
                                        muted
                                        autoPlay
                                        className={`mt-2 w-full rounded-lg ${isVideoLoading ? 'hidden' : ''}`}
                                        onLoadStart={() => setIsVideoLoading(true)}
                                        onLoadedData={() => setIsVideoLoading(false)}
                                    />
                                </div>
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
