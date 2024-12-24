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
      return res.status(404).json({ msg: "Item Not Found" });
    }
    if (field == "name" || field == "category") {
      item[field] = value;
    } else {
      item[field] = parseInt(value);
    }
    await ItemModel.save();
    res.status(200).json({ msg: "Item Updated Successfuly" });
  } catch (error) {
    console.error("Error while updating item: " + error);
    res.status(500).json({ msg: "failed to update item" });
  }
};

module.exports = { AddItemService, GetItemsService, DeleteItemService, UpdateItemService };
