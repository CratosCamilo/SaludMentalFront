import React, { useEffect, useRef, useState } from "react";
import "/src/css/doc.css";

interface PacienteData {
    id: number;
    idCita: string;
    documento: number;
    nombre: string;
    fecha: string;
    hora: string;
    estadoCita: string;
}

const Paciente: React.FC = () => {
    const doctorId = 1234; //toca traer el cc del user registrado

    const [pacientes, setPacientes] = useState<PacienteData[]>([]);
    const slidersRef = useRef<HTMLDivElement[]>([]);
    const buttonNextRef = useRef<HTMLImageElement | null>(null);
    const buttonBeforeRef = useRef<HTMLImageElement | null>(null);

    const handleMostrarPacientes = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/doctor/citas/${doctorId}`, {
                method: 'GET',
            });

            if (!response.ok) {
                throw new Error('Error al obtener la lista de pacientes');
            }

            const data = await response.json();
            setPacientes(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        handleMostrarPacientes();
    }, []);

    return (
        <>
            <div className="sidebar">
                <a href="#" className="logout-button">Cerrar sesión</a>
                <img src="../../images/logo3.png" alt="Descripción de la imagen" className="image"/>
                <h2>Médico</h2>
                <ul>
                    <li><a href="./dashboard">Inicio</a></li>
                    <li><a href="./pacientes">Pacientes</a></li>
                    <li><a href="./citas">Citas</a></li>
                </ul>
            </div>
            <div className="main-content">
                <header>
                    <h1>PACIENTES</h1>
                </header>
                <section className="recent-appointments">
                    <h2>Buscar Paciente</h2>
                    <input type="text" id="search-input" placeholder="Buscar por nombre..." />
                    <button id="search-button">Buscar</button>
                    <table>
                        <thead>
                            <tr>
                                <th>Id Cita</th>
                                <th>Documento del Paciente</th>
                                <th>Nombre del Paciente</th>
                                <th>Fecha</th>
                                <th>Hora</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="appointments-list">
                            {pacientes.map(paciente => (
                                <tr key={paciente.id}>
                                    <td>{paciente.idCita}</td>
                                    <td>{paciente.documento}</td>
                                    <td>{paciente.nombre}</td>
                                    <td>{paciente.fecha}</td>
                                    <td>{paciente.hora}</td>
                                    <td>{paciente.estadoCita}</td>
                                    <td>
                                        <a href={`historia-clinica.html?patient=${paciente.nombre}`}>
                                            <button>Ver</button>
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </div>
        </>
    );
};

export default Paciente;