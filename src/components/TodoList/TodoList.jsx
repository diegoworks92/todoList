import React from 'react'

const TodoList = () => {

const handleSubmit = (e) => {
    e.preventDefault();
}


  return (
    <>
    <h1>TODO LIST</h1>
    <form action="" onSubmit={handleSubmit}>
        <label>
            Tarea: <input type="text" name="tarea" />
        </label>
        <input type="submit" value="Agregar" />
        
    </form>
    </>
  )
}

export default TodoList