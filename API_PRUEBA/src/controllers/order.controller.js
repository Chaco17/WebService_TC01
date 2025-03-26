const Order = require("../models/order.model");

exports.createOrder = async (req, res) => {
  try {
    const { id_cliente, id_restaurante, id_reserva } = req.body;

    if (!id_cliente || !id_restaurante) {
      return res.status(400).json({ message: "id_cliente e id_restaurante son obligatorios." });
    }

    const newOrder = await Order.create({
      id_cliente,
      id_restaurante,
      id_reserva: id_reserva || null,
    });

    res.status(201).json({ message: "Pedido creado exitosamente.", data: newOrder });
  } catch (error) {
    res.status(500).json({ message: "Error al crear el pedido.", error: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(404).json({ message: "Pedido no encontrado." });
    }

    res.status(200).json({ data: order });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el pedido.", error: error.message });
  }
};

exports.getOrdersByUser = async (req, res) => {
  try {
    const { id } = req.params;
    const orders = await Order.findAll({ where: { id_cliente: id } });
    res.status(200).json({ data: orders });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener pedidos del usuario.", error: error.message });
  }
};

exports.getOrdersByRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const orders = await Order.findAll({ where: { id_restaurante: id } });
    res.status(200).json({ data: orders });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener pedidos del restaurante.", error: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    if (!estado || !["pendiente", "preparando", "completado", "cancelado"].includes(estado)) {
      return res.status(400).json({ message: "Estado inválido." });
    }

    const order = await Order.findByPk(id);
    if (!order) return res.status(404).json({ message: "Pedido no encontrado." });

    order.estado = estado;
    await order.save();

    res.status(200).json({ message: "Estado actualizado.", data: order });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el pedido.", error: error.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(404).json({ message: "Pedido no encontrado." });
    }

    await order.destroy();
    res.status(200).json({ message: "Pedido eliminado con éxito." });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el pedido.", error: error.message });
  }
};
