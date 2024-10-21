import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Button, Grid, Typography } from '@mui/material';
import Sidebar from '../../components/sidebar';
import { API_URL } from "../../auth/authConstants";
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

interface HistorialMedicoItem {
  patientId: string;
  date: string;
  symptoms: string;
  diagnosis: string;
  observation: string;
  recommendations: string;
}

const HistorialMedico = () => {
  const [formData, setFormData] = useState({
    patientId: '',
    date: null as Date | null
  });
  
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
  const [history, setHistory] = useState<HistorialMedicoItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date: Date | null) => {
    setFormData({ ...formData, date });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}/AQUI_SE_CAMBIA_EL_ENDPOINT_Y_SE_PONE_EL_DEL_BACKEND/${formData.patientId}/${formData.date}`);

      if (!response.ok) {
        throw new Error('Error al obtener los datos del historial médico');
      }

      const data = await response.json();
      setHistory(data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
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
                                disabled
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
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Fecha de Nacimiento"
                                name="fecha_Nac"
                                disabled
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
                                disabled
                                type=''
                                value={historiaMedica.discapacidad}
                                onChange={handleChange}
                                fullWidth
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
                                disabled
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
                                disabled
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
                                disabled
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
                                disabled
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
                                disabled
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
                                disabled
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
                                disabled
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
                                disabled
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
                                disabled
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
                                disabled
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
                                disabled
                            />
                        </Grid>
                        
                        <Grid item xs={12} mt={2}>
                            
                        </Grid>
                    </Grid>
                    </Box>

                    
                </form>
            </div>
    </>
  );
};

export default HistorialMedico;
