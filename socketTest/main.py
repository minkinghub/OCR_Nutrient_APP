import base64
import io
from PIL import Image, ImageDraw, ImageFont
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from socketWrapper import socketio_mount

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

sio = socketio_mount(app)

@sio.on("connect")
async def connect(sid, environ):
    print('Client connected:', sid)

@sio.on("disconnect")
async def disconnect(sid):
    print('Client disconnected:', sid)

@sio.on("image")
async def handle_image(sid, data):
    base64_image = data['base64Image']
    image_data = base64.b64decode(base64_image)
    image = Image.open(io.BytesIO(image_data))
    
    # 이미지 중앙에 번호 삽입
    draw = ImageDraw.Draw(image)
    font = ImageFont.load_default()  # 폰트 파일 경로와 크기 지정
    text = str(int(sid[-4:], 16))  # sid의 마지막 4자리를 16진수로 해석하여 번호로 사용
    text_width, text_height = draw.textsize(text, font)
    position = ((image.width - text_width) / 2, (image.height - text_height) / 2)
    draw.text(position, text, font=font, fill=(255, 0, 0))
    
    buffered = io.BytesIO()
    image.save(buffered, format="JPEG")
    new_base64_image = base64.b64encode(buffered.getvalue()).decode('utf-8')
    
    await sio.emit('processed_image', {'base64Image': new_base64_image}, to=sid)

@app.get("/")
async def root():
    return {"message": "Server is running"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)