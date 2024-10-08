import React, { useEffect, useState } from 'react';
import { useAuth } from "../../auth/AuthProvider";
import { API_URL } from "../../auth/authConstants";

interface Appointment {
    id: string;
    patientName: string;
    date: string;
    status: string;
}

const AgendarCitas: React.FC = () => {
    const auth = useAuth();
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [newPatientName, setNewPatientName] = useState<string>("");
    const [newDate, setNewDate] = useState<string>("");


    async function fetchAppointments() {
        const accessToken = auth.getAccessToken();
        try {
            const response = await fetch(`${API_URL}/appointments`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setAppointments(data);
            } else {
                console.error("Error fetching appointments");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    // Add a new appointment
    async function addAppointment() {
        const accessToken = auth.getAccessToken();
        try {
            const response = await fetch(`${API_URL}/appointments`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    patientName: newPatientName,
                    date: newDate,
                    status: "pending"
                }),
            });
            if (response.ok) {
                const newAppointment = await response.json();
                setAppointments([...appointments, newAppointment]);
                setNewPatientName(""); // Clear the input fields
                setNewDate("");
            } else {
                console.error("Error adding appointment");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    // Delete an appointment by ID
    async function deleteAppointment(id: string) {
        const accessToken = auth.getAccessToken();
        try {
            const response = await fetch(`${API_URL}/appointments/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                },
            });
            if (response.ok) {
                setAppointments(appointments.filter(appointment => appointment.id !== id));
            } else {
                console.error("Error deleting appointment");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    useEffect(() => {
        fetchAppointments();
    }, []);

    const handleAddAppointment = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (newPatientName && newDate) {
            addAppointment();
        }
    };

    return (
        <div className="manage-appointments-container">
            <h2>Gestionar Citas</h2>

            {/* Formulario para agregar nueva cita */}
            <form onSubmit={handleAddAppointment} className="appointment-form">
                <input
                    type="text"
                    placeholder="Nombre del paciente"
                    value={newPatientName}
                    onChange={(e) => setNewPatientName(e.target.value)}
                    required
                />
                <input
                    type="datetime-local"
                    placeholder="Fecha de la cita"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    required
                />
                <button type="submit">Agregar Cita</button>
            </form>

            {/* Listado de citas */}
            <h3>Citas Programadas</h3>
            {appointments.length === 0 ? (
                <p>No hay citas programadas.</p>
            ) : (
                <ul className="appointments-list">
                    {appointments.map((appointment) => (
                        <li key={appointment.id} className="appointment-item">
                            <div>
                                <strong>Paciente:</strong> {appointment.patientName} <br />
                                <strong>Fecha:</strong> {new Date(appointment.date).toLocaleString()} <br />
                                <strong>Estado:</strong> {appointment.status}
                            </div>
                            <button onClick={() => deleteAppointment(appointment.id)} className="delete-btn">
                                Eliminar
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AgendarCitas;
