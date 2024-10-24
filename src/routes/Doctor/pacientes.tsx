import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/sidebarDoctor';
import { useAuth } from '../../auth/AuthProvider';
import type { UserAdmin } from "../../types/types";
import { API_URL } from '../../auth/authConstants';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TablePagination,
} from '@mui/material';

// Definición de la interfaz de usuario




const UserRegistrationPage: React.FC = () => {
  const [users, setUsers] = useState<UserAdmin[]>([]);
  const [Nombre, setNombre] = useState<string>('');
  const [Apellido, setApellido] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [NumeroCC, setNumeroCC] = useState<number | undefined>(undefined);
  const [EstadoUsuario, setEstadoUsuario] = useState<number | undefined>(undefined);
  const [rol, setRol] = useState<number | undefined>(undefined);
  const [tipoUsuario, setTipoUsuario] = useState<number | undefined>(undefined);
  const [hojaVida, setHojaVida] = useState<number | undefined>(undefined);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);



  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const auth = useAuth();
  // Cargar usuarios al cargar la página
  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_URL}/Secretary/select`, {
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
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Ocurrió un error al cargar los usuarios tablaaaa');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmitEdit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validación de campos requeridos
    if (NumeroCC === undefined || !Nombre || !Apellido || !email || !password || !rol) {
      setErrorMessage('Todos los campos son obligatorios');
      return;
    }




    try {
      const response = await fetch(`http://localhost:3000/api/Admin/edit/${NumeroCC}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.getAccessToken()}`,
        },
        body: JSON.stringify({
          Identification: NumeroCC,
          Names: Nombre,
          Surnames: Apellido,
          Email: email,
          Password: password,
          IdRol: rol,
          IdTypePatient: tipoUsuario,
        }),
      });

      const data = await response.json();
      console.log('Respuesta del servidor:', data); // Depuración
      if (response.ok) {
        setIsUpdate(true);
        fetchUsers();
        setSuccessMessage('Usuario actualizado correctamente');
        resetForm();
      } else {
        setErrorMessage(data.error || 'Error al actualizar el usuario');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Ocurrió un error al actualizar el usuario');
    }
  };

  const resetForm = () => {
    setNombre('');
    setApellido('');
    setEmail('');
    setPassword('');
    setNumeroCC(undefined);
    setEstadoUsuario(undefined);
    setRol(undefined);
    setTipoUsuario(undefined);
    setHojaVida(undefined);
    setIsEditMode(false);
  };

  // const handleEdit = async (NumeroCC: number) => {
  //   try {
  //     const response = await fetch(`${API_URL}/Admin/fetch-user/${NumeroCC}`, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${auth.getAccessToken()}`,
  //       }
  //     });

  //     const data = await response.json();

  //     if (response.ok) {
  //       const userToEdit = data.body.data;
  //       setNombre(userToEdit.nombreUsuario);
  //       setApellido(userToEdit.apellidoUsuario);
  //       setEmail(userToEdit.emailUsuario);
  //       setPassword(userToEdit.pwdUsuario);
  //       setNumeroCC(userToEdit.CC);
  //       setEstadoUsuario(userToEdit.estadoUsuario);
  //       setRol(userToEdit.idRol);
  //       setTipoUsuario(userToEdit.idTipoPaciente);
  //       setHojaVida(userToEdit.idHoja_Vida);
  //       setEditingUserId(NumeroCC); // Establecer el usuario que está siendo editado
  //       setIsEditMode(true);
  //       setModalOpen(true); // Abrir modal para editar
  //     } else {
  //       setErrorMessage(data.error || 'Error al obtener los datos del usuario');
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //     setErrorMessage('Ocurrió un error al obtener los datos del usuario');
  //   }
  // };

  const handleSubmitRegister = async () => {
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
            Authorization: `Bearer ${auth.getAccessToken()}`,
          },
          body: JSON.stringify(updatedUser),
        });

        const data = await response.json();
        if (response.ok) {
          setUsers(prevUsers =>
            prevUsers.map(user =>
              user.CC === editingUserId ? data.user : user
            )
          );
          setEditingUserId(null);
          setSuccessMessage(data.message || 'Usuario actualizado correctamente');
          setModalOpen(false); // Cerrar modal después de guardar cambios
        } else {
          setErrorMessage(data.error || 'Error al actualizar el usuario');
        }
      } catch (error) {
        console.error("Error:", error);
        setErrorMessage("Ocurrió un error al actualizar el usuario actualizar");
      }
    }
  };

  const toggleUserState = async (NumeroCC: number) => {
    const confirmToggle = window.confirm('¿Estás seguro de que deseas cambiar el estado de este usuario?');

    if (confirmToggle) {
      try {
        const response = await fetch(`${API_URL}/Admin/toggle-status/${NumeroCC}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.getAccessToken()}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          // Actualizar el estado local de los usuarios
          fetchUsers();
          setSuccessMessage(data.message || 'Estado del usuario actualizado correctamente');
        } else {
          setErrorMessage(data.error || 'Error al actualizar el estado del usuario');
        }
      } catch (error) {
        console.error("Error:", error);
        setErrorMessage("Ocurrió un error al actualizar el estado del usuario");
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


  return (
    <>
      <Sidebar />

      <div className="fetchUsers-container">
        <header>

        </header>


        {/* Tabla usuarios */}
        <div className=''>
          <div className="header-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2>Pacientes Registrados</h2>

            <h4>
              Bienvenido {auth.getUser()?.name ?? ""}, usted es {getUserType(auth.getUser()?.roleId ?? 0)} con número de identificación {auth.getUser()?.username ?? ""}
            </h4>
            <button onClick={() => { resetForm(); setModalOpen(true); }}>Registrar Usuario</button>
          </div>

          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 1440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead >
                  <TableRow>
                    <TableCell sx={{ backgroundColor: '#2980b9', color: 'white' }}>Cédula</TableCell>
                    <TableCell sx={{ backgroundColor: '#2980b9', color: 'white' }}>Nombre</TableCell>
                    <TableCell sx={{ backgroundColor: '#2980b9', color: 'white' }}>Rol</TableCell>
                    <TableCell sx={{ backgroundColor: '#2980b9', color: 'white' }}>Email</TableCell>
                    <TableCell sx={{ backgroundColor: '#2980b9', color: 'white' }}>Hoja de vida</TableCell>
                    <TableCell sx={{ backgroundColor: '#2980b9', color: 'white' }}>Estado</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((user) => (
                      <TableRow hover role="checkbox" tabIndex={-1} key={user.CC}>
                        <TableCell>{user.CC}</TableCell>
                        <TableCell>{user.nombreUsuario} {user.apellidoUsuario}</TableCell>
                        <TableCell>{getUserType(user.idRol)}</TableCell>
                        <TableCell>{user.emailUsuario}</TableCell>
                        <TableCell>
                          <Button variant="contained" onClick={() => (user.CC)}>Ver</Button>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            style={{
                              backgroundColor: user.estadoUsuario === 1 ? '#80b929' : '#d9534f',
                              color: '#fff',
                              width: 100
                            }}
                            onClick={() => toggleUserState(user.CC)}
                          >
                            {user.estadoUsuario === 1 ? 'Activo' : 'Inactivo'}
                          </Button>
                        </TableCell>

                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={users.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
          {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>

        {/* Modal formulario */}
        {isModalOpen && (
          <div className="modal">
            <div className="modal__content">
              <span className="close" onClick={() => setModalOpen(false)}>&times;</span>
              {isUpdate ? (
                <div className="success-message">
                  <h2>Actualizacion realizada con éxito</h2>
                  <button
                    onClick={() => {
                      setModalOpen(false);
                      setIsUpdate(false);
                    }}
                    className="login-button"
                  >
                    Aceptar
                  </button>
                </div>
              ) : (
                <form onSubmit={isEditMode ? handleSubmitEdit : handleSubmitRegister}>
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
                  <div style={{ display: "none" }}>
                    <label>Rol: </label>
                    <input
                      type="text"
                      value={rol}
                      onChange={(e) => setRol(e.target.value ? Number(e.target.value) : undefined)}
                      required
                    />
                  </div>
                  <div>
                    <label>Tipo usuario: </label>
                    <input
                      type="text"
                      value={tipoUsuario}
                      onChange={(e) => setTipoUsuario(e.target.value ? Number(e.target.value) : undefined)}
                    />
                  </div>
                  <div>
                    <label>Hoja de vida: </label>
                    <input
                      type="text"
                      value={hojaVida}
                      onChange={(e) => setHojaVida(e.target.value ? Number(e.target.value) : undefined)}
                      required
                    />
                  </div>
                  {isEditMode ? (
                    <button id="actualizarButton" type="submit">Actualizar</button>
                  ) : (
                    <button id="registroButton" type="submit">Registrar</button>
                  )}
                  <button id="cancelarButton" type="button" onClick={() => setModalOpen(false)}>Cancelar</button>
                </form>

              )}
            </div>
          </div>
        )}

      </div>
    </>
  );
};

export default UserRegistrationPage;