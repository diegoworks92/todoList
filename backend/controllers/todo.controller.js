const todoModel = require("../models/todo.model");
const {
  createTODOSchema,
  updateTODOSchema,
} = require("../validators/todo.validator");

/**
 * Obtiene todas las tareas
 * GET /api/v1/todos?completed=true&priority=high
 */
async function getAllTodos(req, res) {
  try {
    const filters = {};
    if (req.query.completed) filters.completed = req.query.completed;
    if (req.query.priority) filters.priority = req.query.priority;

    const todosFiltered = await todoModel.getAll(filters);

    if (todosFiltered.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No hay tareas creadas!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Todas las tareas de la DB",
      data: todosFiltered,
    });
    /*     console.log("Tareas enviadas al frontend:", todosFiltered); */
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener las tareas",
      error: error.message,
    });
  }
}

/**
 * Crear nueva tarea
 * POST /api/v1/todo
 */
async function createTodo(req, res) {
  try {
    // validacion con Joi
    const { error } = createTODOSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validacion datos Todo fallida!",
        errors: error.details.map((error) => error.message),
      });
    }

    const newTodo = await todoModel.create(req.body);

    res.status(201).json({
      success: true,
      message: "Tarea Creada correctamente",
      data: newTodo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al crear la tarea",
      error: error.message,
    });
  }
}

/**
 * Obtener una tarea por ID
 * GET /api/v1/todo/:id
 */
async function getTodoById(req, res) {
  const id = req.params.id;
  try {
    const todo = await todoModel.getByID(id);

    if (todo && Object.keys(todo).length > 0) {
      res.status(200).json({
        success: true,
        message: "Encontrado elemento de Id: " + id,
        data: todo,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "NO se ha encontrado elemento de Id: " + id,
        data: {},
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener el elemento de Id: " + id,
      error: error.message,
    });
  }
}

/**
 * Actualizar una tarea por ID
 * PUT /api/v1/todo/:id
 */
async function updateTodo(req, res) {
  console.log("PUT recibido para ID:", req.params.id);
  console.log("Datos recibidos:", req.body);

  const id = req.params.id;

  // validación flexible para edición
  const { error } = updateTODOSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: "Validación datos Todo fallida!",
      errors: error.details.map((err) => err.message),
    });
  }

  if (!(await todoModel.existeID(id))) {
    return res.status(404).json({
      success: false,
      message: "No se ha encontrado elemento de Id: " + id,
      data: {},
    });
  }

  try {
    const todoUpdated = await todoModel.update(id, req.body);
    if (!todoUpdated) {
      return res
        .status(404)
        .json({ success: false, message: "No se pudo actualizar Id: " + id });
    }
    res.status(200).json({
      success: true,
      message: "Actualizado elemento de Id: " + id,
      data: todoUpdated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al actualizar Id: " + id,
      error: error.message,
    });
  }
}

/**
 * Eliminar una tarea por ID
 * DELETE /api/v1/todo/:id
 */
async function deleteTodo(req, res) {
  const id = req.params.id;
  if (!(await todoModel.existeID(id))) {
    return res
      .status(404)
      .json({ success: false, message: "No existe elemento Id: " + id });
  }
  try {
    const deleted = await todoModel.deleteID(id);
    res
      .status(200)
      .json({ success: true, message: "Eliminado Id: " + id, data: deleted });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al eliminar Id: " + id,
      error: error.message,
    });
  }
}

/**
 * Obtener estadísticas de las tareas
 * GET /api/v1/todos/stats
 * Debe retornar: cantidad de tareas completadas/no completadas y cantidad por prioridad (low, medium, high)
 */
async function getStats(req, res) {
  try {
    const todoStats = await todoModel.getStats();
    res.status(200).json({
      success: true,
      message: "Obtenidas estadísticas de TODOs",
      data: todoStats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener estadísticas de TODOs: ",
      error: error.message,
    });
  }
}

module.exports = {
  getAllTodos,
  createTodo,
  getTodoById,
  updateTodo,
  deleteTodo,
  getStats,
};
