import cv2
import mediapipe as mp
import numpy as np
import logging
import tensorflow as tf
import joblib

logger = logging.getLogger(__name__)

# Initialize MediaPipe Hands
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(
    static_image_mode=False,
    max_num_hands=2,
    min_detection_confidence=0.5,
    min_tracking_confidence=0.5
)
mp_draw = mp.solutions.drawing_utils

# Constants
NUM_HANDS = 2
NUM_LANDMARKS = 21
FEATURES = 3  # x, y, z coordinates
TIMESTEPS = 50
ZERO_LANDMARK = [[0.0, 0.0, 0.0]] * NUM_LANDMARKS  # Initialize with floats

# Load the model and scaler
try:
    model = tf.keras.models.load_model('model/my_vit_model.h5')
    scaler = joblib.load('model/scaler.pkl')
    logger.info("Model and scaler loaded successfully")
except Exception as e:
    logger.error(f"Error loading model or scaler: {str(e)}")
    raise

# Word classes mapping (same as notebook)
word_classes = np.array([
    'a', 'about', 'aim', 'all', 'and', 'audio', 'b', 'barrier', 'break', 'c', 'can',
    'communication', 'creative', 'd', 'detect', 'developed', 'e', 'f', 'g', 'h',
    'have', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'our', 'p', 'project', 'q', 'r', 's',
    'sign language', 'solution', 't', 'team', 'text', 'that', 'translate', 'u', 'v',
    'w', 'what', 'x', 'y', 'you', 'z'
])

# Global variables for frame collection
captured_landmarks = []
recording = False
hands_detected_once = False

def get_landmarks(frame_rgb):
    """Get hand landmarks from frame"""
    return hands.process(frame_rgb)

def preprocess_landmarks(landmarks_sequence):
    """Preprocess landmarks exactly as in notebook"""
    try:
        # Ensure we have exactly TIMESTEPS frames
        if len(landmarks_sequence) != TIMESTEPS:
            logger.error(f"Expected {TIMESTEPS} frames, got {len(landmarks_sequence)}")
            raise ValueError("Incorrect number of frames")
            
        # Convert to numpy array
        landmarks_array = np.array(landmarks_sequence)
        logger.debug(f"Initial shape: {landmarks_array.shape}")
        
        # Calculate expected dimensions
        expected_features = NUM_HANDS * NUM_LANDMARKS * FEATURES  # 2 * 21 * 3 = 126
        total_elements = TIMESTEPS * expected_features  # 30 * 126 = 3780
        
        # Reshape to match training format
        flattened = landmarks_array.reshape(1, total_elements)
        logger.debug(f"Flattened shape: {flattened.shape}")
        
        # Scale the features
        scaled = scaler.transform(flattened)
        logger.debug(f"Scaled shape: {scaled.shape}")
        
        # Reshape to model input shape (TIMESTEPS, NUM_LANDMARKS * NUM_HANDS * FEATURES)
        final_shape = (TIMESTEPS, NUM_HANDS * NUM_LANDMARKS * FEATURES)  # (30, 126)
        preprocessed = scaled.reshape(final_shape)
        logger.debug(f"Final shape: {preprocessed.shape}")
        
        return preprocessed
        
    except Exception as e:
        logger.exception(f"Error in preprocessing: {str(e)}")
        raise

def predict_hand_gesture(image):
    """Process frame and predict gesture using collected frames"""
    global captured_landmarks, recording, hands_detected_once
    
    try:
        # Convert and process image
        image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        hand_results = get_landmarks(image_rgb)
        
        current_frame_count = len(captured_landmarks)
        logger.debug(f"Current frame count: {current_frame_count}/{TIMESTEPS}")
        
        # Default response
        response = {
            'gesture': 'No Gesture Detected',
            'confidence': 0,
            'status': 'collecting',
            'frame_count': current_frame_count,
            'total_frames': TIMESTEPS
        }
        
        # Check if hands are detected
        if hand_results.multi_hand_landmarks:
            if not recording and not hands_detected_once:
                logger.info("Hands detected. Starting to collect frames.")
                hands_detected_once = True
                recording = True
                captured_landmarks.clear()  # Clear any old frames
            
            if recording:
                # Extract landmarks for detected hands
                frame_landmarks = [ZERO_LANDMARK] * NUM_HANDS
                for idx, hand_landmark in enumerate(hand_results.multi_hand_landmarks):
                    if idx < NUM_HANDS:
                        frame_landmarks[idx] = [[lm.x, lm.y, lm.z] for lm in hand_landmark.landmark]
                
                # Append frame landmarks
                captured_landmarks.append(frame_landmarks)
                logger.debug(f"Added frame. Total frames: {len(captured_landmarks)}")
        
        # Make prediction when enough frames collected
        if len(captured_landmarks) >= TIMESTEPS:
            logger.info("Collected enough frames, making prediction...")
            
            # Preprocess landmarks
            preprocessed = preprocess_landmarks(captured_landmarks)
            preprocessed = np.expand_dims(preprocessed, axis=0)
            
            # Get prediction
            prediction = model.predict(preprocessed, verbose=0)
            predicted_class = np.argmax(prediction)
            confidence = float(np.max(prediction))
            
            logger.info(f"Prediction made - Class: {predicted_class}, Confidence: {confidence}")
            
            # Only return prediction if confidence is high enough
            if confidence >= 0.5:
                predicted_word = word_classes[predicted_class]
                response = {
                    'gesture': predicted_word,
                    'confidence': confidence,
                    'status': 'success',
                    'frame_count': TIMESTEPS,
                    'total_frames': TIMESTEPS
                }
                logger.info(f"Detected gesture: {predicted_word} with confidence: {confidence}")
            else:
                response = {
                    'gesture': 'Low Confidence',
                    'confidence': confidence,
                    'status': 'low_confidence',
                    'frame_count': TIMESTEPS,
                    'total_frames': TIMESTEPS
                }
                logger.info("Prediction confidence too low")
            
            # Reset collection
            captured_landmarks.clear()
            recording = False
            hands_detected_once = False
            
        return response
            
    except Exception as e:
        logger.exception("Error in predict_hand_gesture")
        captured_landmarks.clear()
        recording = False
        hands_detected_once = False
        return {
            'gesture': 'Error',
            'confidence': 0,
            'status': 'error',
            'error': str(e),
            'frame_count': len(captured_landmarks),
            'total_frames': TIMESTEPS
        }
