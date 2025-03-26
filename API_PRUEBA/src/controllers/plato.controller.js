const Plato = require('../models/plato.model');
const Menu = require('../models/menu.model');

const crearPlato = async (req, res) => {
    // Define los parámetros de la web a variables para trabajar
    const { id } = req.params;
    const { nombre, precio } = req.body;

    try {
        const menu = await Menu.findByPk(id); // Busca un menú usando su ID
        
        if (!menu) {
            // Mensaje cuando no se encuentra el menú
            return res.status(404).json({
                status: "error",
                message: "Menú no encontrado"
            });
        }

        // Se crea el plato
        const newPlato = await Plato.create({
            nombre,
            precio,
            id_menu: id
        });

        // Mensaje cuando se crea el plato exitosamente
        res.status(201).json({
            status: "success",
            message: "Plato creado exitosamente",
            data: newPlato
        });
    } catch (error) {
        // Mensaje cuando hay un error al crear el plato
        res.status(500).json({
            status: "error",
            message: "Error al crear el plato",
            error: error.message
        });
    }
};

const getPlatoId = async (req, res) => {
    // Define los parámetros de la web a variables para trabajar
    const { id } = req.params;
    try {
        const plato = await Plato.findByPk(id); // Busca un plato usando su ID
        
        if (!plato) {
            // Mensaje cuando no se encuentra el plato
            return res.status(404).json({
                status: "error",
                message: "Plato no encontrado"
            });
        }

        // Mensaje cuando se encuentra el plato
        res.status(200).json({
            status: "success",
            data: plato // Retorna el plato encontrado
        });
    } catch (error) {
        // Mensaje cuando hay un error al obtener el plato
        res.status(500).json({
            status: "error",
            message: "Error al obtener el plato",
            error: error.message
        });
    }
};

const actualizarPlato = async (req, res) => {
    // Define los parámetros de la web a variables para trabajar
    const { id } = req.params;
    const { nombre, precio } = req.body;

    try {
        const plato = await Plato.findByPk(id); // Busca un plato usando su ID
        
        if (!plato) {
            // Mensaje cuando no se encuentra el plato
            return res.status(404).json({
                status: "error",
                message: "Plato no encontrado"
            });
        }

        // Se actualiza el plato
        await plato.update({
            nombre,
            precio
        });

        // Mensaje cuando se actualiza el plato exitosamente
        res.status(200).json({
            status: "success",
            message: "Plato actualizado exitosamente",
            data: plato
        });
    } catch (error) {
        // Mensaje cuando hay un error al actualizar el plato
        res.status(500).json({
            status: "error",
            message: "Error al actualizar el plato",
            error: error.message
        });
    }
};

module.exports = { crearPlato, getPlatoId, actualizarPlato };