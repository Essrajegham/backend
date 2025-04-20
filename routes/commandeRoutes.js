const express = require('express');
const router = express.Router();
const fournisseurCtrl = require('../controllers/FournisseurController');

router.post('/', fournisseurCtrl.createFournisseur);
router.get('/', fournisseurCtrl.getFournisseurs);
router.get('/:id', fournisseurCtrl.getFournisseurById);
router.put('/:id', fournisseurCtrl.updateFournisseur);
router.delete('/:id', fournisseurCtrl.deleteFournisseur);

module.exports = router;
