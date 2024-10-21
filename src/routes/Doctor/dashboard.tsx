import React, { useEffect, useState } from "react";
import "/src/css/doc.css";
import { useAuth } from "../../auth/AuthProvider";
import Sidebar from "../../components/sidebarDoctor";
import { format } from 'date-fns';
import { API_URL } from '../../auth/authConstants';
import { es } from 'date-fns/locale';

const InicioD: React.FC = () => {
    const auth = useAuth();


    var citasPendientes = 0;
    var citasHoy = 0;





    const [citas, setCitas] = useState<{ id: number, dia: Date, hora: string, nombreDoctor: string, apellidoDoctor: string, estadoCita: number }[]>([]);
    const [, setErrorMessage] = useState<string>('');
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
        citas.map(cita => {

            const fechaCita = new Date(cita.dia); // Fecha de la cita
            const horaCita = cita.hora.split(':'); // Divide la hora en [hh, mm, ss]
            const fechaHoraCita = new Date(fechaCita); // Crea una nueva fecha con la misma fecha de la cita
            fechaHoraCita.setHours(Number(horaCita[0]), Number(horaCita[1]), 0, 0); // Ajusta la hora, minutos y segundos

            // Verifica que la cita esté activa y que la fecha y hora de la cita sean futuras o iguales a ahora
            citasPendientes = 1
        });
    }, []);



    const formattedDate = (date: Date | null) => {
        if (!date) return 'Fecha no disponible';
        return format(new Date(date), 'dd \'de\' MMMM \'de\' yyyy', { locale: es }); // Formato: 02 de octubre de 2024
    };

    return (
        <>
            <Sidebar />
            <div className="main-content">
                <header>
                    <h1>Bienvenido, <span id="doctor-name">Dr/a {auth.getUser()?.name + " " + auth.getUser()?.lastName}</span></h1>
                </header>
                <section className="info-cards">
                    <div className="card">
                        <h3>Pacientes Totales</h3>
                        <p id="total-patients">{citas.length}</p>
                    </div>
                    <div className="card">
                        <h3>Citas Totales</h3>
                        <p id="total-patients">{citas.length}</p>
                    </div>
                    <div className="card">
                        <h3>Citas Hoy</h3>
                        <p id="appointments-today">{citasHoy}</p>
                    </div>

                </section>
                
                    <div className="agenda-citas">
                        <h3>Próximas Citas</h3>
                        <ul>
                            {citas
                                .filter(cita => {
                                    const fechaCita = new Date(cita.dia); // Fecha de la cita
                                    const horaCita = cita.hora.split(':'); // Divide la hora en [hh, mm, ss]
                                    const fechaHoraCita = new Date(fechaCita); // Crea una nueva fecha con la misma fecha de la cita
                                    fechaHoraCita.setHours(Number(horaCita[0]), Number(horaCita[1]), 0, 0); // Ajusta la hora, minutos y segundos

                                    // Verifica que la cita esté activa y que la fecha y hora de la cita sean futuras o iguales a ahora
                                    return cita.estadoCita === 1 && fechaHoraCita >= new Date();
                                })
                                .map((cita) => (
                                    <li  key={cita.id}>
                                        <p><strong>Fecha:</strong> {formattedDate(cita.dia)}</p>
                                        <p><strong>Hora:</strong> {cita.hora}</p>
                                        <p><strong>Médico:</strong> {cita.nombreDoctor + " " + cita.apellidoDoctor}</p>
                                    </li>
                                ))}
                        </ul>
                        {citas.filter(cita => {
                            const fechaCita = new Date(cita.dia);
                            const horaCita = cita.hora.split(':');
                            const fechaHoraCita = new Date(fechaCita);
                            fechaHoraCita.setHours(Number(horaCita[0]), Number(horaCita[1]), 0, 0);
                            return cita.estadoCita === 1 && fechaHoraCita >= new Date();
                        }).length === 0 && (
                                <p>No tiene citas pendientes.</p> // Mensaje si no hay citas
                            )}
                    </div>
                
            </div>
        </>
    );
};

export default InicioD;
