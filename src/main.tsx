import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./routes/Login.tsx";
import Signup from "./routes/signup.tsx";
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


import "./index.css";
import Dashboard2 from "./routes/Dashboard2.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PrincipalPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/calendar",  
    element: <Calendar />,
  },
  {
    path: "/signup",
    element: <Signup />,
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
        path: "/Doctor/dashboard",  
        element: <DashboardD />,
      },
      {
        path: "/Doctor/pacientes",  
        element: <Pacientes />,
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