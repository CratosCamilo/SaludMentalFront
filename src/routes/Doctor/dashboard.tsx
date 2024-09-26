import React, { useEffect, useRef } from "react";
import "/src/css/doc.css";
import { useAuth } from "../../auth/AuthProvider";
import Sidebar from "../../components/sidebar";

const InicioD: React.FC = () => {
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
    const slidersRef = useRef<HTMLDivElement[]>([]);
    const buttonNextRef = useRef<HTMLImageElement | null>(null);
    const buttonBeforeRef = useRef<HTMLImageElement | null>(null);

    return (
        <>
            <Sidebar/>
            <div className="main-content">
                <header>
                    <h1>Bienvenido, doctor/a <span id="doctor-name">{auth.getUser()?.name ?? ""}</span></h1>
                </header>
                <section className="info-cards">
                    <div className="card">
                        <h3>Pacientes Totales</h3>
                        <p id="total-patients">150</p>
                    </div>
                    <div className="card">
                        <h3>Citas Hoy</h3>
                        <p id="appointments-today">8</p>
                    </div>
                    <div className="card">
                        <h3>Citas Pendientes</h3>
                        <p id="pending-appointments">20</p>
                    </div>
                </section>
                <section className="recent-appointments">
                    <h2>Próximas citas</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Nombre del Paciente</th>
                                <th>Fecha</th>
                                <th>Hora</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="appointments-list">
                            <tr>
                                <td>Juan Pérez</td>
                                <td>2024-08-30</td>
                                <td>10:00 AM</td>
                                <td><a href="historia-clinica.html?patient=Juan Perez"><button>Ver</button></a></td>
                            </tr>
                            <tr>
                                <td>María Gómez</td>
                                <td>2024-08-30</td>
                                <td>11:00 AM</td>
                                <td><a href="historia-clinica.html?patient=Maria Gomez"><button>Ver</button></a></td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </div>
        </>

    );
};

<script src="js/dark-mode.js"></script>

export default InicioD;