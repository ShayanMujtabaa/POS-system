const express = require("express");
const ExpenseController = require("../controllers/ExpenseController");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();

router.post(
  "/addExpense",
  authMiddleware.authenticateJWT,
  authMiddleware.authorizeRole(["admin"]),
  ExpenseController.AddExpenseController
);

module.exports = router;
