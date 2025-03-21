const { Router } = require('express');
const { 
    getRestaurants, 
    getRestaurantById, 
    createRestaurant, 
    updateRestaurant, 
    deleteRestaurant 
} = require('../controllers/restaurantes.controller');

const router = Router();

// GET /restaurants - Lista todos los restaurantes
router.get('/restaurants', getRestaurants);

// GET /restaurants/:id - Obtiene un restaurante específico
router.get('/restaurants/:id', getRestaurantById);

// POST /restaurants - Crea un nuevo restaurante
router.post('/restaurants', createRestaurant);

// PUT /restaurants/:id - Actualiza un restaurante existente
router.put('/restaurants/:id', updateRestaurant);

// DELETE /restaurants/:id - Elimina un restaurante
router.delete('/restaurants/:id', deleteRestaurant);

module.exports = router;