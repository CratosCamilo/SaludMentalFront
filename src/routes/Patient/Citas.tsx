import React, { useEffect, useState } from "react";
import { useAuth } from '../../auth/AuthProvider';
import { API_URL } from '../../auth/authConstants';
import Sidebar from '../../components/sidebar';
import type { Cita } from "../../types/types";
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    TablePagination,
} from '@mui/material';


const CitasPaciente: React.FC = () => {

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [page2, setPage2] = React.useState(0);
    const [rowsPerPage2, setRowsPerPage2] = React.useState(5);



    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const handleChangePage2 = (_event: unknown, newPage: number) => {
        setPage2(newPage);
    };

    const handleChangeRowsPerPage2 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage2(+event.target.value);
        setPage2(0);
    };

    const auth = useAuth();
    const [citas, setCitas] = useState<Cita[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const navigate = useNavigate(); // Asegúrate de que esto esté definido
    // Cargar citas al cargar la página
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
                    <h1>CITAS PACIENTE {auth.getUser()?.name.toUpperCase() + " " + auth.getUser()?.lastName.toUpperCase()}</h1>
                </header>

                <section className="recent-appointments">
                    <h2>Citas Pendientes</h2>
                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        <TableContainer sx={{ maxHeight: 1440 }}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead >
                                    <TableRow>
                                        <TableCell sx={{ backgroundColor: '#2980b9', color: 'white' }}>Doctor</TableCell>
                                        <TableCell sx={{ backgroundColor: '#2980b9', color: 'white' }}>Fecha</TableCell>
                                        <TableCell sx={{ backgroundColor: '#2980b9', color: 'white' }}>Hora</TableCell>
                                        <TableCell sx={{ backgroundColor: '#2980b9', color: 'white' }}>Paciente</TableCell>
                                        <TableCell sx={{ backgroundColor: '#2980b9', color: 'white' }}>Servicio</TableCell>
                                        <TableCell sx={{ backgroundColor: '#2980b9', color: 'white' }}>Estado</TableCell>
                                        <TableCell sx={{ backgroundColor: '#2980b9', color: 'white' }}>Acciones</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {citas
                                        .filter(cita => {
                                            const fechaCita = new Date(cita.dia); // Fecha de la cita
                                            const horaCita = cita.hora.split(':'); // Divide la hora en [hh, mm, ss]
                                            const fechaHoraCita = new Date(fechaCita); // Crea una nueva fecha con la misma fecha de la cita
                                            fechaHoraCita.setHours(Number(horaCita[0]), Number(horaCita[1]), 0, 0); // Ajusta la hora, minutos y segundos
                                        
                                            // Verifica que la cita esté activa y que la fecha y hora de la cita sean futuras o iguales a ahora
                                            return cita.estadoCita === 1 && fechaHoraCita >= new Date();
                                        })                                        
                                        .slice(page2 * rowsPerPage2, page2 * rowsPerPage2 + rowsPerPage2)
                                        .map(cita => {
                                            const estadoCita = 'Activa';
                                            const backgroundColor = '#f7d47c';
                                            return (

                                                <TableRow hover role="checkbox" tabIndex={-1} key={cita.idCita}>
                                                    <TableCell>{cita.nombreDoctor} {cita.apellidoDoctor}</TableCell>
                                                    <TableCell>{formattedDate(cita.dia)}</TableCell>
                                                    <TableCell>{formattedTime(cita.hora)}</TableCell>
                                                    <TableCell>{cita.nombrePaciente} {cita.apellidoPaciente}</TableCell>
                                                    <TableCell> {cita.nombreServicio}</TableCell>
                                                    <TableCell> <Button
                                                        style={{
                                                            backgroundColor: backgroundColor,
                                                            color: 'white',
                                                            border: 'none',
                                                            padding: '5px 10px',
                                                            cursor: 'pointer',
                                                            width: 100
                                                        }}
                                                    >
                                                        {estadoCita}
                                                    </Button></TableCell>
                                                    <TableCell> <Button variant="outlined" onClick={() => navigate(`/patient/editar-cita/${cita.idCita}`)}>Editar</Button> </TableCell>
                                                </TableRow>
                                            )
                                        })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={citas.length}
                            rowsPerPage={rowsPerPage2}
                            page={page2}
                            onPageChange={handleChangePage2}
                            onRowsPerPageChange={handleChangeRowsPerPage2}
                        />
                    </Paper>
                </section>
                {/* Citas Canceladas o Realizadas */}
                <section className="recent-appointments">
                    <h2>Citas Canceladas o Realizadas</h2>
                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        <TableContainer sx={{ maxHeight: 1440 }}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead >
                                    <TableRow>
                                        <TableCell sx={{ backgroundColor: '#2980b9', color: 'white' }}>Doctor</TableCell>
                                        <TableCell sx={{ backgroundColor: '#2980b9', color: 'white' }}>Fecha</TableCell>
                                        <TableCell sx={{ backgroundColor: '#2980b9', color: 'white' }}>Hora</TableCell>
                                        <TableCell sx={{ backgroundColor: '#2980b9', color: 'white' }}>Paciente</TableCell>
                                        <TableCell sx={{ backgroundColor: '#2980b9', color: 'white' }}>Servicio</TableCell>
                                        <TableCell sx={{ backgroundColor: '#2980b9', color: 'white' }}>Estado</TableCell>
                                        <TableCell sx={{ backgroundColor: '#2980b9', color: 'white' }}>Acciones</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {citas
                                        .filter(cita => {
                                            const fechaCita = new Date(cita.dia); // Fecha de la cita
                                            const horaCita = cita.hora.split(':'); // Divide la hora en [hh, mm, ss]
                                            const fechaHoraCita = new Date(fechaCita); // Crea una nueva fecha con la misma fecha de la cita
                                            fechaHoraCita.setHours(Number(horaCita[0]), Number(horaCita[1]), 0, 0); // Ajusta la hora, minutos y segundos
                                        
                                            // Verifica que la cita esté cancelada o que la fecha y hora de la cita sean pasadas
                                            return cita.estadoCita === 0 || fechaHoraCita < new Date();
                                        })                                        
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map(cita => {
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

                                                <TableRow hover role="checkbox" tabIndex={-1} key={cita.idCita}>
                                                    <TableCell>{cita.nombreDoctor} {cita.apellidoDoctor}</TableCell>
                                                    <TableCell>{formattedDate(cita.dia)}</TableCell>
                                                    <TableCell>{formattedTime(cita.hora)}</TableCell>
                                                    <TableCell>{cita.nombrePaciente} {cita.apellidoPaciente}</TableCell>
                                                    <TableCell> {cita.nombreServicio}</TableCell>
                                                    <TableCell> <Button
                                                        style={{
                                                            backgroundColor: backgroundColor,
                                                            color: 'white',
                                                            border: 'none',
                                                            padding: '5px 10px',
                                                            cursor: 'pointer',
                                                            width: 100
                                                        }}
                                                    >
                                                        {estadoCita}
                                                    </Button></TableCell>
                                                    <TableCell> <Button variant="outlined" onClick={() => alert("Solo se pueden editar citas pendientes")}>Editar</Button> </TableCell>
                                                </TableRow>
                                            )
                                        })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={citas.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>
                </section>


                {errorMessage && <p>{errorMessage}</p>}
            </div>
        </>
    );
};

export default CitasPaciente;