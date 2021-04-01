from fastapi import FastAPI

from .routes.cat import router as CatRouter

from fastapi.middleware.cors import CORSMiddleware

class UnicornException(Exception):
    def __init__(self, name: str):
        self.name = name

app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


app.include_router(CatRouter, tags=["Cat"], prefix="/cat")


@app.get("/", tags=["Root"])
async def read_root():
    return {"message": "Welcome to this fantastic app!"}


