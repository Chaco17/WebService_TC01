const Plato = require('../models/plato.model');
const Menu = require('../models/menu.model');

const crearPlato = async (req, res) => {
    const { id } = req.params;
    const { nombre, precio } = req.body;

    try {
        const menu = await Menu.findByPk(id);
        
        if (!menu) {
            return res.status(404).json({
                status: "error",
                message: "Menú no encontrado"
            });
        }

        const newPlato = await Plato.create({
            nombre,
            precio,
            id_menu: id
        });

        res.status(201).json({
            status: "success",
            message: "Plato creado exitosamente",
            data: newPlato
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Error al crear el plato",
            error: error.message
        });
    }
};

const getPlatoId = async (req, res) => {
    const { id } = req.params;
    try {
        const plato = await Plato.findByPk(id); 
        
        if (!plato) {
            return res.status(404).json({
                status: "error",
                message: "Plato no encontrado"
            });
        }

        res.status(200).json({
            status: "success",
            data: plato 
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Error al obtener el plato",
            error: error.message
        });
    }
};

const actualizarPlato = async (req, res) => {
    const { id } = req.params;
    const { nombre, precio } = req.body;

    try {
        const plato = await Plato.findByPk(id);
        
        if (!plato) {
            return res.status(404).json({
                status: "error",
                message: "Plato no encontrado"
            });
        }

        await plato.update({
            nombre,
            precio
        });

        res.status(200).json({
            status: "success",
            message: "Plato actualizado exitosamente",
            data: plato
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Error al actualizar el plato",
            error: error.message
        });
    }
};

module.exports = { crearPlato, getPlatoId, actualizarPlato };