const express = require("express");
const ItemController = require("../controllers/ItemController"); // Singular for naming consistency

const router = express.Router();

// Add Item Route
router.post("/addItem", ItemController.AddItemController);
router.get("/getItems", ItemController.GetItemsController);
router.put("/updateItem", ItemController.UpdateItemController);
router.delete("/deleteItem", ItemController.DeleteItemController);

module.exports = router;
