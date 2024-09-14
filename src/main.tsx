import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './routes/Login.tsx'
import Signup from './routes/signup.tsx'
import ProtectedRoute from './routes/ProtectedRoute.tsx'
import PrincipalPage from './routes/principalPage.tsx'
import Dashboard from './routes/Patient/dashboard.tsx'
import Calendar from './routes/Patient/calendar.tsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <PrincipalPage/>,
  },
  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/calendar",
    element: <Calendar />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute />,
    children: [
      {
        path: "Dashboard",
        element: <Dashboard />
      }
    ]
  }

])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <App />
  </React.StrictMode>,
)
