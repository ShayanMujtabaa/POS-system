import { create } from "zustand";
import axiosInstance from "../config/AxiosInstance";

const useCategoriesStore = create((set) => ({
  categories: [],
  loading: false,
  error: null,
  fetchCategories: async () => {
    try {
      set({ loading: true, error: null });
      const response = await axiosInstance.get("/category/getcategories");
      const data = response.data; 
      set({ categories: data, loading: false });
    } catch (error) {
      console.error("Error fetching categories:", error.message);
      set({ loading: false, error: error.message });
    }
  },
  deleteCategory: (categoryName) => {
    set((state) => ({
      categories: state.categories.filter(
        (category) => category.name !== categoryName
      ),
    }));
  },
}));


export default useCategoriesStore;
