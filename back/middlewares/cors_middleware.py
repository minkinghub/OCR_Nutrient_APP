from fastapi.middleware.cors import CORSMiddleware

def cors_middleware(app):
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],  # 모든 도메인에서의 접근 허용
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )