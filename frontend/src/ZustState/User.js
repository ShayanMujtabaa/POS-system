import { create } from "zustand";

const useUserStore = create((set) => ({
  userRole: null,
  userName: null,
  setUserRole: (role) => set({ userRole: role }),
  setUserName: (username) => set({userName: username}),
}));

export default useUserStore;
