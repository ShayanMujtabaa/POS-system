const ReportsService = require("../services/ReportsService");
const SalesService = require("../services/SalesService");
const ItemService = require("../services/ItemService");
const utilFunctions = require("../utils/utilFunctions");

jest.mock("../services/SalesService");
jest.mock("../services/ItemService");
jest.mock("../utils/utilFunctions");

describe("ReportsService.CategoryReport", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should return a category report", async () => {
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
      { id: "item1", name: "Item One", price: 10, category: "Category A" },
      { id: "item2", name: "Item Two", price: 15, category: "Category B" },
    ];

    const mockQuery = { startDate: "2024-12-01", endDate: "2024-12-05" };

    utilFunctions.craftSearchQuery.mockReturnValue(mockQuery);
    SalesService.SalesQueryDates.mockResolvedValue(mockSales);
    ItemService.findItemById.mockImplementation(({ id }) =>
      Promise.resolve(mockItems.find((item) => item.id === id))
    );

    const result = await ReportsService.CategoryReport(mockQuery);

    expect(utilFunctions.craftSearchQuery).toHaveBeenCalledWith(mockQuery);
    expect(SalesService.SalesQueryDates).toHaveBeenCalledWith(mockQuery);

    expect(result).toEqual([
      {
        name: "Category A",
        totalQuantity: 3,
        totalSales: 30,
      },
      {
        name: "Category B",
        totalQuantity: 3,
        totalSales: 45,
      },
    ]);
  });

  test("should throw an error if ItemService fails", async () => {
    const mockQuery = { startDate: "2024-12-01", endDate: "2024-12-05" };

    utilFunctions.craftSearchQuery.mockReturnValue(mockQuery);
    SalesService.SalesQueryDates.mockResolvedValue([
      { items: ["item1"], quantities: [2] },
    ]);
    ItemService.findItemById.mockRejectedValue(new Error("ItemService failed"));

    await expect(ReportsService.CategoryReport(mockQuery)).rejects.toThrow(
      "Failed to save item"
    );

    expect(utilFunctions.craftSearchQuery).toHaveBeenCalledWith(mockQuery);
    expect(SalesService.SalesQueryDates).toHaveBeenCalledWith(mockQuery);
  });

  test("should handle empty sales data", async () => {
    const mockQuery = { startDate: "2024-12-01", endDate: "2024-12-05" };

    utilFunctions.craftSearchQuery.mockReturnValue(mockQuery);
    SalesService.SalesQueryDates.mockResolvedValue([]);

    const result = await ReportsService.CategoryReport(mockQuery);

    expect(utilFunctions.craftSearchQuery).toHaveBeenCalledWith(mockQuery);
    expect(SalesService.SalesQueryDates).toHaveBeenCalledWith(mockQuery);
    expect(result).toEqual([]);
  });
});
