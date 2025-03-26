const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Menu = sequelize.define("Menu", {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    id_restaurante: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    nombre: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    tableName: "menus",
    timestamps: false
});

module.exports = Menu;