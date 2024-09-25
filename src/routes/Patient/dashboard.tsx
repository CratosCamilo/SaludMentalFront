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
    const user = auth.getUser();

    const getUserType = (id: number) => {
        switch(id) {
            case 1: return "Sisben";
            case 2: return "Afiliado";
            case 3: return "Particular";
            default: return "Desconocido";
        }
    };

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
            <div className="sidebar">
            <a href="#" className="logout-button">Cerrrar sesión</a>
        <img src="../../images/logo3.png" alt="Descripción de la imagen" className="image"/>
        <h2>Paciente</h2>
        <ul>
            <li><a href="/patient/calendar">Agendar cita</a></li>
            <li><a href="/patient/historial-medico">Ver mi historial médico</a></li>
            <li><a href="/patient/historial-pagos">Historial de pagos</a></li>
            <li><a href="/patient/actualizar-datos">Actulizar datos personales</a></li>
            <li><a href="/patient/facturas-pendientes">Facturas pendientes</a></li>
        </ul>
    </div>

    <div className="main-content">
        <header> 
        <h4>Bienvenido {auth.getUser()?.name ?? ""}, usted es {getUserType(auth.getUser()?.patientTypeId ?? 0)} con número de identificación {auth.getUser()?.username ?? ""}</h4>

        </header>
        <section className="info-cards">
            <div className="card">
                <h3>AGENDAR CITAS</h3>
            </div>
            <div className="card">
                <h3>VER MI HISTORIAL MEDICO</h3>
            </div>
            <div className="card">
                <h3>ACTUALIZAR DATOS PERSONALES</h3>
            </div>
        </section>
        </div>
        </>
    );
}

export default Dashboard;