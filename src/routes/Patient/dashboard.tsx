import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/footer';
import Navbar from '../../components/navbar';
import './dashboard.css'

const Dashboard: React.FC = () => {
    return (
        <>
            <Navbar />
            <div className='Welcome'>
                <h4>Bienvenido</h4>
            </div>
            
            <div className='dashboard-container'>
                <div className='Schedule_an_appointment'>
                    <Link to="/schedule" className='Schedule_an_appointment'>Agendar cita</Link>
                </div>
                <div className='Medical_history'>
                    <Link to="/history" className='Medical_history'>Ver mi historial médico</Link>
                </div>
                <div className='Personal_data'>
                    <Link to="/payments" className='Personal_data'>Historial de pagos</Link>
                </div>
                <div className='Update_personal_data'>
                    <Link to="/update" className='Update_personal_data'>Actualizar datos personales</Link>
                </div>
                <div className='Outstanding_invoices'>
                    <Link to="/invoices" className='Outstanding_invoices'>Facturas pendientes</Link>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Dashboard;
