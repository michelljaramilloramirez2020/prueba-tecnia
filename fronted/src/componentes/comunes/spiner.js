import React from 'react';

function Spinner() {
  return (
    <div>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Cargando...</span>
      </div>
    </div>
  );
}

export default Spinner;

