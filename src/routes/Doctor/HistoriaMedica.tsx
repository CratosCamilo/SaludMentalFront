import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Grid, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Sidebar from "../../components/sidebarDoctor";
import "/src/css/doc.css";
import { API_URL } from '../../auth/authConstants';

const HistoriaMedicaForm = () => {
    const { idUsuarioCC } = useParams();
    const [horaRevision, setHoraRevision] = useState('');
    const [historiaMedica, setHistoriaMedica] = useState({
        tipoSangre: '',
        genero: '',
        fecha_Nac: '',
        discapacidad: '',
        fecha_Rev: '',
        hora_Rev: '',
        motivo: '',
        descripcion_Motivo: '',
        presion_Sangre: '',
        presion_Sangre_Prom: '',
        pulso: '',
        saturacion: '',
        altura: '',
        peso: '',
        perinatales: '',
        patologicos: '',
        quirurgicos: '',
        vacunas: '',
        familiares: '',
        conclusion: ''
    });
    const navigate = useNavigate();

    const fetchHistoriaMedica = async () => {
        try {
            const response = await fetch(`${API_URL}/Doctor/historial-medico/${idUsuarioCC}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();

            if (response.ok) {
                // Formatear la fecha de nacimiento
                const formattedData = {
                    ...data.body.data,
                    fecha_Nac: new Date(data.body.data.fecha_Nac).toISOString().split('T')[0], // Formato YYYY-MM-DD
                };

                setHistoriaMedica(formattedData);
            } else {
                console.error(data.error || 'Error al cargar la historia médica');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchHistoriaMedica(); // Llama a la función que hace la solicitud
    }, [idUsuarioCC]);

    useEffect(() => {
        // Obtén la hora actual sin segundos
        const currentTime = new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        });
        setHoraRevision(currentTime);
    }, []);

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setHistoriaMedica((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        // Realiza la petición para guardar o actualizar la historia médica.
        fetch(`/api/historiaMedica/${idUsuarioCC}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(historiaMedica),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Historia médica guardada:', data);
                 // Regresa a la pantalla anterior después de guardar.
            })
            .catch(error => {
                console.error('Error al guardar la historia médica:', error);
            });
    };

    return (
        <>
            <Sidebar />
            <div className="main-content">
                <form onSubmit={handleSubmit}>
                    <Typography variant="h4">Historia Médica</Typography>

                    <Box
                        component="form"
                        sx={{ '& > :not(style)': { m: 1, width: '60ch' } }}
                        noValidate
                        autoComplete="off"
                    >
                        <Grid container spacing={2} mt={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Tipo de Sangre"
                                    name="tipoSangre"
                                    value={historiaMedica.tipoSangre}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Género"
                                    name="genero"
                                    value={historiaMedica.genero}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Fecha de Nacimiento"
                                    name="fecha_Nac"
                                    value={historiaMedica.fecha_Nac}
                                    onChange={handleChange}
                                    type="date"
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Discapacidad"
                                    name="discapacidad"
                                    value={historiaMedica.discapacidad}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Hora de Revisión"
                                    name="hora_Rev"
                                    value={horaRevision}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Motivo de Consulta"
                                    name="motivo"
                                    value={historiaMedica.motivo}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Descripción del Motivo"
                                    name="descripcion_Motivo"
                                    value={historiaMedica.descripcion_Motivo}
                                    onChange={handleChange}
                                    multiline
                                    rows={3}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Presión Arterial"
                                    name="presion_Sangre"
                                    value={historiaMedica.presion_Sangre}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Presión Arterial Promedio"
                                    name="presion_Sangre_Prom"
                                    value={historiaMedica.presion_Sangre_Prom}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    label="Pulso"
                                    name="pulso"
                                    value={historiaMedica.pulso}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    label="Saturación"
                                    name="saturacion"
                                    value={historiaMedica.saturacion}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    label="Altura (cm)"
                                    name="altura"
                                    value={historiaMedica.altura}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    label="Peso (kg)"
                                    name="peso"
                                    value={historiaMedica.peso}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Perinatales"
                                    name="perinatales"
                                    value={historiaMedica.perinatales}
                                    onChange={handleChange}
                                    multiline
                                    rows={3}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Patológicos"
                                    name="patologicos"
                                    value={historiaMedica.patologicos}
                                    onChange={handleChange}
                                    multiline
                                    rows={3}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Quirúrgicos"
                                    name="quirurgicos"
                                    value={historiaMedica.quirurgicos}
                                    onChange={handleChange}
                                    multiline
                                    rows={3}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Vacunas"
                                    name="vacunas"
                                    value={historiaMedica.vacunas}
                                    onChange={handleChange}
                                    multiline
                                    rows={3}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Familiares"
                                    name="familiares"
                                    value={historiaMedica.familiares}
                                    onChange={handleChange}
                                    multiline
                                    rows={3}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Conclusiones"
                                    name="conclusion"
                                    value={historiaMedica.conclusion}
                                    onChange={handleChange}
                                    multiline
                                    rows={3}
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                        <Button onClick={() => { navigate("/Doctor/citas")}} type="submit" variant="contained" color="primary">
                            Guardar Historia Médica
                        </Button>
                    </Box>
                </form>
            </div>
        </>
    );
};

export default HistoriaMedicaForm;
