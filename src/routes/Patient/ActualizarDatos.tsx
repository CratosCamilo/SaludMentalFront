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
      <div className="calendar-container ml-[180px] p-8"> {/* Margen para evitar que el Sidebar lo cubra */}
        <h1 className="text-3xl font-bold text-center mb-4">Actualizar Datos del Paciente</h1> {/* Título centrado */}
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-4">
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
              <div className="form-group mb-4">
                <label>Nombre:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group mb-4">
                <label>Dirección:</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group mb-4">
                <label>Teléfono:</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group mb-4">
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

        {/* Tabla de Datos del Paciente */}
        {initialLoaded && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Datos del Paciente</h2>
            <table className="min-w-full border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2">Campo</th>
                  <th className="border border-gray-300 px-4 py-2">Valor</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Nombre</td>
                  <td className="border border-gray-300 px-4 py-2">{formData.name}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Dirección</td>
                  <td className="border border-gray-300 px-4 py-2">{formData.address}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Teléfono</td>
                  <td className="border border-gray-300 px-4 py-2">{formData.phone}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Email</td>
                  <td className="border border-gray-300 px-4 py-2">{formData.email}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default ActualizarDatos;
