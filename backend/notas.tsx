/* 
/api/v1/todos        → GET  → Obtener todas
/api/v1/todo         → POST → Crear nueva
/api/v1/todo/:id     → GET  → Obtener por ID
/api/v1/todo/:id     → PUT  → Actualizar
/api/v1/todo/:id     → DELETE → Eliminar
 */

/* 
pendiente:
cambiar todo a ingles
añadir filtrado por nombre de tarea
arreglar maquetación
x Arreglar fecha de creación
x añadir fecha de actualizacion?
x en base de datos no se actualiza el id
x agregar modal al escribir mas de 30 letras

*/

/* 

Gestor de tareas con MySQL, Node.js y React
Tu proyecto es una aplicación web de tipo To-Do List, que permite a los usuarios crear, visualizar, editar, eliminar y marcar tareas como completadas. Está dividido en tres capas principales: frontend, backend y base de datos, que trabajan juntas para ofrecer una experiencia completa.

🧩 Estructura general del proyecto
Capa	Tecnología	Función principal
Frontend	React + Bootstrap	Interfaz de usuario para gestionar tareas
Backend	Node.js + Express	API REST que gestiona la lógica y conexión con la base de datos
Base de datos	MySQL	Almacena las tareas y sus atributos
🖥️ Frontend (React)
Componentes principales:

TodoList.jsx: formulario para crear tareas, filtros, y renderizado de la lista.

TodoItems.jsx: muestra cada tarea con botones para editar, eliminar y marcar como completada.

EditModal.jsx: modal para modificar una tarea existente.

ShowNoTodos.jsx: mensaje alternativo cuando no hay tareas.

Funciones clave:

fetchTodos(): obtiene todas las tareas desde el backend.

handleSubmit(): crea una nueva tarea.

handleToggle(): cambia el estado de completada.

handleEditSave(): guarda los cambios de una tarea.

handleDelete(): elimina una tarea.

Comunicación: usa fetch() para interactuar con la API REST del backend.

🔙 Backend (Node.js + Express)
Rutas definidas en todo.routes.js:

GET /api/v1/todos: obtener todas las tareas (con filtros opcionales).

POST /api/v1/todo: crear una nueva tarea.

GET /api/v1/todo/:id: obtener una tarea por ID.

PUT /api/v1/todo/:id: actualizar una tarea.

DELETE /api/v1/todo/:id: eliminar una tarea.

GET /api/v1/todos/stats: obtener estadísticas de tareas.

Controladores en todo.controller.js:

Validan los datos con Joi (createTODOSchema, updateTODOSchema).

Llaman a funciones del modelo para interactuar con la base de datos.

Devuelven respuestas JSON al frontend.

🗄️ Base de datos (MySQL)
Tabla todos:

Columnas: id, title, priority, completed, createdAt, updatedAt.

Modelo en todo.model.js:

getAll(): obtiene tareas con filtros.

create(): inserta una nueva tarea.

getByID(): busca una tarea por ID.

update(): modifica una tarea existente.

deleteID(): elimina una tarea.

getStats(): calcula estadísticas.

existeID(): verifica si una tarea existe.

Conexión: se realiza mediante el archivo connex.js usando el paquete mysql2.

🔗 Cómo se integran todas las partes
El usuario interactúa con la interfaz React.

El frontend envía peticiones HTTP al backend usando fetch().

El backend valida los datos, ejecuta lógica y consulta la base de datos.

La base de datos responde con los datos solicitados.

El backend envía la respuesta al frontend, que actualiza la interfaz.

*/
