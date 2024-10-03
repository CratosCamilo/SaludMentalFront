import React, { useState, useEffect } from "react";
import "/src/css/doc.css";

export interface CitaUser {
    id: number;
    NumeroCC: number;
    Nombre: string;
    Fecha: string;
    Hora: string;
    Estado: string;
}

const InicioD: React.FC = () => {
    const [showAppointments, setShowAppointments] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [patients, setPatients] = useState<CitaUser[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const fetchPatients = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/ModuloAdmin/MenuPaciente');
            const data = await response.json();
            if (response.ok) {
                setPatients(data.users);
            } else {
                setErrorMessage(data.error || 'Error al cargar los pacientes');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Ocurrió un error al cargar los pacientes');
        }
    };

    useEffect(() => {
        fetchPatients();
    }, []);

    const handleShowAppointments = () => {
        setShowAppointments(!showAppointments);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const filteredPatients = patients.filter(patient =>
        patient.Nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <div className="sidebar">
                <a href="#" className="logout-button">Cerrar sesión</a>
                <img src="../../images/logo3.png" alt="Descripción de la imagen" className="image" />
                <h2>Médico</h2>
                <ul>
                    <li><a href="inicio.html">Inicio</a></li>
                    <li><a href="pacientes.html">Pacientes</a></li>
                    <li><a href="citas.html">Citas</a></li>
                </ul>
            </div>
            <div className="main-content">
                <header>
                    <h1>Bienvenido, <span id="doctor-name">Dr. Smith</span></h1>
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
                <section className="search-section">
                    <input
                        type="text"
                        id="search-input"
                        placeholder="Buscar pacientes o citas..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <button id="search-button">Buscar</button>
                </section>
                <section className="appointments-section">
                    <h2>Citas</h2>
                    <button id="view-all-button" onClick={handleShowAppointments}>
                        {showAppointments ? "Ocultar citas" : "Ver todas las citas"}
                    </button>
                    {showAppointments && (
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Documento Paciente</th>
                                    <th>Nombre del Paciente</th>
                                    <th>Fecha</th>
                                    <th>Hora</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredPatients.map((patient) => (
                                    <tr key={patient.id}>
                                        <td>{patient.id}</td>
                                        <td>{patient.NumeroCC}</td>
                                        <td>{patient.Nombre}</td>
                                        <td>{patient.Fecha}</td>
                                        <td>{patient.Hora}</td>
                                        <td>{patient.Estado}</td>
                                        <td>
                                            <button onClick={() => {/* función para cancelar cita */ }}>Cancelar Cita</button>
                                            <a href={`historia-clinica.html?patient=${patient.Nombre}`}>
                                                <button>Ver Historia Clínica</button>
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                </section>
            </div>
        </>
    );
};

export default InicioD;