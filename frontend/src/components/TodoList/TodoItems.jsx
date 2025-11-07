import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";

import { FaCheck, FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { BsCircle } from "react-icons/bs";
import ShowNoTodos from "./ShowNoTodos";

const TodoItems = ({
  lista,
  handleDelete,
  handleToggle,
  handleEditShow,
  handleShow,
  modalDeleteId,
  handleClose,
}) => {
  const traducirPrioridad = {
    low: "Baja",
    medium: "Media",
    high: "Alta",
  };


  const getColorByPriority = (priority) => {
  switch (priority) {
    case "low":
      return "green";
    case "medium":
      return "orange";
    case "high":
      return "red";
    default:
      return "gray";
  }
};


  return (
    <>
      {/* Si hay tareas en la lista */}
      {lista.length > 0 ? (
        <>
          {/* Vista para dispositivos móviles */}
          <div className="d-block d-lg-none">
            {lista.map((t, index) => (
              <div
                key={t.id}
                className="border rounded-4 p-3 mb-3 shadow-sm bg-white"
              >
                {/* Detalles de la tarea */}
                <p className="mb-2">
                  <strong>#</strong> {index + 1}
                </p>
                <hr />
                <p className="mb-2">
                  <strong>Tarea:</strong>{" "}
                  <span
                    className={
                      t.completed ? "text-decoration-line-through" : ""
                    }
                  >
                    {t.title}
                  </span>
                </p>

                <hr />
                <p className="mb-2 d-flex align-items-center gap-2">
  <strong>Prioridad:</strong>
  {traducirPrioridad[t.priority]}
  <BsCircle color={getColorByPriority(t.priority)} />
</p>

                <hr />
                <p className="mb-2">
                  <strong>Realizada:</strong> {t.completed ? "Sí" : "No"}
                </p>
                <hr />
                <p className="mb-2">
                  <strong>Fecha:</strong>{" "}
                  {new Date(t.createdAt).toLocaleDateString("es-ES")}
                </p>
                <hr />

                {/* Botones de acción */}
                <div className="d-flex justify-content-start gap-2 mt-2">
                  {/* Botón marcar como completada */}
                  <Button
                    variant={t.completed ? "success" : "outline-success"}
                    onClick={() => handleToggle(t.id)}
                    size="sm"
                  >
                    {t.completed ? <FaCheck /> : <BsCircle />}
                  </Button>

                  {/* Botón editar */}
                  <Button onClick={() => handleEditShow(t.id)} size="sm">
                    <FaPencilAlt />
                  </Button>

                  {/* Botón eliminar */}
                  <Button
                    variant="danger"
                    onClick={() => handleShow(t.id)}
                    size="sm"
                  >
                    <MdDelete />
                  </Button>

                  {/* Modal de confirmación de eliminación */}
                  <Modal
                    show={modalDeleteId === t.id}
                    onHide={() => handleClose(t.id)}
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Eliminar tarea</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      ¿Estás seguro que quieres eliminar la tarea?
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        variant="secondary"
                        onClick={() => handleClose(t.id)}
                      >
                        No
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() => handleDelete(t.id)}
                      >
                        Sí
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </div>
              </div>
            ))}
          </div>

          {/* Vista para pantallas grandes */}
          <div className="d-none d-lg-block">
            <Table
              responsive
              striped
              bordered
              hover
              className="text-center rounded-4 overflow-hidden fs-6"
            >
              <thead>
                <tr>
                  <th>#</th>
                  <th>Tarea</th>
                  <th>Prioridad</th>
                  <th>Fecha de creación</th>
                  <th>Realizada</th>
                  <th>Modificar</th>
                  <th>Eliminar</th>
                </tr>
              </thead>

              <tbody>
                {lista.map((t, index) => (
                  <tr key={t.id}>
                    {/* Número de tarea */}
                    <td className="align-middle">{index + 1}</td>

                    {/* Título de la tarea */}
                    <td
                      className={`align-middle ${
                        t.completed ? "text-decoration-line-through" : ""
                      }`}
                    >
                      {t.title}
                    </td>

                    {/* Prioridad */}
                    <td className="align-middle">
                      {traducirPrioridad[t.priority]}
                    </td>
                  {/*   <td className="align-middle d-flex justify-content-center align-items-center gap-2">
  <BsCircle color={getColorByPriority(t.priority)} />
  {traducirPrioridad[t.priority]}
</td> */}


                    {/* Fecha de creación */}
                    <td className="align-middle">
                      {new Date(t.createdAt).toLocaleDateString("es-ES")}
                    </td>

                    {/* Botón marcar como completada */}
                    <td className="align-middle text-center">
                      <Button
                        variant={t.completed ? "success" : "outline-success"}
                        onClick={() => handleToggle(t.id)}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "40px",
                          height: "40px",
                          padding: 0,
                        }}
                      >
                        {t.completed ? (
                          <FaCheck size={20} />
                        ) : (
                          <BsCircle size={20} />
                        )}
                      </Button>
                    </td>

                    {/* Botón editar */}
                    <td className="align-middle text-center">
                      <Button
                        onClick={() => handleEditShow(t.id)}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "40px",
                          height: "40px",
                          padding: 0,
                        }}
                      >
                        <FaPencilAlt size={20} />
                      </Button>
                    </td>

                    {/* Botón eliminar */}
                    <td className="align-middle text-center">
                      <Button
                        variant="danger"
                        onClick={() => handleShow(t.id)}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "40px",
                          height: "40px",
                          padding: 0,
                        }}
                      >
                        <MdDelete size={20} />
                      </Button>

                      {/* Modal de confirmación de eliminación */}
                      <Modal
                        show={modalDeleteId === t.id}
                        onHide={() => handleClose(t.id)}
                      >
                        <Modal.Header closeButton>
                          <Modal.Title>Eliminar tarea</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          ¿Estás seguro que quieres eliminar la tarea?
                        </Modal.Body>
                        <Modal.Footer>
                          <Button
                            variant="secondary"
                            onClick={() => handleClose(t.id)}
                          >
                            No
                          </Button>
                          <Button
                            variant="primary"
                            onClick={() => handleDelete(t.id)}
                          >
                            Sí
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </>
      ) : (
        // Si no hay tareas, mostrar componente alternativo
        <ShowNoTodos />
      )}
    </>
  );
};

export default TodoItems;
