import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from "../../auth/AuthProvider";
import { API_URL } from "../../auth/authConstants";
import './dashboard.css';

export default function Dashboard() {
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

    const getUserType = (roleId: number) => {
        switch (roleId) {
            case 1: return "Sisben";
            case 2: return "Afiliado";
            case 3: return "Particular";
            case 4: return "Otro"; // Ajusta según lo que necesites
            default: return "Desconocido";
        }
    };

    useEffect(() => {
        
    }, []);

    return (
        <>
            <div className="sidebar">
                <Link to="#" className="navbar-login-button" onClick={handleSignOut}>
                    Cerrar sesión
                </Link>
                <img src="../../images/logo3.png" alt="Descripción de la imagen" className="image" />
                <h2>Paciente</h2>
                <ul>
                    <li><a href="/patient/calendar">Agendar cita</a></li>
                    <li><a href="/patient/historial-medico">Ver mi historial médico</a></li>
                    <li><a href="/patient/historial-pagos">Historial de pagos</a></li>
                    <li><a href="/patient/actualizar-datos">Actualizar datos personales</a></li>
                    <li><a href="/patient/facturas-pendientes">Facturas pendientes</a></li>
                </ul>
            </div>

            <div className="main-content">
                <header>
                    <h4>
                        Bienvenido {auth.getUser()?.name ?? ""}, usted es {getUserType(auth.getUser()?.roleId ?? 0)} con número de identificación {auth.getUser()?.username ?? ""}
                    </h4>
                </header>
                <section className="info-cards">
                    <div className="card">
                        <h3>AGENDAR CITAS</h3>
                    </div>
                    <div className="card">
                        <h3>VER MI HISTORIAL MEDICO</h3>
                    </div>
                    <div className="card">
                        <h3>ACTUALIZAR DATOS PERSONALES</h3>
                    </div>
                </section>
            </div>
        </>
    );
}
