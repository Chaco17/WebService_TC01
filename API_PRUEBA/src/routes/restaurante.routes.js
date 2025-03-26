import { Router } from 'express';
import {
  getRestaurants,
  getRestaurantId,
  crearRestaurante,
  actualizarRestaurante,
  eliminarRestaurante
} from '../controllers/restaurante.controller.js';

const router = Router();

router.get('/restaurants', getRestaurants);
router.get('/restaurants/:id', getRestaurantId);
router.post('/restaurants', crearRestaurante);
router.put('/restaurants/:id', actualizarRestaurante);
router.delete('/restaurants/:id', eliminarRestaurante);

export default router;
