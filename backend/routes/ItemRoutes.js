const express = require('express');
const POSController = require('../controllers/POSController');
const ItemService = require('../services/ItemService');
const ItemModel = require('../models/ItemModel');

const router = express.Router();

// Inject the ItemService with the actual ItemModel
router.post('/addItem', POSController.AddItem(ItemService.addItem.bind(null, ItemModel)));

module.exports = router;
