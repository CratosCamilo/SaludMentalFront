import React, { useState } from 'react';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import { API_URL } from "../../auth/authConstants";

interface Payment {
  patientId: string;
  date: string;
  amount: number;
  method: string;
}

const HistorialPagos = () => {
  const [formData, setFormData] = useState({
    patientId: '',
    date: ''
  });
  const [payments, setPayments] = useState<Payment[]>([]); 
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
    
      const response = await fetch(`${API_URL}/AQUI_SE_CAMBIA_EL_ENDPOINT_Y_SE_PONE_EL_DEL_BACKEND/${formData.patientId}?date=${formData.date}`);
      
      if (!response.ok) {
        throw new Error('Error al obtener el historial de pagos');
      }

      const data: Payment[] = await response.json(); 
      setPayments(data);  
    } catch (error: any) {  
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="sidebar">
      <img src="../../images/logo3.png" alt="Descripción de la imagen" className="image"/>
        <h2>Médico</h2>
        <ul>
          <li><a href="inicio.html">Inicio</a></li>
          <li><a href="pacientes.html">Pacientes</a></li>
          <li><a href="citas.html">Citas</a></li>
        </ul>
        <a href="#" className="logout-button">Salir</a>
      </div>
    <div className="main-content">
        <h1>Historial de Pagos</h1>
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
          <div className="form-group">
            <label>Fecha (Opcional):</label>
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
        {payments.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>ID Paciente</th>
                <th>Fecha de Pago</th>
                <th>Monto</th>
                <th>Método de Pago</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => (
                <tr key={index}>
                  <td>{payment.patientId}</td>
                  <td>{payment.date}</td>
                  <td>{payment.amount}</td>
                  <td>{payment.method}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No se encontraron pagos</p>
        )}
      </div>
    </>
  );
};

export default HistorialPagos;
