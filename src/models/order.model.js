const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Order = sequelize.define("Order", {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  id_cliente: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  id_restaurante: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  id_reserva: {
    type: DataTypes.BIGINT,
    allowNull: true,
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  estado: {
    type: DataTypes.ENUM("pendiente", "preparando", "completado", "cancelado"),
    allowNull: false,
    defaultValue: "pendiente",
  }
}, {
  tableName: "pedidos",
  timestamps: false,
});

module.exports = Order;
