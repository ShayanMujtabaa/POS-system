const express = require("express");
const ReportsController = require("../controllers/ReportsController");

const router = express.Router();

router.get("/salesReport", ReportsController.SalesReport);
router.get("/itemReport", ReportsController.ItemReport);
router.get("/categoryReport", ReportsController.CategoryReport);

module.exports = router;
