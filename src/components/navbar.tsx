import React, { MouseEvent } from "react";
import { Link } from "react-router-dom";
import "./navbar.css"; // Archivo CSS para los estilos
import { useAuth } from "../auth/AuthProvider";
import { API_URL } from "../auth/authConstants";



const Navbar: React.FC = () => {
  const auth = useAuth();

  async function handleSignOut(e: MouseEvent) {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/signout`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.getRefreshToken()}`,
        },
      });
      if (response.ok) {
        auth.signout();
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <nav className="navbar">
      <div className="navbar-left">
          <img src="images/logo3.png" alt="Logo" className="navbar-logo" />
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
        <Link to="#" className="navbar-login-button" onClick={handleSignOut}>
          Cerrar sesión
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
