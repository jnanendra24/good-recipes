import { create } from "zustand";

export const useUserStore = create((set) => ({
  user: null, //initial value
  setUser: (user) => set({user}),// Logout User
}));
