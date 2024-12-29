const CategoryController = require("../controllers/CategoryController");
const CategoryService = require("../services/CategoryService");

jest.mock("../services/CategoryService"); // Mock the CategoryService

describe("CategoryController.DeleteCategoryController", () => {
  let mockRequest, mockResponse;

  beforeEach(() => {
    mockRequest = {
      body: {
        name: "fruits",
      },
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should delete a category and return success response", async () => {
    // Arrange
    CategoryService.DeleteCategoryService.mockResolvedValueOnce({});

    // Act
    await CategoryController.DeleteCategoryController(mockRequest, mockResponse);

    // Assert
    expect(CategoryService.DeleteCategoryService).toHaveBeenCalledWith({ name: "fruits" });
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({ msg: "Category Deleted" });
  });

  test("should return 500 status if deletion fails", async () => {
    // Arrange
    CategoryService.DeleteCategoryService.mockRejectedValueOnce(
      new Error("Database error")
    );

    // Act
    await CategoryController.DeleteCategoryController(mockRequest, mockResponse);

    // Assert
    expect(CategoryService.DeleteCategoryService).toHaveBeenCalledWith({ name: "fruits" });
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      msg: "Failed to delete Category",
    });
  });
});
