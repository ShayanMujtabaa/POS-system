const express = require("express");
const CategoryController = require("../controllers/CategoryController");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();

router.post(
  "/addCategory",
  authMiddleware.authenticateJWT,
  authMiddleware.authorizeRole(["admin"]),
  CategoryController.AddCategoryController
);
router.get(
  "/getcategories",
  authMiddleware.authenticateJWT,
  authMiddleware.authorizeRole(["admin", "employee"]),
  CategoryController.GetCategoriesController
);
router.delete(
  "/deleteCategory",
  authMiddleware.authenticateJWT,
  authMiddleware.authorizeRole(["admin"]),
  CategoryController.DeleteCategoryController
);

module.exports = router;
