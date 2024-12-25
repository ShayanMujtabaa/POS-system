const ItemController = require("../controllers/ItemController");
const ItemService = require("../services/ItemService");

jest.mock("../services/ItemService"); // Mock the ItemService

describe("ItemController.UpdateItemController", () => {
  let mockRequest, mockResponse;

  beforeEach(() => {
    mockRequest = {
      body: {
        id: "123",
        field: "name",
        value: "Updated Item Name",
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

  test("should update an item and return success response", async () => {
    // Arrange
    ItemService.UpdateItemService.mockResolvedValueOnce({});

    // Act
    await ItemController.UpdateItemController(mockRequest, mockResponse);

    // Assert
    expect(ItemService.UpdateItemService).toHaveBeenCalledWith(
      mockRequest.body
    );
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({ msg: "Item Updated" });
  });

  test("should return 500 status if updating fails", async () => {
    // Arrange
    ItemService.UpdateItemService.mockRejectedValueOnce(
      new Error("Database error")
    );

    // Act
    await ItemController.UpdateItemController(mockRequest, mockResponse);

    // Assert
    expect(ItemService.UpdateItemService).toHaveBeenCalledWith(
      mockRequest.body
    );
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      msg: "failed to update item",
    });
  });
});
