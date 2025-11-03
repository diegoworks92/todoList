import { useState } from "react";
import { Button } from "react-bootstrap";


const TodoList = () => {

const [tarea, setTarea] = useState("");
const [lista, setLista] = useState([])

const handleSubmit = (e) => {
    e.preventDefault();
     if(tarea.trim() === "") return;
  setLista([...lista, {id: Date.now(), texto: tarea, completada: false}]);
  setTarea("");
}

const handleChange = (e) => setTarea(e.target.value)


// Delete por id
const handleDelete = (id) => {
  setLista(lista.filter((t) => t.id !== id))
}

// marcar completada
 const handleToggle = (id) => {
    setLista(
      lista.map((t) =>
        t.id === id ? { ...t, completada: !t.completada } : t
      )
    );
  };


  return (
    <div className="container mt-4">
   <form onSubmit={handleSubmit} className="mb-3"> 
        <label>
            Tarea: <input type="text" value={tarea} placeholder="Escribe una tarea" name="tarea" onChange={handleChange}/>
        </label>
        <Button type="submit" variant="primary">Agregar</Button>

        <ul>
          {lista.map((t, index) => (<li key={index}><p>{t.texto}</p><Button variant="danger" size="sm" onClick={() => handleDelete(t.id)}>Eliminar</Button> <Button variant={t.completada ? "success" : "outline-success"} onClick={() => handleToggle(t.id)}>{t.completada ? "Hecho" : "Ok?"}</Button></li>))}
        </ul>

    </form>
    </div>
  )
}

export default TodoList