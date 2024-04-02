# Import necessary modules
from flask import request, jsonify
from app import app
from .utility import decode_base64_image, grammar_corrector, OCR

# Route to handle text conversion
@app.route('/convert', methods=['POST'])
def convert_text():
    try:
        # Get the input text from the request
        inputText = request.json.get('text', '')
        
        # Call grammar_corrector function to correct the input text
        outputText = grammar_corrector(inputText, 1)
        
        # Return the corrected text as JSON response
        return jsonify({'corrected_text': outputText}), 200
    except Exception as e:
        # Return error message if an exception occurs
        return jsonify({'error': str(e)}), 500


# Route to handle image text extraction
@app.route('/img_string', methods=['POST'])
def extract_text():
    # Get the base64 encoded image from the request
    text = request.json.get('imageBase64', '')
    
    # Decode the base64 image and save it as a file
    binary_data = decode_base64_image(text)
    with open('decoded_image.jpg', 'wb') as file:
        file.write(binary_data)

    # Path to the saved image
    path = "decoded_image.jpg"
    
    # Initialize OCR object
    ocr = OCR()
    
    # Extract text from the image using OCR
    extractedText = ocr.getText(path)
    
    # Return the extracted text as JSON response
    return jsonify({'extractedText': extractedText}), 200
