import { Router } from 'express';
import { pool } from '../db.js';
import { getUsers, getUser, createUser, deleteUser, updateUser } from '../controllers/user.controller.js';

const router = Router();

router.get('/users', getUsers);

router.get('/users/:id', getUser);

router.post('/users', createUser);

router.delete('/users/:id', deleteUser);

router.put('/users/:id', updateUser);

export default router;