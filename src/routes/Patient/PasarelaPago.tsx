import React, { useState } from 'react';
import { API_URL } from "../../auth/authConstants";
import Sidebar from '../../components/sidebar';
import { pagoDebito } from '../../types/types';
import { useAuth } from '../../auth/AuthProvider';
import { useNavigate, useParams } from 'react-router-dom';

const PasarelaPago = () => {
  const { idFactura } = useParams<{ idFactura: string }>();
  const auth = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<pagoDebito>({
    numeroT: 0,
    nombreApellido: '',
    fechaVencimiento: new Date(),
    codSeguridad: 0,
    tipoDoc: '',
    numeroDoc: 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Crear una nueva colilla de pago
      const responseColilla = await fetch(`${API_URL}/Pacient/addColilla`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.getAccessToken()}`,
        },
      });

      const colillaData = await responseColilla.json();
      const idColilla = colillaData.id;

      // Actualizar el estado de pago de la factura
      const responseFactura = await fetch(`${API_URL}/Pacient/factura/${idFactura}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.getAccessToken()}`,
        },
        body: JSON.stringify({ idColilla }),
      });

      if (!responseFactura.ok) {
        throw new Error('Error al actualizar el estado de pago');
      }

      if (!responseColilla.ok) {
        throw new Error('Error al crear la colilla de pago');
      }

      setSuccess('Pago realizado y colilla creada correctamente');
      navigate('/facturasPendientes');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Sidebar /> 
      <div className="calendar-container ml-[180px] p-8">
        <h1 className="text-3xl font-bold text-center mb-4">Pasarela de Pago</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-4">
            <label>Número de Tarjeta:</label>
            <input
              type="number"
              name="numeroT"
              value={formData.numeroT}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group mb-4">
            <label>Nombre y Apellido:</label>
            <input
              type="text"
              name="nombreApellido"
              value={formData.nombreApellido}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group mb-4">
            <label>Fecha de Vencimiento:</label>
            <input
              type="date"
              name="fechaVencimiento"
              value={formData.fechaVencimiento.toISOString().substring(0, 10)}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group mb-4">
            <label>Código de Seguridad:</label>
            <input
              type="number"
              name="codSeguridad"
              value={formData.codSeguridad}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group mb-4">
            <label>Tipo de Documento:</label>
            <select
              name="tipoDoc"
              value={formData.tipoDoc}
              onChange={handleChange}
              required
            >
              <option value="">Cédula de Ciudadanía</option>
              <option value="CC">Cédula de Ciudadanía</option>
              <option value="CE">Cédula de Extranjería</option>
              <option value="Pasaporte">Pasaporte</option>
            </select>
          </div>

          <div className="form-group mb-4">
            <label>Número de Documento:</label>
            <input
              type="number"
              name="numeroDoc"
              value={formData.numeroDoc}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Procesando...' : 'Pagar'}
          </button>

          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
        </form>
      </div>
    </>
  );
};

export default PasarelaPago;
