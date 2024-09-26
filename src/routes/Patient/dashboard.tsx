import React, { useEffect } from 'react';
import { useAuth } from "../../auth/AuthProvider";
import Sidebar from '../../components/sidebar'; // Importar el nuevo componente Sidebar
import './dashboard.css';

export default function Dashboard() {
    const auth = useAuth();

    const getUserType = (roleId: number) => {
        switch (roleId) {
            case 1: return "Admin";
            case 2: return "Operario";
            case 3: return "Doctor";
            case 4: return "Paciente";
            default: return "Desconocido";
        }
    };  

    useEffect(() => {
        // Cualquier lógica de efecto necesario
    }, []);

    return (
        <>
            <Sidebar />

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
