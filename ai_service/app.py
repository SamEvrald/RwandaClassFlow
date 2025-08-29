from flask import Flask, request, jsonify
from flask_cors import CORS
import pytesseract
from PIL import Image
import io
import base64
import numpy as np
import cv2
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

# Configure Tesseract path (adjust if needed)
# pytesseract.pytesseract.tesseract_cmd = '/usr/bin/tesseract'

class OCRService:
    """Optical Character Recognition service"""
    
    @staticmethod
    def preprocess_image(image):
        """Preprocess image for better OCR results"""
        # Convert to grayscale
        gray = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2GRAY)
        
        # Apply denoising
        denoised = cv2.fastNlMeansDenoising(gray)
        
        # Apply threshold
        _, thresh = cv2.threshold(denoised, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
        
        return Image.fromarray(thresh)
    
    @staticmethod
    def extract_text(image_data, language='eng'):
        """Extract text from image using OCR"""
        try:
            # Decode base64 image
            image_bytes = base64.b64decode(image_data.split(',')[1])
            image = Image.open(io.BytesIO(image_bytes))
            
            # Preprocess image
            processed_image = OCRService.preprocess_image(image)
            
            # Perform OCR
            custom_config = r'--oem 3 --psm 6'
            text = pytesseract.image_to_string(processed_image, lang=language, config=custom_config)
            
            return text.strip()
        except Exception as e:
            logger.error(f"OCR extraction failed: {str(e)}")
            return ""


class GradingService:
    """AI-powered grading and feedback service"""
    
    @staticmethod
    def analyze_answer(question, answer, rubric=None):
        """Analyze student answer and provide feedback"""
        # This is a simplified version - in production, you'd use more sophisticated NLP
        
        feedback = {
            'score': 0,
            'max_score': 100,
            'feedback': '',
            'strengths': [],
            'improvements': []
        }
        
        if not answer.strip():
            feedback['feedback'] = "No answer provided. Please attempt the question."
            return feedback
        
        # Simple keyword-based analysis (to be replaced with proper NLP)
        answer_words = answer.lower().split()
        
        if len(answer_words) > 5:
            feedback['score'] = min(85, len(answer_words) * 2)
            feedback['feedback'] = "Good effort in providing a detailed answer."
            feedback['strengths'].append("Detailed response")
        else:
            feedback['score'] = 40
            feedback['feedback'] = "Answer could be more detailed."
            feedback['improvements'].append("Provide more explanation")
        
        return feedback


class FeedbackService:
    """Service for generating personalized feedback"""
    
    @staticmethod
    def generate_feedback(student_performance, subject, language='en'):
        """Generate personalized feedback based on performance"""
        
        templates = {
            'en': {
                'excellent': "Excellent work! You demonstrate strong understanding of {subject}.",
                'good': "Good work! Keep practicing to improve your {subject} skills.",
                'needs_improvement': "You're making progress. Focus on these areas in {subject}:"
            },
            'fr': {
                'excellent': "Excellent travail! Vous démontrez une forte compréhension de {subject}.",
                'good': "Bon travail! Continuez à pratiquer pour améliorer vos compétences en {subject}.",
                'needs_improvement': "Vous progressez. Concentrez-vous sur ces domaines en {subject}:"
            }
        }
        
        score = student_performance.get('score', 0)
        lang_templates = templates.get(language, templates['en'])
        
        if score >= 80:
            return lang_templates['excellent'].format(subject=subject)
        elif score >= 60:
            return lang_templates['good'].format(subject=subject)
        else:
            return lang_templates['needs_improvement'].format(subject=subject)


@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'service': 'RwandaClassFlow AI Service'})


@app.route('/ocr/extract', methods=['POST'])
def extract_text():
    """Extract text from image using OCR"""
    try:
        data = request.get_json()
        image_data = data.get('image')
        language = data.get('language', 'eng')
        
        if not image_data:
            return jsonify({'error': 'No image data provided'}), 400
        
        # Map language codes
        lang_map = {'en': 'eng', 'fr': 'fra', 'rw': 'eng'}  # Kinyarwanda fallback to English
        tesseract_lang = lang_map.get(language, 'eng')
        
        extracted_text = OCRService.extract_text(image_data, tesseract_lang)
        
        return jsonify({
            'success': True,
            'text': extracted_text,
            'language': language
        })
    
    except Exception as e:
        logger.error(f"OCR endpoint error: {str(e)}")
        return jsonify({'error': 'OCR processing failed'}), 500


@app.route('/grading/analyze', methods=['POST'])
def analyze_assignment():
    """Analyze assignment and provide grading suggestions"""
    try:
        data = request.get_json()
        question = data.get('question', '')
        answer = data.get('answer', '')
        rubric = data.get('rubric')
        
        result = GradingService.analyze_answer(question, answer, rubric)
        
        return jsonify({
            'success': True,
            'grading_result': result
        })
    
    except Exception as e:
        logger.error(f"Grading endpoint error: {str(e)}")
        return jsonify({'error': 'Grading analysis failed'}), 500


@app.route('/feedback/generate', methods=['POST'])
def generate_feedback():
    """Generate personalized feedback"""
    try:
        data = request.get_json()
        performance = data.get('performance', {})
        subject = data.get('subject', '')
        language = data.get('language', 'en')
        
        feedback = FeedbackService.generate_feedback(performance, subject, language)
        
        return jsonify({
            'success': True,
            'feedback': feedback
        })
    
    except Exception as e:
        logger.error(f"Feedback endpoint error: {str(e)}")
        return jsonify({'error': 'Feedback generation failed'}), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8001, debug=True)
