const ExpenseService = require("../services/ExpenseService");

const AddExpenseController = async (req, res) => {
  try {
    const { name, price } = req.body;
    await ExpenseService.AddExpenseService({
      name,
      price,
    });
    res.status(200).json({ msg: "Expense Added" });
  } catch (error) {
    console.error("Error while adding Expense: ", error.message || error);
    res.status(500).json({ msg: "Failed to add Expense" });
  }
};

module.exports = {
    AddExpenseController,
}
