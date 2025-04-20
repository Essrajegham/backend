const mongoose = require('mongoose');

const commandeSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true
  },
  produits: [
    {
      produitId: { type: mongoose.Schema.Types.ObjectId, ref: 'Produit', required: true },
      quantite: { type: Number, required: true }
    }
  ],
  dateCommande: { type: Date, default: Date.now },
  statut: { type: String, default: 'en attente' }
}, { timestamps: true });

module.exports = mongoose.model('Commande', commandeSchema);
