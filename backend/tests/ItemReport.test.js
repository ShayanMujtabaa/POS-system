const ReportsService = require("../services/ReportsService");
const SalesService = require("../services/SalesService");
const ItemService = require("../services/ItemService");
const utilFunctions = require("../utils/utilFunctions");

jest.mock("../services/SalesService");
jest.mock("../services/ItemService");
jest.mock("../utils/utilFunctions");

describe("ReportsService.ItemReport", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should return a sorted item report", async () => {
    const mockSales = [
      {
        items: ["item1", "item2"],
        quantities: [2, 3],
      },
      {
        items: ["item1"],
        quantities: [1],
      },
    ];

    const mockItems = [
      { id: "item1", name: "Item One", price: 10 },
      { id: "item2", name: "Item Two", price: 15 },
    ];

    const mockQuery = { startDate: "2024-12-01", endDate: "2024-12-05" };

    utilFunctions.craftSearchQuery.mockReturnValue(mockQuery);
    SalesService.SalesQueryDates.mockResolvedValue(mockSales);
    ItemService.GetItemsService.mockResolvedValue(mockItems);

    const result = await ReportsService.ItemReport(mockQuery);

    expect(utilFunctions.craftSearchQuery).toHaveBeenCalledWith(mockQuery);
    expect(SalesService.SalesQueryDates).toHaveBeenCalledWith(mockQuery);
    expect(ItemService.GetItemsService).toHaveBeenCalled();

    expect(result).toEqual([
      {
        id: "item1",
        name: "Item One",
        totalQuantity: 3,
        totalSales: 30,
      },
      {
        id: "item2",
        name: "Item Two",
        totalQuantity: 3,
        totalSales: 45,
      },
    ]);
  });

  test("should throw an error if SalesService fails", async () => {
    const mockQuery = { startDate: "2024-12-01", endDate: "2024-12-05" };

    utilFunctions.craftSearchQuery.mockReturnValue(mockQuery);
    SalesService.SalesQueryDates.mockRejectedValue(
      new Error("SalesService failed")
    );

    await expect(ReportsService.ItemReport(mockQuery)).rejects.toThrow(
      "Failed to save item"
    );

    expect(utilFunctions.craftSearchQuery).toHaveBeenCalledWith(mockQuery);
    expect(SalesService.SalesQueryDates).toHaveBeenCalledWith(mockQuery);
    expect(ItemService.GetItemsService).not.toHaveBeenCalled();
  });

  test("should handle empty sales data", async () => {
    const mockQuery = { startDate: "2024-12-01", endDate: "2024-12-05" };

    utilFunctions.craftSearchQuery.mockReturnValue(mockQuery);
    SalesService.SalesQueryDates.mockResolvedValue([]);
    ItemService.GetItemsService.mockResolvedValue([]);

    const result = await ReportsService.ItemReport(mockQuery);

    expect(utilFunctions.craftSearchQuery).toHaveBeenCalledWith(mockQuery);
    expect(SalesService.SalesQueryDates).toHaveBeenCalledWith(mockQuery);
    expect(ItemService.GetItemsService).toHaveBeenCalled();
    expect(result).toEqual([]);
  });
});