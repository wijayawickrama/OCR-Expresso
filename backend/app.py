from transformers import T5ForConditionalGeneration, T5Tokenizer
from flask import Flask, request, jsonify
from pytesseract import pytesseract
from flask_cors import CORS
import tensorflow as tf


app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load your pre-trained grammar correction model
#grammar_correction_model = tf.keras.models.load_model(r"grammar_correction_model_new.h5")

@app.route('/convert', methods=['POST'])
def convert_text():
    try:
        
        inputText = request.json.get('text', '')
        outPutText = generate_predictions(inputText,1)

    
        return jsonify({'corrected_text': outPutText}), 200
        
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

#--------------
model_path = r'D:\Personal\Edu\FYP - Essentials\t5_gec_model' 
loaded_model = T5ForConditionalGeneration.from_pretrained(model_path)
tokenizer = T5Tokenizer.from_pretrained(model_path)

def generate_predictions(input_text, num_return_sequences):
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