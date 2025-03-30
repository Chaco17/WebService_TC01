import pool from '../db.js';

// POST /menus
export const crearMenu = async (req, res) => {
  const { nombre, id_restaurante } = req.body;

  if (!nombre || !id_restaurante) {
    return res.status(400).json({ status: "error", message: "Faltan datos requeridos." });
  }

  try {
    const result = await pool.query(
      'INSERT INTO menus (nombre, id_restaurante) VALUES ($1, $2) RETURNING *',
      [nombre, id_restaurante]
    );

    res.status(201).json({
      status: "success",
      message: "Menú creado exitosamente",
      data: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error al crear el menú", error: error.message });
  }
};

// GET /menus/:id
export const getMenuId = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM menus WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ status: "error", message: "Menú no encontrado" });
    }

    res.status(200).json({
      status: "success",
      message: "Menú obtenido exitosamente",
      data: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error al obtener el menú", error: error.message });
  }
};

// PUT /menus/:id
export const actualizarMenu = async (req, res) => {
  const { id } = req.params;
  const { nombre, id_restaurante } = req.body;

  try {
    const check = await pool.query('SELECT * FROM menus WHERE id = $1', [id]);
    if (check.rows.length === 0) {
      return res.status(404).json({ status: "error", message: "Menú no encontrado" });
    }

    const result = await pool.query(
      'UPDATE menus SET nombre = $1, id_restaurante = $2 WHERE id = $3 RETURNING *',
      [nombre, id_restaurante, id]
    );

    res.status(200).json({
      status: "success",
      message: "Menú actualizado exitosamente",
      data: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error al actualizar el menú", error: error.message });
  }
};

// DELETE /menus/:id
export const eliminarMenu = async (req, res) => {
  const { id } = req.params;

  try {
    const check = await pool.query('SELECT * FROM menus WHERE id = $1', [id]);
    if (check.rows.length === 0) {
      return res.status(404).json({ status: "error", message: "Menú no encontrado" });
    }

    await pool.query('DELETE FROM menus WHERE id = $1', [id]);

    res.status(200).json({
      status: "success",
      message: "Menú eliminado exitosamente"
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error al eliminar el menú", error: error.message });
  }
};

// GET /restaurants/:id/menus
export const getMenus_RestauranteId = async (req, res) => {
  const { id } = req.params;

  try {
    const check = await pool.query('SELECT * FROM restaurantes WHERE id = $1', [id]);
    if (check.rows.length === 0) {
      return res.status(404).json({ status: "error", message: "Restaurante no encontrado" });
    }

    const result = await pool.query('SELECT * FROM menus WHERE id_restaurante = $1', [id]);

    res.status(200).json({
      status: "success",
      data: result.rows
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error al obtener los menús", error: error.message });
  }
};
