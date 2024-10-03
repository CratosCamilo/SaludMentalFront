import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from "../auth/AuthProvider";
import { API_URL } from "../auth/authConstants";
import '../routes/Patient/dashboard.css'
import './navbar.css'


const SidebarDoctor: React.FC = () => {
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
            <a className="logout-button"  onClick={handleSignOut}>Cerrar sesión</a>
            <img src="../../images/logo3.png" alt="Descripción de la imagen" className="image" />
            <h2>Médico</h2>
            <ul>
                <li><a href="./dashboard">Inicio</a></li>
                <li><a href="./pacientes">Pacientes</a></li>
                <li><a href="./citas">Citas</a></li>
            </ul>
        </div>
    );
};

export default SidebarDoctor;