import { Router } from 'express';
import {
  createReservation,
  getReservationById,
  cancelReservation,
  getReservationsByUser,
  getReservationsByRestaurant
} from '../controllers/reservation.controller.js';

const router = Router();

// aquí el orden sí importa para evitar colisiones
router.post('/reservations', createReservation);
router.get('/reservations/user/:id', getReservationsByUser);
router.get('/reservations/restaurant/:id', getReservationsByRestaurant);
router.get('/reservations/:id', getReservationById);
router.delete('/reservations/:id', cancelReservation);

export default router;
