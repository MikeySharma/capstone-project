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
        <div className="space-y-6 min-h-screen p-4 ">
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
                    <Link href="/live-translator" className="w-full block sm:w-auto bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2.5 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg">
                        Live translator
                    </Link>
                </div>
            </div>

            {/* Words List and Details */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Words Column */}
                <div className="lg:col-span-4 bg-white/90 backdrop-blur-md rounded-xl shadow-xl border border-white/30 p-6">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-3">
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">Words</span>
                        <div className="flex-1 h-[1px] bg-gradient-to-r from-blue-200 to-purple-200"></div>
                    </h2>
                    <div className="max-h-[40vh] lg:max-h-[90vh] overflow-y-auto rounded-xl bg-white/70 shadow-inner">
                        {filteredData.map((item, index) => (
                            <div
                                key={index}
                                className={`p-4 cursor-pointer transition-all duration-300 border-b border-gray-100 last:border-b-0 flex items-center gap-3 group ${
                                    selectedWord?.word === item
                                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
                                        : 'hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50'
                                }`}
                                onClick={() => fetchSingleWord(item)}
                            >
                                <span className={`text-lg ${
                                    selectedWord?.word === item 
                                        ? 'text-white'
                                        : 'text-gray-700 group-hover:text-blue-600'
                                }`}>{item}</span>
                                <div className={`ml-auto opacity-0 group-hover:opacity-100 transition-opacity ${
                                    selectedWord?.word === item ? 'opacity-100' : ''
                                }`}>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Word Details Column */}
                <div className="lg:col-span-8 bg-white/80 backdrop-blur-sm rounded-xl shadow-2xl border border-white/20 overflow-hidden">
                    {selectedWord ? (
                        <div>
                            {/* Header Section */}
                            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-3xl font-bold text-white">
                                        {selectedWord.word}
                                    </h2>
                                    <button
                                        onClick={() => {
                                            const utterance = new SpeechSynthesisUtterance(selectedWord.word);
                                            window.speechSynthesis.speak(utterance);
                                        }}
                                        className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-200 flex-shrink-0 text-white"
                                        title="Listen to pronunciation"
                                    >
                                        🔊
                                    </button>
                                </div>
                            </div>

                            <div className="p-6 space-y-8">
                                {/* Description Card */}
                                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 shadow-md">
                                    <h3 className="text-lg font-semibold text-blue-800 mb-3">Description</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        {selectedWord.description}
                                    </p>
                                </div>

                                {/* Video Section */}
                                <div>
                                    <h3 className="text-lg font-semibold text-blue-800 mb-4">Hand Sign Demonstration</h3>
                                    {isVideoLoading && selectedWord && (
                                        <div className="flex justify-center p-8">
                                            <Loader />
                                        </div>
                                    )}
                                    <div className="rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-blue-100 to-purple-100 p-1">
                                        <video
                                            src={`https://semicolon.tryasp.net/videos/${selectedWord.videoName}`}
                                            loop
                                            muted
                                            autoPlay
                                            className={`w-full rounded-lg ${isVideoLoading ? 'hidden' : ''}`}
                                            onLoadStart={() => setIsVideoLoading(true)}
                                            onLoadedData={() => setIsVideoLoading(false)}
                                            style={{ aspectRatio: '16/9' }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-96">
                            <div className="text-center">
                                <Loader />
                                <p className="mt-4 text-gray-500">Loading word details...</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
