import React, { useEffect, useState } from "react";
import { useAuth } from '../../auth/AuthProvider';
import { API_URL } from '../../auth/authConstants';
import Sidebar from '../../components/sidebarSecretary';
import type { Cita } from "../../types/types";
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';


const CitasOperario: React.FC = () => {
    const auth = useAuth();
    const [citas, setCitas] = useState<Cita[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const navigate = useNavigate(); // Asegúrate de que esto esté definido
    // Cargar citas al cargar la página
    const fetchCitas = async () => {
        try {
            const response = await fetch(`${API_URL}/Secretary/citas`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth.getAccessToken()}`,
                },
            });
            const data = await response.json();
            if (response.ok) {
                setCitas(data.body.data);
            } else {
                setErrorMessage(data.error || 'Error al cargar las citas');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Ocurrió un error al cargar las citas');
        }
    };

    useEffect(() => {
        fetchCitas();
    }, []);

    // Formatear la fecha
    const formattedDate = (date: Date | null) => {
        if (!date) return 'Fecha no disponible';
        return format(new Date(date), 'dd \'de\' MMMM \'de\' yyyy', { locale: es }); // Formato: 02 de octubre de 2024
    };

    // Función para convertir hora en formato 'HH:MM:SS' a Date
    const convertTimeToDate = (time: string) => {
        const [hours, minutes] = time.split(':').map(Number);
        const date = new Date();
        date.setHours(hours, minutes, 0, 0); // Establece horas y minutos
        return date;
    };

    // Formatear la hora
    const formattedTime = (time: string | null) => {
        if (!time) return 'Hora no disponible';
        const date = convertTimeToDate(time); // Convierte la hora a un objeto Date
        return format(date, 'hh:mm a'); // Formato: 02:30 PM
    };
    const today = new Date(); // Obtener la fecha actual
    const toggleCitaState = async (idCita: number) => {
        const confirmToggle = window.confirm('¿Estás seguro de que deseas cambiar el estado de la cita?');

        if (confirmToggle) {
            try {
                const response = await fetch(`${API_URL}/Secretary/toggle-status-cita/${idCita}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${auth.getAccessToken()}`,
                    },
                });

                const data = await response.json();
                if (response.ok) {

                    fetchCitas();
                } else {
                    setErrorMessage(data.error || 'Error al actualizar el estado de la cita');
                }
            } catch (error) {
                console.error("Error:", error);
                setErrorMessage("Ocurrió un error al actualizar el estado de la cita");
            }
        }
    };

    return (
        <>
            <Sidebar />
            <div className="main-content">
                <header>
                    <h1>CITAS PACIENTE {auth.getUser()?.name.toUpperCase() + " " + auth.getUser()?.lastName.toUpperCase()}</h1>
                </header>
                <section className="recent-appointments">
                    <h2>Citas Pendientes</h2>
                    <table border={1}>
                        <thead>
                            <tr>
                                <th>Doctor</th>
                                <th>Fecha</th>
                                <th>Hora</th>
                                <th>Paciente</th>
                                <th>Servicio</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="appointments-list">
                            {citas.filter(cita => cita.estadoCita === 1 && new Date(cita.dia) >= today).map(cita => {
                                const estadoCita = 'Activa';
                                const backgroundColor = '#f7d47c'; // Amarillo

                                return (
                                    <tr key={cita.idCita}>
                                        <td>{cita.nombreDoctor + " " + cita.apellidoDoctor}</td>
                                        <td>{formattedDate(cita.dia)}</td>
                                        <td>{formattedTime(cita.hora)}</td>
                                        <td>{cita.nombrePaciente + " " + cita.apellidoPaciente}</td>
                                        <td>{cita.nombreServicio}</td>
                                        <td>
                                            <button
                                                style={{
                                                    backgroundColor: backgroundColor,
                                                    color: 'white',
                                                    border: 'none',
                                                    padding: '5px 10px',
                                                    cursor: 'pointer',
                                                }}
                                                onClick={() => toggleCitaState(cita.idCita)}
                                            >
                                                {estadoCita}
                                            </button>
                                        </td>
                                        <td>
                                            <button onClick={() => navigate(`/secretary/editar-cita/${cita.idCita}`)}>Editar</button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </section>
                {/* Citas Canceladas o Realizadas */}
                <section className="recent-appointments">
                    <h2>Citas Canceladas o Realizadas</h2>
                    <table border={1}>
                        <thead>
                            <tr>
                                <th>Doctor</th>
                                <th>Fecha</th>
                                <th>Hora</th>
                                <th>Paciente</th>
                                <th>Servicio</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="appointments-list">
                            {citas.filter(cita => cita.estadoCita === 0 || new Date(cita.dia) < today).map(cita => {
                                let estadoCita;
                                let backgroundColor;

                                if (cita.estadoCita === 0) {
                                    estadoCita = 'Cancelada';
                                    backgroundColor = '#b92938'; // Rojo
                                } else {
                                    estadoCita = 'Realizada';
                                    backgroundColor = '#80b929'; // Verde
                                }

                                return (
                                    <tr key={cita.idCita}>
                                        <td>{cita.nombreDoctor + " " + cita.apellidoDoctor}</td>
                                        <td>{formattedDate(cita.dia)}</td>
                                        <td>{formattedTime(cita.hora)}</td>
                                        <td>{cita.nombrePaciente + " " + cita.apellidoPaciente}</td>
                                        <td>{cita.nombreServicio}</td>
                                        <td>
                                            <button
                                                style={{
                                                    backgroundColor: backgroundColor,
                                                    color: 'white',
                                                    border: 'none',
                                                    padding: '5px 10px',
                                                    cursor: 'pointer',
                                                }}
                                                onClick={() => toggleCitaState(cita.idCita)}
                                            >
                                                {estadoCita}
                                            </button>
                                        </td>
                                        <td>
                                            <button onClick={() => alert("Solo se pueden editar citas pendientes")}>Editar</button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </section>

                {/* Citas Futuras */}


                {errorMessage && <p>{errorMessage}</p>}
            </div>

        </>
    );
};

export default CitasOperario;