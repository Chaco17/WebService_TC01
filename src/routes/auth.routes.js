import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { decode } from 'jsonwebtoken';
import {
  register,
  login,
  getMe,
  updateUser,
  deleteUser
} from '../controllers/auth.controller.js';

import { verifyToken } from '../middlewares/verifyToken.js';

const router = Router();

// Rutas públicas
router.post('/register', register);
router.post('/login', login);

// En auth.routes.js
router.get('/users/me', verifyToken('cliente'), getMe);
router.put('/users/:id', verifyToken('cliente'), updateUser);
router.delete('/users/:id', verifyToken('cliente'), deleteUser);

// Ruta de depuración
router.get('/debug-token', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Token faltante' });

  const token = authHeader.split(' ')[1];
  const decoded = jwt.decode(token, { complete: true });

  return res.json({
    header: decoded.header,
    payload: decoded.payload,
    resourceRoles: decoded.payload.resource_access?.['restauranteapi']?.roles || [],
    realmRoles: decoded.payload.realm_access?.roles || []
  });
});

export default router;
