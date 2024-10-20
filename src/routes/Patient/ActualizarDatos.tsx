import React, { useEffect, useState } from 'react';
import { API_URL } from "../../auth/authConstants";
import Sidebar from '../../components/sidebar';
import { UserPacient } from '../../types/types';
import { useAuth } from '../../auth/AuthProvider';
import { useNavigate, useParams } from 'react-router-dom';

const ActualizarDatos = () => {
  const { id } = useParams<{ id: string }>();
  const auth = useAuth();
  const [paciente, setPaciente] = useState<UserPacient>({
    _id: '',
    username: 0,
    name: '',
    lastName: '',
    email: '',
    password: '',
    status: 0,
    direccion: '',
    phone: 0,
  });  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [initialLoaded, setInitialLoaded] = useState(false);
  const navigate = useNavigate();


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaciente({ ...paciente, [e.target.name]: e.target.value });
  };
  
  const cargarDatosPaciente = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/Pacient/datos/${paciente.username}`, {
        headers: {
          'Authorization': `Bearer ${auth.getAccessToken()}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setPaciente(data);
      } else {
        setError('Error al cargar los datos del paciente');
      }
    } catch (error) {
      setError('Error en la solicitud');
    } finally {
      setLoading(false);
    }
  };

  // Manejador de envío del formulario
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`${API_URL}/Pacient/EditarP/${paciente.username}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.getAccessToken()}`
        },
        body: JSON.stringify(paciente),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Datos actualizados correctamente');
        navigate(`/patient/datos`);
      } else {
        setError(`Error al actualizar los datos: ${data.message}`);
      }
    } catch (error) {
      console.error('Error al actualizar los datos del paciente:', error);
      setError('Error en la solicitud de actualización. Por favor, inténtelo más tarde.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarDatosPaciente();  // Cargar los datos del paciente cuando el componente se monta
  }, []);

  return (
    <>
    <Sidebar /> 
    <div className="calendar-container ml-[180px] p-8"> {/* Margen para evitar que el Sidebar lo cubra */}
      <h1 className="text-3xl font-bold text-center mb-4">Actualizar Datos del Paciente</h1> {/* Título centrado */}
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-4">
          <label>Nombre:</label>
              <input
                type="text"
                name="name"
                value={paciente.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group mb-4">
              <label>Dirección:</label>
              <input
                type="text"
                name="address"
                value={paciente.direccion}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group mb-4">
              <label>Teléfono:</label>
              <input
                type="text"
                name="phone"
                value={paciente.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group mb-4">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={paciente.email}
                onChange={handleChange}
              />
            </div>
          <button type="button">
            Cargar Datos del Paciente
          </button>
        </form>

      </div>
    </>
  );
};

export default ActualizarDatos;