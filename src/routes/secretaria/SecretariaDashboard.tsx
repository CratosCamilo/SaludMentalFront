import React from 'react';
import { useEffect } from "react";
import { Link } from 'react-router-dom';
import Footer from '../../components/footer';
import Navbar from '../../components/navbar';
import { useAuth } from "../../auth/AuthProvider";





const Dashboard: React.FC = () => {
    const auth = useAuth();

    

    

    useEffect(() => {       
    }, []);

    
    return (
        <>
            <Navbar />
            <div className='Welcome'>
                <h4>Bienvenido {auth.getUser()?.name ?? ""}</h4>
            </div>

            <div className='dashboard-container'>
                <div className='Agendar_Cita'>
                    <Link to="/schedule" className='Agendar_Cita'>Agendar Citas</Link>
                </div>
                <div className='Gestion_tareas'>
                    <Link to="/history" className='Gestion_tareas'>Gestion de Tareas</Link>
                </div>
                <div className='Tareas_Pendientes'>
                    <Link to="/payments" className='Tareas_Pendientes'>Tareas Pendientes</Link>
                </div>
                
            </div>
            <Footer />
        </>
    );
}

export default Dashboard;
