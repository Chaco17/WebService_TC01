import { Router } from 'express';
import { keycloak } from '../middlewares/keycloak-config.js';
import {
  register,
  login,
  getMe,
  updateUser,
  deleteUser
} from '../controllers/auth.controller.js';

const router = Router();

// Rutas públicas
router.post('/register', register);
router.post('/login', login);

// Rutas protegidas (requieren token válido)
router.get('/users/me', keycloak.protect(), getMe);
router.put('/users/:id', keycloak.protect(), updateUser);
router.delete('/users/:id', keycloak.protect(), deleteUser);

export default router;
