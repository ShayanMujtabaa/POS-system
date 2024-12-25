const SalesController = require("../controllers/SalesController");
const SalesService = require("../services/SalesService");
const ItemModel = require("../models/ItemModel"); // Mocked ItemModel

jest.mock("../models/ItemModel"); // Mock the ItemModel

describe("SalesController.SalesRefundController", () => {
  let mockRequest, mockResponse;

  beforeEach(() => {
    // Mock request body
    mockRequest = {
      body: {
        cartItems: [
          { id: "item1", quantity: 2 },
          { id: "item2", quantity: 1 },
        ],
        refundAmount: 50,
      },
    };

    // Mock response object
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the service method
    jest.mock("../services/SalesService");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should process SalesRefundController and return success response", async () => {
    // Mocking the service method to resolve successfully
    SalesService.SalesRefundService = jest.fn().mockResolvedValueOnce({});

    // Act
    await SalesController.SalesRefundController(mockRequest, mockResponse);

    // Assert
    expect(SalesService.SalesRefundService).toHaveBeenCalledWith(
      mockRequest.body
    );
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      msg: "Refund Successful",
    });
  });

  test("should handle errors and return failure response", async () => {
    // Mocking the service method to reject with an error
    SalesService.SalesRefundService = jest
      .fn()
      .mockRejectedValueOnce(new Error("Database error"));

    // Act
    await SalesController.SalesRefundController(mockRequest, mockResponse);

    // Assert
    expect(SalesService.SalesRefundService).toHaveBeenCalledWith(
      mockRequest.body
    );
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      msg: "Failed to Refund",
    });
  });

  test("should update item stock after successful refund", async () => {
    // Mocking the item stock update
    const mockItem1 = {
      id: "item1",
      stock: 10,
      save: jest.fn().mockResolvedValueOnce(),
    };
    const mockItem2 = {
      id: "item2",
      stock: 5,
      save: jest.fn().mockResolvedValueOnce(),
    };

    ItemModel.findOne = jest
      .fn()
      .mockResolvedValueOnce(mockItem1)
      .mockResolvedValueOnce(mockItem2);

    // Mock the service
    SalesService.SalesRefundService = jest.fn(async ({ cartItems }) => {
      for (const { id, quantity } of cartItems) {
        const item = await ItemModel.findOne({ id });
        item.stock += quantity;
        await item.save();
      }
      return {};
    });

    // Act
    await SalesController.SalesRefundController(mockRequest, mockResponse);

    // Assert
    expect(ItemModel.findOne).toHaveBeenCalledWith({ id: "item1" });
    expect(ItemModel.findOne).toHaveBeenCalledWith({ id: "item2" });
    expect(mockItem1.stock).toBe(12); // 10 + 2
    expect(mockItem1.save).toHaveBeenCalled();
    expect(mockItem2.stock).toBe(6); // 5 + 1
    expect(mockItem2.save).toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      msg: "Refund Successful",
    });
  });
});
