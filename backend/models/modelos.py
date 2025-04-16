from pydantic import BaseModel

class Archivo (BaseModel):
    date: str
    value: int
