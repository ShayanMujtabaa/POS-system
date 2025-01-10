import { create } from "zustand";
import axiosInstance from "../config/AxiosInstance";

// Define your Zustand store
const useItemsStore = create((set) => ({
  items: [],
  loading: false,
  error: null,
  fetchItems: async () => {
    try {
      set({ loading: true, error: null });
      const response = await axiosInstance.get("/item/getItems");
      const data = response.data;
      set({ items: data, loading: false });
    } catch (error) {
      set({ loading: false, error: error.message });
    }
  },
  deleteItem: (id) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    }));
  },
}));

export default useItemsStore;
