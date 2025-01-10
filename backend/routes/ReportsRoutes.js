const express = require("express");
const ReportsController = require("../controllers/ReportsController");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();

router.get(
  "/salesReport",
  authMiddleware.authenticateJWT,
  authMiddleware.authorizeRole(["admin"]),
  ReportsController.SalesReport
);
router.get(
  "/itemReport",
  authMiddleware.authenticateJWT,
  authMiddleware.authorizeRole(["admin"]),
  ReportsController.ItemReport
);
router.get(
  "/categoryReport",
  authMiddleware.authenticateJWT,
  authMiddleware.authorizeRole(["admin"]),
  ReportsController.CategoryReport
);
router.get(
  "/stockReport",
  authMiddleware.authenticateJWT,
  authMiddleware.authorizeRole(["admin"]),
  ReportsController.StockReport
);


module.exports = router;
