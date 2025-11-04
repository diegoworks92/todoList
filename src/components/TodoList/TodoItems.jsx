import { Button } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';

import { AiOutlineOrderedList } from "react-icons/ai";
import { FaCheck, FaPencilAlt } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { BsCircle } from "react-icons/bs";


const TodoItems = ({lista, handleDelete, handleToggle, handleMod, handleShow, modalDeleteId, handleClose}) => {

  return (
    <>
        {lista.length > 0 ? 

     <Table striped bordered hover className="text-center rounded-4 overflow-hidden">
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
     {/*  <tbody>



          {lista.map((t, index) => (
       
       <tr key={t.id}>
  <td className="align-middle">{index + 1}</td>
  <td className={`align-middle ${t.completada ? "text-decoration-line-through" : ""}`}>
    {t.texto}
  </td>
  <td className="align-middle">{t.prioridad}</td>
  <td className="align-middle">{t.fecha}</td>
  <td className="align-middle">
    <Button
      variant={t.completada ? "success" : "outline-success"}
      onClick={() => handleToggle(t.id)}

    >
      {t.completada ? <FaCheck size={20}/> : <BsCircle size={20}/>}
    </Button>
  </td>
  <td className="align-middle">
    <Button onClick={() => handleMod(t.id)}><FaPencilAlt size={20}/></Button>
  </td>
  <td className="align-middle">
    <Button variant="danger" onClick={() => handleShow(t.id)}>
      <MdDelete size={20}/>
    </Button>
    <Modal show={modalDeleteId === t.id} onHide={() => handleClose(t.id)}>
      <Modal.Header closeButton>
        <Modal.Title>Eliminar tarea</Modal.Title>
      </Modal.Header>
      <Modal.Body>Estas seguro que quieres eliminar la tarea?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => handleClose(t.id)}>No</Button>
        <Button variant="primary" onClick={() => handleDelete(t.id)}>Si</Button>
      </Modal.Footer>
    </Modal>
  </td>
</tr>

      
           ) )}
      </tbody> */}

      <tbody>
  {lista.map((t, index) => (
    <tr key={t.id}>
      <td className="align-middle">{index + 1}</td>
      <td className={`align-middle ${t.completada ? "text-decoration-line-through" : ""}`}>
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
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40px',
            height: '40px',
            padding: 0,
          }}
        >
          {t.completada ? <FaCheck size={20} /> : <BsCircle size={20} />}
        </Button>
      </td>

      {/* Botón modificar */}
      <td className="align-middle text-center">
        <Button
          onClick={() => handleMod(t.id)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40px',
            height: '40px',
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
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40px',
            height: '40px',
            padding: 0,
          }}
        >
          <MdDelete size={20} />
        </Button>
        <Modal show={modalDeleteId === t.id} onHide={() => handleClose(t.id)}>
          <Modal.Header closeButton>
            <Modal.Title>Eliminar tarea</Modal.Title>
          </Modal.Header>
          <Modal.Body>¿Estás seguro que quieres eliminar la tarea?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => handleClose(t.id)}>No</Button>
            <Button variant="primary" onClick={() => handleDelete(t.id)}>Sí</Button>
          </Modal.Footer>
        </Modal>
      </td>
    </tr>
  ))}
</tbody>

    </Table>
       : (        <p className="text-center mt-3">No hay tareas aún <AiOutlineOrderedList /></p>
) }




  
    </>
  )
}

export default TodoItems