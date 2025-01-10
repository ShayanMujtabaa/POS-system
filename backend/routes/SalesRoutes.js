const express = require("express");
const SalesController = require("../controllers/SalesController");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();

router.post(
  "/checkout",
  authMiddleware.authenticateJWT,
  authMiddleware.authorizeRole(["admin", "employee"]),
  SalesController.SalesCheckoutController
);
router.post(
  "/refund",
  authMiddleware.authenticateJWT,
  authMiddleware.authorizeRole(["admin", "employee"]),
  SalesController.SalesRefundController
);

module.exports = router;
