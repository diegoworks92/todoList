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
          <Form.Group className="mb-3" controlId="editTexto">
            <Form.Label>Tarea</Form.Label>
            <Form.Control
              type="text"
              name="texto"
              value={editForm.texto}
              onChange={handleEditChange}
              placeholder="Modifica la tarea"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="editPrioridad">
            <Form.Label>Prioridad</Form.Label>
            <Form.Select
              name="prioridad"
              value={editForm.prioridad}
              onChange={handleEditChange}
            >
              <option value="baja">Baja</option>
              <option value="media">Media</option>
              <option value="alta">Alta</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="editCompletada">
            <Form.Check
              type="checkbox"
              name="completada"
              label="Completada"
              checked={!!editForm.completada}
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
