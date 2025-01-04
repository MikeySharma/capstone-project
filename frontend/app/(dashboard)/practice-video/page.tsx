"use client";
import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const FRAME_INTERVAL = 100; // Increased frame rate for better detection

interface GestureData {
    gesture: string;
    confidence: number;
    status: string;
    error?: string;
}

export default function VideoStream() {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [socket, setSocket] = useState<Socket | null>(null);
    const [gestureData, setGestureData] = useState<GestureData>({
        gesture: '',
        confidence: 0,
        status: ''
    });
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const socketInstance = io('http://localhost:5000');
        setSocket(socketInstance);

        socketInstance.on('connect', () => {
            console.log('Socket.IO Connected');
            setError(null);
        });

        socketInstance.on('gestureData', (data: GestureData) => {
            console.log('Received gesture data:', data);
            setGestureData({
                gesture: data.gesture || '',
                confidence: data.confidence || 0,
                status: data.status || ''
            });
        });

        socketInstance.on('connect_error', (err) => {
            console.error('Socket.IO connection error:', err);
            setError('Connection error. Please try again.');
        });

        socketInstance.on('disconnect', () => {
            console.log('Socket.IO disconnected');
            setError('Connection closed. Please refresh the page.');
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
    }, []);

    return (
        <div className="video-container">
            {error && <div className="error-message">{error}</div>}
            <video 
                ref={videoRef} 
                autoPlay 
                playsInline
                muted 
                style={{ 
                    width: '100%', 
                    maxWidth: '640px',
                    transform: 'scaleX(-1)' // Mirror effect
                }} 
            />
            <div className="gesture-info">
                <h2>Detected Gesture: {gestureData.gesture}</h2>
                {gestureData.confidence > 0 && (
                    <p>Confidence: {(gestureData.confidence * 100).toFixed(1)}%</p>
                )}
                {gestureData.status === 'error' && gestureData.error && (
                    <p className="error">{gestureData.error}</p>
                )}
            </div>
            <style jsx>{`
                .video-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 1rem;
                    padding: 1rem;
                }
                .gesture-info {
                    text-align: center;
                    padding: 1rem;
                    border-radius: 8px;
                    background: #f5f5f5;
                    min-width: 300px;
                }
                .error-message {
                    color: red;
                    padding: 0.5rem;
                    border: 1px solid red;
                    border-radius: 4px;
                    margin-bottom: 1rem;
                }
                .error {
                    color: red;
                    margin-top: 0.5rem;
                }
            `}</style>
        </div>
    );
}
