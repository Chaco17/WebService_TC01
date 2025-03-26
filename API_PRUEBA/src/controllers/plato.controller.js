import pool from '../db.js';

// POST /menus/:id/platos
export const crearPlato = async (req, res) => {
  const { id } = req.params;
  const { nombre, precio } = req.body;

  if (!nombre || !precio) {
    return res.status(400).json({ status: "error", message: "Faltan datos del plato." });
  }

  try {
    const menuCheck = await pool.query('SELECT * FROM menus WHERE id = $1', [id]);
    if (menuCheck.rows.length === 0) {
      return res.status(404).json({ status: "error", message: "Menú no encontrado" });
    }

    const result = await pool.query(
      `INSERT INTO platos (nombre, precio, id_menu)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [nombre, precio, id]
    );

    res.status(201).json({
      status: "success",
      message: "Plato creado exitosamente",
      data: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error al crear el plato",
      error: error.message
    });
  }
};

// GET /platos/:id
export const getPlatoId = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM platos WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "Plato no encontrado"
      });
    }

    res.status(200).json({
      status: "success",
      data: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error al obtener el plato",
      error: error.message
    });
  }
};

// PUT /platos/:id
export const actualizarPlato = async (req, res) => {
  const { id } = req.params;
  const { nombre, precio } = req.body;

  try {
    const check = await pool.query('SELECT * FROM platos WHERE id = $1', [id]);
    if (check.rows.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "Plato no encontrado"
      });
    }

    const result = await pool.query(
      'UPDATE platos SET nombre = $1, precio = $2 WHERE id = $3 RETURNING *',
      [nombre, precio, id]
    );

    res.status(200).json({
      status: "success",
      message: "Plato actualizado exitosamente",
      data: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error al actualizar el plato",
      error: error.message
    });
  }
};

// DELETE /platos/:id
export const eliminarPlato = async (req, res) => {
  const { id } = req.params;

  try {
    const check = await pool.query('SELECT * FROM platos WHERE id = $1', [id]);
    if (check.rows.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "Plato no encontrado"
      });
    }

    await pool.query('DELETE FROM platos WHERE id = $1', [id]);

    res.status(200).json({
      status: "success",
      message: "Plato eliminado exitosamente"
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error al eliminar el plato",
      error: error.message
    });
  }
};

// GET /menus/:id/platos
export const getPlatosByMenu = async (req, res) => {
  const { id } = req.params;

  try {
    const menuCheck = await pool.query('SELECT * FROM menus WHERE id = $1', [id]);
    if (menuCheck.rows.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "Menú no encontrado"
      });
    }

    const result = await pool.query(
      'SELECT * FROM platos WHERE id_menu = $1',
      [id]
    );

    res.status(200).json({
      status: "success",
      data: result.rows
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error al obtener los platos del menú",
      error: error.message
    });
  }
};
