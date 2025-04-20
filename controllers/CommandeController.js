const Commande = require('../models/Commande');

// Créer une nouvelle commande
const createCommande = async (req, res) => {
  try {
    const { client, produits, statut } = req.body;

    const nouvelleCommande = new Commande({
      client,
      produits,
      statut: statut || 'en attente'
    });

    const savedCommande = await nouvelleCommande.save();
    res.status(201).json(savedCommande);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création de la commande' });
  }
};

//  Récupérer toutes les commandes
const getCommandes = async (req, res) => {
  try {
    const commandes = await Commande.find()
      .populate('client') // Affiche les détails du client
      .populate('produits.produitId'); // Affiche les détails de chaque produit

    res.status(200).json(commandes);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des commandes' });
  }
};

// Récupérer une commande par ID
const getCommandeById = async (req, res) => {
  try {
    const commande = await Commande.findById(req.params.id)
      .populate('client')
      .populate('produits.produitId');

    if (!commande) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }

    res.status(200).json(commande);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération de la commande' });
  }
};

//  Mettre à jour une commande
const updateCommande = async (req, res) => {
  try {
    const updatedCommande = await Commande.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedCommande) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }

    res.status(200).json(updatedCommande);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour de la commande' });
  }
};

// Supprimer une commande
const deleteCommande = async (req, res) => {
  try {
    const deleted = await Commande.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }

    res.status(200).json({ message: 'Commande supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression de la commande' });
  }
};

module.exports = {
  createCommande,
  getCommandes,
  getCommandeById,
  updateCommande,
  deleteCommande,
};
