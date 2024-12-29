const ItemController = require('../controllers/ItemController'); // Singular name consistency
const ItemService = require('../services/ItemService');

describe('ItemController.AddItemController', () => {
    let mockRequest, mockResponse;

    beforeEach(() => {
        // Mock request body
        mockRequest = {
            body: {
                id: '123',
                name: 'Test Item',
                price: 50,
                cost: 30,
                stock: 100,
                category: 'Electronics',
                imageUrl: 'https://example.com/item.jpg',
            },
        };

        // Mock response object
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        // Mock the service method
        jest.mock('../services/ItemService');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should add an item and return success response', async () => {
        // Mocking the service method to resolve successfully
        ItemService.AddItemService = jest.fn().mockResolvedValueOnce({});

        // Act
        await ItemController.AddItemController(mockRequest, mockResponse);

        // Assert
        expect(ItemService.AddItemService).toHaveBeenCalledWith(mockRequest.body);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({ msg: 'Item Added' });
    });

    test('should handle errors and return failure response', async () => {
        // Mocking the service method to reject with an error
        ItemService.AddItemService = jest.fn().mockRejectedValueOnce(new Error('Database error'));

        // Act
        await ItemController.AddItemController(mockRequest, mockResponse);

        // Assert
        expect(ItemService.AddItemService).toHaveBeenCalledWith(mockRequest.body);
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({ msg: 'Failed to add item' });
    });
});
