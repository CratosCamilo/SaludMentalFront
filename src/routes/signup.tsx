import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/signupn.css";

export default function Signup() {
  const [identification, setIdentification] = useState("");
  const [names, setNames] = useState("");
  const [surnames, setSurnames] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [cellphoneNumber, setCellphoneNumber] = useState("");
  const [idEps, setIdEps] = useState("");
  const [errorResponse, setErrorResponse] = useState("");
  const [isRegistered, setIsRegistered] = useState(false); 

  const navigate = useNavigate();

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    switch (name) {
      case "identification":
        setIdentification(value);
        break;
      case "names":
        setNames(value);
        break;
      case "surnames":
        setSurnames(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "address":
        setAddress(value);
        break;
      case "cellphoneNumber":
        setCellphoneNumber(value);
        break;
      case "idEps":
        setIdEps(value);
        break;
      default:
        break;
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Identification: identification,
          Names: names,
          Surnames: surnames,
          Email: email,
          Password: password,
          Address: address,
          CellphoneNumber: cellphoneNumber,
          IdEps: idEps,
        }),
      });
  
      if (response.ok) {
        setIdentification("");
        setNames("");
        setSurnames("");
        setEmail("");
        setPassword("");
        setAddress("");
        setCellphoneNumber("");
        setIdEps("");
        setErrorResponse("");
        setIsRegistered(true); 
      } else {
        const errorData = await response.json();
        setErrorResponse(errorData.error || "Error al enviar los datos.");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      setErrorResponse("Error en la solicitud. Inténtalo de nuevo más tarde.");
    }
  }

  return (
    
      <div className="signup-container">
        {isRegistered ? (
          <div className="success-message">
            <h2>Registro realizado con éxito</h2>
            <button onClick={() => navigate("/login")} className="login-button">
              Iniciar sesión
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="signup-form">
            <h1>Registro</h1>
            {errorResponse && <div className="error-message">{errorResponse}</div>}
            <label>Identificación</label>
            <input
              name="identification"
              type="text"
              onChange={handleChange}
              value={identification}
            />
            <label>Nombres</label>
            <input
              name="names"
              type="text"
              onChange={handleChange}
              value={names}
            />
            <label>Apellidos</label>
            <input
              name="surnames"
              type="text"
              onChange={handleChange}
              value={surnames}
            />
            <label>Email</label>
            <input
              name="email"
              type="email"
              onChange={handleChange}
              value={email}
            />
            <label>Contraseña</label>
            <input
              name="password"
              type="password"
              onChange={handleChange}
              value={password}
            />
            <label>Dirección</label>
            <input
              name="address"
              type="text"
              onChange={handleChange}
              value={address}
            />
            <label>Número de Celular</label>
            <input
              name="cellphoneNumber"
              type="text"
              onChange={handleChange}
              value={cellphoneNumber}
            />
            <label>EPS</label>
            <select
              name="idEps"
              onChange={handleChange}
              value={idEps}
              className="form-control"
            >
              <option value="" disabled>
                Selecciona una opción
              </option>
              <option value="colsanitas">Colsanitas</option>
              <option value="salud">Salud</option>
              <option value="sura">Sura</option>
              <option value="particular">Particular</option>
            </select>
            <button type="submit" className="signup-button">
              Registrarse
            </button>
          </form>
        )}
      </div>
     
  );
}
