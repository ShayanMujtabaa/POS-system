import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch items
export const fetchItems = createAsyncThunk("stock/fetchItems", async (_, thunkAPI) => {
    try {
        const response = await axios.post("http://localhost:9000/getItems");
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

// Async thunk to update stock of an item
export const updateStock = createAsyncThunk("stock/updateStock", async ({ id, stock }, thunkAPI) => {
    try {
        const response = await axios.post("http://localhost:9000/updateStock", { id, stock });
        return { id, stock };
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

const StockSlice = createSlice({
    name: "Stock",
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {
        resetStock(state) {
            // Reset stock state to initial
            state.items = [];
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch Items
            .addCase(fetchItems.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchItems.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchItems.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Update Stock
            .addCase(updateStock.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateStock.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.items.findIndex(item => item.id === action.payload.id);
                if (index !== -1) {
                    state.items[index].stock = action.payload.stock;
                }
            })
            .addCase(updateStock.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { resetStock } = StockSlice.actions;

export default StockSlice.reducer;
