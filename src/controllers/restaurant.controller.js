const { pool } = require('../config/database');

// GET /restaurants
const getRestaurants = async (req, res) => {
    try {
        const query = 'SELECT * FROM restaurantes';
        const restaurants = await pool.query(query);
        res.status(200).json({
            status: "success",
            data: restaurants.rows
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
const getRestaurantById = async (req, res) => {
    const { id } = req.params;
    try {
        const query = 'SELECT * FROM restaurantes WHERE id = $1';
        const restaurant = await pool.query(query, [id]);
        
        if (restaurant.rows.length === 0) {
            return res.status(404).json({
                status: "error",
                message: "Restaurante no encontrado"
            });
        }

        res.status(200).json({
            status: "success",
            data: restaurant.rows[0]
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
const createRestaurant = async (req, res) => {
    const { nombre, direccion, telefono, id_administrador } = req.body;

    try {
        const query = 'INSERT INTO restaurantes (nombre, direccion, telefono, id_administrador) VALUES ($1, $2, $3, $4) RETURNING *';
        const newRestaurant = await pool.query(query, [nombre, direccion, telefono, id_administrador]);

        res.status(201).json({
            status: "success",
            message: "Restaurante creado exitosamente",
            data: newRestaurant.rows[0]
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
const updateRestaurant = async (req, res) => {
    const { id } = req.params;
    const { nombre, direccion, telefono, id_administrador } = req.body;

    try {
        const query = 'UPDATE restaurantes SET nombre = $1, direccion = $2, telefono = $3, id_administrador = $4 WHERE id = $5 RETURNING *';
        const updatedRestaurant = await pool.query(query, [nombre, direccion, telefono, id_administrador, id]);

        if (updatedRestaurant.rows.length === 0) {
            return res.status(404).json({
                status: "error",
                message: "Restaurante no encontrado"
            });
        }

        res.status(200).json({
            status: "success",
            message: "Restaurante actualizado exitosamente",
            data: updatedRestaurant.rows[0]
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
const deleteRestaurant = async (req, res) => {
    const { id } = req.params;

    try {
        const query = 'DELETE FROM restaurantes WHERE id = $1 RETURNING *';
        const deletedRestaurant = await pool.query(query, [id]);

        if (deletedRestaurant.rows.length === 0) {
            return res.status(404).json({
                status: "error",
                message: "Restaurante no encontrado"
            });
        }

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

module.exports = {
    getRestaurants,
    getRestaurantById,
    createRestaurant,
    updateRestaurant,
    deleteRestaurant
};