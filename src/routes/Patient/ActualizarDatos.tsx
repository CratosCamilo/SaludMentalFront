import React, { useState } from 'react';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import { API_URL } from "../../auth/authConstants";
import Sidebar from '../../components/sidebar';

interface PatientData {
  patientId: string;
  name: string;
  address: string;
  phone: string;
  email: string;
}

const ActualizarDatos = () => {
  const [formData, setFormData] = useState<PatientData>({
    patientId: '',
    name: '',
    address: '',
    phone: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [initialLoaded, setInitialLoaded] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePatientIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, patientId: e.target.value });
    setInitialLoaded(false); 
  };

  const loadPatientData = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`${API_URL}/AQUI_SE_CAMBIA_EL_ENDPOINT_Y_SE_PONE_EL_DEL_BACKEND/${formData.patientId}`);
      
      if (!response.ok) {
        throw new Error('Error al cargar los datos del paciente');
      }

      const data: PatientData = await response.json();
      setFormData({
        ...formData,
        name: data.name || '',
        address: data.address || '',
        phone: data.phone || '',
        email: data.email || '',
      });
      setInitialLoaded(true);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`${API_URL}/AQUI_SE_CAMBIA_EL_ENDPOINT_Y_SE_PONE_EL_DEL_BACKEND/${formData.patientId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          address: formData.address,
          phone: formData.phone,
          email: formData.email,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar los datos del paciente');
      }

      setSuccess('Datos actualizados correctamente');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Sidebar /> 
      <div className="calendar-container">
        <h1>Actualizar Datos del Paciente</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>ID Paciente:</label>
            <input
              type="text"
              name="patientId"
              value={formData.patientId}
              onChange={handlePatientIdChange}
              required
            />
            <button type="button" onClick={loadPatientData} disabled={!formData.patientId}>
              Cargar Datos del Paciente
            </button>
          </div>

          {loading && <p>Cargando...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {success && <p style={{ color: 'green' }}>{success}</p>}

          {initialLoaded && (
            <>
              <div className="form-group">
                <label>Nombre:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Dirección:</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Teléfono:</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <button type="submit">Actualizar Datos</button>
            </>
          )}
        </form>
      </div>
    </>
  );
};

export default ActualizarDatos;
