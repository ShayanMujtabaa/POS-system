const ItemController = require("../controllers/ItemController");
const ItemService = require("../services/ItemService");

jest.mock("../services/ItemService"); // Mock the ItemService

describe("ItemController.GetItemsController", () => {
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

  test("should return items and a 200 status on success", async () => {
    // Arrange
    const mockItems = [
      { id: "1", name: "Item 1" },
      { id: "2", name: "Item 2" },
    ];
    ItemService.GetItemsService.mockResolvedValueOnce(mockItems);

    // Act
    await ItemController.GetItemsController(mockRequest, mockResponse);

    // Assert
    expect(ItemService.GetItemsService).toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockItems);
  });

  test("should return 404 status if fetching items fails", async () => {
    // Arrange
    ItemService.GetItemsService.mockRejectedValueOnce(
      new Error("Database error")
    );

    // Act
    await ItemController.GetItemsController(mockRequest, mockResponse);

    // Assert
    expect(ItemService.GetItemsService).toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({
      msg: "failed to get items",
    });
  });
});
