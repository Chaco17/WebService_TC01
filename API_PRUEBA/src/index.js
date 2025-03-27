import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import session from 'express-session';

import { PORT } from './config.js';
import { keycloak, memoryStore } from './keycloak-config.js';

// Rutas
import userRoutes from './routes/user.routes.js';
import menuRoutes from './routes/menu.routes.js';
import orderRoutes from './routes/order.routes.js';
import platoRoutes from './routes/plato.routes.js';
import reservationRoutes from './routes/reservation.routes.js';
import restauranteRoutes from './routes/restaurante.routes.js';
import authRoutes from './routes/auth.routes.js'; 

dotenv.config();

const app = express();

// Middlewares generales
app.use(morgan('dev'));
app.use(express.json());

// Middleware de sesión y Keycloak
app.use(session({
  secret: 'clave-supersecreta',
  resave: false,
  saveUninitialized: true,
  store: memoryStore
}));

app.use(keycloak.middleware()); // Protege rutas

// Rutas de negocio
app.use(userRoutes);
app.use(menuRoutes);
app.use(orderRoutes);
app.use(platoRoutes);
app.use(reservationRoutes);
app.use(restauranteRoutes);

// Rutas protegidas 
app.use(authRoutes);

// Middleware para manejo de errores
app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(500).json({ error: "Error interno del servidor" });
});

// inicia
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});