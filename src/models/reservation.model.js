const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Reservation = sequelize.define(
  "Reservation",
  {
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
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    numero_personas: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },
    estado: {
      type: DataTypes.ENUM("pendiente", "confirmada", "cancelada"),
      allowNull: false,
      defaultValue: "pendiente",
    },
  },
  {
    tableName: "reservas",
    timestamps: false,
  }
);

module.exports = Reservation;
