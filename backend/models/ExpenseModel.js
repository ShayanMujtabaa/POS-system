const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const expenseSchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
}, {timestamps: true});

const Expense = mongoose.model('Expense', expenseSchema);
module.exports = Expense;