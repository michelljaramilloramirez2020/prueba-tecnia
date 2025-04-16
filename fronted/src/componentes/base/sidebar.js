import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <ul className="nav flex-column">
      <li className="nav-item">
        <Link className="nav-link text-white" to="/">
          Gráficas
        </Link>
      </li>
    </ul>
  );
}

export default Sidebar;

