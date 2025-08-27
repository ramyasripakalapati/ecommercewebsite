const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const { getProducts, addProduct, updateProduct, deleteProduct, uploadMiddleware } = require('../controllers/productController');

router.get('/', getProducts);
router.post('/', verifyToken, uploadMiddleware, addProduct);
router.put('/:id', verifyToken, uploadMiddleware, updateProduct);
router.delete('/:id', verifyToken, deleteProduct);

module.exports = router;
