import { useContext, createContext, useState, useEffect } from "react";
import type { AuthResponse, User } from "../types/types";
import requestNewAccessToken from "./requestNewAccessToken";
import { API_URL } from "./authConstants";

const AuthContext = createContext({
  isAuthenticated: false,
  getAccessToken: () => {},
  setAccessTokenAndRefreshToken: (_accessToken: string, _refreshToken: string) => {},
  getRefreshToken: () => {},
  saveUser: (_userData: AuthResponse) => {},
  getUser: () => ({} as User | undefined),
  signout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | undefined>();
  const [accessToken, setAccessToken] = useState<string>("");
  const [refreshToken, setRefreshToken] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isloading, setIsLoading] = useState(true);

  function getAccessToken() {
    return accessToken;
  }

  function saveUser(userData: AuthResponse) {
    console.log("saveUser", userData);  // Añade este log
    setAccessTokenAndRefreshToken(
      userData.body.accessToken,
      userData.body.refreshToken
    );
    setUser(userData.body.user);
    setIsAuthenticated(true);
  }

  function setAccessTokenAndRefreshToken(accessToken: string, refreshToken: string) {
    console.log("setAccessTokenAndRefreshToken", accessToken, refreshToken);
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    localStorage.setItem("token", JSON.stringify({ refreshToken }));
  }

  function getRefreshToken() {
    const token = localStorage.getItem("token");
    console.log("Token almacenado en localStorage:", token); // Log del token en localStorage
    if (token) {
      const { refreshToken } = JSON.parse(token);
      setRefreshToken(refreshToken);
      return refreshToken;
    }
    return null;
  }

  async function getNewAccessToken(refreshToken: string) {
    try {
      const token = await requestNewAccessToken(refreshToken);
      if (token) {
        return token;
      }
    } catch (error) {
      console.error("Error al obtener un nuevo token de acceso:", error);
    }
    return null;
  }

  function getUser(): User | undefined {
    return user;
  }

  function signout() {
    localStorage.removeItem("token");
    setAccessToken("");
    setRefreshToken("");
    setUser(undefined);
    setIsAuthenticated(false);
  }

  async function checkAuth() {
    try {
      if (accessToken) {
        const userInfo = await retrieveUserInfo(accessToken);
        setUser(userInfo);
        setAccessToken(accessToken);
        setIsAuthenticated(true);
      } else {
        const token = localStorage.getItem("token");
        if (token) {
          const refreshToken = JSON.parse(token).refreshToken;
          const newToken = await getNewAccessToken(refreshToken);
          if (newToken) {
            const userInfo = await retrieveUserInfo(newToken);
            setUser(userInfo);
            setAccessToken(newToken);
            setIsAuthenticated(true);
          }
        }
      }
    } catch (error) {
      console.error("Error al verificar la autenticación:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        getAccessToken,
        setAccessTokenAndRefreshToken,
        getRefreshToken,
        saveUser,
        getUser,
        signout,
      }}
    >
      {isloading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
}

async function retrieveUserInfo(accessToken: string) {
  try {
    const response = await fetch(`${API_URL}/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.ok) {
      const json = await response.json();
      console.log("User info fetched:", json);
      return json.body;
    } else {
      console.error("Failed to fetch user info:", response.statusText);
      return undefined;
    }
  } catch (error) {
    console.error("Error fetching user info:", error);
    return undefined;
  }
}


export const useAuth = () => useContext(AuthContext);
