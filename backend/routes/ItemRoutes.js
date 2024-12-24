const express = require('express');
const ItemController = require('../controllers/ItemController'); // Singular for naming consistency

const router = express.Router();

// Add Item Route
router.post('/addItem', ItemController.AddItemController);

module.exports = router;
