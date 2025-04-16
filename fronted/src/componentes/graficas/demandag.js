import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { obtenerDemanda } from '../../servicios/demanda';
import Spinner from '../comunes/spiner';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

function Demanda({ rango }) {
  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [pagina, setPagina] = useState(0);

  const porPagina = 10;
  const totalPaginas = Math.ceil(datos.length / porPagina);

  useEffect(() => {
    setCargando(true);
    obtenerDemanda(rango)
      .then(data => {
        setDatos(data);
        setPagina(0);
      })
      .finally(() => setCargando(false));
  }, [rango]);

  if (cargando) {
    return (
      <div style={{ height: '250px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Spinner />
      </div>
    );
  }

  const inicio = pagina * porPagina;
  const fin = inicio + porPagina;
  const datosPaginados = datos.slice(inicio, fin);

  const chartData = {
    labels: datosPaginados.map(item => item.date),
    datasets: [
      {
        label: 'Demanda',
        data: datosPaginados.map(item => item.value),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.3,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      tooltip: { enabled: true },
    },
    scales: {
      y: {
        ticks: {
          callback: value => new Intl.NumberFormat('es-ES').format(value),
        },
      },
      x: {
        ticks: {
          autoSkip: false,
          maxRotation: 45,
          minRotation: 30,
        },
      },
    },
  };

  return (
    <div>
      <h5>Demanda en los últimos {rango} días</h5>

      <div style={{ width: '100%', maxWidth: '100%', height: '400px', overflowX: 'auto' }}>
        <Line data={chartData} options={options} />
      </div>

      <div className="mt-3 d-flex justify-content-between align-items-center flex-wrap gap-2">
        <button
          className="btn btn-secondary"
          onClick={() => setPagina(p => Math.max(p - 1, 0))}
          disabled={pagina === 0}
        >
          ⬅ Anterior
        </button>

        <span>Página {pagina + 1} de {totalPaginas}</span>

        <button
          className="btn btn-secondary"
          onClick={() => setPagina(p => Math.min(p + 1, totalPaginas - 1))}
          disabled={pagina === totalPaginas - 1}
        >
          Siguiente ➡
        </button>
      </div>
    </div>
  );
}

export default Demanda;