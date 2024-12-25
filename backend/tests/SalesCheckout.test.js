const SalesController = require("../controllers/SalesController");
const SalesService = require("../services/SalesService");

describe("SalesController.SalesCheckoutController", () => {
  let mockRequest, mockResponse;

  beforeEach(() => {
    // Mock request body
    mockRequest = {
      body: {
        cartItems: [
          { id: "item1", quantity: 2 },
          { id: "item2", quantity: 1 },
        ],
        total: 100,
        discount: 10,
        tax: 5,
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

  test("should process SalescheckoutController and return success response", async () => {
    // Mocking the service method to resolve successfully
    SalesService.mockResolvedValueOnce({});

    // Act
    await SalesController.SalesCheckoutController(mockRequest, mockResponse);

    // Assert
    expect(SalesService).toHaveBeenCalledWith(mockRequest.body);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      msg: "SalesCheckoutController successful",
    });
  });

  test("should handle errors and return failure response", async () => {
    // Mocking the service method to reject with an error
    SalesService.mockRejectedValueOnce(new Error("Database error"));

    // Act
    await SalesController.Checkout(mockRequest, mockResponse);

    // Assert
    expect(SalesService).toHaveBeenCalledWith(mockRequest.body);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      msg: "Failed to process checkout",
    });
  });
});
