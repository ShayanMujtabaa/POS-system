import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCategories = createAsyncThunk("categories/fetchCategories", async (_, thunkAPI) => {
    try {
        const response = await axios.get("http://localhost:9000/category/getcategories");
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

const CategoriesSlice = createSlice({
    name: "Categories",
    initialState: {
        categories: [],
        loading: false,
        error: null,
    },
    reducers: {
        deleteCategory(state, action) {
            // Remove the category with the given id from the categories array
            state.categories = state.categories.filter((category) => category.id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { deleteCategory } = CategoriesSlice.actions;

export default CategoriesSlice.reducer;
