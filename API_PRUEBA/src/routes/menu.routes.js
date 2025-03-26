import { Router } from 'express';
import {
  crearMenu,
  getMenuId,
  actualizarMenu,
  eliminarMenu,
  getMenus_RestauranteId
} from '../controllers/menu.controller.js';

const router = Router();

router.post('/menus', crearMenu);
router.get('/menus/:id', getMenuId);
router.put('/menus/:id', actualizarMenu);
router.delete('/menus/:id', eliminarMenu);
router.get('/restaurants/:id/menus', getMenus_RestauranteId);

export default router;
