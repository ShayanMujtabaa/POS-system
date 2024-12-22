const POSController = require('../controllers/ItemControllers');
const ItemService = require('../services/ItemService');
const ItemModel = require('../models/ItemModel'); // Assuming ItemModel is a Mongoose model

describe('POSController.AddItem', () => {
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

        // Mock the addItem function directly
        jest.spyOn(ItemService, 'addItem').mockImplementation(async (itemData, ItemModel) => {
            const newItem = new ItemModel(itemData);
            return newItem.save(); // Mocking the save method
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should add an item and return success response', async () => {
        // Mocking the save method of the ItemModel to resolve successfully
        ItemModel.prototype.save = jest.fn().mockResolvedValueOnce({});

        // Act
        await POSController.AddItem(mockRequest, mockResponse);

        // Assert
        expect(ItemService.addItem).toHaveBeenCalledWith(mockRequest.body, ItemModel);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({ msg: 'Item Added' });
    });

    test('should handle errors and return failure response', async () => {
        // Mocking the save method to reject with an error
        ItemModel.prototype.save = jest.fn().mockRejectedValueOnce(new Error('Database error'));

        // Act
        await POSController.AddItem(mockRequest, mockResponse);

        // Assert
        expect(ItemService.addItem).toHaveBeenCalledWith(mockRequest.body, ItemModel);
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({ msg: 'Failed to add item' });
    });
});
