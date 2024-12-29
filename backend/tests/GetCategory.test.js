const CategoryController = require("../controllers/CategoryController");
const CategoryService = require("../services/CategoryService");

jest.mock("../services/CategoryService"); // Mock the CategoryService

describe("CategoryController.GetCategoriesController", () => {
  let mockRequest, mockResponse;

  beforeEach(() => {
    mockRequest = {}; // No specific request data needed for GET
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should return categories and a 200 status on success", async () => {
    // Arrange
    const mockcategories = [
      { id: "1", name: "Item 1" },
      { id: "2", name: "Item 2" },
    ];
    CategoryService.GetCategoriesService.mockResolvedValueOnce(mockcategories);

    // Act
    await CategoryController.GetCategoriesController(mockRequest, mockResponse);

    // Assert
    expect(CategoryService.GetCategoriesService).toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockcategories);
  });

  test("should return 404 status if fetching categories fails", async () => {
    // Arrange
    CategoryService.GetCategoriesService.mockRejectedValueOnce(
      new Error("Database error")
    );

    // Act
    await CategoryController.GetCategoriesController(mockRequest, mockResponse);

    // Assert
    expect(CategoryService.GetCategoriesService).toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({
      msg: "Failed to get Categories",
    });
  });
});
