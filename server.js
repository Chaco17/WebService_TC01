const express = require("express");
const dotenv = require("dotenv");
const sequelize = require("./src/config/database");
const reservationRoutes = require("./src/routes/reservation.routes");
const orderRoutes = require("./src/routes/order.routes");
//swagger
const swaggerjsdoc = require("swagger-jsdoc");
const swaggerui = require("swagger-ui-express");
const swaggerSpec = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "REST API para un restaurante",
      version: "1.0.0",
      description: "Una REST API para un servicio de restauirantes usando PostgreSQL y Express"
    },
    servers: [
      {
        url: "http://localhost:3000"
      }
    ]
  },
  apis: ["./API_PRUEBA/src/routes/*.js"] // Revisar ruta
}


dotenv.config();
const app = express();
app.use(express.json());

//Ruta de documentación
app.use("/api-docs", swaggerui.serve, swaggerui.setup(swaggerjsdoc(swaggerSpec)));

// Registrar rutas
app.use("/reservations", reservationRoutes);
app.use("/orders", orderRoutes);

const PORT = process.env.PORT || 3000;
sequelize.sync().then(() => {
  console.log("Base de datos sincronizada.");
  app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
}).catch(error => console.error("Error al conectar a la base de datos:", error));
