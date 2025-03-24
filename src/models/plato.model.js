const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Plato = sequelize.define("Plato", {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    id_menu: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    nombre: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    precio: {
        type: DataTypes.DECIMAL,
        allowNull: false
    }
}, {
    tableName: "platos",
    timestamps: false
});

module.exports = Plato;