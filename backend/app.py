from flask import Flask, request, jsonify
from pytesseract import pytesseract
from flask_cors import CORS
import tensorflow as tf
from transformers import GPT2Tokenizer

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load GPT-2 tokenizer
tokenizer = GPT2Tokenizer.from_pretrained("gpt2")

# Load your pre-trained grammar correction model
grammar_correction_model = tf.keras.models.load_model(r"grammar_correction_model_new.h5")

@app.route('/convert', methods=['POST'])
def convert_text():
    try:
        # Extract the text from the request body
        text = request.json.get('text', '')

        # Print the received text on the terminal
        print("Received text from frontend:", text)

        # Tokenize the input text
        input_ids = tokenizer.encode(text, return_tensors="tf", max_length=512)

        # Generate corrected text using your pre-trained model
       # predicted_ids = grammar_correction_model.predict(input_ids)
        #corrected_text = tokenizer.decode(predicted_ids[0], skip_special_tokens=True)

        # Print the corrected text received from BE
        print("Received text from BE:", text)

        
        #ocr = OCR()
        #txt = ocr.getText("D:\Personal\Edu\handwritting-to-text-with-ocr.png");
        #print (txt)
        # Return the corrected text to the +
        return jsonify({'corrected_text': text + ' Converted'}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500
        


@app.route('/img_string', methods=['POST'])
def extract_text():
    text = request.json.get('img', '')
    path = "D:\Personal\Edu\handwritting-to-text-with-ocr.png"# request.json.get('path','')
   # print(path)
    ocr = OCR()
    txt = ocr.getText(path);
    print (text)
    return jsonify({'extracted_txt':'txt msg'}),200



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