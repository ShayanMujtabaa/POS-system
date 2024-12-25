const SalesService = require("../services/SalesService");

const SalesCheckoutController = async (req, res) => {
  try {
    const { cartItems, total, discount, tax } = req.body;
    await SalesService.SalesCheckoutService({ cartItems, total, discount });
    res.status(200).json({ msg: "Checkout Successful" });
  } catch (error) {
    console.log("Error while checking out: " + error);
    res.status(500).json({ msg: "Failed to Checkout" });
  }
};

const SalesRefundController = async (req, res) => {
  try {
    const { cartItems, refundAmount } = req.body;
    await SalesService.SalesRefundService({ cartItems, refundAmount });
    res.status(200).json({ msg: "Refund Successful" });
  } catch (error) {
    console.log("Error while refunding: " + error);
    res.status(500).json({ msg: "Failed to Refund" });
  }
};

module.exports = { SalesCheckoutController, SalesRefundController };
