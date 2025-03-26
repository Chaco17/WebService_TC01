const express = require('express');
const router = express.Router();
const { crearPlato, getPlatoId, actualizarPlato} = require('../controllers/plato.controller');

router.post('/platos', crearPlato);
router.get('/platos/:id', getPlatoId);
router.put('/platos/:id', actualizarPlato);

module.exports = router;