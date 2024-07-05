from starlette.middleware.sessions import SessionMiddleware

SECRET_KEY = "your_secret_key"

def create_session_middleware(app):
    app.add_middleware(SessionMiddleware, secret_key=SECRET_KEY)