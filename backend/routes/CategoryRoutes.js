const express = require("express");
const CategoryController = require("../controllers/CategoryController");

const router = express.Router();

router.post("/addCategory", CategoryController.AddCategoryController);
router.get("/getCategory", CategoryController.GetCategoriesController);
router.delete("/deleteCategory", CategoryController.DeleteCategoryController);

module.exports = router;
