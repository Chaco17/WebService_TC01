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

// Rutas sin protección temporalmente
// router.get('/users/me', getMe);
// router.put('/users/:id', updateUser);
// router.delete('/users/:id', deleteUser);

// Rutas protegidas (requieren token Bearer válido) - COMENTAR ESTO
router.get('/users/me', keycloak.protect('realm:cliente'), getMe);
router.put('/users/:id', keycloak.protect('realm:cliente'), updateUser);
router.delete('/users/:id', keycloak.protect('realm:cliente'), deleteUser);

export default router;
