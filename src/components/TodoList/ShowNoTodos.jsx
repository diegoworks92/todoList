import { FaRegSadTear } from "react-icons/fa";

const ShowNoTodos = () => {
  return (
    <div className="container h6 text-center mt-4 bg-white rounded-4 p-4">
      <p>
        No hay tareas aún <FaRegSadTear className="fs-3" />
      </p>

      <p>Crea una nueva tarea con el botón Agregar!</p>
    </div>
  );
};

export default ShowNoTodos;
