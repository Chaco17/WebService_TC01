const express = require('express');
const router = express.Router();
const { crearMenu, getMenuId, actualizarMenu, eliminarMenu, getMenus_RestauranteId } = require('../controllers/menu.controller');

router.post('/menus', crearMenu);
router.get('/menus/:id', getMenuId);
router.put('/menus/:id', actualizarMenu);
router.delete('/menus/:id', eliminarMenu);
router.get('/restaurants/:id/menus', getMenus_RestauranteId);

module.exports = router;