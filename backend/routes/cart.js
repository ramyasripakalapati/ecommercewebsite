const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const { getCart, addToCart, updateCart, removeFromCart } = require('../controllers/cartController');

router.get('/', verifyToken, getCart);
router.post('/', verifyToken, addToCart);
router.put('/', verifyToken, updateCart);
router.delete('/', verifyToken, removeFromCart);

module.exports = router;
