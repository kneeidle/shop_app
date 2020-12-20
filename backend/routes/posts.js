const express = require('express');

const router = express.Router();

const productsController = require('../controllers/products');

router.post('/upload', productsController.uploadProducts);

router.get('/', productsController.getAllProducts);

router.get('/:postId', productsController.getSingleProduct);

router.delete('/:postId', productsController.deletePost);//

router.patch('/:postId', productsController.updatePost);//

module.exports = router;
