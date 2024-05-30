const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const salesSchema = new Schema({
    items: {
        type: Array,
        required: true,
    },
    quantities: {
        type: Array,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
}, {timestamps: true});

const Sales = mongoose.model('Sales', salesSchema);
module.exports = Sales;