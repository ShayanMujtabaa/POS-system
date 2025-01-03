const SalesService = require("../services/SalesService");
const ItemService = require("../services/ItemService");
const utilFunctions = require("../utils/utilFunctions");

const SalesReport = async ({ startDate, endDate }) => {
  try {
    const query = utilFunctions.craftSearchQuery({ startDate, endDate });
    const sales = await SalesService.SalesQueryDates(query);
    const items = await ItemService.GetItemsService();
    for (let i = 0; i < sales.length; i++) {
      let itemNames = [];
      for (let j = 0; j < sales[i].items.length; j++) {
        const item = items.find((item) => item.id == sales[i].items[j]);
        itemNames.push(item.name);
      }
      sales[i].items = itemNames;
    }
    sales.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return sales;
  } catch (error) {
    console.error(
      "Error in ReportsService SalesReport: ",
      error.message || error
    );
    throw new Error("Failed to save item");
  }
};

const ItemReport = async ({ startDate, endDate }) => {
  try {
    const query = utilFunctions.craftSearchQuery({ startDate, endDate });
    const sales = await SalesService.SalesQueryDates(query);
    const items = await ItemService.GetItemsService();
    const itemReport = {};
    for (let sale of sales) {
      for (let i = 0; i < sale.items.length; i++) {
        const itemId = sale.items[i];
        const quantity = sale.quantities[i];
        if (!itemReport[itemId]) {
          const item = items.find((item) => item.id == itemId);
          itemReport[itemId] = {
            name: item ? item.name : "Unknown Item",
            totalQuantity: 0,
            totalSales: 0,
          };
        }
        itemReport[itemId].totalQuantity += quantity;
        itemReport[itemId].totalSales +=
          quantity * (items.find((item) => item.id == itemId)?.price || 0);
      }
    }
    const report = Object.entries(itemReport).map(([id, data]) => ({
      id,
      name: data.name,
      totalQuantity: data.totalQuantity,
      totalSales: data.totalSales,
    }));
    report.sort((a, b) => b.totalQuantity - a.totalQuantity);
    return report;
  } catch (error) {
    console.error(
      "Error in ReportsService SalesReport: ",
      error.message || error
    );
    throw new Error("Failed to save item");
  }
};

const CategoryReport = async ({ startDate, endDate }) => {
  try {
    const query = utilFunctions.craftSearchQuery({ startDate, endDate });
    const sales = await SalesService.SalesQueryDates(query);
    const categoryReport = {};
    for (let sale of sales) {
      const items = await Promise.all(
        sale.items.map((itemId) => ItemService.findItemById({ id: itemId }))
      );
      items.forEach((item, index) => {
        const quantity = sale.quantities[index];
        if (item && item.category) {
          const categoryName = item.category;
          if (!categoryReport[categoryName]) {
            categoryReport[categoryName] = {
              name: categoryName,
              totalQuantity: 0,
              totalSales: 0,
            };
          }
          categoryReport[categoryName].totalQuantity += quantity;
          categoryReport[categoryName].totalSales +=
            quantity * (item.price || 0);
        }
      });
    }
    const report = Object.values(categoryReport);
    return report;
  } catch (error) {
    console.error(
      "Error in ReportsService SalesReport: ",
      error.message || error
    );
    throw new Error("Failed to save item");
  }
};

module.exports = {
    SalesReport,
    ItemReport,
    CategoryReport,
}