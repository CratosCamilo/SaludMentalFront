import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Navbar from '../../components/navbar';
import { API_URL } from "../../auth/authConstants";

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
  const [history, setHistory] = useState<HistorialMedicoItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleDateChange = (date : Date | null ) => {
    setFormData({ ...formData, date  });
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
      <Navbar />
      <div className="history-container">
        <h1>Historial Médico</h1>
        <form onSubmit={handleSubmit} className="form-container">
          <div className="form-group">
            <label>ID Paciente:</label>
            <input
              type="text"
              name="patientId"
              value={formData.patientId}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Fecha de Consulta:</label>
            <DatePicker
              selected={formData.date}
              onChange={handleDateChange}
              dateFormat="yyyy/MM/dd"
              placeholderText="Seleccione una fecha"
              className="datepicker-input"
              required
            />
          </div>
          <button type="submit" className="submit-button">Buscar Historial</button>
        </form>

        {loading && <p>Cargando...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <h2>Historial de Consultas</h2>
        {history.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>ID Paciente</th>
                <th>Fecha</th>
                <th>Síntomas</th>
                <th>Diagnóstico</th>
                <th>Observaciones</th>
                <th>Recomendaciones</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item: HistorialMedicoItem, index) => (
                <tr key={index}>
                  <td>{item.patientId}</td>
                  <td>{item.date}</td>
                  <td>{item.symptoms}</td>
                  <td>{item.diagnosis}</td>
                  <td>{item.observation}</td>
                  <td>{item.recommendations}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No se encontraron resultados</p>
        )}
      </div>
    </>
  );
};

export default HistorialMedico;
