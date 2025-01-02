const ExpenseModel = require("../models/ExpenseModel");

const AddExpenseService = async ({ name, price }) => {
  try {
    const newExpense = new ExpenseModel({
      name,
      price,
    });
    return await newExpense.save();
  } catch (error) {
    console.error(
      "Error in ExpenseService AddExpenseService: ",
      error.message || error
    );
    throw new Error("Failed to save Expense");
  }
};

module.exports = { AddExpenseService };
