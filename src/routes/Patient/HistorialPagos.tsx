import React, { useEffect, useState } from 'react';
import { API_URL } from "../../auth/authConstants";
import Sidebar from '../../components/sidebar';
import { useAuth } from '../../auth/AuthProvider';
import type { Facturas } from "../../types/types";
import { Button } from '@mui/material';

const HistorialPagos = () => {
  const auth = useAuth();
  const [facturas, setFacturas] = useState<Facturas[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    patientId: '',
    date: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {

      const response = await fetch(`${API_URL}/AQUI_SE_CAMBIA_EL_ENDPOINT_Y_SE_PONE_EL_DEL_BACKEND/${formData.patientId}?date=${formData.date}`);

      if (!response.ok) {
        throw new Error('Error al obtener el historial de pagos');
      }

      const data: Facturas[] = await response.json();
      setFacturas(data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

    // Facturas pendientes
    const fetchPagos = async () => {
      try {
        const response = await fetch(`${API_URL}/Pacient/HistorialPagos/${auth.getUser()?.username}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth.getAccessToken()}`,
                },
        });
        const data = await response.json();
            if (response.ok) {
                setFacturas(data.body.data);
            } else {
                setErrorMessage(data.error || 'Error al cargar las facturas');
            }
      } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Ocurrió un error al cargar las facturas');
      }
    };

    useEffect(() => {
        fetchPagos();
    }, []);

  return (
    <>
      <Sidebar />
      <div className="calendar-container">

        <h1>Historial de Pagos</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Buscar por Fecha:</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Buscar Pagos</button>
        </form>

        {loading && <p>Cargando...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <h2>Pagos Realizados</h2>
        {facturas.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>ID Factura</th>
                <th>ID Cita</th>
                <th>Servicio</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {facturas.map((factura: Facturas, index) => (
                <tr key={index}>
                  <td>{factura.idFactura}</td>
                  <td>{factura.idCita}</td>
                  <td>{factura.servicioPago}</td>
                  <td>{factura.estadoFE}</td>
                  <td><Button> VER </Button></td>
                </tr>
              ))}
            </tbody>
          </table>

        ) : (
          <p>No se encontraron facturas a nombre del Paciente</p>
        )}
      </div>
    </>
  );
};

export default HistorialPagos;
