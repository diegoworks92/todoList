import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import TodoItems from "./TodoItems";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import EditModal from "./EditModal";

const API_URL = "http://localhost:3000/api/v1";

const TodoList = () => {
  const [tarea, setTarea] = useState("");
  const [lista, setLista] = useState([]);
  const [prioridad, setPrioridad] = useState("low");
  const [validated, setValidated] = useState(false);
  const [filtroEstado, setFiltroEstado] = useState("todos");

  const [modalDeleteId, setModalDeleteId] = useState(null);
  const [modalEditId, setModalEditId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    priority: "low",
    completed: false,
  });

  // ✅ Obtener todas las tareas desde el backend
  const fetchTodos = async () => {
    try {
      const res = await fetch(`${API_URL}/todos`);
      const json = await res.json();
      if (json.success && json.data) {
        setLista(json.data);
      } else {
        setLista([]);
      }
    } catch (error) {
      console.error("Error al obtener tareas:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // ✅ Crear nueva tarea
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    if (tarea.length > 50) {
      alert("La tarea no puede tener más de 50 caracteres.");
      return;
    }

    try {
      await fetch(`${API_URL}/todo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: tarea,
          priority: prioridad,
        }),
      });

      setTarea("");
      setPrioridad("low");
      fetchTodos();
    } catch (error) {
      console.error("Error al crear tarea:", error);
    }
  };

  // ✅ Eliminar tarea
  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/todo/${id}`, { method: "DELETE" });
      fetchTodos();
      handleClose();
    } catch (error) {
      console.error("Error al eliminar tarea:", error);
    }
  };

  // ✅ Cambiar estado completada
  const handleToggle = async (id) => {
    const tarea = lista.find((t) => t.id === id);
    if (!tarea) return;

    try {
      await fetch(`${API_URL}/todo/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...tarea,
          completed: !tarea.completed,
        }),
      });
      fetchTodos();
    } catch (error) {
      console.error("Error al actualizar tarea:", error);
    }
  };

  // ✅ Editar tarea
  const handleEditShow = (id) => {
    const tarea = lista.find((t) => t.id === id);
    if (!tarea) return;
    setEditForm({
      title: tarea.title,
      priority: tarea.priority,
      completed: tarea.completed,
    });
    setModalEditId(id);
  };

  const handleEditSave = async () => {
    try {
      await fetch(`${API_URL}/todo/${modalEditId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });
      fetchTodos();
      setModalEditId(null);
    } catch (error) {
      console.error("Error al editar tarea:", error);
    }
  };

  const handleEditClose = () => {
    setModalEditId(null);
    setEditForm({ title: "", priority: "low", completed: false });
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleChange = (e) => setTarea(e.target.value);
  const handleShow = (id) => setModalDeleteId(id);
  const handleClose = () => setModalDeleteId(null);

  const listaFiltrada = lista.filter((t) => {
    if (filtroEstado === "todos") return true;
    if (filtroEstado === "realizadas") return t.completed;
    if (filtroEstado === "no_realizadas") return !t.completed;
    return true;
  });

  return (
    <div className="container mt-4">
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        className="bg-white p-3 mb-3 rounded-4"
      >
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>Tarea</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Escribe una tarea"
              value={tarea}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Por favor ingresa una tarea.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Prioridad</Form.Label>
            <Form.Select
              required
              value={prioridad}
              onChange={(e) => setPrioridad(e.target.value)}
            >
              <option value="low">Baja</option>
              <option value="medium">Media</option>
              <option value="high">Alta</option>
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col} md="4" controlId="filtroEstado">
            <Form.Label>Mostrar</Form.Label>
            <Form.Select
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value)}
            >
              <option value="todos">Todos</option>
              <option value="realizadas">Realizadas</option>
              <option value="no_realizadas">No realizadas</option>
            </Form.Select>
          </Form.Group>
        </Row>
        <Button type="submit" variant="primary">
          Agregar
        </Button>
      </Form>

      <TodoItems
        lista={listaFiltrada}
        handleDelete={handleDelete}
        handleToggle={handleToggle}
        handleEditShow={handleEditShow}
        modalDeleteId={modalDeleteId}
        handleClose={handleClose}
        handleShow={handleShow}
      />
      <EditModal
        modalEditId={modalEditId}
        handleEditClose={handleEditClose}
        handleEditChange={handleEditChange}
        handleEditSave={handleEditSave}
        editForm={editForm}
      />
    </div>
  );
};

export default TodoList;
