import React, { useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import "../../css/doc.css";
interface HistoriaClinica {
  identificacion: string;
  nombre: string;
  sexo: string;
  fechaNacimiento: string;
  edad: number;
  discapacidades: string;
  profesional: string;
  especialidad: string;
  motivoConsulta: string;
  fechaConsulta: string;
  horaConsulta: string;
  sede: string;
  descripcionConsulta: string;
  patologicos: string;
  medicamentos: string;
  quirurgicos: string;
  traumaticos: string;
  alergias: string;
  vacunas: string;
  familiares: string;
  ordenClinica: string;
  resumen: string;
  comentarios: string;
}

export default function HistoriaClinicaForm() {
  const [formData, setFormData] = useState<HistoriaClinica>({
    identificacion: "",
    nombre: "",
    sexo: "",
    fechaNacimiento: "",
    edad: 0,
    discapacidades: "",
    profesional: "",
    especialidad: "",
    motivoConsulta: "",
    fechaConsulta: "",
    horaConsulta: "",
    sede: "",
    descripcionConsulta: "",
    patologicos: "",
    medicamentos: "",
    quirurgicos: "",
    traumaticos: "",
    alergias: "",
    vacunas: "",
    familiares: "",
    ordenClinica: "",
    resumen: "",
    comentarios: "",
  });

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function generatePDF() {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text("HISTORIA CLÍNICA", 14, 20);

    doc.setFontSize(12);
    doc.text(`Identificación: ${formData.identificacion}`, 14, 30);
    doc.text(`Nombre: ${formData.nombre}`, 14, 35);
    doc.text(`Sexo: ${formData.sexo}`, 14, 40);
    doc.text(`Fecha de Nacimiento: ${formData.fechaNacimiento}`, 14, 45);
    doc.text(`Edad: ${formData.edad}`, 14, 50);
    doc.text(`Discapacidades: ${formData.discapacidades}`, 14, 55);

    doc.text("CONSULTA", 14, 65);
    doc.text(`Profesional: ${formData.profesional}`, 14, 70);
    doc.text(`Especialidad: ${formData.especialidad}`, 14, 75);
    doc.text(`Motivo de consulta: ${formData.motivoConsulta}`, 14, 80);
    doc.text(`Fecha: ${formData.fechaConsulta}`, 14, 85);
    doc.text(`Hora: ${formData.horaConsulta}`, 14, 90);
    doc.text(`Sede: ${formData.sede}`, 14, 95);
    doc.text(`Descripción: ${formData.descripcionConsulta}`, 14, 100);

    doc.text("ANTECEDENTES", 14, 110);
    doc.text(`Patológicos: ${formData.patologicos}`, 14, 115);
    doc.text(`Medicamentos: ${formData.medicamentos}`, 14, 120);
    doc.text(`Quirúrgicos: ${formData.quirurgicos}`, 14, 125);
    doc.text(`Traumáticos: ${formData.traumaticos}`, 14, 130);
    doc.text(`Alergias: ${formData.alergias}`, 14, 135);
    doc.text(`Vacunas: ${formData.vacunas}`, 14, 140);
    doc.text(`Familiares: ${formData.familiares}`, 14, 145);

    doc.text("ÓRDENES CLÍNICAS", 14, 155);
    doc.text(`Descripción: ${formData.ordenClinica}`, 14, 160);

    doc.text("RESUMEN", 14, 170);
    doc.text(formData.resumen, 14, 175);

    doc.text("COMENTARIOS", 14, 185);
    doc.text(formData.comentarios, 14, 190);

    doc.save("historia_clinica.pdf");
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    generatePDF();
  }

  return (
    <>
    <div className="sidebar">
      <img src="../../images/logo3.png" alt="Descripción de la imagen" className="image"/>
        <h2>Médico</h2>
        <ul>
          <li><a href="inicio.html">Inicio</a></li>
          <li><a href="pacientes.html">Pacientes</a></li>
          <li><a href="citas.html">Citas</a></li>
        </ul>
        <a href="#" className="logout-button">Salir</a>
      </div>
    <div className="main-content">
      <h1>Formulario de Historia Clínica</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Identificación:
          <input
            type="text"
            name="identificacion"
            value={formData.identificacion}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Nombre:
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Sexo:
          <input
            type="text"
            name="sexo"
            value={formData.sexo}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Fecha de Nacimiento:
          <input
            type="date"
            name="fechaNacimiento"
            value={formData.fechaNacimiento}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Edad:
          <input
            type="number"
            name="edad"
            value={formData.edad}
            onChange={handleInputChange}
            required
          />
        </label>
        {/* Campos adicionales para todos los otros datos */}
        <label>
          Discapacidades:
          <input
            type="text"
            name="discapacidades"
            value={formData.discapacidades}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Profesional:
          <input
            type="text"
            name="profesional"
            value={formData.profesional}
            onChange={handleInputChange}
            required
          />
        </label>
        {/* Agregar los demás campos de historia clínica */}
        <button type="submit">Generar PDF</button>
      </form>
    </div>
    </>
    
  );
}
