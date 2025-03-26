const Menu = require('../models/menu.model');
const Restaurante = require('../models/restaurante.model');

const crearMenu = async (req, res) => {
    const { nombre, id_restaurante } = req.body; // Define los parámetros de la web a una variable

    try {
        // Crea un menú usando los parámetros
        const newMenu = await Menu.create({
            nombre,
            id_restaurante
        });

        res.status(201).json({
            // Mensaje cuando se crea el menú exitosamente
            status: "success",
            message: "Menú creado exitosamente",
            data: newMenu
        });
    } catch (error) {
        // Mensaje cuando hubo un error
        res.status(500).json({
            status: "error",
            message: "Error al crear el menú",
            error: error.message
        });
    }
};

const getMenuId = async (req, res) => {
    const { id } = req.params; // Define el parámetro como variable id
    try {
        const menu = await Menu.findByPk(id); // Busca un menú usando su ID
        
        if (!menu) {
            // Mensaje cuando no se encuentra el menú
            return res.status(404).json({
                status: "error",
                message: "Menú no encontrado"
            });
        }

        res.status(200).json({
            // Mensaje cuando se encuentra el menú exitosamente
            status: "success",
            message: "Menú obtenido exitosamente",
            data: menu
        });
    } catch (error) {
        // Mensaje cuando hubo un error
        res.status(500).json({
            status: "error",
            message: "Error al obtener el menú",
            error: error.message
        });
    }
};

const actualizarMenu = async (req, res) => {
    const { id } = req.params; // Define el parámetro como variable id
    const { nombre, id_restaurante } = req.body; // Define los parámetros de la web a una variable

    try {
        const menu = await Menu.findByPk(id); // Busca un menú usando su ID
        
        if (!menu) {
            // Mensaje cuando no se encuentra el menú
            return res.status(404).json({
                status: "error",
                message: "Menú no encontrado"
            });
        }

        await menu.update({ // Actualiza el menú usando los parámetros
            nombre,
            id_restaurante
        });

        res.status(200).json({
            // Mensaje cuando se actualiza el menú exitosamente
            status: "success",
            message: "Menú actualizado exitosamente",
            data: menu
        });
    } catch (error) {
        // Mensaje cuando hubo un error
        res.status(500).json({
            status: "error",
            message: "Error al actualizar el menú",
            error: error.message
        });
    }
};

const eliminarMenu = async (req, res) => {
    const { id } = req.params; // Define el parámetro como variable id

    try {
        const menu = await Menu.findByPk(id); // Busca un menú usando su ID
        
        if (!menu) {
            // Mensaje cuando no se encuentra el menú
            return res.status(404).json({
                status: "error",
                message: "Menú no encontrado"
            });
        }

        await menu.destroy(); // Elimina el menú

        res.status(200).json({
            // Mensaje cuando se elimina el menú exitosamente
            status: "success",
            message: "Menú eliminado exitosamente"
        });
    } catch (error) {
        // Mensaje cuando hubo un error
        res.status(500).json({
            status: "error",
            message: "Error al eliminar el menú",
            error: error.message
        });
    }
};

const getMenus_RestauranteId = async (req, res) => {
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

        const menus = await Menu.findAll({ // Busca todos los menús del restaurante seleccionado
            where: { id_restaurante: id }
        });

        res.status(200).json({
            // Mensaje cuando se obtienen los menús exitosamente
            status: "success",
            data: menus
        });
    } catch (error) {
        // Mensaje cuando hubo un error
        res.status(500).json({
            status: "error",
            message: "Error al obtener los menús del restaurante",
            error: error.message
        });
    }
};

module.exports = { crearMenu, getMenuId, actualizarMenu, eliminarMenu, getMenus_RestauranteId };