import cv2
import matplotlib.pyplot as plt

# Load the image
image_path = "C:/Users/rjend/Desktop/b.jpg"  # 여기에 이미지 파일 경로를 넣으세요
image = cv2.imread(image_path)

# Convert to grayscale
gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

# Use a binary threshold to create a binary image
_, binary = cv2.threshold(gray, 150, 255, cv2.THRESH_BINARY_INV)

# Find contours
contours, _ = cv2.findContours(binary, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

# Filter and draw rectangles around the detected contours
for contour in contours:
    # Get the bounding box of the contour
    x, y, w, h = cv2.boundingRect(contour)
    # Filter out small contours by setting a minimum size (e.g., width and height > 50)
    if w > 50 and h > 50:
        # Draw a rectangle around the detected region
        cv2.rectangle(image, (x, y), (x + w, y + h), (0, 255, 0), 2)

# Convert image to RGB for displaying with matplotlib
image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

# Display the image with detected regions
plt.figure(figsize=(10, 10))
plt.imshow(image_rgb)
plt.axis('off')
plt.show()