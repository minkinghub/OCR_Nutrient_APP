import cv2
import easyocr
import matplotlib.pyplot as plt

# Load the image
image_path = "C:/Users/rjend/Desktop/KakaoTalk_20240708_001751363.jpg"  # 여기에 이미지 파일 경로를 넣으세요
image = cv2.imread(image_path)

# Convert to grayscale
gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

# Apply GaussianBlur to reduce noise and improve contour detection
blurred = cv2.GaussianBlur(gray, (5, 5), 0)

# Use Canny edge detector
edges = cv2.Canny(blurred, 50, 150)

# Find contours
contours, _ = cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

# Initialize easyOCR Reader
reader = easyocr.Reader(['ko'])

# Initialize list to store rectangles that contain "영양정보"
rects_with_text = []

# Iterate through contours to find rectangles
for contour in contours:
    # Get the bounding box of the contour
    x, y, w, h = cv2.boundingRect(contour)
    # Filter out small contours by setting a minimum size (e.g., width and height > 50)
    if w > 50 and h > 50:
        # Crop the detected region
        cropped_image = image[y:y+h, x:x+w]
        # Use easyOCR to extract text
        result = reader.readtext(cropped_image)
        # Check if "영양정보" is in the extracted text
        for (bbox, text, prob) in result:
            if "영양정보" in text:
                rects_with_text.append((x, y, w, h))
                break

# Draw rectangles around the detected regions that contain "영양정보"
for rect in rects_with_text:
    x, y, w, h = rect
    cv2.rectangle(image, (x, y), (x + w, y + h), (0, 0, 255), 4)  # 빨간색 선, 두께 4

# Convert image to RGB for displaying with matplotlib
image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

# Display the image with detected regions
plt.figure(figsize=(10, 10))
plt.imshow(image_rgb)
plt.axis('off')
plt.show()

# Optionally, display the cropped images containing "영양정보"
for rect in rects_with_text:
    x, y, w, h = rect
    cropped_image = image[y:y+h, x:x+w]
    plt.figure(figsize=(10, 10))
    plt.imshow(cv2.cvtColor(cropped_image, cv2.COLOR_BGR2RGB))
    plt.axis('off')
    plt.show()