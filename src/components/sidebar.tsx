import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from "../auth/AuthProvider";
import { API_URL } from "../auth/authConstants";
import '../routes/Patient/dashboard.css'
import './navbar.css'


const Sidebar: React.FC = () => {
    const auth = useAuth();

    async function handleSignOut(e: React.MouseEvent<HTMLAnchorElement>) {
        e.preventDefault();
        const refreshToken = auth.getRefreshToken();

        try {
            const response = await fetch(`${API_URL}/signout`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${refreshToken}`,
                },
            });
            if (response.ok) {
                auth.signout();
            } else {
                const errorData = await response.json();
                console.error("Error al cerrar sesión:", errorData.error);
            }
        } catch (error) {
            console.log("Error en la solicitud:", error);
        }
    }

    return (
        <div className="sidebar">
            <Link to="#" className="navbar-login-button" onClick={handleSignOut}>
                Cerrar sesión
            </Link>
            <img src="../../images/logo3.png" alt="Descripción de la imagen" className="image" />
            <h2>Paciente</h2>
            <ul>
                <li><a href="/patient/dashboard">Incio</a></li>
                <li><a href="/patient/calendar">Agendar cita</a></li>
                <li><a href="/patient/historial-medico">Ver mi historial médico</a></li>
                <li><a href="/patient/historial-pagos">Historial de pagos</a></li>
                <li><a href="/patient/actualizar-datos">Actualizar datos personales</a></li>
                <li><a href="/patient/facturas-pendientes">Facturas pendientes</a></li>
            </ul>
        </div>
    );
};

export default Sidebar;
