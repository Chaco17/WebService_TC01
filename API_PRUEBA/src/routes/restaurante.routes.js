const { Router } = require('express');
const { getRestaurants, getRestaurantId, crearRestaurante, actualizarRestaurante, eliminarRestaurante } = require('../controllers/restaurante.controller');

const router = Router();

router.get('/restaurants', getRestaurants);
router.get('/restaurants/:id', getRestaurantId);
router.post('/restaurants', crearRestaurante);
router.put('/restaurants/:id', actualizarRestaurante);
router.delete('/restaurants/:id', eliminarRestaurante);

module.exports = router;