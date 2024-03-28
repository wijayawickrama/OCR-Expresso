from flask import Flask, request, jsonify
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

        # Return the corrected text to the +
        return jsonify({'corrected_text': text}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
