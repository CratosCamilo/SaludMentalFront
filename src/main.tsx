import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./auth/AuthProvider.tsx";
import Dashboard from "./routes/Patient/dashboard.tsx";
import ProtectedRoute from "./routes/ProtectedRoute.tsx";
import Profile from "./routes/Profile.tsx";
import OrdenMedica from "./routes/Patient/OrdenMedica.tsx"; 
import HistoriaClinica from "./routes/HistoriaClinica.tsx";
import Citas from "./routes/Doctor/Citas.tsx";
import DashboardD from "./routes/Doctor/dashboard.tsx";
import Pacientes from "./routes/Doctor/pacientes.tsx";
import PrincipalPage from "./routes/principalPage.tsx";
import Calendar from "./routes/Patient/calendar.tsx";
import HistorialMedico from "./routes/Patient/HistorialMedico.tsx";
import HistorialPagos from "./routes/Patient/HistorialPagos.tsx";
import DashboardA from "./routes/Admin/MainUser.tsx";
import ProbarFront from "./routes/Admin/MainUser.tsx";


import "./index.css";
import Dashboard2 from "./routes/Dashboard2.tsx";
import ActualizarDatos from "./routes/Patient/ActualizarDatos.tsx";
import FacturasPendientes from "./routes/Patient/FacturasPendientes.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PrincipalPage />,
  },
  
  {
    path: "/prueba",  
    element: <ProbarFront />,
  },
  
  
  
  {
    path: "/Doctor/pacientes",  
    element: <Pacientes />,
  },
  
  {
    path: "/Doctor/Citas",  
    element: <Citas />,
  },
  
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/Patient/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/Doctor/dashboard",  
        element: <DashboardD />,
      },
      {
        path: "/admin/dashboard",
        element: <DashboardA />,
      },
      
      
      {
        path: "/me",
        element: <Profile />,
      },
      {
        path: "/orden-medica",  
        element: <OrdenMedica />,
      },
      {
        path: "/historia-clinica",  
        element: <HistoriaClinica />,
      },
      
      {
        path: "/patient/calendar",  
        element: <Calendar />,
      },
      {
        path: "/patient/historial-medico",  
        element: <HistorialMedico />,
      },
      {
        path: "/patient/historial-pagos",  
        element: <HistorialPagos />,
      },
      {
        path: "/patient/actualizar-datos",  
        element: <ActualizarDatos />,
      },
      {
        path: "/patient/facturas-pendientes",  
        element: <FacturasPendientes />,
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