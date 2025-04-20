const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');

// Define product CRUD routes
router.post('/products', authMiddleware, productController.createProduct); // Authentifier avant de créer un produit
router.get('/products', authMiddleware, productController.getProducts); // Authentifier avant d'obtenir tous les produits
router.get('/products/:id', authMiddleware, productController.getProductById); // Authentifier avant de récupérer un produit par ID
router.put('/products/:id', authMiddleware, productController.updateProduct); // Authentifier avant de mettre à jour un produit
router.delete('/products/:id', authMiddleware, productController.deleteProduct); // Authentifier avant de supprimer un produit

module.exports = router;
