const express = require("express");
const ExpenseController = require("../controllers/ExpenseController");

const router = express.Router();

router.post("/addExpense", ExpenseController.AddExpenseController);

module.exports = router;
