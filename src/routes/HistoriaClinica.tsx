import React from "react";
import "../css/doc.css"; // Asegúrate de que este archivo contenga los estilos necesarios

const HistoriaC: React.FC = () => {

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
                <section className="medical-history">
                    <h2>Formulario de Historia Clínica</h2>
                    <h2>Paciente</h2>
                    <form action="guardar_historia_clinica.php" method="POST" className="form-container">
                        <div className="form-row">
                            <div className="form-item">
                                <label htmlFor="nombre">Nombre del Paciente:</label>
                                <input type="text" id="nombre" name="nombre" placeholder="Ingrese el nombre del paciente" required />
                            </div>

                            <label htmlFor="tipo-identificacion">Tipo de Identificación:</label>
                    <select id="tipo-identificacion" name="tipo-identificacion" required>
                        <option value="">Seleccione el tipo de identificación</option>
                        <option value="ID">ID</option>
                        <option value="CC">CC</option>
                        <option value="Pasaporte">Pasaporte</option>
                    </select>
                    
                    <label htmlFor="numero-identificacion">Número de Identificación:</label>
                    <input type="text" id="numero-identificacion" name="numero-identificacion" placeholder="Ingrese el número de identificación" required />

                            <div className="form-item">
                                <label htmlFor="correo">Correo del Paciente:</label>
                                <input type="email" id="correo" name="correo" placeholder="Correo electrónico" required />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-item">
                                <label htmlFor="fecha-de-nacimiento">Fecha de nacimiento:</label>
                                <input type="date" id="fecha-de-nacimiento" name="fecha-de-nacimiento" required />
                            </div>

                            <div className="form-item">
                                <label htmlFor="edad">Edad:</label>
                                <input type="number" id="edad" name="edad" placeholder="Ingrese la edad" required />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-item">
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
                            </div>

                            <div className="form-item">
                                <label htmlFor="estado-civil">Estado civil:</label>
                                <select id="estado-civil" name="estado-civil" required>
                                    <option value="">Seleccione el estado civil</option>
                                    <option value="Soltero">Soltero</option>
                                    <option value="Casado">Casado</option>
                                    <option value="Divorciado">Divorciado</option>
                                    <option value="Viudo">Viudo</option>
                                    <option value="Unión libre">Unión libre</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-item">
                                <label>Sexo:</label>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <input type="radio" id="sexo-m" name="sexo" value="Masculino" required />
                                    <label htmlFor="sexo-m" style={{ marginRight: '15px' }}>Masculino</label>

                                    <input type="radio" id="sexo-f" name="sexo" value="Femenino" required />
                                    <label htmlFor="sexo-f">Femenino</label>
                                </div>
                            </div>

                            <div className="form-item">
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
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-item">
                                <label htmlFor="ciudad">Ciudad:</label>
                                <input type="text" id="ciudad" name="ciudad" placeholder="Ingrese la ciudad" required />
                            </div>

                            <div className="form-item">
                                <label htmlFor="nombre-de-la-aseguradora">Nombre de la aseguradora:</label>
                                <input type="text" id="nombre-de-la-aseguradora" name="nombre-de-la-aseguradora" placeholder="Ingrese el nombre de la aseguradora" required />
                            </div>
                        </div>

                        <h2>Datos actuales del paciente</h2>

                        <div className="form-row">
                            <div className="form-item">
                                <label htmlFor="ocupacion-del-paciente">Ocupación del paciente:</label>
                                <input type="text" id="ocupacion-del-paciente" name="ocupacion-del-paciente" placeholder="Ingrese la ocupación del paciente" required />
                            </div>

                            <div className="form-item">
                                <label htmlFor="estatura">Estatura (cm):</label>
                                <input type="number" id="estatura" name="estatura" placeholder="Ingrese la estatura en cm" required />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-item">
                                <label htmlFor="peso">Peso (kg):</label>
                                <input type="number" id="peso" name="peso" placeholder="Ingrese el peso" required />
                            </div>

                            <div className="form-item">
                                <label htmlFor="frecuencia-cardiaca">Frecuencia cardiaca (BPM):</label>
                                <input type="number" id="frecuencia-cardiaca" name="frecuencia-cardiaca" placeholder="Ingrese la frecuencia cardiaca" required />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-item">
                                <label htmlFor="presion">Presión arterial (mmHg):</label>
                                <input type="number" id="presion" name="presion" placeholder="Ingrese la presión arterial" required />
                            </div>

                            <div className="form-item">
                                <label htmlFor="temperatura">Temperatura °C:</label>
                                <input type="number" id="temperatura" name="temperatura" placeholder="Ingrese la temperatura" required />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-item">
                                <label htmlFor="antecedentes-familiares">Antecedentes familiares:</label>
                                <input type="text" id="antecedentes-familiares" name="antecedentes-familiares" placeholder="Ingrese los antecedentes familiares" required />
                            </div>

                            <div className="form-item">
                                <label htmlFor="antecedentes-quirurgicos">Antecedentes quirúrgicos:</label>
                                <input type="text" id="antecedentes-quirurgicos" name="antecedentes-quirurgicos" placeholder="Ingrese los antecedentes quirúrgicos" required />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-item">
                                <label htmlFor="medicacion-previa">Medicación previa:</label>
                                <input type="text" id="medicacion-previa" name="medicacion-previa" placeholder="Ingrese la medicación previa" required />
                            </div>

                            <div className="form-item">
                                <label htmlFor="motivo-de-consulta">Motivo de la consulta:</label>
                                <input type="text" id="motivo-de-consulta" name="motivo-de-consulta" placeholder="Ingrese el motivo de la consulta" required />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-item">
                                <label htmlFor="diagnostico">Diagnóstico:</label>
                                <input type="text" id="diagnostico" name="diagnostico" placeholder="Ingrese el diagnóstico" required />
                            </div>

                            <div className="form-item">
                                <label htmlFor="tratamiento">Tratamiento:</label>
                                <input type="text" id="tratamiento" name="tratamiento" placeholder="Ingrese el tratamiento" required />
                            </div>
                        </div>

                        <div className="form-row">
                            <input type="submit" value="Guardar Historia Clínica" />
                        </div>
                    </form>
                </section>
            </div>
        </>
    );
};

export default HistoriaC;