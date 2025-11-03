import { useState } from "react";


const TodoList = () => {

const [tarea, setTarea] = useState("");
const [lista, setLista] = useState([])

const handleSubmit = (e) => {
    e.preventDefault();
}

const handleChange = (e) => setTarea(e.target.value)

const handleClick = () => {
  if(tarea.trim() === "") return;
  setLista([...lista, tarea]);
  setTarea("");
}

  return (
    <>
   <form action="" onSubmit={handleSubmit}>
        <label>
            Tarea: <input type="text" value={tarea} placeholder="Escribe una tarea" name="tarea" onChange={handleChange}/>
        </label>
        <input type="submit" value="Agregar" onClick={handleClick}/>

        <ul>
          {lista.map((t, index) => (<li key={index}>{t}</li>))}
        </ul>

    </form>
    </>
  )
}

export default TodoList