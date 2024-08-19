const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const categorySchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
}, {timestamps: true});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;