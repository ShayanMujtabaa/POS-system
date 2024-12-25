const ExpenseController = require("../controllers/ExpenseController");
const ExpenseService = require("../services/ExpenseService");

describe("ExpenseController.AddExpenseController", () => {
  let mockRequest, mockResponse;

  beforeEach(() => {
    mockRequest = {
      body: {
        name: "Test expense",
        price: 20000,
      },
    };

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest.mock("../services/ExpenseService");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should add a category and return success response", async () => {
    ExpenseService.AddExpenseService = jest.fn().mockResolvedValueOnce({});
    await ExpenseController.AddExpenseController(mockRequest, mockResponse);
    expect(ExpenseService.AddExpenseService).toHaveBeenCalledWith(
      mockRequest.body
    );
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({ msg: "Expense Added" });
  });

  test("should handle errors and return failure response", async () => {
    // Mocking the service method to reject with an error
    ExpenseService.AddExpenseService = jest
      .fn()
      .mockRejectedValueOnce(new Error("Database error"));

    // Act
    await ExpenseController.AddExpenseController(mockRequest, mockResponse);

    // Assert
    expect(ExpenseService.AddExpenseService).toHaveBeenCalledWith(
      mockRequest.body
    );
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      msg: "Failed to add Expense",
    });
  });
});
