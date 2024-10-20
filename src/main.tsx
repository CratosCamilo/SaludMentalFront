import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./auth/AuthProvider.tsx";
import ProtectedRoute from "./routes/ProtectedRoute.tsx";
import PrincipalPage from "./routes/principalPage.tsx";

// Rutas de Patient
import Dashboard from "./routes/Patient/dashboard.tsx";
// import OrdenMedica from "./routes/Patient/OrdenMedica.tsx";
import Calendar from "./routes/Patient/calendar.tsx";
import HistorialMedico from "./routes/Patient/HistorialMedico.tsx";
import HistorialPagos from "./routes/Patient/HistorialPagos.tsx";
// import ActualizarDatos from "./routes/Patient/ActualizarDatos.tsx";
import FacturasPendientes from "./routes/Patient/FacturasPendientes.tsx";
import CitasPaciente from "./routes/Patient/Citas.tsx";
import EditarCita from "./routes/Patient/EditarCita.tsx";
// import FacturaElectronica from "./routes/FacturaElectronica.tsx";
// import PasarelaPago from "./routes/Patient/PasarelaPago.tsx";




// Rutas de Doctor
import Citas from "./routes/Doctor/Citas.tsx";
import DashboardD from "./routes/Doctor/dashboard.tsx";
import Pacientes from "./routes/Doctor/pacientes.tsx";
import HistoriaMedicaDoctor from "./routes/Doctor/HistoriaMedica.tsx";

// Rutas de Admin
import DashboardA from "./routes/Admin/MainUser.tsx";

// Rutas de Secretaria
import PacientesSecretaria from "./routes/Secretary/Pacientes.tsx";
import CalendarSecretary from "./routes/Secretary/AgendarCita.tsx";
import CitasOperario from "./routes/Secretary/Citas.tsx";
import EditarCitaSecretary from "./routes/Secretary/EditarCita.tsx";

// Otras rutas
import Profile from "./routes/Profile.tsx";
import HistoriaClinica from "./routes/HistoriaClinica.tsx";
import Dashboard2 from "./routes/Dashboard2.tsx";

import "./index.css";

const router = createBrowserRouter([
  // Rutas públicas (sin protección)
  {
    path: "/",
    element: <PrincipalPage />,
  },
  // {
  //   path: "/Patient/dashboard",
  //   element: <Dashboard />,
  // },
  // // {
  // //   path: "/orden-medica",
  // //   element: <OrdenMedica />,
  // // },
  // {
  //   path: "/patient/calendar",
  //   element: <Calendar />,
  // },
  // {
  //   path: "/patient/citas",
  //   element: <CitasPaciente />,
  // },
  // {
  //   path: "/patient/editar-cita/:appointmentId", // Nueva ruta para EditarCita
  //   element: <EditarCita />,
  // },
  // {
  //   path: "/patient/historial-medico",
  //   element: <HistorialMedico />,
  // },
  // {
  //   path: "/patient/historial-pagos",
  //   element: <HistorialPagos />,
  // },
  // {
  //   path: "/patient/actualizar-datos",
  //   element: <ActualizarDatos />,
  // },
  // {
  //   path: "/patient/facturas-pendientes",
  //   element: <FacturasPendientes />,
  // },
  // {
  //   path: "/facturaElectronica",
  //   element: <FacturaElectronica />,
  // },
  // {
  //   path: "/patient/pasarelaPago",
  //   element: <PasarelaPago />,
  // },

  // Rutas protegidas para pacientes (roleId = 4)
  {
    path: "/",
    element: <ProtectedRoute roleId={4} />,
    children: [
      {
        path: "/Patient/dashboard",
        element: <Dashboard />,
      },
      // {
      //   path: "/orden-medica",
      //   element: <OrdenMedica />,
      // },
      {
        path: "/patient/calendar",
        element: <Calendar />,
      },
      {
        path: "/patient/citas",
        element: <CitasPaciente />,
      },
      {
        path: "/patient/editar-cita/:appointmentId", // Nueva ruta para EditarCita
        element: <EditarCita />,
      },
      {
        path: "/patient/historial-medico",
        element: <HistorialMedico />,
      },
      {
        path: "/patient/historial-pagos",
        element: <HistorialPagos />,
      },
      // {
      //   path: "/patient/actualizar-datos",
      //   element: <ActualizarDatos />,
      // },
      {
        path: "/patient/facturas-pendientes",
        element: <FacturasPendientes />,
      },
    ],
  },

  // Rutas protegidas para doctores (roleId = 3)
  {
    path: "/",
    element: <ProtectedRoute roleId={3} />,
    children: [
      {
        path: "/Doctor/Citas",
        element: <Citas />,
      },
      {
        path: "/Doctor/dashboard",
        element: <DashboardD />,
      },
      {
        path: "/Doctor/pacientes",
        element: <Pacientes />,
      },
      {
        path: "/Doctor/atender-cita/:idCita/:idUsuarioCC", 
        element: <HistoriaMedicaDoctor />,
      },
    ],
  },

  // Rutas protegidas para administradores (roleId = 1)
  {
    path: "/",
    element: <ProtectedRoute roleId={1} />,
    children: [
      {
        path: "/admin/dashboard",
        element: <DashboardA />,
      },
    ],
  },
  // Rutas protegidas para administradores (roleId = 2)
  {
    path: "/",
    element: <ProtectedRoute roleId={2} />,
    children: [
      {
        path: "/secretary/pacientes",
        element: <PacientesSecretaria />,
      },
      {
        path: "/secretary/editar-cita/:appointmentId", 
        element: <EditarCitaSecretary />,
      },
      {
        path: "/secretary/calendar",
        element: <CalendarSecretary />,
      },
      {
        path: "/secretary/citas",
        element: <CitasOperario />,
      },
    ],
  },

  // Rutas generales protegidas para cualquier usuario autenticado
  {
    path: "/",
    element: <ProtectedRoute />, // No se valida el roleId, solo autenticación
    children: [
      {
        path: "/me",
        element: <Profile />,
      },
      {
        path: "/historia-clinica",
        element: <HistoriaClinica />,
      },
      {
        path: "/dashboard2",
        element: <Dashboard2 />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
