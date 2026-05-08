import cv2
import sys
import json
import os

def detect_face(image_path):
    # Use the anime cascade we downloaded earlier
    cascade_path = os.path.join(os.path.dirname(__file__), 'Wav2Lip', 'lbpcascade_animeface.xml')
    if not os.path.exists(cascade_path):
        # Fallback to standard face
        cascade_path = cv2.data.haarcascades + 'haarcascade_frontalface_default.xml'

    face_cascade = cv2.CascadeClassifier(cascade_path)
    img = cv2.imread(image_path)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    faces = face_cascade.detectMultiScale(gray, 1.1, 4)
    
    if len(faces) > 0:
        # Get largest face
        faces = sorted(faces, key=lambda f: f[2]*f[3], reverse=True)
        x, y, w, h = faces[0]
        return {"x": int(x), "y": int(y), "w": int(w), "h": int(h)}
    
    return None

if __name__ == "__main__":
    result = detect_face(sys.argv[1])
    print(json.dumps(result))
