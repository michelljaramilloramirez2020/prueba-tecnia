from fastapi import APIRouter, Query, HTTPException
from typing import List
from models.modelos import Archivo
from datetime import timedelta
import pandas as pd

Router = APIRouter()

df_ruta = pd.read_csv('demanda_sin_dia.csv', parse_dates=["Date"])

@Router.get("/api/demanda", response_model=List[Archivo])
def get_archive(range: int = Query(..., description="Debe ser 15, 30 o 60")):
    if range not in [15, 30, 60]:
        raise HTTPException(status_code=400, detail="Rango inválido. Usa solo 15, 30 o 60.")

    hoy = df_ruta["Date"].max()
    fecha_actual = hoy - timedelta(days=range)

    df_filtrado = df_ruta[df_ruta["Date"] >= fecha_actual].sort_values("Date")

    if df_filtrado.empty:
        raise HTTPException(status_code=204, detail="No hay datos disponibles para el rango seleccionado.")

    resultado_datos = [
        {
            "date": row["Date"].date().isoformat(),
            "value": int(row["Value"])
        } 
        for _, row in df_filtrado.iterrows()
    ]

    return resultado_datos