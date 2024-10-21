// import React, { useEffect, useState } from 'react';
// import { useAuth } from "../../auth/AuthProvider";
// import { API_URL } from "../../auth/authConstants";

// interface Task {
//     id: string;
//     title: string;
//     completed: boolean;
// }

// const GestionTareas: React.FC = () => {
//     const auth = useAuth();
//     const [tasks, setTasks] = useState<Task[]>([]);
//     const [newTaskTitle, setNewTaskTitle] = useState<string>("");

//     // Fetch existing tasks
//     async function fetchTasks() {
//         const accessToken = auth.getAccessToken();
//         try {
//             const response = await fetch(`${API_URL}/tasks`, {
//                 method: "GET",
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${accessToken}`,
//                 },
//             });
//             if (response.ok) {
//                 const data = await response.json();
//                 setTasks(data);
//             } else {
//                 console.error("Error fetching tasks");
//             }
//         } catch (error) {
//             console.error("Error:", error);
//         }
//     }

//     // Add a new task
//     async function addTask() {
//         const accessToken = auth.getAccessToken();
//         try {
//             const response = await fetch(`${API_URL}/tasks`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${accessToken}`,
//                 },
//                 body: JSON.stringify({
//                     title: newTaskTitle,
//                     completed: false
//                 }),
//             });
//             if (response.ok) {
//                 const newTask = await response.json();
//                 setTasks([...tasks, newTask]);
//                 setNewTaskTitle(""); // Clear the input field
//             } else {
//                 console.error("Error adding task");
//             }
//         } catch (error) {
//             console.error("Error:", error);
//         }
//     }

//     // Delete a task by ID
//     async function deleteTask(id: string) {
//         const accessToken = auth.getAccessToken();
//         try {
//             const response = await fetch(`${API_URL}/tasks/${id}`, {
//                 method: "DELETE",
//                 headers: {
//                     "Authorization": `Bearer ${accessToken}`,
//                 },
//             });
//             if (response.ok) {
//                 setTasks(tasks.filter(task => task.id !== id));
//             } else {
//                 console.error("Error deleting task");
//             }
//         } catch (error) {
//             console.error("Error:", error);
//         }
//     }

//     useEffect(() => {
//         fetchTasks();
//     }, []);

//     const handleAddTask = (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         if (newTaskTitle) {
//             addTask();
//         }
//     };

//     return (
//         <div className="manage-tasks-container">
//             <h2>Gestionar Tareas</h2>

//             {/* Formulario para agregar nueva tarea */}
//             <form onSubmit={handleAddTask} className="task-form">
//                 <input
//                     type="text"
//                     placeholder="Título de la tarea"
//                     value={newTaskTitle}
//                     onChange={(e) => setNewTaskTitle(e.target.value)}
//                     required
//                 />
//                 <button type="submit">Agregar Tarea</button>
//             </form>

//             {/* Listado de tareas */}
//             <h3>Tareas Pendientes</h3>
//             {tasks.length === 0 ? (
//                 <p>No hay tareas pendientes.</p>
//             ) : (
//                 <ul className="tasks-list">
//                     {tasks.map((task) => (
//                         <li key={task.id} className="task-item">
//                             <div>
//                                 <strong>Tarea:</strong> {task.title} <br />
//                                 <strong>Estado:</strong> {task.completed ? "Completada" : "Pendiente"}
//                             </div>
//                             <button onClick={() => deleteTask(task.id)} className="delete-btn">
//                                 Eliminar
//                             </button>
//                         </li>
//                     ))}
//                 </ul>
//             )}
//         </div>
//     );
// };

// export default GestionTareas;
