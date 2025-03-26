import { Router } from 'express';
import {
  createOrder,
  getOrderById,
  getOrdersByUser,
  getOrdersByRestaurant,
  updateOrderStatus,
  deleteOrder
} from '../controllers/order.controller.js';

const router = Router();

router.post('/orders', createOrder);
router.get('/orders/:id', getOrderById);
router.get('/users/:id/orders', getOrdersByUser);
router.get('/restaurants/:id/orders', getOrdersByRestaurant);
router.put('/orders/:id', updateOrderStatus);
router.delete('/orders/:id', deleteOrder);

export default router;
