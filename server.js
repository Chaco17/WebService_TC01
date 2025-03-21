const express = require("express");
const dotenv = require("dotenv");
const sequelize = require("./src/config/database");
const reservationRoutes = require("./src/routes/reservation.routes");
const orderRoutes = require("./src/routes/order.routes");

dotenv.config();
const app = express();
app.use(express.json());

// Registrar rutas
app.use("/reservations", reservationRoutes);
app.use("/orders", orderRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 3000;
sequelize.sync().then(() => {
  console.log("✅ Base de datos sincronizada.");
  app.listen(PORT, () => console.log(`🚀 Servidor corriendo en el puerto ${PORT}`));
}).catch(error => console.error("❌ Error al conectar a la base de datos:", error));
