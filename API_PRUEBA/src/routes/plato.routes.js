import { Router } from 'express';
import {
  crearPlato,
  getPlatoId,
  actualizarPlato,
  eliminarPlato,
  getPlatosByMenu
} from '../controllers/plato.controller.js';

const router = Router();

router.post('/menus/:id/platos', crearPlato);
router.get('/platos/:id', getPlatoId);
router.put('/platos/:id', actualizarPlato);
router.delete('/platos/:id', eliminarPlato);
router.get('/menus/:id/platos', getPlatosByMenu);

export default router;
