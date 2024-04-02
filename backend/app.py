from transformers import T5ForConditionalGeneration, T5Tokenizer
from flask import Flask, request, jsonify
from pytesseract import pytesseract
from flask_cors import CORS
import base64
#import tensorflow as tf


app = Flask(__name__)

CORS(app)  

@app.route('/convert', methods=['POST'])
def convert_text():
    try: 
        inputText = request.json.get('text', '')
        outputText = grammar_corrector(inputText,1)
        return jsonify({'corrected_text': outputText}), 200      
    except Exception as e:
        return jsonify({'error': str(e)}), 500
        
#-----
def decode_base64_image(base64_string):
    # Add padding to the base64 string if needed
    padded_base64_string = base64_string + '=' * ((4 - len(base64_string) % 4) % 4)
    # Decode the base64 string into binary data
    binary_data = base64.b64decode(padded_base64_string)
    return binary_data

# Example usage
#base64_string = "your_base64_encoded_string_here"

# Decode the base64 string


# Now you can write this binary data to a new file

#----

@app.route('/img_string', methods=['POST'])
def extract_text():
    text = request.json.get('imageBase64', '')
    binary_data = decode_base64_image(text)
    with open('decoded_image.jpg', 'wb') as file:
        file.write(binary_data)

    path = "D:\Personal\Edu\OCR-Expresso\decoded_image.jpg"# request.json.get('path','')
    #print(path)
    ocr = OCR()
    extractedText = ocr.getText(path);
    print (extractedText)
    
    
    return jsonify({'extractedText': extractedText}),200

#--------------
model_path = r'D:\Personal\Edu\FYP - Essentials\t5_gec_model' 
loaded_model = T5ForConditionalGeneration.from_pretrained(model_path)
tokenizer = T5Tokenizer.from_pretrained(model_path)

def grammar_corrector(input_text, num_return_sequences):
    batch = tokenizer([input_text], truncation=True, padding='max_length', max_length=64, return_tensors="pt")
    translated = loaded_model.generate(**batch, max_length=64, num_beams=4, num_return_sequences=num_return_sequences, temperature=1.5)
    tgt_text = tokenizer.batch_decode(translated, skip_special_tokens=True)
    
    # Join the list of strings into a single string
    result_string = ' '.join(tgt_text)
    
    return result_string



#---------------

class OCR:
    def __init__(self) :
        self.path = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

    def getText(self,filePath):
        try:
            pytesseract.tesseract_cmd = self.path
            text = pytesseract.image_to_string(filePath)
            return text
        except Exception as e:
            return("Error")


if __name__ == '__main__':
    app.run(debug = True)