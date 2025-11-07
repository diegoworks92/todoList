import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const EditModal = ({
  modalEditId,
  handleEditClose,
  handleEditChange,
  handleEditSave,
  editForm,
}) => {
  return (
    <Modal show={modalEditId !== null} onHide={handleEditClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar tarea</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="editTitle">
            <Form.Label>Tarea</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={editForm.title || ""}
              onChange={handleEditChange}
              placeholder="Modifica la tarea"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="editPriority">
            <Form.Label>Prioridad</Form.Label>
            <Form.Select
              name="priority"
              value={editForm.priority || "low"}
              onChange={handleEditChange}
            >
              <option value="low">Baja</option>
              <option value="medium">Media</option>
              <option value="high">Alta</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="editCompleted">
            <Form.Check
              type="checkbox"
              name="completed"
              label="Completada"
              checked={!!editForm.completed}
              onChange={handleEditChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleEditClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleEditSave}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditModal;
