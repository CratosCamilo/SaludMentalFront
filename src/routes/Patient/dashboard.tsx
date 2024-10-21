import { useState, useEffect } from 'react';
import { useAuth } from "../../auth/AuthProvider"; // Esto sigue siendo necesario si usas autenticación
import Sidebar from '../../components/sidebar'; // Asumo que tu Sidebar ya está hecho
import './dashboard.css'; // Aquí puedes agregar tu CSS existente
import { API_URL } from '../../auth/authConstants';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

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
    const [citas, setCitas] = useState<{ id: number, dia: Date, hora: string, nombreDoctor: string, apellidoDoctor: string, estadoCita: number }[]>([]);
    const [, setErrorMessage] = useState<string>('');
    const fetchCitas = async () => {
        try {
            const response = await fetch(`${API_URL}/Pacient/citas/${auth.getUser()?.username}`, {
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
    const formattedDate = (date: Date | null) => {
        if (!date) return 'Fecha no disponible';
        return format(new Date(date), 'dd \'de\' MMMM \'de\' yyyy', { locale: es }); // Formato: 02 de octubre de 2024
    };

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
                                    {nivel === 1 && '😢'}
                                    {nivel === 2 && '😕'}
                                    {nivel === 3 && '😐'}
                                    {nivel === 4 && '🙂'}
                                    {nivel === 5 && '😁'}
                                </button>
                            ))}
                        </div>
                        <p>Tu nivel actual de bienestar es: {['Muy triste', 'Triste', 'Neutral', 'Feliz', 'Muy feliz'][estadoAnimo - 1]}</p>
                    </div>

                    {/* Agenda de Citas */}
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
                                    <li key={cita.id}>
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
                </section>
            </div>
        </>
    );
}
