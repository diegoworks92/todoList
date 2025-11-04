import { Button } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';

import { AiOutlineOrderedList } from "react-icons/ai";
import { FaCheck, FaPencilAlt } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";


const TodoItems = ({lista, handleDelete, handleToggle, handleMod, handleShow, modalDeleteId, handleClose}) => {

  return (
    <>
        {lista.length > 0 ? 

     <Table striped bordered hover className="text-center">
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
          <td>{index + 1}</td>
          <td className={`${
                  t.completada ? "text-decoration-line-through" : ""
                }`}>{t.texto}</td>
          <td><p>{t.prioridad}</p></td>
          <td>{t.fecha}</td>
          <td>  
              <Button
                variant={t.completada ? "success" : "outline-success"}
                onClick={() => handleToggle(t.id)}
              >
                {t.completada ? <FaCheck size={20}/> : <IoCloseSharp size={20}/>}
              </Button>

              </td>
               <td>
              <Button onClick={() => handleMod(t.id)}><FaPencilAlt size={20}/></Button>
               </td>
              <td>
          {/*      <Button
                variant="danger"
                onClick={() => handleDelete(t.id)}
              >
                <MdDelete size={20}/>
              </Button>
 */}
              
<Button variant="danger" onClick={() => handleShow(t.id)}>
        <MdDelete size={20}/>
      </Button>
                <Modal show={modalDeleteId === t.id} onHide={() => handleClose(t.id)}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar tarea</Modal.Title>
        </Modal.Header>
        <Modal.Body>Estas seguro que quieres eliminar la tarea?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose(t.id)}>
            No
          </Button>
          <Button variant="primary" onClick={() => handleDelete(t.id)}>
            Si
          </Button>
        </Modal.Footer>
      </Modal>
              </td>
        </tr>
      
           ) )}
      </tbody>
    </Table>
       : (        <p className="text-center mt-3">No hay tareas aún <AiOutlineOrderedList /></p>
) }




  
    </>
  )
}

export default TodoItems