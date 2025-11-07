# Todo List

Una aplicación de lista de tareas (Todo List) creada con **React**, **Node.js** y **MySQL**, que permite agregar, editar, eliminar y marcar tareas como completadas. Además, cuenta con filtros para mostrar todas las tareas, solo las completadas o las no completadas.

## Arquitectura del proyecto

El proyecto está dividido en tres capas principales:

- **Frontend (React):** Interfaz de usuario moderna y responsiva.
- **Backend (Node.js + Express):** API REST que gestiona la lógica y conexión con la base de datos.
- **Base de datos (MySQL):** Almacena las tareas y sus atributos.

Estas capas se comunican mediante peticiones HTTP (`fetch`) entre el frontend y el backend, y consultas SQL entre el backend y la base de datos.

## Características

- Agregar tareas con validación de longitud.
- Establecer prioridad: baja, media o alta.
- Marcar tareas como completadas o no completadas.
- Editar tareas existentes (texto, prioridad y estado).
- Eliminar tareas con confirmación mediante modal.
- Filtrar tareas por estado: todas, realizadas o no realizadas.
- Diseño responsive para móviles y pantallas grandes.
- Estadísticas generales de tareas (total, completadas, por prioridad).

## Frontend

### Tecnologías utilizadas

- React
- React-Bootstrap
- React Icons
- Bootstrap 5
- JavaScript (ES6+)
- CSS

### Componentes principales

- `TodoList.jsx`: formulario de creación, filtros y lógica principal.
- `TodoItems.jsx`: renderiza cada tarea con botones de acción.
- `EditModal.jsx`: modal para editar tareas.
- `ShowNoTodos.jsx`: mensaje cuando no hay tareas.

### Comunicación con el backend

Utiliza `fetch()` para enviar peticiones a la API REST (por ejemplo, `/api/v1/todo`, `/api/v1/todos`).

## Backend

### Tecnologías utilizadas

- Node.js
- Express
- Joi (validación de datos)
- MySQL2 (conexión a base de datos)
- dotenv (variables de entorno)

### Rutas principales (`todo.routes.js`)

- `GET /api/v1/todos`: obtener todas las tareas (con filtros).
- `POST /api/v1/todo`: crear una nueva tarea.
- `GET /api/v1/todo/:id`: obtener una tarea por ID.
- `PUT /api/v1/todo/:id`: actualizar una tarea.
- `DELETE /api/v1/todo/:id`: eliminar una tarea.
- `GET /api/v1/todos/stats`: obtener estadísticas de tareas.

### Controladores (`todo.controller.js`)

- Validan los datos con Joi.
- Verifican existencia de tareas antes de modificarlas.
- Gestionan respuestas JSON para el frontend.

### Modelo (`todo.model.js`)

- `getAll()`: obtiene tareas con filtros.
- `create()`: inserta una nueva tarea.
- `update()`: modifica una tarea existente.
- `deleteID()`: elimina una tarea.
- `getStats()`: calcula estadísticas.
- `existeID()`: verifica si una tarea existe.

## Base de datos

### Tabla `todos`

- `id`: identificador único.
- `title`: texto de la tarea.
- `priority`: prioridad (`low`, `medium`, `high`).
- `completed`: estado (`true`/`false`).
- `createdAt`: fecha de creación.
- `updatedAt`: fecha de última modificación.

## Cómo ejecutar el proyecto

### Backend

```bash
cd backend
npm install
npm run dev


Frontend
cd frontend
npm install
npm run dev


Asegúrate de tener MySQL corriendo y configurado en el archivo .env.

---

## Desarrolladores

- Diego Reyes
- Marc Caixàs
```
