const express = require("express");
const UserController = require("../controllers/UserController");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();

router.post("/login", UserController.Login);
router.post(
  "/create",
  authMiddleware.authenticateJWT,
  authMiddleware.authorizeRole(["admin"]),
  UserController.Create
);
router.post("/verify", UserController.VerifyToken);
router.delete(
  "/delete",
  authMiddleware.authenticateJWT,
  authMiddleware.authorizeRole(["admin"]),
  UserController.Delete
);

module.exports = router;
