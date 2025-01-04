const ReportsService = require("../services/ReportsService");

const SalesReport = async (req, res) => {
  try {
    console.log("sdadas")
    const { startDate, endDate } = req.query;
    const report = await ReportsService.SalesReport({ startDate, endDate });

    res.status(200).json(report);
  } catch (error) {
    console.log("Error while getting sales: " + error);
    res.status(500).json({ msg: "Failed to get Sales Report" });
  }
};

const ItemReport = async (req, res) => {
    try {
      const { startDate, endDate } = req.query;
      const report = await ReportsService.ItemReport({ startDate, endDate });
      res.status(200).json(report);
    } catch (error) {
      console.log("Error while getting items: " + error);
      res.status(500).json({ msg: "Failed to get Item Report" });
    }
}

const CategoryReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const report = await ReportsService.CategoryReport({ startDate, endDate });
    res.status(200).json(report);
  } catch (error) {
    console.log("Error while getting category: " + error);
    res.status(500).json({ msg: "Failed to get Category Report" });
  }
};

const StockReport = async (req, res) => {
  try {
    const report = await ReportsService.StockReport();
    res.status(200).json(report); 
  } catch (error) {
    console.error('Error generating stock report:', error.message || error);
    res.status(500).json({ msg: 'Failed to generate stock report' });
  }
};


module.exports = {
    SalesReport, 
    ItemReport,
    CategoryReport,
    StockReport,
}