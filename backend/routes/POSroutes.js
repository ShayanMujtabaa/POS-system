const Item = require('../models/ItemModel');
const Sales = require('../models/SalesModel');
const Category = require('../models/CategoryModel');
const Expense = require('../models/ExpenseModel');
const TempCart = require('../models/TempCartModel');

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

const AddCategory = async (req, res) => {
    const {id, name } = req.body;
    const newCategory = new Category({
        id,
        name,
       
    });
    try {
        await newCategory.save();
        res.status(200).json({msg: "Category Added"});
    } catch (error) {
        console.log("Error while adding category: " + error);
        res.status(203).json({msg: "failed to add category"});
    }
}

const AddExpense = async (req, res) => {
    const {id, name, price } = req.body;
    const newExpense = new Expense({
        id,
        name,
       price,
    });
    try {
        await newExpense.save();
        res.status(200).json({msg: "Expense Added"});
    } catch (error) {
        console.log("Error while adding expense: " + error);
        res.status(203).json({msg: "failed to add expense"});
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

const GetCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        console.log("Error while getting categories: " + error);
        res.status(203).json({msg: "failed to get categories"});
    }
}

const DeleteCategory = async (req, res) => {
    const { id } = req.body;
    try {
        await Category.deleteOne({id: id});
        res.status(200).json({msg: "Category Deleted"});
    } catch (error) {
        console.log("Error while deleting category: " + error);
        res.status(203).json({msg: "failed to delete category"});
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

const UpdateStock = async (req, res) => {
    const { id, stock } = req.body;
    try {
        const item = await Item.findOne({id: id});
        if (!item) {
            return res.status(203).json({msg: "Item Not Found"})
        }
        item.stock = parseInt(stock);

        await item.save();
        res.status(200).json({msg: "Item Stock Updated Successfuly"})
    }
    catch (error) {
        console.log("Error while updating item stock: " + error);
        res.status(203).json({msg: "failed to update item stock"});
    }
}

const Checkout = async (req, res) => {
    const {cartItems, total, discount, tax} = req.body;
    try {
        let items = [];
        let quantities = [];
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
            quantities.push(cartItems[i].quantity);;
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

//3 functions added by Hassan

const HoldCart = async (req, res) => {
    const {cartItems} = req.body;
    try {
        let itemIds = [];
        let quantities = [];
        for (let i = 0; i < cartItems.length; i++) {
            itemIds.push(cartItems[i].id);
            quantities.push(cartItems[i].quantity);
        }
        const newTempCartID = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        const newTempCart = new TempCart({
            TempCartId: newTempCartID,
            itemIds,
            quantities
        });
        await newTempCart.save();
        res.status(200).json({msg: "Cart Saved"})
    } catch (error) {
        console.log("Error while holding cart: " + error);
        res.status(203).json({msg: "failed to hold cart"});
    }
}

const GetHeldCarts = async (req, res) => {
    try {
        const carts = await TempCart.find();
        res.status(200).json(carts);
    }
    catch (error) {
        console.log("Error while getting held carts: " + error);
        res.status(203).json({msg: "failed to get held carts"});
    }   
}

const DeleteHeldCart = async (req, res) => {
    const { id } = req.body;
    try {
        await TempCart.deleteOne({TempCartId: id});
        res.status(200).json({msg: "Cart Deleted"});
    } catch (error) {
        console.log("Error while deleting cart: " + error);
        res.status(203).json({msg: "failed to delete cart"});
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

const Refund = async (req, res) => {
    const {cartItems, refundAmount} = req.body;
    try {
        let items = [];
        let quantities = [];
        for (let i = 0; i < cartItems.length; i++) {
            const item = await Item.findOne({id: cartItems[i].id});
            if (!item) {
                return res.status(203).json({msg: "Item Not Found"})
            }
            item.stock += cartItems[i].quantity;
            await item.save();
            items.push(item.id);
            quantities.push(cartItems[i].quantity);
        }
        const newRefund = new Sales({
            items,
            quantities,
            total: -Math.abs(refundAmount)
        });
        await newRefund.save();
        res.status(200).json({msg: "Refund Successful"})
    } catch (error) {
        console.log("Error while refunding: " + error);
        res.status(203).json({msg: "failed to refund"});
    }
}

module.exports = { GetTest, AddItem, GetItems, DeleteItem, UpdateItem, Checkout, Refund,
     SalesReport, AddCategory, GetCategories, DeleteCategory, UpdateStock, AddExpense, HoldCart, GetHeldCarts, DeleteHeldCart }



