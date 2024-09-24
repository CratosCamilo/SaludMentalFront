import React, { useEffect, useRef } from "react";
import "/src/css/doc.css";

const Paciente: React.FC = () => {
    const slidersRef = useRef<HTMLDivElement[]>([]);
    const buttonNextRef = useRef<HTMLImageElement | null>(null);
    const buttonBeforeRef = useRef<HTMLImageElement | null>(null);

    return (
        <>
            <div className="sidebar">
            <a href="#" className="logout-button">Cerrrar sesión</a>
            <img src="../../images/logo3.png" alt="Descripción de la imagen" className="image"/>
        <h2>Médico</h2>
        <ul>
            <li><a href="inicio.html">Inicio</a></li>
            <li><a href="pacientes.html">Pacientes</a></li>
            <li><a href="citas.html">Citas</a></li>
        </ul>
    </div>
    <div className="main-content">
        <header>
            <h1>PACIENTES</h1>
        </header>
        <section className="recent-appointments">
            <h2>Buscar Paciente</h2>
            <input type="text" id="search-input" placeholder="Buscar por nombre..." />
            <button id="search-button">Buscar</button>
            <table>
                <thead>
                    <tr>
                        <th>Nombre del Paciente</th>
                        <th>Fecha</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody id="appointments-list">
                    <tr>
                        <td>Juan Pérez</td>
                        <td>2024-08-30</td>
                        <td><a href="historia-clinica.html?patient=Juan Perez"><button>Ver</button></a></td>
                    </tr>
                    <tr>
                        <td>María Gómez</td>
                        <td>2024-08-30</td>
                        <td><a href="historia-clinica.html?patient=Maria Gomez"><button>Ver</button></a></td>
                    </tr>
                    <tr>
                        <td>Antonella</td>
                        <td>2024-08-30</td>
                        <td><a href="historia-clinica.html?patient=Antonella"><button>Ver</button></a></td>
                    </tr>
                    <tr>
                        <td>Juan David</td>
                        <td>2024-08-30</td>
                        <td><a href="historia-clinica.html?patient=Juan David"><button>Ver</button></a></td>
                    </tr>
                </tbody>
            </table>
        </section>
    </div>

        </>

    );

};

export default Paciente;