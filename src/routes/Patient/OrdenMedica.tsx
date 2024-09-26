import { useEffect, useState } from "react";
import PortalLayout from "../../layout/PortalLayout";
import { useAuth } from "../../auth/AuthProvider";
import { API_URL } from "../../auth/authConstants";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import "../../css/doc.css";
import Sidebar from "../../components/sidebar";

interface MedicalOrder {
  idOrden_Medica?: number;
  idCita: number;
  estadoOM: number; // 1 para Activa, 0 para Inactiva
  medicamento: string;
  observacion: string;
}

export default function MedicalOrderForm() {
  const auth = useAuth();
  const [medicalOrders, setMedicalOrders] = useState<MedicalOrder[]>([]);
  const [idCita, setIdCita] = useState(0);
  const [medicamento, setMedicamento] = useState("");
  const [observacion, setObservacion] = useState("");
  const [estadoOM, setEstadoOM] = useState(1); // Por defecto activa
  const [orderList, setOrderList] = useState<MedicalOrder[]>([]);

  useEffect(() => {
    getMedicalOrders();
  }, []);

  async function getMedicalOrders() {
    const accessToken = auth.getAccessToken();
    try {
      const response = await fetch(`${API_URL}/medical-orders`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const json = await response.json();
        setMedicalOrders(json);
      } else {
        console.error("Error fetching medical orders:", response.statusText);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }

  async function createMedicalOrder() {
    if (idCita <= 0 || orderList.length === 0) return;

    try {
      const response = await fetch(`${API_URL}/medical-orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.getAccessToken()}`,
        },
        body: JSON.stringify({
          idCita,
          estadoOM,
          observacion: orderList.map(order => order.observacion).join(", "),
          medicamento: orderList.map(order => order.medicamento).join(", "),
        }),
      });

      if (response.ok) {
        const medicalOrder = await response.json();
        setMedicalOrders((prev) => [...prev, medicalOrder]);
        setOrderList([]);
      } else {
        console.error("Error creating medical order:", response.statusText);
      }
    } catch (error) {
      console.error("Create order error:", error);
    }
  }

  function handleAddOrder() {
    if (!medicamento.trim() || !observacion.trim()) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    const newOrder: MedicalOrder = { idCita, estadoOM, medicamento, observacion };
    setOrderList((prev) => [...prev, newOrder]);
    setMedicamento("");
    setObservacion("");
  }

  function generatePDF() {
    if (orderList.length === 0) {
      alert("No hay órdenes médicas para generar.");
      return;
    }

    const doc = new jsPDF();
    const hospitalInfo = {
      name: "Hospital General de Salud Mental Aurea",
      address: "Av. Salud Mental #123, Ciudad, País",
      phone: "+123 456 7890",
      date: new Date().toLocaleDateString(),
    };

    doc.setFontSize(14);
    doc.text(hospitalInfo.name, 14, 20);
    doc.setFontSize(10);
    doc.text(hospitalInfo.address, 14, 30);
    doc.text(`Teléfono: ${hospitalInfo.phone}`, 14, 35);
    doc.text(`Fecha: ${hospitalInfo.date}`, 14, 40);

    doc.setFontSize(18);
    doc.text("Órdenes Médicas", 14, 50);

    const tableData = orderList.map(order => [order.medicamento, order.observacion]);

    doc.autoTable({
      startY: 60,
      head: [['Medicamento', 'Observación']],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [22, 160, 133] },
      styles: { fontSize: 10, cellPadding: 4 },
      margin: { top: 60 },
    });

    doc.save('ordenes_medicas.pdf');
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    createMedicalOrder();
    generatePDF();
  }

  return (
    <>
      <Sidebar /> 
      <div className="main-content">
        <header>
          <h1>Generar Orden Médica</h1>
        </header>
        <section className="recent-appointments">
          <form className="form" onSubmit={handleSubmit}>
            <label>
              ID Cita:
              <input
                type="number"
                placeholder="Ingrese el ID de la cita"
                value={idCita}
                onChange={(e) => setIdCita(Number(e.target.value))}
                required
                className="input"
              />
            </label>
            <label>
              Medicamento:
              <input
                type="text"
                placeholder="Ingrese el medicamento"
                value={medicamento}
                onChange={(e) => setMedicamento(e.target.value)}
                required
                className="input"
              />
            </label>
            <label>
              Observación:
              <textarea
                placeholder="Ingrese observación"
                value={observacion}
                onChange={(e) => setObservacion(e.target.value)}
                className="textarea"
                required
              />
            </label>
            <button type="button" onClick={handleAddOrder} className="button">
              Agregar
            </button>
            <h2>Órdenes Médicas para Crear</h2>
            <table>
              <thead>
                <tr>
                  <th>Medicamento</th>
                  <th>Observación</th>
                </tr>
              </thead>
              <tbody>
                {orderList.map((order, index) => (
                  <tr key={index}>
                    <td>{order.medicamento}</td>
                    <td>{order.observacion}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button type="submit" className="button" style={{ marginTop: "20px" }}>
              Generar Orden Médica
            </button>
          </form>
        </section>
      </div>
    </>
  );
}