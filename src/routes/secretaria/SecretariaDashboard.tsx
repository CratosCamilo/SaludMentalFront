import React from 'react';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Footer from '../../components/footer';
import Navbar from '../../components/navbar';
import { useAuth } from "../../auth/AuthProvider";
import { API_URL } from "../../auth/authConstants";


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
