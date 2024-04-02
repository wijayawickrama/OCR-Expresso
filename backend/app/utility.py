# Import necessary libraries
from transformers import T5ForConditionalGeneration, T5Tokenizer
from flask import request, jsonify
from pytesseract import pytesseract
import base64

# Define the path to the T5 model
model_path = r'D:\Personal\Edu\FYP - Essentials\t5_gec_model' 

# Load the pre-trained T5 model and tokenizer
loaded_model = T5ForConditionalGeneration.from_pretrained(model_path)
tokenizer = T5Tokenizer.from_pretrained(model_path)

# Function to perform grammar correction
def grammar_corrector(input_text, num_return_sequences):
    # Tokenize the input text
    batch = tokenizer([input_text], truncation=True, padding='max_length', max_length=64, return_tensors="pt")
    
    # Generate corrected text using the loaded model
    translated = loaded_model.generate(**batch, max_length=64, num_beams=4, num_return_sequences=num_return_sequences, temperature=1.5)
    
    # Decode the generated text
    tgt_text = tokenizer.batch_decode(translated, skip_special_tokens=True)
    
    # Join the list of strings into a single string
    result_string = ' '.join(tgt_text)
    
    return result_string    

# Function to decode base64 encoded image
def decode_base64_image(base64_string):
    # Add padding to the base64 string if necessary
    padded_base64_string = base64_string + '=' * ((4 - len(base64_string) % 4) % 4)
    
    # Decode the base64 string into binary data
    binary_data = base64.b64decode(padded_base64_string)
    
    return binary_data

# Class to perform Optical Character Recognition (OCR)
class OCR:
    def __init__(self) :
        # Define the path to the Tesseract OCR executable
        self.path = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

    def getText(self, filePath):
        try:
            # Set the Tesseract OCR executable path
            pytesseract.tesseract_cmd = self.path
            
            # Perform OCR on the image file and extract text
            text = pytesseract.image_to_string(filePath)
            
            return text
        except Exception as e:
            return("Error")
