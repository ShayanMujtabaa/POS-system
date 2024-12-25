const ReportsService = require("../services/ReportsService");
const SalesService = require("../services/SalesService");
const ItemService = require("../services/ItemService");
const utilFunctions = require("../utils/utilFunctions");

jest.mock("../services/SalesService");
jest.mock("../services/ItemService");
jest.mock("../utils/utilFunctions");

describe("ReportsService.SalesReport", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should return a sorted sales report with item names", async () => {
    const mockSales = [
      {
        id: 1,
        items: ["item1", "item2"],
        quantities: [2, 3],
        createdAt: "2024-12-01T10:00:00Z",
      },
      {
        id: 2,
        items: ["item3"],
        quantities: [1],
        createdAt: "2024-12-05T12:00:00Z",
      },
    ];

    const mockItems = [
      { id: "item1", name: "Item One", price: 10 },
      { id: "item2", name: "Item Two", price: 15 },
      { id: "item3", name: "Item Three", price: 20 },
    ];

    const mockQuery = { startDate: "2024-12-01", endDate: "2024-12-05" };

    utilFunctions.craftSearchQuery.mockReturnValue(mockQuery);
    SalesService.SalesQueryDates.mockResolvedValue(mockSales);
    ItemService.GetItemsService.mockResolvedValue(mockItems);

    const result = await ReportsService.SalesReport(mockQuery);

    expect(utilFunctions.craftSearchQuery).toHaveBeenCalledWith(mockQuery);
    expect(SalesService.SalesQueryDates).toHaveBeenCalledWith(mockQuery);
    expect(ItemService.GetItemsService).toHaveBeenCalled();

    expect(result).toEqual([
      {
        id: 2,
        items: ["Item Three"],
        quantities: [1],
        createdAt: "2024-12-05T12:00:00Z",
      },
      {
        id: 1,
        items: ["Item One", "Item Two"],
        quantities: [2, 3],
        createdAt: "2024-12-01T10:00:00Z",
      },
    ]);
  });

  test("should throw an error if SalesService fails", async () => {
    const mockQuery = { startDate: "2024-12-01", endDate: "2024-12-05" };

    utilFunctions.craftSearchQuery.mockReturnValue(mockQuery);
    SalesService.SalesQueryDates.mockRejectedValue(
      new Error("SalesService failed")
    );

    await expect(ReportsService.SalesReport(mockQuery)).rejects.toThrow(
      "Failed to save item"
    );

    expect(utilFunctions.craftSearchQuery).toHaveBeenCalledWith(mockQuery);
    expect(SalesService.SalesQueryDates).toHaveBeenCalledWith(mockQuery);
    expect(ItemService.GetItemsService).not.toHaveBeenCalled();
  });

  test("should handle empty sales data", async () => {
    const mockQuery = { startDate: "2024-12-01", endDate: "2024-12-05" };
    const mockItems = [
      { id: "item1", name: "Item One", price: 10 },
      { id: "item2", name: "Item Two", price: 15 },
    ];

    utilFunctions.craftSearchQuery.mockReturnValue(mockQuery);
    SalesService.SalesQueryDates.mockResolvedValue([]);
    ItemService.GetItemsService.mockResolvedValue(mockItems);

    const result = await ReportsService.SalesReport(mockQuery);

    expect(utilFunctions.craftSearchQuery).toHaveBeenCalledWith(mockQuery);
    expect(SalesService.SalesQueryDates).toHaveBeenCalledWith(mockQuery);
    expect(ItemService.GetItemsService).toHaveBeenCalled();
    expect(result).toEqual([]);
  });
});
