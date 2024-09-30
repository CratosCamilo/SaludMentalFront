import React, { useState, useEffect } from 'react';
import { useAuth } from "../../auth/AuthProvider"; // Esto sigue siendo necesario si usas autenticación
import Sidebar from '../../components/sidebar'; // Asumo que tu Sidebar ya está hecho
import './dashboard.css'; // Aquí puedes agregar tu CSS existente

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

    // Panel de Bienestar
    const [estadoAnimo, setEstadoAnimo] = useState(4); // Estado de ánimo por defecto

    const cambiarEstadoAnimo = (nuevoEstado: number) => {
        setEstadoAnimo(nuevoEstado);
    };

    // Agenda de Citas
    const [citas, setCitas] = useState<{ id: number, fecha: string, hora: string, medico: string }[]>([]);

    useEffect(() => {
        // Simula llamada a API para obtener las citas
        const citasSimuladas = [
            { id: 1, fecha: '2024-09-30', hora: '10:00 AM', medico: 'Dr. Juan Perez' },
            { id: 2, fecha: '2024-10-05', hora: '02:00 PM', medico: 'Dra. Ana López' }
        ];
        setCitas(citasSimuladas);
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

                {/* Panel de Bienestar */}
                <section className="dashboard-secciones">
                    <div className="bienestar-panel">
                        <h3>Tu Estado de Bienestar</h3>
                        <p>¿Cómo te sientes hoy?</p>
                        <div className="estado-animo">
                            {[1, 2, 3, 4, 5].map((nivel) => (
                                <button 
                                    key={nivel} 
                                    className={`estado-btn ${estadoAnimo === nivel ? 'activo' : ''}`}
                                    onClick={() => cambiarEstadoAnimo(nivel)}
                                >
                                    {nivel}
                                </button>
                            ))}
                        </div>
                        <p>Tu nivel actual de bienestar es: {estadoAnimo}</p>
                    </div>

                    {/* Agenda de Citas */}
                    <div className="agenda-citas">
                        <h3>Próximas Citas</h3>
                        <ul>
                            {citas.map((cita) => (
                                <li key={cita.id}>
                                    <p><strong>Fecha:</strong> {cita.fecha}</p>
                                    <p><strong>Hora:</strong> {cita.hora}</p>
                                    <p><strong>Médico:</strong> {cita.medico}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            </div>
        </>
    );
}
