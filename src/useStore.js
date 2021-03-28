import create from "zustand";
import { devtools } from "zustand/middleware";
const useStore = create(
  devtools((set) => ({
    status: "",
    setStatus: (newStatus) => set({ status: newStatus }),
  }))
);
export default useStore;
