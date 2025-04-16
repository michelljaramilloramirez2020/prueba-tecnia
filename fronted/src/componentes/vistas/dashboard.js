import React, { useState } from 'react';
import Sidebar from '../base/sidebar';
import Demanda from '../graficas/demandag';
import Header from '../base/header';

function Dashboard() {
  const [rango, setRango] = useState(30);

  return (
    <div>
      <Header />

      <div className="container-fluid">
        <div className="row flex-column flex-md-row">
          
          <div className="col-12 col-md-3 col-lg-2 bg-dark text-white p-3">
            <Sidebar />
          </div>

          <div className="col-12 col-md-9 col-lg-10 p-4">
            <select
              className="form-select mb-3"
              value={rango}
              onChange={(e) => setRango(Number(e.target.value))}
            >
              <option value={15}>Últimos 15 días</option>
              <option value={30}>Últimos 30 días</option>
              <option value={60}>Últimos 60 días</option>
            </select>

            <Demanda rango={rango} />
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;