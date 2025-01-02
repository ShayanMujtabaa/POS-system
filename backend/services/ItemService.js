const ItemModel = require("../models/ItemModel");

const AddItemService = async ({
  id,
  name,
  price,
  cost,
  stock,
  category,
  imageUrl,
}) => {
  try {
    const newItem = new ItemModel({
      id,
      name,
      price,
      cost,
      stock,
      category,
      imageUrl,
    });
    return await newItem.save();
  } catch (error) {
    console.error(
      "Error in ItemService AddItemService: ",
      error.message || error
    );
    throw new Error("Failed to save item");
  }
};

const GetItemsService = async () => {
  try {
    return await ItemModel.find();
  } catch (error) {
    console.error(
      "Error in ItemService GetItemService: ",
      error.message || error
    );
    throw new Error("Failed to Get items");
  }
};

const DeleteItemService = async ({ id }) => {
  try {
    return await ItemModel.deleteOne({ id: id });
  } catch (error) {
    console.error(
      "Error in ItemService DeleteItemService: ",
      error.message || error
    );
    throw new Error(`Failed to Delete item with id: ${id}`);
  }
};

const UpdateItemService = async ({ id, field, value }) => {
  try {
    const item = await ItemModel.findOne({ id: id });
    if (!item) {
      throw new Error("Item Not Found");
    }
    if (field === "name" || field === "category") {
      item[field] = value; 
    } else {
      item[field] = parseInt(value); 
    }

    await item.save(); 

    return { success: true, msg: "Item Updated Successfully", item };
  } catch (error) {
    console.error("Error while updating item: " + error.message || error);
    throw new Error(error.message || "Failed to update item");
  }
};


// The following functions are for internal calls:
const findItemById = async (id) => {
  return await ItemModel.findOne({ id });
};

const decrementItemStock = async (id, quantity) => {
  const item = await findItemById(id);
  if (!item) throw new Error(`Item with id ${id} not found`);
  if (item.stock < quantity)
    throw new Error(`Not enough stock for ${item.name}`);
  item.stock -= quantity;
  return await item.save();
};

const incrementItemStock = async (id, quantity) => {
  const item = await findItemById(id);
  if (!item) throw new Error(`Item with id ${id} not found`);
  item.stock += quantity;
  return await item.save();
};

module.exports = {
  AddItemService,
  GetItemsService,
  DeleteItemService,
  UpdateItemService,
  findItemById,
  decrementItemStock,
  incrementItemStock,
};
