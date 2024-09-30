import React, { useState } from 'react';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import { API_URL } from "../../auth/authConstants";
import Sidebar from '../../components/sidebar';

interface FacturasPendientes {
  invoiceId: string;
  amountPending: number;
  dueDate: string;
  status: string;
}

const FacturasPendientes = () => {
  const [formData, setFormData] = useState({
    patientId: '',
  });
  const [invoices, setInvoices] = useState<FacturasPendientes[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {

      const response = await fetch(`${API_URL}/AQUI_SE_CAMBIA_EL_ENDPOINT_Y_SE_PONE_EL_DEL_BACKEND/${formData.patientId}`);

      if (!response.ok) {
        throw new Error('Error al obtener las facturas pendientes');
      }

      const data: FacturasPendientes[] = await response.json();
      setInvoices(data);
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
        <h1>Facturas Pendientes</h1>
        <form onSubmit={handleSubmit}>
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
          <button type="submit">Buscar Facturas Pendientes</button>
        </form>

        {loading && <p>Cargando...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <h2>Facturas Pendientes</h2>
        {invoices.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>ID Factura</th>
                <th>Monto Pendiente</th>
                <th>Fecha de Vencimiento</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice: FacturasPendientes, index) => (
                <tr key={index}>
                  <td>{invoice.invoiceId}</td>
                  <td>{invoice.amountPending}</td>
                  <td>{invoice.dueDate}</td>
                  <td>{invoice.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No se encontraron facturas pendientes</p>
        )}
      </div>
    </>
  );
};

export default FacturasPendientes;
