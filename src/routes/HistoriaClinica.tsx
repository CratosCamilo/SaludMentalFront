import React, { useEffect, useRef } from "react";
import "../css/doc.css";

const HistoriaC: React.FC = () => {
    const slidersRef = useRef<HTMLDivElement[]>([]);
    const buttonNextRef = useRef<HTMLImageElement | null>(null);
    const buttonBeforeRef = useRef<HTMLImageElement | null>(null);

    return (
        <>
    <div className="sidebar">
        <h2> Médico</h2>
        <ul>
            <li><a href="inicio.html">Inicio</a></li>
            <li><a href="pacientes.html">Pacientes</a></li>
            <li><a href="citas.html">Citas</a></li>
            <li><a href="conf.html">Configuraciones</a></li>
        </ul>
    </div>

    <div className="main-content">
        <header>
            <h1>Historia Clínica de <span id="patient-name">[Nombre del Paciente]</span></h1>
        </header>
        
        <section className="medical-history">
            <h2>Formulario de Historia Clínica</h2>
            <form action="guardar_historia_clinica.php" method="POST">
                <label htmlFor="nombre">Nombre del Paciente:</label>
                <input type="text" id="nombre" name="nombre" placeholder="Ingrese el nombre del paciente" required/>
                
                <label htmlFor="correo">Correo del Paciente:</label>
                <input type="email" id="correo" name="correo" placeholder="Correo electrónico" required/>


                <label htmlFor="fecha-de-naciemiento">Fecha de nacimiento:</label>
                <input type="date" id="fecha-de-nacimiento" name="fecha-de-nacimiento" placeholder="Ingrese la edad" required/>

                <label htmlFor="edad">Edad:</label>
                <input type="number" id="edad" name="edad" placeholder="Ingrese la fecha de nacimiento" required/>

                <label htmlFor="tipo-de-sangre">Tipo de sangre:</label>
                <select id="tipo-de-sangre" name="tipo-de-sangre" required>
                    <option value="">Seleccione el tipo de sangre</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                </select>
                
                <label htmlFor="estado-civil">Estado civil:</label>
                <select id="estado-civil" name="estado-civil" required>
                    <option value="">Seleccione el estado civil</option>
                    <option value="Soltero">Soltero</option>
                    <option value="Casado">Casado</option>
                    <option value="Divorciado">Divorciado</option>
                    <option value="Viudo">Viudo</option>
                    <option value="Unión libre">Unión libre</option>
                </select>
                
                <label>Sexo:</label>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                <input type="radio" id="sexo-m" name="sexo" value="Masculino" required/>
                <label htmlFor="sexo-m" style={{ marginRight: '15px' }}>Masculino</label>
                
                    <input type="radio" id="sexo-f" name="sexo" value="Femenino" required/>
                    <label htmlFor="sexo-f">Femenino</label>
                </div>
                <h3>Dirección de domicilio paciente:</h3>

                <label htmlFor="departamento">Departamento:</label>
                <select id="departamento" name="departamento" required>
                    <option value="">Seleccione el departamento</option>
                    <option value="Amazonas">Amazonas</option>
                    <option value="Antioquia">Antioquia</option>
                    <option value="Arauca">Arauca</option>
                    <option value="Atlántico">Atlántico</option>
                    <option value="Bogotá">Bogotá</option>
                    <option value="Bolívar">Bolívar</option>
                    <option value="Boyacá">Boyacá</option>
                    <option value="Caldas">Caldas</option>
                    <option value="Caquetá">Caquetá</option>
                    <option value="Casanare">Casanare</option>
                    <option value="Cauca">Cauca</option>
                    <option value="Cesar">Cesar</option>
                    <option value="Chocó">Chocó</option>
                    <option value="Córdoba">Córdoba</option>
                    <option value="Cundinamarca">Cundinamarca</option>
                    <option value="Guainía">Guainía</option>
                    <option value="Guaviare">Guaviare</option>
                    <option value="Guerrero">Guerrero</option>
                    <option value="Huila">Huila</option>
                    <option value="La Guajira">La Guajira</option>
                    <option value="Magdalena">Magdalena</option>
                    <option value="Meta">Meta</option>
                    <option value="Nariño">Nariño</option>
                    <option value="Norte de Santander">Norte de Santander</option>
                    <option value="Putumayo">Putumayo</option>
                    <option value="Quindío">Quindío</option>
                    <option value="Risaralda">Risaralda</option>
                    <option value="San Andrés y Providencia">San Andrés y Providencia</option>
                    <option value="Santander">Santander</option>
                    <option value="Sucre">Sucre</option>
                    <option value="Tolima">Tolima</option>
                    <option value="Valle del Cauca">Valle del Cauca</option>
                    <option value="Vaupés">Vaupés</option>
                    <option value="Vichada">Vichada</option>
                </select>

                <label htmlFor="ciudad">Ciudad:</label>
                <input type="ciudad" id="ciudad" name="ciudad" placeholder="Ingrese la ciudad" required/>

                <label htmlFor="nombre-de-la-aseguradora">Nombre de la aseguradora:</label>
                <input type="text" id="nombre-de-la-aseguradora" name="nombre-de-la-aseguradora" placeholder="Ingrese el nombre de la aseguradora " required/>

                <label htmlFor="ocupacion-del-paciente">Ocuoacion del paciente:</label>
                <input type="text" id="ocupacion-del-paciente" name="ocupacion-del-paciente" placeholder="Ingrese la ocupacion del paciente" required/>

                <h3>Datos actuales del paciente</h3>

                <label htmlFor="estatura">Estatura (cm):</label>
                <input type="number" id="estatura" name="estatura" placeholder="Ingrese la estatura en cm" required/>

                <label htmlFor="peso">Peso (kg):</label>
                <input type="number" id="peso" name="peso" placeholder="Ingrese su peso" required/>

                <label htmlFor="frecuencia-cardiaca">Frecuencia cardiaca (BPM:)</label>
                <input type="number" id="frecuencia-cardiaca" name="frecuencia-cardiaca" placeholder="Ingrese la frecuencia cardiaca" required/>

                <label htmlFor="presion">Presión alterial (mmHg):</label>
                <input type="number" id="presion" name="presion" placeholder="Ingrese la presión alterial" required/>

                <label htmlFor="temperatura">Temperatura °C:</label>
                <input type="number" id="temperatura" name="temperatura" placeholder="Ingrese la temperatura" required/>

                <label htmlFor="antecedentes-familiares">Antecendentes familiares:</label>
                <input type="text" id="antecedentes-familiares" name="antecedentes-familiares" placeholder="Ingrese los antecedentes familiares" required/>
                
                <label htmlFor="antecedentes-quirurjicos">Antecendentes quirurjucos:</label>
                <input type="text" id="antecedentes-quirurjicos" name="antecedentes-quirurjicos" placeholder="Ingrese los antecedentes quirurjicos" required/>

                <label htmlFor="medicacion-previa">Medicación previa:</label>
                <input type="text" id="medicacion-previa" name="medicacion-previa" placeholder="Ingrese la medicacion previa" required/>

                
                <label htmlFor="motivo-de-consulta">Motivo de la consulta:</label>
                <input type="text" id="motivo-de-consulta" name="motivo-de-consulta" placeholder="Ingrese el motivo de la consulta" required/>

                <label htmlFor="diagnostico">Diagnóstico:</label>
                <input type="text" id="diagnostico" name="diagnostico" placeholder="Ingrese el diagnóstico" required/>

                <label htmlFor="tratamiento">Tratamiento:</label>
                <input type="text" id="tratamiento" name="tratamiento" placeholder="Ingrese el tratamiento" required/>

                <label htmlFor="archivo-medico">Adjuntar Archivo Médico:</label>
                <input type="file" id="archivo-medico" name="archivo-medico" accept=".pdf,.doc,.docx"/>

                <label htmlFor="aceptar-terminos">Aceptar términos y condiciones:</label>
                <input type="checkbox" id="aceptar-terminos" name="aceptar-terminos" required/>

                <input type="submit" value="Guardar Historia Clínica"/>
            </form>
        </section>
    </div>
    </>

);
};

<script src="js/dark-mode.js"></script>

export default HistoriaC;