"use client";

import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const FRAME_INTERVAL = 100; // Increased frame rate for better detection

interface GestureData {
    gesture: string;
    confidence: number;
    status: string;
    error?: string;
    frame_count: number; // For collecting frames
}

export default function VideoStream() {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [socket, setSocket] = useState<Socket | null>(null);
    const [isCollecting, setIsCollecting] = useState<number>(0);
    const [gestureData, setGestureData] = useState<GestureData>({
        gesture: '',
        confidence: 0,
        status: '',
        frame_count: 0
    });
    const [error, setError] = useState<string | null>(null);
    const [isStreaming, setIsStreaming] = useState<boolean>(false);
    const [isSoundOn, setIsSoundOn] = useState<boolean>(true);

    const speak = (text: string) => {
        if (isSoundOn && text) {
            const utterance = new SpeechSynthesisUtterance(text);
            const voices = speechSynthesis.getVoices();
            console.log(voices)
            const femaleVoice = voices.find(voice => voice.name.includes('Microsoft Zira - English'));
            if (femaleVoice) {
                utterance.voice = femaleVoice;
            }
            speechSynthesis.speak(utterance);
        }
    };

    useEffect(() => {
        if (!isStreaming) return;

        const socketInstance = io('https://w60pz26x-5000.inc1.devtunnels.ms/');
        setSocket(socketInstance);

        socketInstance.on('connect', () => {
            console.log('Socket.IO Connected');
            setError(null);
        });

        socketInstance.on('gestureData', (data: GestureData) => {
            if (data.status === 'collecting') {
                setIsCollecting(data.frame_count);
            }
            console.log('Received gesture data:', data);
            if (data.status === 'success') {
                setGestureData({
                    gesture: data.gesture || '',
                    confidence: data.confidence || 0,
                    status: data.status || '',
                    frame_count: 0
                });
                speak(data.gesture); // Speak the predicted word
            }
        });

        socketInstance.on('connect_error', (err) => {
            console.error('Socket.IO connection error:', err);
            setError('Connection error. Please try again.');
        });

        socketInstance.on('disconnect', () => {
            console.log('Socket.IO disconnected');
            setError('Connection closed. Please Click on Play Button.');
        });

        navigator.mediaDevices.getUserMedia({
            video: {
                width: { ideal: 640 },
                height: { ideal: 480 },
                frameRate: { ideal: 30 }
            }
        })
            .then((stream) => {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            })
            .catch((err) => {
                console.error('Error accessing camera:', err);
                setError('Cannot access camera. Please check permissions.');
            });

        const sendFrame = () => {
            if (videoRef.current && socketInstance.connected) {
                try {
                    const canvas = document.createElement('canvas');
                    canvas.width = 640;
                    canvas.height = 480;
                    const ctx = canvas.getContext('2d');

                    if (ctx && videoRef.current) {
                        // Flip the video horizontally for mirror effect
                        ctx.translate(canvas.width, 0);
                        ctx.scale(-1, 1);

                        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

                        // Convert to blob with better quality
                        canvas.toBlob((blob) => {
                            if (blob) {
                                const reader = new FileReader();
                                reader.onload = () => {
                                    if (reader.result instanceof ArrayBuffer) {
                                        socketInstance.emit('frame', reader.result);
                                    }
                                };
                                reader.readAsArrayBuffer(blob);
                            }
                        }, 'image/jpeg', 0.95);
                    }
                } catch (err) {
                    console.error('Error sending frame:', err);
                }
            }
        };

        const interval = setInterval(sendFrame, FRAME_INTERVAL);

        return () => {
            clearInterval(interval);
            socketInstance.disconnect();
        };
    }, [isStreaming]);

    const handlePlay = () => setIsStreaming(true);

    const handlePause = () => {
        setIsStreaming(false);
        setGestureData({
            gesture: '',
            confidence: 0,
            status: '',
            frame_count: 0
        });
        setIsCollecting(0);
        if (videoRef.current) {
            const stream = videoRef.current.srcObject as MediaStream;
            if (stream) {
                stream.getTracks().forEach((track) => track.stop());
                videoRef.current.srcObject = null;
            }
        }
    };

    const toggleSound = () => setIsSoundOn((prev) => !prev);

    return (
        <div className="flex flex-col items-center gap-4 p-4 mt-16">
            <h1 className="text-2xl font-semibold text-blue-600 mb-4">Real-Time Gesture Recognition with Live Video Streaming</h1>
            <section className="w-full h-full flex items-center justify-center gap-4">
                <div className="w-full h-full flex flex-col items-center ">
                    <video
                        ref={videoRef}
                        playsInline
                        muted
                        autoPlay
                        controls={false}
                        className={clsx(
                            'w-full h-auto max-w-[28rem] aspect-video overflow-hidden rounded-md transform scale-x-[-1]',
                            { 'hidden': !isStreaming }
                        )}
                    />
                    <section
                        className={clsx(
                            "flex items-center justify-center w-[28rem] object-fit bg-no-repeat  h-auto aspect-video rounded-md",
                            { 'hidden': isStreaming }
                        )}
                        style={{ backgroundImage: 'url(/sign-langauge/sign-background.png)' }}
                    >
                        <div className="text-gray-100 bg-blue-500 p-3 rounded-md">{!error ? 'Click On Play Button To Start.' : error}</div>
                    </section>
                    <div className="flex justify-center mt-4 gap-4">
                        {!isStreaming ? (
                            <button
                                className="px-4 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 transition"
                                onClick={handlePlay}
                            >
                                Stream: Play
                            </button>
                        ) : (
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 transition"
                                onClick={handlePause}
                            >
                                Stream: Pause
                            </button>
                        )}
                        <button
                            className="px-4 py-2 bg-yellow-500 text-white rounded-md shadow-md hover:bg-yellow-600 transition"
                            onClick={toggleSound}
                        >
                            {isSoundOn ? 'Sound: On' : 'Sound: Off'}
                        </button>
                    </div>
                </div>
                <div className="w-fit min-w-96">
                    {isCollecting > 0 && (
                        <div className="mb-4">
                            <p>Collecting gesture data...</p>
                            <div className="w-full h-2 bg-gray-400 rounded-md overflow-hidden mt-2">
                                <div
                                    className="h-full bg-blue-500 transition-width duration-300"
                                    style={{ width: `${(isCollecting / 50) * 100}%` }}
                                ></div>
                            </div>
                            <p className="text-sm mt-2">{isCollecting}/50 frames</p>
                        </div>
                    )}
                    {gestureData.gesture && (
                        <>
                            <h2 className="text-lg font-semibold text-blue-600 mb-2">Predicted Word: {gestureData.gesture}</h2>
                            {gestureData.confidence > 0.7 && (
                                <div className="w-full mt-2">
                                    <div
                                        className="h-2 bg-green-500 rounded-md"
                                        style={{ width: `${gestureData.confidence * 100}%` }}
                                    ></div>
                                    <p className="text-sm mt-1">{(gestureData.confidence * 100).toFixed(1)}% confident</p>
                                </div>
                            )}
                        </>
                    )}
                    {gestureData.status === 'error' && gestureData.error && (
                        <p className="text-red-600 mt-2">{gestureData.error}</p>
                    )}
                </div>
            </section>
        </div>
    );
}
