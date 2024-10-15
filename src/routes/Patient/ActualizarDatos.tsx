import React, { useState } from 'react';
import { API_URL } from "../../auth/authConstants";
import Sidebar from '../../components/sidebar';

const ActualizarDatos = () => {
    const [formData, setFormData] = useState({
        patientId: '12345', // valor fijo de ejemplo
        name: 'Juan Pérez', // valor fijo de ejemplo
        email: '',
        password: '',
        address: '',
        phone: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Lógica para enviar los datos actualizados al backend
        console.log('Datos actualizados:', formData);
    };

    
    return (
      <>
      
      <Sidebar />
        <div className="calendar-container">
            
            <div className="flex flex-col items-center justify-center w-full p-8">
                <h1 className="text-4xl font-extrabold text-gray-800 mb-10 text-center">
                    Actualizar Datos del Paciente
                </h1>
                <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg space-y-6">
                    {/* ID Paciente */}
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-gray-600 mb-1">ID Paciente:</label>
                        <input
                            type="text"
                            name="patientId"
                            value={formData.patientId}
                            disabled
                            className="p-3 border rounded-lg bg-gray-100 text-gray-700 border-gray-300 cursor-not-allowed"
                        />
                    </div>

                    {/* Nombre */}
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-gray-600 mb-1">Nombre:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            disabled
                            className="p-3 border rounded-lg bg-gray-100 text-gray-700 border-gray-300 cursor-not-allowed"
                        />
                    </div>

                    {/* Correo Electrónico */}
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-gray-600 mb-1">Correo Electrónico:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="p-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition ease-in-out duration-150"
                        />
                    </div>

                    {/* Contraseña */}
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-gray-600 mb-1">Contraseña:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="p-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition ease-in-out duration-150"
                        />
                    </div>

                    {/* Dirección */}
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-gray-600 mb-1">Dirección:</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="p-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition ease-in-out duration-150"
                        />
                    </div>

                    {/* Teléfono */}
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-gray-600 mb-1">Teléfono:</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="p-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition ease-in-out duration-150"
                        />
                    </div>

                    {/* Botón Actualizar */}
                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition ease-in-out duration-200"
                    >
                        Actualizar Datos
                    </button>
                </form>
            </div>
        </div>
        </>
    );
};

export default ActualizarDatos;
