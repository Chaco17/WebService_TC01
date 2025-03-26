const Menu = require('../models/menu.model');
const Restaurante = require('../models/restaurante.model');

const crearMenu = async (req, res) => {
    const { nombre, id_restaurante } = req.body; // Define los parámetros de la web a una variable

    try {
        const newMenu = await Menu.create({
            nombre,
            id_restaurante
        });

        res.status(201).json({
            status: "success",
            message: "Menú creado exitosamente",
            data: newMenu
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Error al crear el menú",
            error: error.message
        });
    }
};

const getMenuId = async (req, res) => {
    const { id } = req.params;
    try {
        const menu = await Menu.findByPk(id); 
        
        if (!menu) {
            return res.status(404).json({
                status: "error",
                message: "Menú no encontrado"
            });
        }

        res.status(200).json({
            status: "success",
            message: "Menú obtenido exitosamente",
            data: menu
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Error al obtener el menú",
            error: error.message
        });
    }
};

const actualizarMenu = async (req, res) => {
    const { id } = req.params; 
    const { nombre, id_restaurante } = req.body; 

    try {
        const menu = await Menu.findByPk(id); 
        
        if (!menu) {
            return res.status(404).json({
                status: "error",
                message: "Menú no encontrado"
            });
        }

        await menu.update({ 
            nombre,
            id_restaurante
        });

        res.status(200).json({
            status: "success",
            message: "Menú actualizado exitosamente",
            data: menu
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Error al actualizar el menú",
            error: error.message
        });
    }
};

const eliminarMenu = async (req, res) => {
    const { id } = req.params; 

    try {
        const menu = await Menu.findByPk(id); 
        
        if (!menu) {
            return res.status(404).json({
                status: "error",
                message: "Menú no encontrado"
            });
        }

        await menu.destroy();

        res.status(200).json({
            status: "success",
            message: "Menú eliminado exitosamente"
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Error al eliminar el menú",
            error: error.message
        });
    }
};

const getMenus_RestauranteId = async (req, res) => {
    const { id } = req.params;
    try {
        const restaurant = await Restaurante.findByPk(id); 
        
        if (!restaurant) {
            return res.status(404).json({
                status: "error",
                message: "Restaurante no encontrado"
            });
        }

        const menus = await Menu.findAll({ 
            where: { id_restaurante: id }
        });

        res.status(200).json({
            status: "success",
            data: menus
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Error al obtener los menús del restaurante",
            error: error.message
        });
    }
};

module.exports = { crearMenu, getMenuId, actualizarMenu, eliminarMenu, getMenus_RestauranteId };