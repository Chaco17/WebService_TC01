const Reservation = require("../models/reservation.model");

// 📌 Crear una nueva reserva
exports.createReservation = async (req, res) => {
  try {
    const { id_cliente, id_restaurante, fecha, numero_personas } = req.body;

    if (!id_cliente || !id_restaurante || !fecha || !numero_personas) {
      return res.status(400).json({ message: "Todos los campos son obligatorios." });
    }

    const newReservation = await Reservation.create({
      id_cliente,
      id_restaurante,
      fecha,
      numero_personas,
    });

    res.status(201).json({ message: "Reserva creada con éxito.", data: newReservation });
  } catch (error) {
    res.status(500).json({ message: "Error al crear la reserva.", error: error.message });
  }
};

// 📌 Obtener detalles de una reserva por ID
exports.getReservationById = async (req, res) => {
  try {
    const { id } = req.params;
    const reservation = await Reservation.findByPk(id);

    if (!reservation) {
      return res.status(404).json({ message: "Reserva no encontrada." });
    }

    res.status(200).json({ data: reservation });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la reserva.", error: error.message });
  }
};

// 📌 Cancelar una reserva
exports.cancelReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const reservation = await Reservation.findByPk(id);

    if (!reservation) {
      return res.status(404).json({ message: "Reserva no encontrada." });
    }

    // Cambiar el estado a "cancelada"
    reservation.estado = "cancelada";
    await reservation.save();

    res.status(200).json({ message: "Reserva cancelada con éxito.", data: reservation });
  } catch (error) {
    res.status(500).json({ message: "Error al cancelar la reserva.", error: error.message });
  }
};

// 📌 Obtener todas las reservas de un usuario
exports.getReservationsByUser = async (req, res) => {
  try {
    const { id } = req.params;
    const reservas = await Reservation.findAll({
      where: { id_cliente: id }
    });

    res.status(200).json({ data: reservas });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener reservas del usuario.", error: error.message });
  }
};

// 📌 Obtener todas las reservas de un restaurante
exports.getReservationsByRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const reservas = await Reservation.findAll({
      where: { id_restaurante: id }
    });

    res.status(200).json({ data: reservas });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener reservas del restaurante.", error: error.message });
  }
};

