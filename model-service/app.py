from flask import Flask
from flask_socketio import SocketIO, emit
from flask_cors import CORS
import cv2
import numpy as np
import logging
from model import predict_hand_gesture

TIMESTEPS = 50

# Initialize Flask and SocketIO
app = Flask(__name__)
CORS(app, resources={
    r"/*": {
        "origins": ["http://localhost:3000", "https://semicolon-flask.vercel.app"],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"],
        "supports_credentials": True
    }
})
socketio = SocketIO(app, cors_allowed_origins=["http://localhost:3000", "https://semicolon-flask.vercel.app"], async_mode='threading')

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

@socketio.on('connect')
def handle_connect():
    logger.info('Client connected')
    emit('connect_response', {'status': 'Connected successfully'})

@socketio.on('disconnect')
def handle_disconnect():
    logger.info('Client disconnected')

@socketio.on('frame')
def handle_frame(frame_data):
    try:
        # Convert frame data
        frame_bytes = np.frombuffer(frame_data, dtype=np.uint8)
        img = cv2.imdecode(frame_bytes, cv2.IMREAD_COLOR)
        
        if img is None:
            raise ValueError("Failed to decode image")

        # Process frame and get prediction
        result = predict_hand_gesture(img)
        
        # Log detailed information about the frame processing
        logger.info(f"Frame processing result: Status={result['status']}, " 
                   f"Frames={result['frame_count']}/{result['total_frames']}, "
                   f"Gesture={result['gesture']}, "
                   f"Confidence={result['confidence']:.2f}")
        
        # Emit result to client
        emit('gestureData', result)

    except Exception as e:
        # logger.error(f"Error processing frame: {str(e)}")
        emit('gestureData', {
            'gesture': 'Error',
            'confidence': 0,
            'status': 'error',
            'error': str(e),
            'frame_count': 0,
            'total_frames': TIMESTEPS
        })

@app.route('/health')
def health_check():
    return {"status": "healthy"}

if __name__ == '__main__':
    socketio.run(app, 
                host='0.0.0.0',
                port=5000,
                debug=True)
