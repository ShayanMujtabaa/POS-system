const express = require("express");
const SalesController = require("../controllers/SalesController");

const router = express.Router();

router.post("/checkout", SalesController.SalesCheckoutController);
router.post("/refund", SalesController.SalesRefundController);

module.exports = router;
