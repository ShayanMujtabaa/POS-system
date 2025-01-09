import { create } from "zustand";

// Define the Zustand store
const useCategoriesStore = create((set) => ({
  categories: [],
  loading: false,
  error: null,
  fetchCategories: async () => {
    try {
      set({ loading: true, error: null });
      const response = await fetch(
        "http://localhost:9000/category/getcategories"
      );
      const data = await response.json();
      set({ categories: data, loading: false });
    } catch (error) {
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
