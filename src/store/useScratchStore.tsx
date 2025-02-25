import { OutlineCard } from "@/lib/types";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type OutlineStore = {
  outlines: OutlineCard[];
  addOutline: (outlines: OutlineCard) => void;
  addMultipleOutlines: (outlines: OutlineCard[]) => void;
  resetOutlines: () => void;
};

const useOutlineStore = create<OutlineStore>()(
  devtools(
    persist(
      (set) => ({
        outlines: [],
        resetOutlines: () => set({ outlines: [] }),
        addOutline: (outlines: OutlineCard) =>
          set((state) => ({ outlines: [...state.outlines, outlines] })),
        addMultipleOutlines: (outlines: OutlineCard[]) =>
          set((state) => ({ outlines: [...state.outlines, ...outlines] })),
      }),
      { name: "outlines" }
    )
  )
);

export default useOutlineStore;
