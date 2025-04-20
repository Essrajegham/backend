const Product = require('../models/Product');
const jwt = require('jsonwebtoken');

// Create a new product
exports.createProduct = async (req, res) => {
  const { name, category, price, image } = req.body;
  try {
    const newProduct = new Product({ name, category, price, image });
    await newProduct.save();
    res.status(201).json(newProduct); // Retourner le produit créé avec un code 201
  } catch (err) {
    console.error(err.message); // Ajout de la journalisation de l'erreur
    res.status(500).json({ error: 'Server error. Could not create product.' });
  }
};

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products); // Retourner tous les produits avec un code 200
  } catch (err) {
    console.error(err.message); // Ajout de la journalisation de l'erreur
    res.status(500).json({ error: 'Server error. Could not retrieve products.' });
  }
};

// Get a product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.status(200).json(product); // Retourner le produit trouvé avec un code 200
  } catch (err) {
    console.error(err.message); // Ajout de la journalisation de l'erreur
    res.status(500).json({ error: 'Server error. Could not retrieve product.' });
  }
};

// Update a product by ID
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, category, price, image } = req.body;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, category, price, image },
      { new: true } // Retourner l'objet mis à jour
    );
    if (!updatedProduct) return res.status(404).json({ error: 'Product not found' });
    res.status(200).json(updatedProduct); // Retourner le produit mis à jour avec un code 200
  } catch (err) {
    console.error(err.message); // Ajout de la journalisation de l'erreur
    res.status(500).json({ error: 'Server error. Could not update product.' });
  }
};

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    await product.remove();
    res.status(200).json({ message: 'Product deleted successfully' }); // Retourner un message avec un code 200
  } catch (err) {
    console.error(err.message); // Ajout de la journalisation de l'erreur
    res.status(500).json({ error: 'Server error. Could not delete product.' });
  }
};
