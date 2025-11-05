import { useState } from "react";
import { Button } from "react-bootstrap";
import TodoItems from "./TodoItems";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
/* import InputGroup from 'react-bootstrap/InputGroup'; */
import Row from 'react-bootstrap/Row';



const TodoList = () => {
  const [tarea, setTarea] = useState("");
  const [lista, setLista] = useState([]);
  const [prioridad, setPrioridad] = useState("baja");
  const [contadorId, setContadorId] = useState(1);
/*   const [show, setShow] = useState(false); */
const [modalDeleteId, setModalDeleteId] = useState(null)
 const [validated, setValidated] = useState(false);
 const [filtroEstado, setFiltroEstado] = useState("todos");






const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();
const hours = date.getHours();
const minutes = date.getMinutes();
const second = date.getSeconds();

  const handleSubmit = (e) => {
    e.preventDefault();

      // obtener el formu
    const form = e.currentTarget;

    if (form.checkValidity() === false ) {
      e.stopPropagation();
      setValidated(true);
      return;
    }


    setLista([
      ...lista,
      {
        id: contadorId,
        texto: tarea,
        prioridad,
        completada: false,
        fecha: `${day}/${month}/${year} ${hours}:${minutes}:${second}`,
      },
    ]);

  // limpiar los campos
  setTarea("");
  setPrioridad("baja");
  setContadorId(contadorId + 1);

  // reiniciar validacion
  setValidated(false);
  };

  const handleChange = (e) => setTarea(e.target.value);

  
  const handleShow = (id) => setModalDeleteId(id);
    const handleClose = () => setModalDeleteId(null);
  // delete por id
  const handleDelete = (id) => {

    setLista(lista.filter((t) => t.id !== id));
    handleClose();
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

  const listaFiltrada = lista.filter((t) => {
  if (filtroEstado === "todos") return true;
  if (filtroEstado === "realizadas") return t.completada === true;
  if (filtroEstado === "no_realizadas") return t.completada === false;
  return true;
});


  return (
    <div className="container mt-4">

  <Form noValidate validated={validated} onSubmit={handleSubmit} className="bg-white p-3 mb-3 rounded-4">
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
    <option value="baja">Baja</option>
    <option value="media">Media</option>
    <option value="alta">Alta</option>
  </Form.Select>
  <Form.Control.Feedback type="invalid">
    Selecciona una prioridad.
  </Form.Control.Feedback>
</Form.Group>
{/*  <Col md="auto">
      <Button type="submit" variant="primary">
        Agregar
      </Button>
    </Col> */}
    <Form.Group as={Col} md="4" controlId="filtroEstado">
            <Form.Label>Mostrar</Form.Label>
            <Form.Select
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value)}
              aria-label="Filtrar tareas por estado"
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


        <TodoItems lista={listaFiltrada} handleDelete={handleDelete} handleToggle={handleToggle} handleMod={handleMod} modalDeleteId={modalDeleteId} handleClose={handleClose} handleShow={handleShow}/>
       

    </div>
  );
};

export default TodoList;

/* 
formulario de busqueda
confirm bostrap modal
table o list
 */