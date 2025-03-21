const { Sequelize } = require("sequelize");
require("dotenv").config();

// Configurar la conexión a PostgreSQL usando Sequelize
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: "postgres",
  port: process.env.DB_PORT || 5432, // Usa el puerto de la variable de entorno o el 5432 por defecto
  logging: false, // Desactiva logs SQL en consola
  pool: {
    max: 5,        // Máximo de conexiones abiertas
    min: 0,        // Mínimo de conexiones abiertas
    acquire: 30000, // Tiempo máximo de espera (ms) para obtener una conexión
    idle: 10000    // Tiempo máximo (ms) que una conexión puede estar inactiva
  }
});

// Probar la conexión a la base de datos
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexión a PostgreSQL establecida correctamente.");
  } catch (error) {
    console.error("❌ Error de conexión a la base de datos:", error);
  }
};

testConnection();

module.exports = sequelize;
