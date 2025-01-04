"use client";

import { useEffect, useState } from "react";
import { FiSearch, FiEye, FiLock, FiCheck } from 'react-icons/fi';
import { getCookie } from '@/app/utils/cookieHandle';
import { useRouter } from 'next/navigation';
import Loader from "../Loader";
import Link from "next/link";
import { toast } from 'react-toastify';
import { API_BASE_URL } from '@/config';

interface WordProgress {
    currentWord: string;
    completedWords: string[];
}

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
    const [wordProgress, setWordProgress] = useState<WordProgress | null>(null);
    const [isCourseStarted, setIsCourseStarted] = useState(false);
    const [isVideoLoading, setIsVideoLoading] = useState(false);

    useEffect(() => {
        const initializeData = async () => {
            await fetchWords();
            await fetchProgress();
        };

        initializeData();
    }, []);

    const fetchProgress = async () => {
        try {
            const token = getCookie('token');
            if (!token) { 
                router.push('/login');
                return;
            }

            const response = await fetch(`${API_BASE_URL}/api/SignLearn/progress`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                setWordProgress(data);
                setIsCourseStarted(!!data.currentWord);
                if (data.currentWord) {
                    await fetchSingleWord(data.currentWord);
                }
            }
        } catch (error) {
            console.error("Error fetching progress:", error);
        }
    };

    const startCourse = async () => {
        try {
            const token = getCookie('token');
            if (!token) {
                router.push('/login');
                return;
            }

            const response = await fetch(`${API_BASE_URL}/api/SignLearn/start`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                await fetchProgress();
                toast.success("Course started successfully!");
            } else {
                const error = await response.text();
                toast.error(error || "Failed to start course");
            }
        } catch (error) {
            console.error("Error starting course:", error);
            toast.error("Failed to start course");
        }
    };

    const completeWord = async (word: string) => {
        try {
            const token = getCookie('token');
            if (!token) {
                router.push('/login');
                return;
            }

            const response = await fetch(`${API_BASE_URL}/api/SignLearn/complete`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ word })
            });

            if (response.ok) {
                const data = await response.json();
                await fetchProgress();
                toast.success("Word completed successfully!");
                
                if (data.isCompleted) {
                    toast.success("Congratulations! You've completed all words!");
                } else if (data.nextWord) {
                    await fetchSingleWord(data.nextWord);
                }
            } else {
                const error = await response.text();
                toast.error(error || "Failed to complete word");
            }
        } catch (error) {
            console.error("Error completing word:", error);
            toast.error("Failed to complete word");
        }
    };

    const fetchWords = async () => {
        try {
            const token = getCookie('token');
            if (!token) {
                router.push('/login');
                return;
            }

            const response = await fetch(`${API_BASE_URL}/api/SignLearn/words`, {
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

            // Only fetch first word if it's the current word or completed
            if (wordsArray.length > 0 && wordProgress) {
                const firstWord = wordsArray[0];
                if (wordProgress.currentWord === firstWord || 
                    wordProgress.completedWords.includes(firstWord)) {
                    await fetchSingleWord(firstWord);
                }
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

            const response = await fetch(`${API_BASE_URL}/api/SignLearn/${word}`, {
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
        <div className="space-y-8 min-h-screen p-6 lg:p-8 ">
            {/* Search and Live Translator Section */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-6 bg-white/95 backdrop-blur-lg p-6 lg:p-8 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.06)] border border-white/50">
                <div className="relative w-full sm:max-w-md">
                    <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search words..."
                        className="w-full pl-12 pr-4 py-4 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 
                                 bg-white/80 text-gray-700 transition-all duration-300 placeholder:text-gray-400"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Link 
                    href="/live-translator" 
                    className="w-full sm:w-auto bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-8 py-4 rounded-xl 
                             hover:from-indigo-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl 
                             transform hover:-translate-y-1 font-semibold text-center border border-white/20"
                >
                    Live Translator
                </Link>
            </div>
            
            {/* Words List and Details Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column: Progress + Words List */}
                <div className="lg:col-span-4 space-y-8">
                    {/* Course Progress Section - Only shown when course is started */}
                    {isCourseStarted ? (
                        <div className="bg-white/95 backdrop-blur-lg p-6 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.06)] border border-white/50">
                            <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent mb-4">
                                Course Progress
                            </h2>
                            <div className="space-y-4">
                                <p className="text-gray-600 text-lg">
                                    <span className="font-semibold text-indigo-600">{wordProgress?.completedWords.length}</span> of{' '}
                                    <span className="font-semibold text-indigo-600">{courseData.length}</span> words completed
                                </p>
                                <div className="w-full h-3 bg-gray-50 rounded-full overflow-hidden border border-gray-100">
                                    <div 
                                        className="h-full bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full transition-all duration-500"
                                        style={{ 
                                            width: `${((wordProgress?.completedWords.length || 0) / courseData.length) * 100}%` 
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white/95 backdrop-blur-lg p-6 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.06)] border border-white/50">
                            <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent mb-4">
                                Start Learning
                            </h2>
                            <p className="text-gray-600 mb-6">Begin your sign language journey today!</p>
                            <button
                                onClick={startCourse}
                                className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-6 py-3 rounded-xl
                                         hover:from-indigo-600 hover:to-blue-600 transition-all duration-300 shadow-lg 
                                         hover:shadow-xl transform hover:-translate-y-1 font-semibold
                                         border border-white/20"
                            >
                                Start Course
                            </button>
                        </div>
                    )}

                    {/* Words List */}
                    <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.06)] border border-white/50 p-6">
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent mb-6 pb-4
                                     border-b border-gray-100">
                            Words List
                        </h2>
                        <div className="max-h-[60vh] overflow-y-auto rounded-xl bg-gray-50/50 space-y-2 p-2">
                            {filteredData.map((item, index) => {
                                const isCompleted = wordProgress?.completedWords.includes(item);
                                const isCurrent = wordProgress?.currentWord === item;
                                const isLocked = !isCompleted && !isCurrent;
                                
                                return (
                                    <div
                                        key={index}
                                        className={`p-4 transition-all duration-300 border-b last:border-b-0 
                                            flex justify-between items-center group rounded-xl
                                            ${isLocked ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}
                                            ${selectedWord?.word === item
                                                ? 'bg-gradient-to-r from-indigo-50 to-blue-50 text-indigo-600 shadow-md border border-indigo-100/50'
                                                : 'hover:bg-white hover:shadow-sm border border-transparent'
                                            }`}
                                        onClick={() => !isLocked && fetchSingleWord(item)}
                                    >
                                        <span className="font-medium">{item}</span>
                                        <div className="flex items-center gap-3">
                                            {isCompleted ? (
                                                <FiCheck className="text-green-500 w-5 h-5" />
                                            ) : isCurrent ? (
                                                <FiEye className="text-blue-500 w-5 h-5" />
                                            ) : (
                                                <FiLock className="text-gray-400 w-5 h-5" />
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Word Details - Right Column */}
                <div className="lg:col-span-8 bg-white/95 backdrop-blur-lg rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.06)] border border-white/50 p-8">
                    {selectedWord ? (
                        <div className="space-y-8">
                            <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                                <h2 className="text-4xl font-bold break-words bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                                    {selectedWord.word}
                                </h2>
                                {wordProgress?.currentWord === selectedWord.word && (
                                    <button
                                        onClick={() => completeWord(selectedWord.word)}
                                        className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-8 py-4 
                                                 rounded-xl hover:from-emerald-600 hover:to-green-600 
                                                 transition-all duration-300 shadow-lg hover:shadow-xl 
                                                 transform hover:-translate-y-1 flex items-center gap-3 font-semibold
                                                 border border-white/20"
                                    >
                                        <FiCheck className="w-5 h-5" />
                                        Mark Complete
                                    </button>
                                )}
                            </div>
                            <div className="bg-gradient-to-br from-gray-50 to-indigo-50/30 rounded-xl p-8 shadow-inner border border-white">
                                <p className="text-gray-700 leading-relaxed text-lg">
                                    <strong className="text-indigo-700">Description:</strong> {selectedWord.description}
                                </p>
                            </div>
                            <div className="space-y-4">
                                <strong className="text-indigo-700 text-lg block">Hand Sign Demonstration:</strong>
                                {isVideoLoading && <Loader />}
                                <div className="rounded-xl overflow-hidden shadow-xl border border-gray-100">
                                    <video
                                        src={`${API_BASE_URL}/videos/${selectedWord.videoName}`}
                                        loop
                                        muted
                                        autoPlay
                                        controls
                                        className={`w-full rounded-xl ${isVideoLoading ? 'hidden' : ''}`}
                                        onLoadStart={() => setIsVideoLoading(true)}
                                        onLoadedData={() => setIsVideoLoading(false)}
                                    />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center text-gray-500 py-20">
                            <p className="text-xl">Select a word to view its details and demonstration</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
