const ItemController = require("../controllers/ItemController");
const ItemService = require("../services/ItemService");

jest.mock("../services/ItemService"); // Mock the ItemService

describe("ItemController.DeleteItemController", () => {
  let mockRequest, mockResponse;

  beforeEach(() => {
    mockRequest = {
      body: {
        id: "123",
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

  test("should delete an item and return success response", async () => {
    // Arrange
    ItemService.DeleteItemService.mockResolvedValueOnce({});

    // Act
    await ItemController.DeleteItemController(mockRequest, mockResponse);

    // Assert
    expect(ItemService.DeleteItemService).toHaveBeenCalledWith({ id: "123" });
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({ msg: "Item Deleted" });
  });

  test("should return 500 status if deletion fails", async () => {
    // Arrange
    ItemService.DeleteItemService.mockRejectedValueOnce(
      new Error("Database error")
    );

    // Act
    await ItemController.DeleteItemController(mockRequest, mockResponse);

    // Assert
    expect(ItemService.DeleteItemService).toHaveBeenCalledWith({ id: "123" });
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      msg: "failed to delete item",
    });
  });
});
