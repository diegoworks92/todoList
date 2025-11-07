const connex = require("../mysql/connex");

//  Mapeo actualizado para sincronizar con el frontend
function mapRow(r) {
  return {
    id: r.id,
    title: r.title,
    priority: r.priority,
    completed: !!r.completed,
    createdAt: r.createdAt,
    updatedAt: r.updatedAt,
  };
}

//  Obtener todas las tareas con filtros opcionales
async function getAll(filters = {}) {
  try {
    let query = "SELECT * FROM todos WHERE 1=1";
    const params = [];
    if (filters.completed !== undefined) {
      query += " AND completed = ?";
      params.push(filters.completed === "true" ? 1 : 0);
    }
    if (filters.priority) {
      query += " AND priority = ?";
      params.push(filters.priority);
    }
    const [rows] = await connex.query(query, params);
    return rows.map(mapRow);
  } catch (error) {
    throw error;
  }
}

//  Crear nueva tarea
async function create(todoDATA) {
  try {
    const [result] = await connex.query(
      "INSERT INTO todos (title, priority, completed) VALUES (?, ?, ?)",
      [
        todoDATA.title,
        todoDATA.priority || "medium",
        todoDATA.completed ? 1 : 0,
      ]
    );
    const [rows] = await connex.query("SELECT * FROM todos WHERE id = ?", [
      result.insertId,
    ]);
    return mapRow(rows[0]);
  } catch (error) {
    throw error;
  }
}

//  Obtener tarea por ID
async function getByID(id = 0) {
  try {
    if (!isNaN(id) && id > 0) {
      const [rows] = await connex.query("SELECT * FROM todos WHERE id = ?", [
        id,
      ]);
      return rows[0] ? mapRow(rows[0]) : null;
    }
    return null;
  } catch (error) {
    throw error;
  }
}

//  Actualizar tarea por ID
async function update(id, todoDATA) {
  /*   console.log("Actualizando ID:", id);
  console.log("Contenido de todoDATA:", todoDATA); */
  try {
    const updates = [];
    const params = [];
    if (todoDATA.title !== undefined) {
      updates.push("title = ?");
      params.push(todoDATA.title);
    }
    if (todoDATA.completed !== undefined) {
      updates.push("completed = ?");
      params.push(todoDATA.completed ? 1 : 0);
    }
    if (todoDATA.priority !== undefined) {
      updates.push("priority = ?");
      params.push(todoDATA.priority);
    }
    if (updates.length === 0) return null;
    updates.push("updatedAt = NOW()");
    params.push(id);
    const query = `UPDATE todos SET ${updates.join(", ")} WHERE id = ?`;
    const [result] = await connex.query(query, params);
    if (result.affectedRows === 0) return null;
    const [rows] = await connex.query("SELECT * FROM todos WHERE id = ?", [id]);
    return mapRow(rows[0]);
  } catch (error) {
    throw error;
  }
}

//  Eliminar tarea por ID
async function deleteID(id) {
  try {
    const [rows] = await connex.query("SELECT * FROM todos WHERE id = ?", [id]);
    if (rows.length === 0) return false;
    const deleted = mapRow(rows[0]);
    await connex.query("DELETE FROM todos WHERE id = ?", [id]);
    return deleted;
  } catch (error) {
    throw error;
  }
}

//  Verificar si existe una tarea por ID
async function existeID(id) {
  const [rows] = await connex.query("SELECT id FROM todos WHERE id = ?", [id]);
  return rows.length > 0;
}

//  Obtener estadísticas de tareas
async function getStats() {
  const [rows] = await connex.query(`
    SELECT 
      COUNT(*) AS total,
      SUM(completed = 1) AS completadas,
      SUM(completed = 0) AS no_completadas,
      SUM(priority = 'low') AS bajas,
      SUM(priority = 'medium') AS medias,
      SUM(priority = 'high') AS altas
    FROM todos
  `);
  return rows[0];
}

//  Exportar todas las funciones
module.exports = {
  getAll,
  create,
  getByID,
  update,
  deleteID,
  getStats,
  existeID,
};
