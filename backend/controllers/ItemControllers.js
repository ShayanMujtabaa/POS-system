const AddItem = (ItemService) => async (req, res) => {
    try {
        const { id, name, price, cost, stock, category, imageUrl } = req.body;
        await ItemService.addItem({ id, name, price, cost, stock, category, imageUrl });
        res.status(200).json({ msg: "Item Added" });
    } catch (error) {
        console.error("Error while adding item: ", error);
        res.status(500).json({ msg: "Failed to add item" });
    }
};

module.exports = { AddItem };
