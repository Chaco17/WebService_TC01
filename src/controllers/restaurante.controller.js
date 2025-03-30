import pool from '../db.js';

// GET /restaurants
export const getRestaurants = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM restaurantes');
    res.status(200).json({
      status: "success",
      message: "Restaurantes obtenidos exitosamente",
      data: result.rows
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error al obtener los restaurantes",
      error: error.message
    });
  }
};

// GET /restaurants/:id
export const getRestaurantId = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM restaurantes WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "Restaurante no encontrado"
      });
    }

    res.status(200).json({
      status: "success",
      message: "Restaurante obtenido exitosamente",
      data: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error al obtener el restaurante",
      error: error.message
    });
  }
};

// POST /restaurants
export const crearRestaurante = async (req, res) => {
  const { nombre, direccion, telefono, id_administrador } = req.body;

  if (!nombre || !direccion || !telefono || !id_administrador) {
    return res.status(400).json({
      status: "error",
      message: "Todos los campos son obligatorios"
    });
  }

  try {
    const result = await pool.query(
      `INSERT INTO restaurantes (nombre, direccion, telefono, id_administrador)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [nombre, direccion, telefono, id_administrador]
    );

    res.status(201).json({
      status: "success",
      message: "Restaurante creado exitosamente",
      data: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error al crear el restaurante",
      error: error.message
    });
  }
};

// PUT /restaurants/:id
export const actualizarRestaurante = async (req, res) => {
  const { id } = req.params;
  const { nombre, direccion, telefono, id_administrador } = req.body;

  try {
    const check = await pool.query('SELECT * FROM restaurantes WHERE id = $1', [id]);
    if (check.rows.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "Restaurante no encontrado"
      });
    }

    const result = await pool.query(
      `UPDATE restaurantes
       SET nombre = $1, direccion = $2, telefono = $3, id_administrador = $4
       WHERE id = $5
       RETURNING *`,
      [nombre, direccion, telefono, id_administrador, id]
    );

    res.status(200).json({
      status: "success",
      message: "Restaurante actualizado exitosamente",
      data: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error al actualizar el restaurante",
      error: error.message
    });
  }
};

// DELETE /restaurants/:id
export const eliminarRestaurante = async (req, res) => {
  const { id } = req.params;

  try {
    const check = await pool.query('SELECT * FROM restaurantes WHERE id = $1', [id]);
    if (check.rows.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "Restaurante no encontrado"
      });
    }

    await pool.query('DELETE FROM restaurantes WHERE id = $1', [id]);

    res.status(200).json({
      status: "success",
      message: "Restaurante eliminado exitosamente"
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error al eliminar el restaurante",
      error: error.message
    });
  }
};
