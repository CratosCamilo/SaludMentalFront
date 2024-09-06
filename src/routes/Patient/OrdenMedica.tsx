import { useEffect, useState } from "react";
import PortalLayout from "../../layout/PortalLayout";
import { useAuth } from "../../auth/AuthProvider";
import { API_URL } from "../../auth/authConstants";

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
  const [estadoOM, setEstadoOM] = useState(1); // Por defecto activa (1)

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
        console.log(json);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function createMedicalOrder() {
    if (idCita > 0 && medicamento.length > 2) {
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
            medicamento,
            observacion,
          }),
        });

        if (response.ok) {
          const medicalOrder = (await response.json()) as MedicalOrder;
          setMedicalOrders([...medicalOrders, medicalOrder]);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    getMedicalOrders();
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    createMedicalOrder();
  }

  return (
    <PortalLayout>
      <div className="medical-order-form">
        <h1>Generar Orden Médica</h1>
        <form onSubmit={handleSubmit} className="form">
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
            />
          </label>
          <label>
            Estado de la Orden Médica:
            <select value={estadoOM} onChange={(e) => setEstadoOM(Number(e.target.value))} className="select">
              <option value={1}>Activa</option>
              <option value={0}>Inactiva</option>
            </select>
          </label>
          <button type="submit" className="button">
            Generar Orden Médica
          </button>
        </form>
        <h2>Órdenes Médicas Anteriores</h2>
        {medicalOrders.map((order: MedicalOrder) => (
          <div key={order.idOrden_Medica} className="order-card">
            <h3>ID Cita: {order.idCita}</h3>
            <p>Medicamento: {order.medicamento}</p>
            <p>Observación: {order.observacion}</p>
            <p>Estado: {order.estadoOM === 1 ? "Activa" : "Inactiva"}</p>
          </div>
        ))}
      </div>
    </PortalLayout>
  );
}
