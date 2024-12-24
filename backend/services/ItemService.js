const ItemModel = require('../models/ItemModel'); 

const AddItemService = async ({ id, name, price, cost, stock, category, imageUrl }) => {
    try {
        const newItem = new ItemModel({ id, name, price, cost, stock, category, imageUrl });
        return await newItem.save();
    } catch (error) {
        console.error("Error in ItemService AddItemService: ", error.message || error);
        throw new Error("Failed to save item");
    }
};

module.exports = { AddItemService };
