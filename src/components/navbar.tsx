import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css"; // Archivo CSS para los estilos

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
          <img src="src\assets\images\logo3.png" alt="Logo" className="navbar-logo" />
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/">Inicio</Link>
        </li>
        <li>
          <Link to="/servicios">Servicios</Link>
        </li>
        <li>
          <Link to="/identidadCorporativa">Sobre nosotros</Link>
        </li>
        <li>
            <Link to="/agendarcita">Agenda tu cita </Link>
        </li>
      </ul>
      <div className="navbar-right">
        <Link to="/login" className="navbar-login-button">
          Cerrar sesión
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
