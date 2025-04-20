const express = require('express');
const multer = require('multer');
const path = require('path');
const { register, login, forgotPassword, resetPassword, verifytoken } = require('../controllers/authController');

const router = express.Router();

// Configuration de multer pour gérer l'upload des fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Dossier où les fichiers seront stockés
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nom unique pour le fichier
  }
});

const upload = multer({ storage: storage });

// Route pour l'inscription de l'utilisateur avec upload de l'image de profil
router.post('/register', upload.single('profileImage'), register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.get('/verify-token', verifytoken);

module.exports = router;
