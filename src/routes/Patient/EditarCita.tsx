import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { useAuth } from "../../auth/AuthProvider";
import { API_URL } from "../../auth/authConstants";
import Sidebar from '../../components/sidebar';
import { useNavigate, useParams } from 'react-router-dom';
import { es } from 'date-fns/locale';


const EditarCita: React.FC = () => {
    const { appointmentId } = useParams<{ appointmentId: string }>(); // Obtén el ID desde los parámetros de la URL
    const auth = useAuth();
    const navigate = useNavigate();

    // Estados necesarios
    const [doctors, setDoctors] = useState<{ CC: string; nombre: string; apellido: string; idEspecialidad: string }[]>([]);
    const [services, setServices] = useState<{ idServicio: string; nombreServicio: string; precioServicio: string; idEspecialidad: string }[]>([]);
    const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
    const [selectedService, setSelectedService] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<Date | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [servicePrice, setServicePrice] = useState<string | null>(null);
    const [serviceName, setServiceName] = useState<string | null>(null);
    const [hora, setHora] = useState<string | null>(null);
    const [dia, setDia] = useState<string | null>(null);
    const [doctor, setDoctor] = useState<string | null>(null);

    const fetchDoctors = async () => {
        try {
            const response = await fetch(`${API_URL}/Pacient/fetch-doctors`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth.getAccessToken()}`,
                },
            });
            const data = await response.json();
            if (response.ok) {
                setDoctors(data.body.data);
            }
        } catch (error) {
            console.error('Error al obtener la lista de doctores:', error);
        }
    };

    const fetchServices = async () => {
        try {
            const response = await fetch(`${API_URL}/Pacient/fetch-services`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth.getAccessToken()}`,
                },
            });
            const data = await response.json();
            if (response.ok) {
                setServices(data.body.data);
            }
        } catch (error) {
            console.error('Error al obtener la lista de servicios:', error);
        }
    };
    const fetchAppointmentDetails = async () => {
        try {
            const response = await fetch(`${API_URL}/Pacient/fetch-cita/${appointmentId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth.getAccessToken()}`,
                },
            });

            if (response.ok) {
                const appointment = await response.json();
                setSelectedDoctor(appointment.body.data[0].idDocCC);
                setSelectedService(appointment.body.data[0].idServicio);
            }
        } catch (error) {
            console.error('Error al obtener la cita:', error);
        }
    };


    useEffect(() => {
        fetchDoctors();
        fetchServices();
        fetchAppointmentDetails();
    }, [appointmentId, auth]);

    const handleSubmit = async () => {
        if (selectedDate && selectedTime && selectedDoctor && selectedService) {
            const selectedServicePrice = services.find(service => String(service.idServicio) === String(selectedService))?.precioServicio || '';
            const selectedServiceName = services.find(service => String(service.idServicio) === String(selectedService))?.nombreServicio || '';
            const formattedDate = format(selectedDate, "EEEE, d 'de' MMMM 'de' yyyy", { locale: es });


            const formattedTime = format(selectedTime, 'hh:mm a');
            setServicePrice(selectedServicePrice);
            setServiceName(selectedServiceName);
            setHora(formattedTime);
            setDia(formattedDate);
            const doctorName = doctors.find(doctor => String(doctor.CC) === String(selectedDoctor))?.nombre || '';
            const doctorSurname = doctors.find(doctor => String(doctor.CC) === String(selectedDoctor))?.apellido || '';
            setDoctor(doctorName + " " + doctorSurname);
            setIsModalOpen(true); // Abre el modal

        } else {
            alert('Por favor complete todos los campos antes de agendar la cita.');
        }
    };
    const getUserType = (roleId: number) => {
        switch (roleId) {
            case 1: return "Admin";
            case 2: return "Operario";
            case 3: return "Doctor";
            case 4: return "Paciente";
            default: return "Desconocido";
        }
    };
    const handleDoctorChange = (doctor: string) => {
        setSelectedDoctor(doctor);
        setSelectedTime(null); // Resetear la hora seleccionada
    };
    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
        setSelectedTime(null); // Resetear la hora seleccionada
    };
    const handleTimeSelect = (time: Date | null) => {
        setSelectedTime(time);
    };
    const [availableTimes, setAvailableTimes] = useState<Date[]>([]);
    useEffect(() => {
        if (selectedDoctor && selectedDate) {
            generateAvailableTimes(selectedDate, selectedDoctor);
        }
    }, [selectedDoctor, selectedDate]);  // Monitorea cambios en el doctor o la fecha
    const generateAvailableTimes = async (selectedDate: Date, selectedDoctor: string) => {
        if (!selectedDate || !selectedDoctor) return [];

        const formattedDate = format(selectedDate, 'yyyy-MM-dd');
        try {
            const response = await fetch(`${API_URL}/Pacient/fetch-available-times/${formattedDate}/${selectedDoctor}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth.getAccessToken()}`,
                },
            });
            const data = await response.json();
            if (response.ok) {
                const times = data.body.data.map((time: string) => {
                    const [hours, minutes] = time.split(':').map(Number);
                    const date = new Date(selectedDate);
                    date.setHours(hours, minutes, 0, 0);
                    return date;
                });
                setAvailableTimes(times);
            }
        } catch (error) {
            console.error('Error al obtener horas disponibles:', error);
        }
    };

    const confirmAppointment = async () => {
        if (selectedDate && selectedTime && selectedDoctor && selectedService) {
            const formattedDate = format(selectedDate, 'yyyy-MM-dd');
            const formattedTime = format(selectedTime, 'HH:mm');

            const appointmentData = {
                dia: formattedDate,
                hora: formattedTime,
            };

            try {
                const response = await fetch(`${API_URL}/Pacient/edit/${appointmentId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${auth.getAccessToken()}`
                    },
                    body: JSON.stringify(appointmentData)
                });

                const data = await response.json();

                if (response.ok) {
                    alert(`Cita reagendada con éxito con el Dr./Dra. ${doctors.find(doctor => String(doctor.CC) === String(selectedDoctor))?.nombre} para el ${formattedDate} a las ${formattedTime}`);
                    navigate(`/patient/citas`)
                } else {
                    alert(`Error al agendar la cita: ${data.message}`);
                }
            } catch (error) {
                console.error('Error al agendar la cita:', error);
                alert('Error en la solicitud de agendar cita. Por favor, inténtelo más tarde.');
            }
        } else {
            alert('Por favor complete todos los campos antes de agendar la cita.');
        }
    };

    return (

        <>
            <Sidebar />
            <div className="calendar-container">
                <header>
                    <h4>
                        Bienvenido {auth.getUser()?.name ?? ""}, usted es {getUserType(auth.getUser()?.roleId ?? 0)} con número de identificación {auth.getUser()?.username ?? ""}
                    </h4>
                </header>
                <h1>Seleccione un servicio, un doctor, una fecha y una hora para su cita</h1>

                {/* Select para elegir servicio */}
                <div className="service-select-wrapper">
                    <label htmlFor="service-select">Seleccione un Servicio:</label>
                    <select
                        id="service-select"
                        value={selectedService || ''}
                        onChange={(e) => setSelectedService(e.target.value)}
                        disabled
                    >
                        <option value="" disabled>Seleccione un servicio</option>
                        {services.map((service) => (
                            <option key={service.idServicio} value={service.idServicio}>
                                {service.nombreServicio}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Select para elegir doctor */}
                {selectedService && (
                    <div className="doctor-select-wrapper">
                        <label htmlFor="doctor-select">Seleccione un Doctor:</label>
                        <select
                            id="doctor-select"
                            value={selectedDoctor || ''}
                            onChange={(e) => handleDoctorChange(e.target.value)}
                            disabled
                        >
                            <option value="" disabled>Seleccione un doctor</option>
                            {doctors.map((doctor) => {
                                const serviceEspecialidad = services.find(service => String(service.idServicio) === String(selectedService))?.idEspecialidad;
                                if (String(doctor.idEspecialidad) === String(serviceEspecialidad)) {
                                    return (
                                        <option key={doctor.CC} value={doctor.CC}>
                                            {doctor.nombre} {doctor.apellido}
                                        </option>
                                    );
                                }
                                return null; // No mostrar doctores que no coinciden en especialidad
                            })}
                        </select>
                    </div>
                )}

                {selectedDoctor && (
                    <>
                        <h2>Seleccione una fecha para su cita</h2>
                        <div className="date-picker-wrapper">
                            <div className="large-calendar">
                                <DatePicker
                                    selected={selectedDate}
                                    onChange={handleDateChange}
                                    inline
                                    minDate={new Date()}
                                    filterDate={(date) => date.getDay() !== 0} // No permitir domingos
                                />
                            </div>
                            {selectedDate && (
                                <div className="time-picker-wrapper">
                                    <h2>Seleccione una hora</h2>
                                    <DatePicker
                                        selected={selectedTime}
                                        onChange={handleTimeSelect}
                                        showTimeSelect
                                        showTimeSelectOnly
                                        includeTimes={availableTimes}
                                        timeCaption="Hora"
                                        dateFormat="h:mm aa"
                                        placeholderText="Seleccione una hora"
                                    />
                                </div>
                            )}
                        </div>
                    </>
                )}
                {isModalOpen && (
                    <div className="modal">
                        <div className="modal-content">
                            <h2>Confirmar Cita</h2>
                            <p>Está a punto de agendar una cita para {serviceName?.toLocaleLowerCase()}.</p>
                            <p><strong>Doctor: </strong>{doctor}.</p>
                            <p><strong>Precio del servicio:</strong> {servicePrice}</p>
                            <p><strong>Dia:</strong> {dia}</p>
                            <p><strong>Hora:</strong> {hora}</p>

                            <div className="modal-buttons">
                                <button onClick={confirmAppointment}>Aceptar</button>
                                <button onClick={() => setIsModalOpen(false)}>Cancelar</button>
                            </div>
                        </div>
                    </div>
                )}

                <button
                    className="schedule-button"
                    onClick={handleSubmit}
                    disabled={!selectedDate || !selectedTime || !selectedDoctor || !selectedService}
                >
                    Volver a agendar cita
                </button>
                <button
                    className="schedule-button"
                    onClick={() => navigate(`/patient/citas`)} 
                >
                    Cancelar
                </button>

            </div>
        </>
    );
};

export default EditarCita;
