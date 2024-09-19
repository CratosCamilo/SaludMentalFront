import { Link } from "react-router-dom";
import React, { MouseEvent } from "react";
import { useAuth } from "../auth/AuthProvider";
import { API_URL } from "../auth/authConstants";

interface PortalLayoutProps {
  children?: React.ReactNode;
}
export default function PortalLayout({ children }: PortalLayoutProps) {
  const auth = useAuth();

  async function handleSignOut(e: MouseEvent) {
    e.preventDefault();
    console.log("Intentando cerrar sesión...");

    const refreshToken = auth.getRefreshToken();
    console.log("Token de refresh enviado para cerrar sesión:", refreshToken);

    try {
      const response = await fetch(`${API_URL}/signout`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${refreshToken}`, // Cambia esto si es necesario
        },
        body: JSON.stringify({ token: refreshToken }), // Aquí envías el token en el cuerpo
      });

      if (response.ok) {
        auth.signout();
      } else {
        console.error("Error en la respuesta del servidor:", response.statusText);
      }
    } catch (error) {
      console.log("Error al cerrar sesión:", error);
    }
  }





  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/me">Profile</Link>
            </li>
            <li>
              <Link to="/me">{auth.getUser()?.username ?? ""}</Link>
            </li>
            <li>
              <a href="#" onClick={handleSignOut}>
                Sign out
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <main>{children}</main>
    </>
  );
}