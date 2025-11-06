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
  return (
    <>
      {lista.length > 0 ? (
        <>
          {/* Móvil */}
          <div className="d-block d-lg-none">
            {lista.map((t, index) => (
              <div
                key={t.id}
                className="border rounded-4 p-3 mb-3 shadow-sm bg-white"
              >
                <div className="d-flex justify-content-between mb-2">
                  <p className="mb-2">
                    <strong>#</strong> {index + 1}
                  </p>
                </div>

                <p
                  className={`mb-2 ${
                    t.completada ? "text-decoration-line-through" : ""
                  }`}
                >
                  <strong>Tarea:</strong> {t.texto}
                </p>
                <p className="mb-2">
                  <strong>Prioridad:</strong> {t.prioridad}
                </p>
                <p className="mb-2">
                  <strong>Realizada:</strong> {t.completada ? "Sí" : "No"}
                </p>
                <p className="mb-2">
                  <strong>Fecha:</strong> {t.fecha}
                </p>

                {/* Botones en una sola línea */}
                <div className="d-flex justify-content-start gap-2 mt-2">
                  <Button
                    variant={t.completada ? "success" : "outline-success"}
                    onClick={() => handleToggle(t.id)}
                    size="sm"
                  >
                    {t.completada ? <FaCheck /> : <BsCircle />}
                  </Button>

                  <Button onClick={() => handleEditShow(t.id)} size="sm">
                    <FaPencilAlt />
                  </Button>

                  <Button
                    variant="danger"
                    onClick={() => handleShow(t.id)}
                    size="sm"
                  >
                    <MdDelete />
                  </Button>

                  {/* Modal */}
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

          {/* pantallas */}
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
                    <td className="align-middle">{index + 1}</td>
                    <td
                      className={`align-middle ${
                        t.completada ? "text-decoration-line-through" : ""
                      }`}
                    >
                      {t.texto}
                    </td>
                    <td className="align-middle">{t.prioridad}</td>
                    <td className="align-middle">{t.fecha}</td>

                    {/* Botón marcar completada */}
                    <td className="align-middle text-center">
                      <Button
                        variant={t.completada ? "success" : "outline-success"}
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
                        {t.completada ? (
                          <FaCheck size={20} />
                        ) : (
                          <BsCircle size={20} />
                        )}
                      </Button>
                    </td>

                    {/* Botón modificar */}
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
        <ShowNoTodos />
      )}
    </>
  );
};

export default TodoItems;
