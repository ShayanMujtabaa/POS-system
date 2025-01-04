const CategoryService = require("../services/CategoryService");

const AddCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    console.log("name is:",name)
    await CategoryService.AddCategoryService({ name });
    res.status(200).json({ msg: "Category Added" });
  } catch (error) {
    console.log("Error while adding category " + error);
    res.status(500).json({ msg: "Failed to add Category" });
  }
};

const GetCategoriesController = async (req, res) => {
  try {
    const categories = await CategoryService.GetCategoriesService();
    res.status(200).json(categories);
  } catch (error) {
    console.log("Error while getting categories: " + error);
    res.status(404).json({ msg: "Failed to get Categories" });
  }
};

const DeleteCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    await CategoryService.DeleteCategoryService({
      name,
    });
    res.status(200).json({ msg: "Category Deleted" });
  } catch (error) {
    console.log("Error while deleting Category: " + error);
    res.status(500).json({ msg: "Failed to delete Category" });
  }
};

module.exports = {
    AddCategoryController,
    GetCategoriesController,
    DeleteCategoryController,
}