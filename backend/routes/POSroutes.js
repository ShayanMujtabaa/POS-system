const Item = require('../models/ItemModel');
const Sales = require('../models/SalesModel');

const GetTest = async (req, res) => {
    res.send('Test Route');
}

const AddItem = async (req, res) => {
    const {id, name, price, cost, stock, category,  imageUrl } = req.body;
    const newItem = new Item({
        id,
        name,
        price,
        cost,
        stock,
        category,
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
    const { id, field, value } = req.body;
    try {
        const item = await Item.findOne({id: id});
        if (!item) {
            return res.status(203).json({msg: "Item Not Found"})
        }
        if (field == "name" || field == "category"){
        item[field] = value;
        } else {
            item[field] = parseInt(value);
        }
        await item.save();
        res.status(200).json({msg: "Item Updated Successfuly"})
    }
    catch (error) {
        console.log("Error while updating item: " + error);
        res.status(203).json({msg: "failed to update item"});
    }
}

const Checkout = async (req, res) => {
    const cartItems = req.body;
    try {
        let items = [];
        let quantities = [];
        let total = 0;
        for (let i = 0; i < cartItems.length; i++) {
            const item = await Item.findOne({id: cartItems[i].id});
            if (!item) {
                return res.status(203).json({msg: "Item Not Found"})
            }
            if (item.stock < cartItems[i].quantity) {
                return res.status(203).json({msg: "Not enough stock for " + item.name + " couldn't process checkout"})
            }
            item.stock -= cartItems[i].quantity;
            await item.save();
            items.push(item.id);
            quantities.push(cartItems[i].quantity);
            total += item.price * cartItems[i].quantity;
        }
        const newSale = new Sales({
            items,
            quantities,
            total
        });
        await newSale.save();
        res.status(200).json({msg: "Checkout Successful"})
    } catch (error) {
        console.log("Error while checking out: " + error);
        res.status(203).json({msg: "failed to checkout"});
    }
}

const SalesReport = async (req, res) => {
    try {
        const sales = await Sales.find();
        const items = await Item.find();
        for (let i = 0; i < sales.length; i++) {
            let itemNames = [];
            for (let j = 0; j < sales[i].items.length; j++) {
                const item = items.find(item => item.id == sales[i].items[j]);
                itemNames.push(item.name);
            }
            sales[i].items = itemNames;
        }
        sales.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        res.status(200).json(sales);
    } catch (error) {
        console.log("Error while getting sales: " + error);
        res.status(203).json({msg: "failed to get sales"});
    }
}

module.exports = { GetTest, AddItem, GetItems, DeleteItem, UpdateItem, Checkout, SalesReport}



