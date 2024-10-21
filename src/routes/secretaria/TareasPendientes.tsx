// import React, { useState } from 'react';
// import Navbar from '../../components/navbar';
// import Footer from '../../components/footer';
// import { API_URL } from "../../auth/authConstants";

// // Definir la interfaz para los datos de la tarea pendiente
// interface TareasPendientes {
//     taskId: string;
//     title: string;
//     dueDate: string;
//     status: string;
// }

// const TareasPendientes = () => {
// const [formData, setFormData] = useState({
//     userId: '',
// });
//     const [tasks, setTasks] = useState<TareasPendientes[]>([]);  // Usar el tipo TareasPendientes[]
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');

//   // Corregir el tipo del parámetro 'e'
//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//   // Corregir el tipo del parámetro 'e'
//     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       // Llamada a la API para obtener las tareas pendientes
//     const response = await fetch(`${API_URL}/AQUI_SE_CAMBIA_EL_ENDPOINT_Y_SE_PONE_EL_DEL_BACKEND/tareas/${formData.userId}`);
    
//     if (!response.ok) {
//         throw new Error('Error al obtener las tareas pendientes');
//     }

//       const data: TareasPendientes[] = await response.json();  // Especificar que esperamos un arreglo de TareasPendientes
//       setTasks(data);  // Actualiza la lista de tareas
//     } catch (error: any) {  // Especificar 'any' para el manejo del error
//     setError(error.message);
//     } finally {
//     setLoading(false);
//     }
//     };

//     return (
//     <>
//         <Navbar />
//         <div className="tasks-container">
//         <h1>Tareas Pendientes</h1>
//         <form onSubmit={handleSubmit}>
//             <div className="form-group">
//             <label>ID Usuario:</label>
//             <input
//                 type="text"
//                 name="userId"
//                 value={formData.userId}
//                 onChange={handleChange}
//                 required
//             />
//             </div>
//         <button type="submit">Buscar Tareas Pendientes</button>
//         </form>

//         {loading && <p>Cargando...</p>}
//         {error && <p style={{ color: 'red' }}>{error}</p>}

//         <h2>Tareas Pendientes</h2>
//         {tasks.length > 0 ? (
//           <table>
//             <thead>
//               <tr>
//                 <th>ID Tarea</th>
//                 <th>Título</th>
//                 <th>Fecha de Vencimiento</th>
//                 <th>Estado</th>
//             </tr>
//             </thead>
//             <tbody>
//             {tasks.map((task: TareasPendientes, index) => (
//                 <tr key={index}>
//                 <td>{task.taskId}</td>
//                 <td>{task.title}</td>
//                 <td>{task.dueDate}</td>
//                 <td>{task.status}</td>
//                 </tr>
//             ))}
//             </tbody>
//             </table>
//         ) : (
//             <p>No se encontraron tareas pendientes</p>
//         )}
//         </div>
//         <Footer />
//     </>
//     );
// };

// export default TareasPendientes;