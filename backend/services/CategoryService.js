const CategoryModel = require("../models/CategoryModel");

const AddCategoryService = async ({ name }) => {
  try {
    const newCategory = new CategoryModel({ name });
    return await newCategory.save();
  } catch (error) {
    console.error(
      "Error in CategoryService AddCategoryService: ",
      error.message || error
    );
    throw new Error("Failed to save Category");
  }
};

const GetCategoriesService = async () => {
  try {
    return await CategoryModel.find();
  } catch (error) {
    console.error(
      "Error in CategoryService GetCategoriesService: ",
      error.message || error
    );
    throw new Error("Failed to Get Categories");
  }
};

const DeleteCategoryService = async ({ name }) => {
  try {
    return await CategoryModel.deleteOne({ name: name });
  } catch (error) {
    console.error(
      "Error in ItemService DeleteItemService: ",
      error.message || error
    );
    throw new Error(`Failed to Delete item with id: ${id}`);
  }
};

module.exports = {
  AddCategoryService,
  GetCategoriesService,
  DeleteCategoryService,
};
