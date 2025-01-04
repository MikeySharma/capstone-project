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
    max_num_hands=2,  # Changed to 2 hands for sign language
    min_detection_confidence=0.5,
    min_tracking_confidence=0.5
)
mp_draw = mp.solutions.drawing_utils

# Constants for landmark processing
NUM_HANDS = 2
NUM_LANDMARKS = 21
FEATURES = 3  # x, y, z
TIMESTEPS = 50
ZERO_LANDMARK = [[0, 0, 0]] * NUM_LANDMARKS

# Load the model and scaler
try:
    model = tf.keras.models.load_model('model\my_vit_model.h5')
    scaler = joblib.load('model\scaler.pkl')
    logger.info("Model and scaler loaded successfully")
except Exception as e:
    logger.error(f"Error loading model or scaler: {str(e)}")
    raise

# Word classes mapping
word_classes = np.array([
    'a', 'about', 'aim', 'all', 'and', 'audio', 'b', 'barrier', 'break',
    'c', 'can', 'communication', 'creative', 'd', 'detect', 'developed',
    'e', 'f', 'g', 'h', 'have', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'our',
    'p', 'project', 'q', 'r', 's', 'sign language', 'solution', 't', 'team',
    'text', 'that', 'to', 'translate', 'u', 'v', 'w', 'what', 'x', 'y', 'you', 'z'
])

# Add these global variables at the top with other constants
captured_landmarks = []  # List to store landmarks for all frames
frame_counter = 0  # Tracks the number of frames collected
recording = False  # Indicates when to start recording frames
hands_detected_once = False  # Flag to track if hands were detected at least once

def preprocess_landmarks(captured_landmarks):
    """
    Preprocess landmarks for model input.
    """
    try:
        captured_landmarks = np.array(captured_landmarks)
        
        # Reshape landmarks to match model input requirements
        merged_hands_landmarks = captured_landmarks.reshape(
            captured_landmarks.shape[0], captured_landmarks.shape[2], -1
        )
        
        # Flatten for scaling
        reshaped_landmarks = merged_hands_landmarks.reshape(1, -1)
        
        # Scale the features
        scaled_landmarks = scaler.transform(reshaped_landmarks)
        
        # Reshape to model input shape
        preprocessed_landmarks = scaled_landmarks.reshape(
            captured_landmarks.shape[0],
            -1
        )
        
        return preprocessed_landmarks
    except Exception as e:
        logger.error(f"Error in preprocessing landmarks: {str(e)}")
        raise

def predict_hand_gesture(image):
    """
    Predict sign language gesture from image using multiple frames.
    """
    global captured_landmarks, frame_counter, recording, hands_detected_once
    
    try:
        # Process image
        image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        results = hands.process(image_rgb)
        
        # Initialize response
        response = {
            'gesture': 'No Gesture Detected',
            'confidence': 0,
            'status': 'collecting'  # New status to indicate data collection
        }
        
        # Check if hands are detected
        if results.multi_hand_landmarks:
            if not recording and not hands_detected_once:
                logger.info("Hands detected. Starting to collect frames.")
                hands_detected_once = True
                recording = True
            
            # Extract landmarks for detected hands
            frame_landmarks = [ZERO_LANDMARK] * NUM_HANDS
            for idx, hand_landmark in enumerate(results.multi_hand_landmarks):
                if idx < NUM_HANDS:
                    frame_landmarks[idx] = [[lm.x, lm.y, lm.z] for lm in hand_landmark.landmark]
            
            # Append frame landmarks
            captured_landmarks.append(frame_landmarks)
            frame_counter += 1
        elif recording:
            # If no hands are detected during recording, use zero matrix
            captured_landmarks.append([ZERO_LANDMARK] * NUM_HANDS)
            frame_counter += 1
        
        # Make prediction when enough frames are collected
        if recording and frame_counter >= TIMESTEPS:
            # Preprocess collected landmarks
            preprocessed_input = preprocess_landmarks(captured_landmarks)
            preprocessed_input = np.expand_dims(preprocessed_input, axis=0)
            
            # Predict
            prediction = model.predict(preprocessed_input)
            predicted_class = np.argmax(prediction)
            confidence = np.max(prediction)
            
            # Only return prediction if confidence is high enough
            if confidence >= 0.5 and predicted_class < len(word_classes):
                predicted_word = word_classes[predicted_class]
                response = {
                    'gesture': predicted_word,
                    'confidence': float(confidence),
                    'status': 'success'
                }
            
            # Reset for next collection cycle
            captured_landmarks = []
            frame_counter = 0
            recording = False
            hands_detected_once = False
            
        return response
            
    except Exception as e:
        logger.exception("Error in predict_hand_gesture")
        raise Exception(f"Sign language detection failed: {str(e)}")
