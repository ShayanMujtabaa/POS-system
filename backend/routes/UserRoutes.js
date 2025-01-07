const express = require("express");
const UserController = require("../controllers/UserController");

const router = express.Router();

router.post("/login", UserController.Login);
router.post("/create", UserController.Create);
router.delete("/delete", UserController.Delete);

module.exports = router;
