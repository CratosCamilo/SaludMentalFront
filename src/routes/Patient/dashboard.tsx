import React from 'react';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Footer from '../../components/footer';
import Navbar from '../../components/navbar';
import { useAuth } from "../../auth/AuthProvider";
import { API_URL } from "../../auth/authConstants";

import './dashboard.css'
interface Todo {
    id: string;
    title: string;
    completed: boolean;
  }
  
const Dashboard: React.FC = () => {
    const auth = useAuth();

    const [todos, setTodos] = useState<Todo[]>([]);
    const [value, setValue] = useState("");

    async function getTodos() {
        const accessToken = auth.getAccessToken();
        try {
            const response = await fetch(`${API_URL}/posts`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (response.ok) {
                const json = await response.json();
                setTodos(json);
                console.log(json);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function createTodo() {
        if (value.length > 3) {
            try {
                const response = await fetch(`${API_URL}/posts`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${auth.getAccessToken()}`,
                    },
                    body: JSON.stringify({ title: value }),
                });
                if (response.ok) {
                    const todo = (await response.json()) as Todo;
                    setTodos([...todos, todo]);
                }
            } catch (error) { }
        }
    }

    useEffect(() => {
        getTodos();
    }, []);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        createTodo();
    }

    return (
        <>
            <Navbar />
            <div className='Welcome'>
                <h4>Bienvenido {auth.getUser()?.name ?? ""}</h4>
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
