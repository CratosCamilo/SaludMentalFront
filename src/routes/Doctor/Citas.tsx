import React, { useEffect, useState } from "react";
import { useAuth } from '../../auth/AuthProvider';
import { API_URL } from '../../auth/authConstants';
import Sidebar from '../../components/sidebarDoctor';
import type { CitaDoctor } from "../../types/types";
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const Citas: React.FC = () => {
    const auth = useAuth();
    const [citas, setCitas] = useState<CitaDoctor[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>('');

    // Cargar citas al cargar la página
    const fetchCitas = async () => {
        try {
            const response = await fetch(`${API_URL}/Doctor/citas/${auth.getUser()?.username}`, {
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

    return (
        <>
            <Sidebar />
            <div className="main-content">
                <header>
                    <h1>CITAS DR/A {auth.getUser()?.name.toUpperCase() + " " + auth.getUser()?.lastName.toUpperCase()}</h1>
                </header>
                <section className="recent-appointments">
                    <table border={1}>
                        <thead>
                            <tr>
                                <th>Paciente</th>
                                <th>Fecha</th>
                                <th>Hora</th>
                                <th>Doctor</th>
                                <th>Servicio</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="appointments-list">
                            {citas.map(cita => (
                                <tr key={cita.idCita}>
                                    <td>{cita.nombrePaciente + " " + cita.apellidoPaciente}</td>
                                    <td>{formattedDate(cita.dia)}</td>
                                    <td>{formattedTime(cita.hora)}</td>
                                    <td>{auth.getUser()?.name + " " + auth.getUser()?.lastName}</td>
                                    <td>{cita.nombreServicio}</td>
                                    <td><button
                                        style={{
                                            backgroundColor: cita.estadoCita === 1 ? '#80b929' : '#b92938',
                                            color: 'white',
                                            border: 'none',
                                            padding: '5px 10px',
                                            cursor: 'pointer',
                                        }}

                                    >
                                        {cita.estadoCita === 1 ? 'Activo' : 'Inactivo'}
                                    </button></td>
                                    <td>
                                        <a href={`historia-clinica.html?patient=${cita.idCita}`}>
                                            <button>Ver</button>
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {errorMessage && <p>{errorMessage}</p>}
                </section>
            </div>
        </>
    );
};

export default Citas;
