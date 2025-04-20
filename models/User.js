const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String }, 
  dateOfBirth: { type: Date }, 
  role: { 
    type: String, 
    enum: ['user', 'admin', 'supplier'], 
    default: 'user' 
  },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  profileImage: { type: String, default: '' }, 
});

module.exports = mongoose.model('User', UserSchema);
