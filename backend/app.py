from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/convert', methods=['POST'])
def convert_text():
    try:
        # Extract the text from the request body
        text = request.json.get('text', '')

        # Print the received text on the terminal
        print("Received text from frontend:", text)

        # Perform any processing on the text here

        # Example: Echo the text back to the frontend
        return jsonify({'corrected_text': text + "Supra"}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
