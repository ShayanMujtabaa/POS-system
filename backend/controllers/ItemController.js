const ItemService = require('../services/ItemService');

const AddItemController = async (req, res) => {
    try {
        const { id, name, price, cost, stock, category, imageUrl } = req.body;

        // Service layer handles business logic
        await ItemService.AddItemService({ id, name, price, cost, stock, category, imageUrl });

        res.status(200).json({ msg: "Item Added" });
    } catch (error) {
        console.error("Error while adding item: ", error.message || error);
        res.status(500).json({ msg: "Failed to add item" });
    }
};

module.exports = { AddItemController };
