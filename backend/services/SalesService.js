const SalesModel = require("../models/SalesModel");
const ItemService = require("./ItemService");

const SalesCheckoutService = async ({ cartItems, total, discount, tax }) => {
  try {
    const items = [];
    const quantities = [];

    for (let i = 0; i < cartItems.length; i++) {
      const { id, quantity } = cartItems[i];

      // Validate and update item stock using ItemService
      const item = await ItemService.decrementItemStock(id, quantity);

      // Collect item and quantity data for the sale
      items.push(item.id);
      quantities.push(quantity);
    }

    // Create and save the new sale
    const newSale = new SalesModel({
      items,
      quantities,
      total,
      discount,
      tax,
    });
    return await newSale.save();
  } catch (error) {
    throw new Error(error.message);
  }
};

const SalesRefundService = async ({ cartItems, refundAmount }) => {
  try {
    const items = [];
    const quantities = [];

    for (let i = 0; i < cartItems.length; i++) {
      const { id, quantity } = cartItems[i];

      // Update item stock using ItemService
      const item = await ItemService.incrementItemStock(id, quantity);

      // Collect item and quantity data for the refund record
      items.push(item.id);
      quantities.push(quantity);
    }

    // Create and save the refund record
    const newRefund = new SalesModel({
      items,
      quantities,
      total: -Math.abs(refundAmount), // Ensure refund amount is negative
    });

    return await newRefund.save();
  } catch (error) {
    throw new Error(error.message);
  }
};

const SalesQueryDates = async ({ query }) => {
  try {
    return await SalesModel.find(query);
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { SalesCheckoutService, SalesRefundService, SalesQueryDates };
