import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchItems = createAsyncThunk("items/fetchItems", async (_, thunkAPI) => {
    try {
        const response = await axios.post("http://localhost:9000/getItems");
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

const ItemsSlice = createSlice({
    name: "Items",
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {
        deleteItem(state, action) {
            // Remove the item with the given id from the items array
            state.items = state.items.filter((item) => item.id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
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
            });
    },
});

export const { deleteItem } = ItemsSlice.actions;

export default ItemsSlice.reducer;
