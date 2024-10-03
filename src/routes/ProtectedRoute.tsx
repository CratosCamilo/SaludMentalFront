import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

interface ProtectedRouteProps {
    roleId?: number;
  }
// Recibe un roleId opcional
export default function ProtectedRoute({ roleId }: ProtectedRouteProps) {
  const auth = useAuth();

  // Verifica si está autenticado y si tiene el roleId adecuado (si roleId está definido)
  if (!auth.isAuthenticated) {
    return <Navigate to="/" />;
  }
  
  if (roleId && auth.getUser()?.roleId !== roleId) {
    return <Navigate to="/" />;  // Redirigir si el usuario no tiene el rol requerido
  }

  return <Outlet />;
}
