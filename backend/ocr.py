from pytesseract import pytesseract

class OCR:
    def __init__(self) :
        self.path = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

    
    def getText(self,filePath):
        try:
            pytesseract.tesseract_cmd = self.path
            text = pytesseract.image_to_string(filePath)
            return text
        except Exception as e:
            print("Something wrong")
            return("Error")
        

ocr = OCR()
txt = ocr.getText(r"D:\Personal\Edu\handwritting-to-text-with-ocr.png");
print (txt)


    