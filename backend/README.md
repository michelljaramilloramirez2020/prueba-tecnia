

## Backend (FastAPI)

Este backend fue construido con **FastAPI** y lee datos desde un archivo CSV

## Tecnologías
- Python 3.10+
- FastAPI
- Pandas
- Uvicorn

## 📌 Funcionalidades
- Endpoint `/api/demanda?range=15|30|60`
- Lee datos desde un archivo CSV (`demanda_sin_dia.csv`)
- Filtra automáticamente los últimos N días

## ▶️ Cómo ejecutar
1. Instalar dependencias:
   pip install -r requirements.txt


2. Correr el proyecto
   uvicorn main:app --reload
   puerto: 8000

