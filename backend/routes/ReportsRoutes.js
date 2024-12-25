const express = require("express");
const ReportsController = require("../controllers/ReportsController");

const router = express.Router();

app.get("/salesReport", ReportsController.SalesReport);
app.get("/itemReport", ReportsController.ItemReport);
app.get("/categoryReport", ReportsController.CategoryReport);

module.exports = router;
