const { Router } = require('express');
const { 
    getRestaurants, 
    getRestaurantById, 
    createRestaurant, 
    updateRestaurant, 
    deleteRestaurant 
} = require('../controllers/restaurantes.controller');

const router = Router();

router.get('/restaurants', getRestaurants);

router.get('/restaurants/:id', getRestaurantById);

router.post('/restaurants', createRestaurant);

router.put('/restaurants/:id', updateRestaurant);

router.delete('/restaurants/:id', deleteRestaurant);

module.exports = router;