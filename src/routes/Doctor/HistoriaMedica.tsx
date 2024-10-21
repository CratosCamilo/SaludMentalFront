import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Grid, Typography } from '@mui/material';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Sidebar from "../../components/sidebarDoctor";
import "/src/css/doc.css";

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

    useEffect(() => {
        // Realiza la solicitud para obtener la historia médica del paciente si existe.
        fetch(`/api/historiaMedica/${idUsuarioCC}`)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    setHistoriaMedica(data);
                }
            })
            .catch(error => {
                console.error('Error fetching historia médica:', error);
            });
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
                navigate(-1); // Regresa a la pantalla anterior después de guardar.
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
                                type=''
                                defaultValue={historiaMedica.tipoSangre}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Género"
                                name="genero"
                                type=''
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
                                type=''
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
                                type=''
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
                                type=''
                                value={historiaMedica.presion_Sangre}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Presión Arterial Promedio"
                                name="presion_Sangre_Prom"
                                type=''
                                value={historiaMedica.presion_Sangre_Prom}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Pulso"
                                name="pulso"
                                type=''
                                value={historiaMedica.pulso}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Saturación"
                                name="saturacion"
                                type=''
                                value={historiaMedica.saturacion}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Altura (cm)"
                                name="altura"
                                type=''
                                value={historiaMedica.altura}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Peso (kg)"
                                name="peso"
                                type=''
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
                                label="Conclusión"
                                name="conclusion"
                                value={historiaMedica.conclusion}
                                onChange={handleChange}
                                multiline
                                rows={4}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} mt={2}>
                            <Button variant="contained" onClick={() => navigate("/Doctor/citas")} type="submit">
                                Guardar
                            </Button>
                            <Button variant="outlined" onClick={() => navigate("/Doctor/citas")} sx={{ ml: 2 }}>
                                Cancelar
                            </Button>
                        </Grid>
                    </Grid>
                    </Box>

                    
                </form>
            </div>

        </>

    );
};

export default HistoriaMedicaForm;
