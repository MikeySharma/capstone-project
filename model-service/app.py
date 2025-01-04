from flask import Flask
from flask_socketio import SocketIO, emit
from flask_cors import CORS
import cv2
import numpy as np
import base64
import logging
from PIL import Image
import io
from model import predict_hand_gesture

# Initialize Flask and SocketIO
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
socketio = SocketIO(app, cors_allowed_origins="*", async_mode='threading')

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
        # Convert ArrayBuffer to numpy array
        frame_bytes = np.frombuffer(frame_data, dtype=np.uint8)
        
        # Decode the image
        img = cv2.imdecode(frame_bytes, cv2.IMREAD_COLOR)
        
        if img is None:
            raise ValueError("Failed to decode image")

        # Process frame with the model
        result = predict_hand_gesture(img)
        logger.debug(f"Prediction result: {result}")

        # Emit gesture data back to client
        emit('gestureData', result)

    except Exception as e:
        logger.error(f"Error processing frame: {str(e)}")
        emit('gestureData', {
            'gesture': 'No Gesture Detected',
            'confidence': 0,
            'status': 'error',
            'error': str(e)
        })

@app.route('/health')
def health_check():
    return {"status": "healthy"}

if __name__ == '__main__':
    socketio.run(app, 
                host='0.0.0.0',
                port=5000,
                debug=True)
