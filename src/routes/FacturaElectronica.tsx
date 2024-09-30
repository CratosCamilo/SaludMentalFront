import React, { useState, ChangeEvent } from 'react';

// Definición de interfaces para los tipos de datos
interface Factura {
  idFactura?: number;
  idCita?: number;
  estadoFac: string;
  idColilla?: number;
  idAutoMedica?: number;
  idOrdenMedica?: number;
}

interface Cliente {
  numeroDoc?: number;
  nombre: string;
  direccion: string;
  telefono: string;
}

const Factura: React.FC = () => {
  const [factura, setFactura] = useState<Factura>({
    idFactura: undefined,
    idCita: undefined,
    estadoFac: '',
    idColilla: undefined,
    idAutoMedica: undefined,
    idOrdenMedica: undefined,
  });

  const [cliente, setCliente] = useState<Cliente>({
    numeroDoc: undefined,
    nombre: '',
    direccion: '',
    telefono: '',
  });

  // Manejar cambios en la información del cliente
  const handleFacturaChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFactura({ ...factura, [name]: value });
  };

  const handleClienteChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCliente({ ...cliente, [name]: value });
  };

  return (
    <>
      <div className="sidebar">
        <img src="../../images/logo3.png" alt="Descripción de la imagen" className="image" />
        <h2>Médico</h2>
        <ul>
          <li><a href="inicio.html">Inicio</a></li>
          <li><a href="pacientes.html">Pacientes</a></li>
          <li><a href="citas.html">Citas</a></li>
        </ul>
        <a href="#" className="logout-button">Salir</a>
      </div>
      <div className="container">
        <div style={{
          backgroundColor: 'white',
          padding: '100px',
          borderRadius: '50px',
          boxShadow: '0 4px 4px rgba(0, 0, 0, 0.1)',
          maxWidth: '1000px',
          margin: '0',
        }}>

          
          <h2 id='titulos'>Factura Electrónica</h2>
          <br></br>
          <label>Fecha de generación: 00 / 00 /0000 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Fecha de vencimiento: 00 / 00 /0000</label>
          <label>Dirección: Carrera 0 # 00-00 sur xd</label>
          <label>Nit: 000000000000000</label>
          <label>Telefono: 000 000 0000</label>
          <br></br>
          <div className="form-block">
            <h3 id='titulos'>Datos de Cliente</h3>
            <br></br>
            <div style={{ display: 'flex' }}>
              <div style={{ width: '50%', marginRight: '50px' }}>
                <input
                  type="text"
                  name="numCed"
                  placeholder="Número de documento"
                  value={cliente.numeroDoc}
                  onChange={handleClienteChange}
                  id="myInput"
                />
                <input
                  type="text"
                  name="nombrePac"
                  placeholder="Nombre de Paciente"
                  value={cliente.nombre}
                  onChange={handleClienteChange}
                  id="myInput"
                />
              </div>
              <div style={{ width: '50%' }}>
                <input
                  type="text"
                  name="direccionPac"
                  placeholder="Dirección de Paciente"
                  value={cliente.direccion}
                  onChange={handleClienteChange}
                  id="myInput"
                />
                <input
                  type="text"
                  name="telPac"
                  placeholder="Teléfono de Paciente"
                  value={cliente.telefono}
                  onChange={handleClienteChange}
                  id="myInput"
                />
              </div>
            </div>
          </div>
          <div className="form-block">
            <h3 id='titulos'>Datos de Facturación</h3>
            <br></br>
            <div style={{ display: 'flex' }}>
              <div style={{ width: '50%', marginRight: '50px' }}>
                <input
                  type="text"
                  name="idFactura"
                  placeholder="ID único Factura Electrónica"
                  value={factura.idFactura}
                  onChange={handleFacturaChange}
                  id="myInput"
                />
                <input
                  type="text"
                  name="idCita"
                  placeholder="ID de Cita"
                  value={factura.idCita}
                  onChange={handleFacturaChange}
                  id="myInput"
                />
                <input
                  type="text"
                  name="estadoFac"
                  placeholder="Estado de Factura"
                  value={factura.estadoFac}
                  onChange={handleFacturaChange}
                  id="myInput"
                />
              </div>
              <div style={{ width: '50%' }}>
                <input
                  type="text"
                  name="idColillaP"
                  placeholder="ID de Colilla de Pago"
                  value={factura.idColilla}
                  onChange={handleFacturaChange}
                  id="myInput"
                />
                <input
                  type="text"
                  name="isAutorizacionMed"
                  placeholder="ID Autorización Médica"
                  value={factura.idAutoMedica}
                  onChange={handleFacturaChange}
                  id="myInput"
                />
                <input
                  type="text"
                  name="idOrdenMed"
                  placeholder="ID Orden Médica"
                  value={factura.idOrdenMedica}
                  onChange={handleFacturaChange}
                  id="myInput"
                />
              </div>

            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button id='boton'>
              Detalle
            </button>
            <button id='boton'>
              Guardar
            </button>
          </div>

        </div>
      </div>
    </>
  );
};

export default Factura;