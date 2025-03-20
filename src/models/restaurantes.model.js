const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Restaurant = sequelize.define("Restaurant", {
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
        type: DataTypes.BIGINT, // Cambiar a BIGINT en db
        allowNull: false
    }
}, {
    tableName: "restaurantes",
    timestamps: false
});

// GET /restaurants
Restaurant.findAll = async () => {
    const result = await Restaurant.findAll();
    return result;
}

// GET /restaurants/:id
Restaurant.findById = async (id) => {
    const result = await Restaurant.findByPk(id);
    return result;
}

// POST /restaurants
Restaurant.create = async (restaurantData) => {
    const result = await Restaurant.create(restaurantData);
    return result;
}

// PUT /restaurants/:id
Restaurant.update = async (id, restaurantData) => {
    const result = await Restaurant.update(restaurantData, { where: { id } });
    return result;
}

// DELETE /restaurants/:id
Restaurant.delete = async (id) => {
    const result = await Restaurant.destroy({ where: { id } });
    return result;
}

module.exports = Restaurant;