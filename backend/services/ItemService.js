const addItem = async ({ id, name, price, cost, stock, category, imageUrl }, ItemModel) => {
    const newItem = new ItemModel({ id, name, price, cost, stock, category, imageUrl });
    return await newItem.save();
};

module.exports = { addItem };