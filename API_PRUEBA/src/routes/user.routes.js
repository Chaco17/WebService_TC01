import { Router } from 'express';
import { pool } from '../db.js';
import { getUsers, getUser, createUser, deleteUser, updateUser } from '../controllers/users.controllers.js';

const router = Router();

// Obtener usuarios
router.get('/users', getUsers);

// Obtiene un usuario por id
router.get('/users/:id', getUser);

// Crear un usuario
router.post('/users', createUser);

// Eliminar un usuario
router.delete('/users/:id', deleteUser);

// Actualizar un usuario
router.put('/users/:id', updateUser);

export default router;