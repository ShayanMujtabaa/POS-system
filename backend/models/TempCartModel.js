const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TempCartSchema = new Schema({
    TempCartId: {
        type: String,
        required: true,
    },
    itemIds: {
        type: Array,
        required: true,
    },
    quantities: {
        type: Array,
        required: true,
    },
}, {timestamps: true});

const TempCart = mongoose.model('TempCart', TempCartSchema);
module.exports = TempCart;