const express = require("express");
const ItemController = require("../controllers/ItemController");

const router = express.Router();

router.post("/addItem", ItemController.AddItemController);
router.get("/getItems", ItemController.GetItemsController);
router.put("/updateItem", ItemController.UpdateItemController);
router.delete("/deleteItem", ItemController.DeleteItemController);

module.exports = router;
