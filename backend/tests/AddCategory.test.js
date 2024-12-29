const CategoryController = require("../controllers/CategoryController");
const CategoryService = require("../services/CategoryService");

describe("CategoryController.AddCategoryController", () => {
  let mockRequest, mockResponse;

  beforeEach(() => {
    mockRequest = {
      body: {
        name: "Test category",
      },
    };

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest.mock("../services/CategoryService");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should add a category and return success response", async () => {
    CategoryService.AddCategoryService = jest.fn().mockResolvedValueOnce({});
    await CategoryController.AddCategoryController(mockRequest, mockResponse);
    expect(CategoryService.AddCategoryService).toHaveBeenCalledWith(
      mockRequest.body
    );
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({ msg: "Category Added" });
  });

  test("should handle errors and return failure response", async () => {
    // Mocking the service method to reject with an error
    CategoryService.AddCategoryService = jest
      .fn()
      .mockRejectedValueOnce(new Error("Database error"));

    // Act
    await CategoryController.AddCategoryController(mockRequest, mockResponse);

    // Assert
    expect(CategoryService.AddCategoryService).toHaveBeenCalledWith(mockRequest.body);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      msg: "Failed to add Category",
    });
  });
});
