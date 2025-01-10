const express = require("express");
const ItemController = require("../controllers/ItemController");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();

router.post(
  "/addItem",
  authMiddleware.authenticateJWT,
  authMiddleware.authorizeRole(["admin"]),
  ItemController.AddItemController
);
router.get(
  "/getItems",
  authMiddleware.authenticateJWT,
  authMiddleware.authorizeRole(["admin", "employee"]),
  ItemController.GetItemsController
);
router.put(
  "/updateItem",
  authMiddleware.authenticateJWT,
  authMiddleware.authorizeRole(["admin"]),
  ItemController.UpdateItemController
);
router.delete(
  "/deleteItem",
  authMiddleware.authenticateJWT,
  authMiddleware.authorizeRole(["admin"]),
  ItemController.DeleteItemController
);

module.exports = router;
