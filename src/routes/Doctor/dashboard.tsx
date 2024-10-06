import React, { useEffect, useState } from "react";
import "/src/css/doc.css";
import { useAuth } from "../../auth/AuthProvider";
import Sidebar from "../../components/sidebarDoctor";

const InicioD: React.FC = () => {
    const auth = useAuth();

    const doctorId = 1234; //toca traer el cc del user registrado
    const [pendingAppointments, setPendingAppointments] = useState<number>(0);
    const [pacienttotal, setPacientTotal] = useState<number>(0);
    const [todayAppointments, setTodayAppointments] = useState<number>(0);

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
        }
    }

    useEffect(() => {
        handleCantUser();
        handleCantCitas();
        handleCantConsultas();
    }, []);

    return (
        <>
            <Sidebar/>
            <div className="main-content">
                <header>
                    <h1>Bienvenido, <span id="doctor-name">Dr/a {auth.getUser()?.name + " " + auth.getUser()?.lastName}</span></h1>
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
