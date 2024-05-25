import mongoose from "mongoose";
const Schema = mongoose.Schema;
const itemSchema = new Schema({
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
    cost: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    imageUrl: {
        type: String,
        required: false,
    },
}, {timestamps: true});

const Item = mongoose.model('Item', itemSchema);
export default Item;