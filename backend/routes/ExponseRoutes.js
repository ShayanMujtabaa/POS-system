const express = require("express");
const ExpenseController = require("../controllers/ExpenseController");

const router = express.Router();

app.post("/addExpense", ExpenseController.AddExpenseController);

module.exports = router;
