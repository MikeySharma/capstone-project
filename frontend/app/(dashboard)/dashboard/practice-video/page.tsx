"use client";
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

    useEffect(() => {
        const socketInstance = io('http://localhost:5000');
        setSocket(socketInstance);

        socketInstance.on('connect', () => {
            console.log('Socket.IO Connected');
            setError(null);
        });

        socketInstance.on('gestureData', (data: GestureData) => {
            if(data.status === 'collecting'){
                setIsCollecting(data.frame_count);
            }
            console.log('Received gesture data:', data);
            if(data.status === 'success'){
                setGestureData({
                    gesture: data.gesture || '',
                    confidence: data.confidence || 0,
                    status: data.status || '',
                    frame_count: 0
                });
            }
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
                {isCollecting > 0 && (
                    <div className="collecting-status">
                        <p>Collecting gesture data...</p>
                        <div className="progress-bar">
                            <div 
                                className="progress" 
                                style={{width: `${(isCollecting/50) * 100}%`}}
                            ></div>
                        </div>
                        <p>{isCollecting}/50 frames</p>
                    </div>
                )}
                {gestureData.gesture && (
                    <>
                        <h2 className={`gesture active`}>
                            {gestureData.gesture}
                        </h2>
                        {gestureData.confidence > 0.5 && (
                            <div className="confidence-meter">
                                <div 
                                    className="confidence-bar"
                                    style={{width: `${gestureData.confidence * 100}%`}}
                                ></div>
                                <p>{(gestureData.confidence * 100).toFixed(1)}% confident</p>
                            </div>
                        )}
                    </>
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
                    padding: 1.5rem;
                    border-radius: 12px;
                    background: #f8f9fa;
                    min-width: 300px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }
                .collecting-status {
                    margin: 1rem 0;
                }
                .progress-bar {
                    width: 100%;
                    height: 8px;
                    background: #e9ecef;
                    border-radius: 4px;
                    overflow: hidden;
                    margin: 0.5rem 0;
                }
                .progress {
                    height: 100%;
                    background: #007bff;
                    transition: width 0.3s ease;
                }
                .gesture {
                    font-size: 1.5rem;
                    margin: 0;
                    opacity: 0.7;
                }
                .gesture.active {
                    opacity: 1;
                    color: #007bff;
                }
                .confidence-meter {
                    margin-top: 1rem;
                    width: 100%;
                }
                .confidence-bar {
                    height: 6px;
                    background: #28a745;
                    border-radius: 3px;
                    margin-bottom: 0.5rem;
                    transition: width 0.3s ease;
                }
                .error-message {
                    color: #dc3545;
                    padding: 0.75rem;
                    border: 1px solid #dc3545;
                    border-radius: 6px;
                    margin-bottom: 1rem;
                    background: #fff;
                }
                .error {
                    color: #dc3545;
                    margin-top: 0.5rem;
                }
            `}</style>
        </div>
    );
}
