import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { PORT } from './config.js';
import userRoutes from './routes/user.routes.js';

dotenv.config();

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

app.use(userRoutes);

// Middleware de errores
app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(500).json({ error: "Error interno del servidor" });
});

app.listen(PORT, () => { // Inicio
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
