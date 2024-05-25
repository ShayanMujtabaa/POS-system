const Item = require('../models/ItemModel');

const GetTest = async (req, res) => {
    res.send('Test Route');
}

const AddItem = async (req, res) => {
    const { id, name, price, cost, stock, imageUrl } = req.body;
    const newItem = new Item({
        id,
        name,
        price,
        cost,
        stock,
        imageUrl,
    });
    try {
        await newItem.save();
        res.status(200).json({msg: "Item Added"});
    } catch (error) {
        console.log("Error while adding item: " + error);
        res.status(203).json({msg: "failed to add item"});
    }
}

const GetItems = async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).json(items);
    } catch (error) {
        console.log("Error while getting items: " + error);
        res.status(203).json({msg: "failed to get items"});
    }
}

const DeleteItem = async (req, res) => {
    const { id } = req.body;
    try {
        await Item.deleteOne({id: id});
        res.status(200).json({msg: "Item Deleted"});
    } catch (error) {
        console.log("Error while deleting item: " + error);
        res.status(203).json({msg: "failed to delete item"});
    }
} 

const UpdateItem = async (req, res) => {
    const { id, name, price, cost, stock, imageUrl } = req.body;
    try {
        await Item.updateOne({id: id}, {name, price, cost, stock, imageUrl});
        res.status(200).json({msg: "Item Updated"});
    }
    catch (error) {
        console.log("Error while updating item: " + error);
        res.status(203).json({msg: "failed to update item"});
    }
}

module.exports = { GetTest, AddItem, GetItems, DeleteItem, UpdateItem}



