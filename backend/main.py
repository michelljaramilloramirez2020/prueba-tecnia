from fastapi import FastAPI
from config.configuracion import add_cors
from api.rutas import Router

app = FastAPI()
add_cors(app)
app.include_router(Router)
