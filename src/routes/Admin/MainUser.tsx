import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/sidebar';
import { useAuth } from '../../auth/AuthProvider';
import type { UserAdmin } from "../../types/types";
import requestNewAccessToken from "../../auth/requestNewAccessToken";
import { API_URL } from '../../auth/authConstants';

// Definición de la interfaz de usuario


const NavigationMenu: React.FC = () => {

  const [isMenuVisible, setMenuVisible] = useState(false);

  const menuUser = () => {
    setMenuVisible(!isMenuVisible);
  };

  return (
    <nav style={{ padding: '10px', backgroundColor: '#f0f0f0', marginBottom: '20px' }}>
      <ul style={{ listStyleType: 'none', display: 'flex', gap: '15px' }}>
        <li><a href="./MainUser">Usuarios</a></li>
        <li><a href="./MainPacient">Pacientes</a></li>
        <li><a href="./MainDoctor">Especialistas</a></li>
        <li><a href="#historias-clinicas">Historias Clínicas</a></li>
        <li><a href="#citas">Citas</a></li>
        <li><a href="#auditorias">Auditorías</a></li>
        <li>
          <div style={{ position: 'relative' }}>
            <a href="#" onClick={menuUser}>IMAGEN menú desplegable</a>
            {isMenuVisible && (
              <ul style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                backgroundColor: '#ffffff',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                listStyleType: 'none',
                padding: '10px',
                margin: 0,
                zIndex: 1000,
              }}>
                <li style={{ padding: '5px 10px' }}><a href="#perfil">Perfil</a></li>
                <li style={{ padding: '5px 10px' }}><a href="#ayuda">Ayuda</a></li>
                <li style={{ padding: '5px 10px' }}><a href="#cerrar-sesion">Cerrar sesión</a></li>
              </ul>
            )}
          </div>
        </li>
      </ul>
    </nav>
  );
};

