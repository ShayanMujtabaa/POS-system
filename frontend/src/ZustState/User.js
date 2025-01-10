import { create } from "zustand";

const useUserStore = create((set) => ({
  userRole: null,
  userName: null,
  userToken: null,
  setUserRole: (role) => set({ userRole: role }),
  setUserName: (username) => set({ userName: username }),
  setUserToken: (Token) => set({ userToken: Token }),
  clearUser: () => set({ userRole: null, userName: null }),
}));

export default useUserStore;
