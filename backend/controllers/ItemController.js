const ItemService = require("../services/ItemService");

const AddItemController = async (req, res) => {
  try {
    const { id, name, price, cost, stock, category, imageUrl } = req.body;
    await ItemService.AddItemService({
      id,
      name,
      price,
      cost,
      stock,
      category,
      imageUrl,
    });
    res.status(200).json({ msg: "Item Added" });
  } catch (error) {
    console.error("Error while adding item: ", error.message || error);
    res.status(400).json({ msg: "Failed to add item" });
  }
};

const GetItemsController = async (req, res) => {
  try {
    const items = await ItemService.GetItemsService();
    res.status(200).json(items);
  } catch (error) {
    console.log("Error while getting items: " + error);
    res.status(404).json({ msg: "failed to get items" });
  }
};

const DeleteItemController = async (req, res) => {
  try {
    const { id } = req.body;
    await ItemService.DeleteItemService({
      id,
    });
    res.status(200).json({ msg: "Item Deleted" });
  } catch (error) {
    console.log("Error while deleting item: " + error);
    res.status(500).json({ msg: "failed to delete item" });
  }
};

const UpdateItemController = async (req, res) => {
  try {
    const { id, field, value } = req.body;
    await ItemService.UpdateItemService({
      id,
      field,
      value,
    });
    res.status(200).json({ msg: "Item Updated" });
  } catch (error) {
    console.log("Error while updating item: " + error);
    res.status(500).json({ msg: "failed to update item" });
  }
};

module.exports = {
  AddItemController,
  GetItemsController,
  DeleteItemController,
  UpdateItemController,
};
