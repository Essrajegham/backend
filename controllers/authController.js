const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const nodemailer = require('nodemailer');

exports.register = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Vérifier si l'email existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email déjà utilisé' });
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    
    res.json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    // Vérifier si l'utilisateur existe
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Comparer le mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Générer le token JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    // Vérifier si l'utilisateur existe
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    // Créer un token de réinitialisation
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;

    // Créer le transporteur pour l'email
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Envoyer l'email de réinitialisation
    await transporter.sendMail({
      to: email,
      subject: 'Password Reset',
      text: `Click the link to reset your password: ${resetLink}`
    });

    res.json({ message: 'Email sent' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    // Vérifier le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    // Vérifier si l'utilisateur existe
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    // Hacher le nouveau mot de passe
    user.password = await bcrypt.hash(password, 10);
    await user.save();

    res.json({ message: 'Password updated' });
  } catch (err) {
    res.status(400).json({ error: 'Invalid or expired token', err });
  }
};

exports.verifytoken = async (req, res) => {
  try {
    // Si le token est valide, envoyer une réponse de succès
    res.json({ authenticated: true, user: req.user });
  } catch (err) {
    res.status(400).json({ error: 'Invalid or expired token', err });
  }
};
