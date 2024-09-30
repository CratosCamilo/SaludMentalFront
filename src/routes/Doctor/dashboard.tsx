import React, { useEffect, useState } from "react";
import "/src/css/doc.css";
import { useAuth } from "../../auth/AuthProvider";
import Sidebar from "../../components/sidebar";

const InicioD: React.FC = () => {
    const doctorId = 1234; //toca traer el cc del user registrado
    const [pendingAppointments, setPendingAppointments] = useState<number>(0);
    const [pacienttotal, setPacientTotal] = useState<number>(0);
    const [todayAppointments, setTodayAppointments] = useState<number>(0);

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleCantUser = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/doctor/cantUserT/${doctorId}`, {
                method: 'GET',
            });

            if (!response.ok) {
                throw new Error('Error al obtener la cantidad de usuarios');
            }

            const data = await response.json();
            setPacientTotal(data);
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Ocurrió un error al obtener la cantidad de usuarios.');
        }
    };

    const handleCantCitas = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/doctor/citasH/${doctorId}`, {
                method: 'GET',
            });

            if (!response.ok) {
                throw new Error('Error al obtener la cantidad de citas');
            }

            const data = await response.json();
            setTodayAppointments(data);
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Ocurrió un error al obtener las citas.');
        }
    }

    const handleCantConsultas = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/doctor/cantCitasT/${doctorId}`, {
                method: 'GET',
            });

            if (!response.ok) {
                throw new Error('Error al obtener la cantidad de consultas');
            }

            const data = await response.json();
            setPendingAppointments(data);
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Ocurrió un error al obtener las consultas.');
        }
    }

    useEffect(() => {
        handleCantUser();
        handleCantCitas();
        handleCantConsultas();
    }, []);

    return (
        <>
            <div className="sidebar">
                <a href="#" className="logout-button">Cerrar sesión</a>
                <img src="../../images/logo3.png" alt="Descripción de la imagen" className="image" />
                <h2>Médico</h2>
                <ul>
                    <li><a href="./dashboard">Inicio</a></li>
                    <li><a href="./pacientes">Pacientes</a></li>
                    <li><a href="./citas">Citas</a></li>
                </ul>
            </div>
            <div className="main-content">
                <header>
                    <h1>Bienvenido, <span id="doctor-name">Dr. Smith</span></h1>
                </header>
                <section className="info-cards">
                    <div className="card">
                        <h3>Pacientes Totales</h3>
                        <p id="total-patients">{pacienttotal}</p>
                    </div>
                    <div className="card">
                        <h3>Citas Hoy</h3>
                        <p id="appointments-today">{todayAppointments}</p>
                    </div>
                    <div className="card">
                        <h3>Citas Pendientes</h3>
                        <p id="pending-appointments">{pendingAppointments}</p>
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

export default InicioD;
