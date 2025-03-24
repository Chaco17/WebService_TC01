const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Restaurante = sequelize.define("Restaurante", {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    direccion: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    telefono: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    id_administrador: {
        type: DataTypes.BIGINT,
        allowNull: false
    }
}, {
    tableName: "restaurantes",
    timestamps: false
});

module.exports = Restaurante;
