import { useState } from "react";
import { Button } from "react-bootstrap";

const TodoList = () => {
  const [tarea, setTarea] = useState("");
  const [lista, setLista] = useState([]);
  const [prioridad, setPrioridad] = useState("");

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const second = date.getSeconds();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tarea.trim() === "" || prioridad === "") {
      alert("Debes ingresar una tarea y una prioridad");
      return;
    }
    setLista([
      ...lista,
      {
        id: Date.now(),
        texto: tarea,
        prioridad,
        completada: false,
        fecha: `Creado: ${day}/${month}/${year} ${hours}:${minutes}:${second}`,
      },
    ]);
    setTarea("");
    setPrioridad("");
  };

  const handleChange = (e) => setTarea(e.target.value);

  // delete por id
  const handleDelete = (id) => {
    setLista(lista.filter((t) => t.id !== id));
  };

  // marcar completada
  const handleToggle = (id) => {
    setLista(
      lista.map((t) => (t.id === id ? { ...t, completada: !t.completada } : t))
    );
  };

  // modificar tarea
  const handleMod = (id) => {
    const nuevoTexto = prompt("Modifica la tarea:");
    if (!nuevoTexto) return;

    setLista(lista.map((t) => (t.id === id ? { ...t, texto: nuevoTexto } : t)));
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit} className="mb-3">
        <label>
          Tarea:{" "}
          <input
            type="text"
            value={tarea}
            placeholder="Escribe una tarea"
            name="tarea"
            onChange={handleChange}
          />
          <select
            name="prioridad"
            value={prioridad}
            onChange={(e) => setPrioridad(e.target.value)}
          >
            <option value="">Selecciona prioridad</option>
            <option value="baja">Baja</option>
            <option value="media">Media</option>
            <option value="alta">Alta</option>
          </select>
        </label>
        <Button type="submit" variant="primary">
          Agregar
        </Button>

        <ul>
          {lista.map((t, index) => (
            <li key={index}>
              <p
                className={`${
                  t.completada ? "text-decoration-line-through" : ""
                }`}
              >
                {t.texto}
              </p>{" "}
              <p>{t.prioridad}</p> <p>{t.fecha}</p>
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleDelete(t.id)}
              >
                Eliminar
              </Button>
              <Button
                variant={t.completada ? "success" : "outline-success"}
                onClick={() => handleToggle(t.id)}
              >
                {t.completada ? "Hecho" : "Ok?"}
              </Button>
              <Button onClick={() => handleMod(t.id)}>Modificar</Button>
            </li>
          ))}
        </ul>
      </form>
    </div>
  );
};

export default TodoList;