const UserRegistrationPage: React.FC = () => {
  const [users, setUsers] = useState<UserAdmin[]>([]);
  const [Nombre, setNombre] = useState<string>('');
  const [Apellido, setApellido] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [NumeroCC, setNumeroCC] = useState<number | undefined>(undefined);
  const [EstadoUsuario, setEstadoUsuario] = useState<number>(0);
  const [rol, setRol] = useState<number>(0);
  const [tipoUsuario, setTipoUsuario] = useState<number>(0);
  const [hojaVida, setHojaVida] = useState<number>(0);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const auth = useAuth();
  // Cargar usuarios al cargar la página
  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_URL}/Admin/select`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.getAccessToken()}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setUsers(data.body.data);
      } else {
        setErrorMessage(data.error || 'Error al cargar los usuarios');
      } ''
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Ocurrió un error al cargar los usuarios tablaaaa');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRegister = async (e: React.FormEvent) => {

    e.preventDefault();
    console.log('Registro iniciado'); // Depuración

    // Validación de campos requeridos
    if (NumeroCC === undefined || !Nombre || !Apellido || !email || !password || !EstadoUsuario || !rol || !tipoUsuario || !hojaVida) {
      setErrorMessage('Todos los campos son obligatorios');
      return;
    }

    const newUser = {
      NumeroCC,
      Nombre,
      Apellido,
      email,
      password,
      EstadoUsuario,
      rol,
      tipoUsuario,
      hojaVida,
    };

    try {
      const response = await fetch('http://localhost:3000/api/ModuloAdmin/MenuPaciente', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      const data = await response.json();
      console.log('Respuesta del servidor:', data); // Depuración
      if (response.ok) {
        setUsers(prevUsers => [...prevUsers, data.user]);
        setSuccessMessage('Usuario registrado correctamente');
        resetForm();
      } else {
        setErrorMessage(data.error || 'Error al registrar el usuario');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Ocurrió un error al registrar el usuario registro');
    }
  };

  const resetForm = () => {
    setNombre('');
    setApellido('');
    setEmail('');
    setPassword('');
    setNumeroCC(undefined);
    setEstadoUsuario('');
    setRol('');
    setTipoUsuario('');
    setHojaVida('');
  };

  const handleEdit = (NumeroCC: number) => {
    const userToEdit = users.find(user => user.username === NumeroCC);
    if (userToEdit) {
      setNombre(userToEdit.name);
      setApellido(userToEdit.lastName);
      setEmail(userToEdit.email);
      setPassword(userToEdit.password);
      setNumeroCC(userToEdit.username);
      setEstadoUsuario(userToEdit.status);
      setRol(userToEdit.roleId);
      setTipoUsuario(userToEdit.patientTypeId);
      setHojaVida(userToEdit.lifeSheetId);
      setEditingUserId(userToEdit.username);
    }
  };

  const saveChanges = async () => {
    if (editingUserId !== null) {
      const updatedUser = {
        NumeroCC,
        Nombre,
        Apellido,
        email,
        password,
        EstadoUsuario,
        rol,
        tipoUsuario,
        hojaVida,
      };

      try {
        const response = await fetch(`http://localhost:3000/api/ModuloAdmin/MenuPaciente/${editingUserId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        });

        const data = await response.json();
        if (response.ok) {
          setUsers(prevUsers =>
            prevUsers.map(user =>
              user.NumeroCC === editingUserId ? data.user : user
            )
          );
          setEditingUserId(null);
          setSuccessMessage(data.message || 'Usuario actualizado correctamente');
        } else {
          setErrorMessage(data.error || 'Error al actualizar el usuario');
        }
      } catch (error) {
        console.error("Error:", error);
        setErrorMessage("Ocurrió un error al actualizar el usuario actualizar");
      }
    }
  };

  const handleDelete = async (NumeroCC: number) => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este usuario?');

    if (confirmDelete) {
      try {
        const response = await fetch(`${API_URL}/ModuloAdmin/MenuPaciente/${NumeroCC}`, {
          method: "DELETE",
        });

        const data = await response.json();
        if (response.ok) {
          setUsers(prevUsers =>
            prevUsers.filter(user => user.CC !== NumeroCC)
          );
          setSuccessMessage(data.message || 'Usuario eliminado correctamente');
        } else {
          setErrorMessage(data.error || 'Error al eliminar el usuario');
        }
      } catch (error) {
        console.error("Error:", error);
        setErrorMessage("Ocurrió un error al eliminar el usuario");
      }
    }
  };


  const getUserType = (roleId: number) => {
    switch (roleId) {
      case 1: return "Admin";
      case 2: return "Operario";
      case 3: return "Doctor";
      case 4: return "Paciente";
      default: return "Desconocido";
    }
  };
  console.log("users: ", users);
  return (
    <>
      <Sidebar />

      <div className="calendar-container">
        <header>
          <h4>
            Bienvenido {auth.getUser()?.name ?? ""}, usted es {getUserType(auth.getUser()?.roleId ?? 0)} con número de identificación {auth.getUser()?.username ?? ""}
          </h4>
        </header>
        <h2>Registrar Paciente (dashboard provicional admin) </h2>
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <form onSubmit={handleRegister}>
          <div style={{ flex: 1, padding: '10px' }}>
            <label>Número Documento: </label>
            <input
              type="number"
              value={NumeroCC ?? ''}
              onChange={(e) => setNumeroCC(e.target.value ? Number(e.target.value) : undefined)}
              required
            />
          </div>
          <div>
            <label>Nombre: </label>
            <input
              type="text"
              value={Nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
          <div style={{ flex: 1, padding: '10px' }}>
            <label>Apellido: </label>
            <input
              type="text"
              value={Apellido}
              onChange={(e) => setApellido(e.target.value)}
              required
            />
          </div>
          <div style={{ flex: 1, padding: '10px' }}>
            <label>Email: </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div style={{ flex: 1, padding: '10px' }}>
            <label>Password: </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Estado: </label>
            <input
              type="text"
              value={EstadoUsuario}
              onChange={(e) => setEstadoUsuario(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Rol: </label>
            <input
              type="text"
              value={rol}
              onChange={(e) => setRol(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Tipo usuario: </label>
            <input
              type="text"
              value={tipoUsuario}
              onChange={(e) => setTipoUsuario(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Hoja de vida: </label>
            <input
              type="text"
              value={hojaVida}
              onChange={(e) => setHojaVida(e.target.value)}
              required
            />
          </div>
          <button type="submit">Registrar</button>
        </form>

        <button type="button" onClick={saveChanges}>Guardar</button>
        <div className=''>
          <h2>Pacientes Registrados</h2>
          <table border={1}>
            <thead>
              <tr>
                <th>Cedula</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Email</th>
                <th>Estado</th>
                <th>Hoja de vida</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.CC}>
                  <td>{user.CC}</td>
                  <td>{user.nombreUsuario}</td>
                  <td>{user.apellidoUsuario}</td>
                  <td>{user.emailUsuario}</td>
                  <td>{user.estadoUsuario}</td>
                  <td>{user.idHoja_Vida}</td>
                  <td>
                    <button onClick={() => handleEdit(user.CC)}>Editar</button>
                    <button onClick={() => handleDelete(user.CC)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </>
  );
};

export default UserRegistrationPage;