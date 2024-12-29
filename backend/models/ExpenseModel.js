const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require("mongoose-sequence")(mongoose);

const expenseSchema = new Schema({

    id: {
        type: Number,
        unique: true,
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

expenseSchema.plugin(AutoIncrement, { inc_field: "id" });

const Expense = mongoose.model('Expense', expenseSchema);
module.exports = Expense;