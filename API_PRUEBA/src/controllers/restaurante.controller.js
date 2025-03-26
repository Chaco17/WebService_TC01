const Restaurante = require('../models/restaurante.model');

const getRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurante.findAll(); // Busca todos los restaurantes
        // Mensaje cuando hubo éxito
        res.status(200).json({
            status: "success",
            message: "Restaurantes obtenidos exitosamente",
            data: restaurants
        });
    } catch (error) {
        // Mensaje cuando hubo un error
        res.status(500).json({
            status: "error",
            message: "Error al obtener los restaurantes",
            error: error.message
        });
    }
};

const getRestaurantId = async (req, res) => {
    const { id } = req.params; // Define el parámetro como variable id
    try {
        const restaurant = await Restaurante.findByPk(id); // Busca un restaurante usando su ID
        
        // Mensaje cuando no se encuentra el restaurante
        if (!restaurant) {
            return res.status(404).json({
                status: "error",
                message: "Restaurante no encontrado"
            });
        }

        // Mensaje cuando se encuentra el restaurante exitosamente
        res.status(200).json({
            status: "success",
            message: "Restaurante obtenido exitosamente",
            data: restaurant
        });

    } catch (error) {
        // Mensaje cuando hubo un error
        res.status(500).json({
            status: "error",
            message: "Error al obtener el restaurante",
            error: error.message
        });
    }
};

const crearRestaurante = async (req, res) => {
    const { nombre, direccion, telefono, id_administrador } = req.body; // Define los parámetros de la web a una variable

    try {
        const newRestaurant = await Restaurante.create({ // Crea un restaurante usando los parámetros
            nombre,
            direccion,
            telefono,
            id_administrador
        });

        // Mensaje cuando se crea el restaurante exitosamente
        res.status(201).json({
            status: "success",
            message: "Restaurante creado exitosamente",
            data: newRestaurant // Retorna el restaurante creado
        });
    } catch (error) {
        // Mensaje cuando hubo un error
        res.status(500).json({
            status: "error",
            message: "Error al crear el restaurante",
            error: error.message
        });
    }
};

const actualizarRestaurante = async (req, res) => {
    // Define los parámetros de la web a variables para trabajar
    const { id } = req.params;
    const { nombre, direccion, telefono, id_administrador } = req.body;

    try {
        const restaurant = await Restaurante.findByPk(id); // Busca un restaurante usando su ID
        
        if (!restaurant) {
            // Mensaje cuando no se encuentra el restaurante
            return res.status(404).json({
                status: "error",
                message: "Restaurante no encontrado"
            });
        }

        await restaurant.update({ // Actualiza el restaurante usando los parámetros
            nombre,
            direccion,
            telefono,
            id_administrador
        });

        // Mensaje cuando se actualiza el restaurante exitosamente
        res.status(200).json({
            status: "success",
            message: "Restaurante actualizado exitosamente",
            data: restaurant
        });
    } catch (error) {
        // Mensaje cuando hubo un error
        res.status(500).json({
            status: "error",
            message: "Error al actualizar el restaurante",
            error: error.message
        });
    }
};

const eliminarRestaurante = async (req, res) => {
    const { id } = req.params; // Define el parámetro como variable id

    try {
        const restaurant = await Restaurante.findByPk(id); // Busca un restaurante usando su ID
        
        if (!restaurant) {
            // Mensaje cuando no se encuentra el restaurante
            return res.status(404).json({
                status: "error",
                message: "Restaurante no encontrado"
            });
        }

        await restaurant.destroy(); // Elimina el restaurante

        // Mensaje cuando se elimina el restaurante exitosamente
        res.status(200).json({
            status: "success",
            message: "Restaurante eliminado exitosamente"
        });
    } catch (error) {
        // Mensaje cuando hubo un error
        res.status(500).json({
            status: "error",
            message: "Error al eliminar el restaurante",
            error: error.message
        });
    }
};

module.exports = { getRestaurants, getRestaurantId, crearRestaurante, actualizarRestaurante, eliminarRestaurante };
